# Experimental Conformance Runners

This directory contains draft runner scorecards for external memory runtimes.

These runners are not a v0.1 certification suite and do not claim that any
external project conforms to iHow Memory. They use synthetic fixtures only and
emit four-level results:

- `PASS`: the checked behavior fully satisfies the scenario fixture.
- `PARTIAL`: some behavior is present, with explicit gaps.
- `NOT_APPLICABLE`: the runtime does not expose the capability required by the scenario.
- `BLOCKED`: the runner cannot evaluate because the environment or fixture is missing.

## Safety Rules

- Do not use real private memory, customer data, workspace logs, tokens, keys, or credentials.
- Do not copy these runner names, fixtures, or iHow Memory wording into external upstream PRs.
- Keep OpenClaw as an experimental external runner until PR #84636 is merged and pinned.

## Run

```bash
npm run test:conformance
```

Expected current result: all runner commands complete, with external runtimes reporting `PARTIAL` or `NOT_APPLICABLE` where capabilities are intentionally absent.
