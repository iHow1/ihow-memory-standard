# Conformance

This directory contains the public conformance materials for iHow Memory:

- [`evidence/`](./evidence/) — public evidence manifests for benchmark runs, including the LongMemEval_S retrieval-stage result.
- [`runners/`](./runners/) — experimental synthetic runner scorecards for v0.2 design work.
- [`spec/`](./spec/) — draft conformance semantics and v0.1 → v0.2 delta notes.

## Current evidence

| Evidence | Layer | Result |
|---|---|---|
| [`longmemeval-s-2026-05-11.md`](./evidence/longmemeval-s-2026-05-11.md) | Retrieval-stage session-id matching | `recall_all@10 = 1.0` on 470 effective LongMemEval_S samples |

The LongMemEval_S evidence is not an end-to-end answer-accuracy score and is not a vendor leaderboard. It records whether the retrieval layer returns all required ground-truth evidence sessions in the top-K window.

## Runner status

The runners under [`runners/`](./runners/) are experimental and use synthetic fixtures only. They do not claim official certification for external projects. They emit four-level results (`PASS`, `PARTIAL`, `NOT_APPLICABLE`, `BLOCKED`) to help shape the v0.2 conformance semantics.
