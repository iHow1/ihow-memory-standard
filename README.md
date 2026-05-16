# iHow Memory

Persistent memory and handoff reliability for multi-agent AI work.

iHow Memory v0.1 is an open-standard draft, not an implementation release. The goal is to define how AI agents, tools, and human operators can share durable, scoped, auditable project memory across sessions, models, and handoffs.

## What Is Published in v0.1

- `whitepaper/whitepaper-public-v0.1.md` — public whitepaper
- `spec/protocol-draft-v0.1.md` — protocol semantics for events, context, writeback, and audit
- `scenarios/reliability-scenarios-v0.1.md` — five reliability scenarios and acceptance criteria
- `conformance/README.md` — conformance specification direction
- `docs/release-scope-v0.1.md` — public scope and non-goals
- `docs/security-boundary.md` — security and namespace boundary notes

## What Is Not Published in v0.1

This repository intentionally does not include:

- tool integration code
- SDKs
- runtime services
- hosted service code
- deployment recipes
- private operations
- customer-specific materials
- generated benchmark data

The v0.1 release is deliberately narrow: it publishes the language of the standard before publishing any implementation.

## Reliability Scenarios

The v0.1 scenario set defines five acceptance-style tests:

1. Cross-Tool Handoff / 跨工具接力
2. Feedback Pattern Capture / 反馈规律沉淀
3. Constraint Preservation / 禁忌约束执行
4. Human Team Handoff / 新人接手
5. Model Migration / 跨模型迁移

Each scenario includes Given, When, Then, failure modes, and acceptance criteria.

## Protocol Draft

The protocol draft defines four core interfaces:

- `events` — workflow event ingestion
- `context` — bounded context package retrieval
- `writeback` — proposed durable memory and review
- `audit` — traceability and lifecycle control

It also describes isolation boundaries for tenant, customer, project, and user scopes.

## License

- Specification and scenario materials are licensed under CC BY 4.0. See `LICENSE-SPEC`.
- Whitepaper and documentation materials are licensed under CC BY 4.0. See `LICENSE-DOCS`.
- The iHow Memory name and marks are not licensed for unrestricted brand use. See `TRADEMARK`.

Future code releases, if any, may use a separate software license. No software license is granted by this v0.1 repository.

## Status

v0.1 draft for review.
