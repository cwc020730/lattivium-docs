# Rocket reserves and replenishment

Travel maintains propulsion rockets through [inventory requirements](../supply/stock). By default, replenishment starts below **1,728 rockets** and aims for **3,456 rockets**. Both levels are configurable. Route predictions remain available for `AUTO` mode.

## Inventory and ownership

| Term | Meaning |
| --- | --- |
| Propulsion rocket | A rocket with an absent fireworks component or an empty explosion list |
| Loose stock | Propulsion rockets in the 36 main inventory slots and offhand, counted once |
| Packed stock | Propulsion rockets inside carried shulker boxes, one level deep |
| Physical stock | Loose plus packed stock |
| Spendable stock | Physical stock available after material-ledger reservations |
| `minimum` | Replenishment trigger; stock equal to the minimum can continue |
| `target` | Desired spendable stock at the end of a replenishment episode |

`TaskFireworkSupply` chooses quantities and maintenance operations. `StockRequirement` expresses quantity policy. `SupplyRouteEstimator` predicts travel. `FireworkReserveFlow` prepares loose fuel before takeoff. `FireworkUseFlow` consumes and accounts for each rocket.

## Stock-level modes

### FIXED

```text
minimum = fireworkSupplyThreshold = 1728
target = fireworkSupplyTarget = 3456
```

`FIXED` uses constant levels. Below the minimum, replenishment aims for the target and continues consecutive pickup batches at the current source. This avoids stopping at the minimum and restarting after spending one rocket. Reaching the target completes the episode after settlement. Once the current source is exhausted, reaching the minimum also permits resuming execution after inventory and borrowed-box obligations settle.

### AUTO

```text
prediction = estimated consumption of the selected itinerary
minimum = max(1, ceil(prediction × fireworkPredictionMultiplier))
target = ceil(minimum × fireworkSupplyTargetMultiplier)
```

The default multipliers are `1.5` and `2.0`. A prediction of 200 rockets produces a minimum of 300 and a target of 600. Each supported safe travel boundary can recalculate the prediction; an episode freezes both levels when it begins.

| Configuration | Default | Range |
| --- | --- | --- |
| `fireworkSupplyMode` | `FIXED` | `FIXED`, `AUTO` |
| `fireworkSupplyThreshold` | `1728` | 1–10000 |
| `fireworkSupplyTarget` | `3456` | Minimum–20000 |
| `fireworkPredictionMultiplier` | `1.5` | 1–10 |
| `fireworkSupplyTargetMultiplier` | `2.0` | 1–10 |

The target controls when to stop acquiring more fuel. Existing stock may exceed it. Native crafting produces complete batches and can finish slightly above the target.

## Sources and resuming execution

Low-stock checks run at supported safe boundaries. An airborne check waits for a safe landing. Active container, crafting and borrowed-box operations settle before maintenance proceeds. Ground movement to unpack fuel and return to departure may cross shallow water. The launch checks the dry position again immediately before jumping.

1. Use spendable carried fuel and unpack it when needed.
2. Query and visit currently reachable propulsion-rocket sources through `ReplenishSuppliesFlow`.
3. After ordinary source attempts, fall back to the last source that actually supplied fuel, validating travel, access and physical contents again.
4. If ready-made rockets are insufficient, `ProducePropulsionFuelFlow` can acquire ingredients and craft them natively.
5. At a safe location, an unresolved shortage enters `WAITING_FOR_RESOURCE`, preserving the original goal, deficit, position and reason. Added physical stock is revalidated against the minimum.

Travel during replenishment consumes real stock. Crafting recalculates the deficit after acquiring ingredients and settles any started native batch. The parent resumes from the Bot's actual position.

## Estimating a flight leg

Distance d is horizontal X/Z distance, clamped to zero. `ceil` rounds upward.

```text
Long leg L(d) = 1 + ceil((60 + 0.020 × d) × 1.20)
Short hop H(d) = 1 + max(3, ceil((2 + 0.045 × d) × 1.35))
```

The long-leg formula uses an empirical fixed cost of 60 for takeoff, ascent and landing corrections, 0.020 per cruise block, a 1.20 margin, and one launch rocket. Local obstacle-crossing hops use the short formula.

| Horizontal distance | Long formula L(d) | Short formula H(d) |
| --- | --- | --- |
| 20 blocks | 74 | 5 |
| 64 blocks | 75 | 8 |
| 100 blocks | 76 | 10 |
| 200 blocks | 78 | 16 |
| 500 blocks | 85 | 35 |
| 1,000 blocks | 97 | 65 |

The flight policy selects the applicable formula. These are readiness estimates. Actual consumption requires checking use records and physical inventory changes; the fixed term dominates the long formula at these distances.

## Predicting along a route

`SupplyRouteEstimator` quotes coordinates and recorded portal routes from the Bot's physical position. Execution verifies terrain clearance, physical exits and navigability.

```text
Physical position -> first portal entrance
  Transfer -> recorded exit -> next portal entrance
  Transfer -> recorded exit -> final destination
```

Entrance and final approach estimates are summed into E. Portal transfer itself costs no propulsion rockets. Same-dimension destinations can use portal detours, with each selected approach quoted separately.

- An approach below 64 horizontal blocks with at most 32 blocks of ascent contributes zero to the travel quote.
- A target more than 32 blocks above departure contributes a long-flight estimate even at a short horizontal distance.
- Each approach is split into legs of at most 4,096 blocks, with a separate L(d) and fixed launch cost for every leg.
- `PortalJourneyFlow` also quotes its already selected remaining crossings, preserving their constraints.

A 5,000-block approach is split into 4,096 and 904 blocks:

```text
E = L(4096) + L(904) = 172 + 95 = 267 rockets
```

Applying the long formula directly to 5,000 gives 193. Travel quotes use the split total of 267. Multiple launches account for part of the growth on long journeys.

Auxiliary stock access compares the selected one-way route with available carried rockets. A same-dimension journey can select a funded direct approach when the preferred route is unfunded. Flight legs prepare direct fuel from carried transport boxes after safe landing. An execution declares any later return journey separately.


## Packed rockets and takeoff

Travel-level checks include spendable fuel in carried boxes. Each actual flight also needs loose fuel:

```text
Minimum loose fuel for the current leg: L(d) or H(d)
Single-leg loose preparation target: current leg minimum
```

When shared maintenance has already promoted valid inventory into usable fuel for this leg, `FireworkReserveFlow` reuses that state without repeated reorganization. Otherwise, it calls `EnsureInventoryReadyFlow` to prepare the current leg minimum from owned transport boxes in the L0 rocket slots, without adding maintenance reserve targets or spare-slot requirements. Inventory maintenance retains its own stock levels, and legs remain capped at 4,096 blocks. Staging must permit safe placement, opening and recovery; stock is checked after the active box transaction settles. Boxes, task cargo and other reservations retain their protections.

For example, a short hop away from a portal may require 4 rockets. With 166 rockets already in L0, the Bot can leave the portal and find a safe staging position when it later needs to unpack fuel.

Loose-stock readiness establishes whether the current flight can launch. The higher-level watermarks control replenishment frequency. Flight-control state determines actual consumption.

## Consumption, budgets and limits

Controller acceleration requests have a 36-tick cooldown. `FireworkUseFlow` verifies eligible fuel, consumption rights and the physical decrease before accounting for one rocket. Explosive rockets remain excluded.

Flight failure recovery searches for an observed, safely reachable local landing position. An execution that needs a return journey declares that destination and travel separately. Local navigation's unloaded-target preflight retains elytra durability checks. Construction replenishment uses the configured stock policy. Transport preparation and material acquisition share an execution's maintenance budget and last successful source.

Predictions use coordinates and portal records. Detours, takeoff adjustments and exit changes can introduce error. Fixed levels suit well-stocked tasks with bounded travel distances; extreme distances still require viable routes and sources.

See [budgets](./budgets#maintenance-budgets-and-allowances) and [inventory diagnostics](../supply/stock#querying-inventory).
