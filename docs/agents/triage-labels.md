# Triage Labels

The skills speak in terms of five canonical triage roles. This file maps those roles to the actual label strings used in this repo's issue tracker.

| Label in mattpocock/skills | Label in our tracker | Meaning                                  |
| -------------------------- | -------------------- | ---------------------------------------- |
| `needs-triage`             | *(none)*             | Maintainer needs to evaluate this issue — no dedicated label, treat unlabelled open issues as needing triage |
| `needs-info`               | `need-info`          | Waiting on reporter for more information |
| `ready-for-agent`          | `ready-to-dev`       | Fully specified, ready for an AFK agent  |
| `ready-for-human`          | `ready-for-review`   | Requires human implementation or review  |
| `wontfix`                  | `wontfix`            | Will not be actioned                     |

When a skill mentions a role (e.g. "apply the AFK-ready triage label"), use the corresponding label string from the right-hand column.

## Category labels

These labels classify the nature of the work (not the triage state). Apply them in addition to the triage labels above.

| Label     | Meaning                                      |
| --------- | -------------------------------------------- |
| `feature` | New functionality or enhancement             |
| `bug`     | Something is broken or behaves unexpectedly  |
| `chore`   | Maintenance, refactoring, tooling, deps      |

