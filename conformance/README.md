# Conformance Specification

The v0.1 conformance work is a written specification, not a test runner.

It defines what a compatible memory system should be able to demonstrate:

- cross-tool handoff preserves completed work, open blockers, and constraints
- repeated feedback becomes scoped memory only after enough evidence
- hard constraints are retrieved before relevant generation or action
- human onboarding packages separate facts, decisions, assumptions, blockers, and next steps
- model migration preserves project memory semantics across compatible clients
- namespace isolation prevents cross-tenant, cross-customer, and unrelated project leakage
- audit records can explain why a memory item was included or excluded

Future versions may include executable test tooling, but v0.1 only publishes the behavioral standard.
