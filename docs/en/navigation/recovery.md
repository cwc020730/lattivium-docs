# Observation and failures

Navigation uses observed geometry, permitted transport and finite search budgets. Recovery retains actual position and business obligations; each owner decides replanning, source replacement or waiting.

## Records and terrain observation

Atlas stores container and transport facts. Movement needs current collision, support, liquids and interaction geometry; recorded sources may be in unloaded chunks.

Navigation waits for or advances observations within the request's bounds and rechecks reached terrain. Incomplete observations retain unknown-terrain evidence. Stock records, search results and current collision each affect source usability.

## Budget ownership

Search sessions, local navigation, travel and maintenance each retain their own limits. Units, defaults, parent deadlines and exhaustion behavior are described in [Budgets](./budgets).

## Recovery ownership

| Condition | Owner | Typical handling |
| --- | --- | --- |
| Blocked edge or displacement | `LocalNavigationFlow` | Observe position and replan within remaining budgets |
| Takeoff or landing failure | Flight and area approach | Bounded recovery, eligible alternatives or failure |
| Blocked portal entrance | `PortalJourneyFlow` | Reject entry or leg and try allowed alternatives |
| Unexpected dimension | `TravelToFlow` | Replan from observed dimension, at most three times |
| Missing rockets | Travel-owned resource policy | Replenish or wait for resources |
| Source still inaccessible | Collection business operation | Record coordinates, seek alternatives or report shortages |

Unreachability means failure under the selected policy and budget. The business owner can use another source or request assistance according to its result contract.

## Safety and world mutation

Navigation checks body collision, footing and permitted transport. Ordinary travel uses existing geometry. Excavation, bridging and isolation require construction operations with explicit mutation boundaries.

Policies such as `netherRoofOnly` exclude some legs. Liquids, drops and climbing also depend on implemented capabilities and search policy. See [local navigation](./local#search-policy) and [configuration](../reference/config).

## Diagnostic evidence

Inspect execution state, actual dimension, feet, arrival condition, budgets and failed coordinates, then cross-check terrain, collision and container contents.

Trace records calls and observations; logs and the physical world provide corroboration. See [recovery](../guide/recovery) for checkpoint handling and status queries.
