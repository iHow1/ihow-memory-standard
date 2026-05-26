# iHow Memory

**Per-layer conformance for agent memory: open spec, scenario suite, and public evidence.**

iHow Memory is for testing whether agent memory survives handoff — across tools, sessions, and people. We focus on the retrieval layer because conformance needs deterministic, reproducible metrics.

[![Conformance](https://img.shields.io/badge/LongMemEval_S-retrieval_recall_all@10%3D1.0-brightgreen)](./conformance/evidence/longmemeval-s-2026-05-11.md)
[![Spec](https://img.shields.io/badge/spec-v0.1-blue)](./spec/protocol-draft-v0.1.md)
[![License](https://img.shields.io/badge/spec-CC--BY-orange)](./LICENSE-SPEC)

---

## What it is

Three things, one repo:

1. **Open spec** (`spec/`) — Protocol terms, interfaces, event-context-writeback-audit schema
2. **Scenario suite** (`scenarios/`) — Five reliability scenarios covering cross-tool handoff, feedback capture, constraint preservation, human team handoff, and model migration
3. **Conformance evidence** (`conformance/`) — Public benchmark runs, including retrieval-stage LongMemEval_S 470/470

## Why per-layer conformance

Most memory benchmarks today report end-to-end LLM-judged answer accuracy: retrieve evidence, generate an answer, judge it. That conflates two distinct failure modes:

- Memory retrieved the wrong evidence (retrieval failure)
- Memory retrieved the right evidence but the generator wrote a wrong answer (generation failure)

These have different fix paths. We report retrieval and generation separately.

**Retrieval is the layer this repo's evidence speaks to today.** Generation-stage scenarios are part of v0.2 roadmap.

## Latest evidence

| Scenario | Metric | Result |
|---|---|---|
| LongMemEval_S retrieval (470 effective samples) | `recall_all@10` | **1.0** |
| LongMemEval_S retrieval | `recall_any@10` | **1.0** |
| LongMemEval_S retrieval | `ndcg_any@10` | **0.946** |
| Reference implementation self-conformance | 5 spec scenarios v0.1 | **5/5 PASS** |

[Reproducible evidence manifest](./conformance/evidence/longmemeval-s-2026-05-11.md)

<sub>**Note on vendor comparisons.** Other memory projects publish end-to-end LLM-judged answer accuracy on the same LongMemEval_S split — Mem0 token-efficient algorithm 93.4% ([source](https://mem0.ai/blog/mem0-the-token-efficient-memory-algorithm)), Mastra observational memory 94.87% ([source](https://mastra.ai/research/observational-memory)), OMEGA 95.4% ([source](https://omegamax.co/benchmarks)). Those measure a different layer than the retrieval recall reported here and are not directly comparable to our numbers. We argue memory systems should report per-layer; this evidence file is the retrieval-layer disclosure.</sub>

## Spec is here, reference implementation is in [ihow-memory-core](https://github.com/iHow1/ihow-memory-core)

This repo holds: spec, scenarios, conformance evidence, whitepaper.
Reference implementation (Apache-2.0): see [ihow-memory-core](https://github.com/iHow1/ihow-memory-core).

## Run conformance against your memory system

If you maintain a memory system (Mem0, Letta, Zep, MemGPT, Cognee, Graphiti, or your own), we'd love you to run a runner against our conformance suite. We score `PARTIAL` and `NOT_APPLICABLE` friendly — not pass-or-fail.

See `conformance/runners/README.md`.

## Roadmap

- **v0.1** — Live. Five scenarios + protocol draft + retrieval-stage LongMemEval_S evidence.
- **v0.2** — Scoped. Generation-stage scenarios, calibration memory, multi-runner conformance.
- **External runners** — Currently `PARTIAL` for OpenViking / GBrain / M-Flow. PRs welcome.

## Community

- 🌐 Site: [ihowmemory.com](https://ihowmemory.com)
- 📕 Whitepaper: [EN](./whitepaper/whitepaper-public-v0.1.en.md) · [中文](./whitepaper/whitepaper-public-v0.1.zh-CN.md)
- 💬 Discussions: [GitHub Discussions](../../discussions)
- 📧 Contact: repo issues / discussions

---

*Built by a small team focused on multi-agent reliability. Open by default. Conformance over claims.*
