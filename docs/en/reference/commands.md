# Diagnostic commands

These commands use fixed command-tree parameters and require permission level 2.

```text
/lattiviumperf start <phase>
/lattiviumperf report
/lattiviumperf stop
/lattiviumperf watchcount <x> <y> <z>
/lattiviumatlas status
```

`start` opens a server tick measurement window; `report` reads it and `stop` ends it. `phase` is one word, at most 80 characters. `watchcount` observes changes in a loaded container, recording up to 256 changes in JFR; it uses vanilla block-position syntax. Atlas status reports scanning and database queues.
