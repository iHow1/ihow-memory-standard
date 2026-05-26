# 一致性测试 / Conformance

本目录保存 iHow Memory 的公开 conformance 材料：

- [`evidence/`](./evidence/) — 公开 benchmark evidence manifest，包括 LongMemEval_S retrieval-stage 结果。
- [`runners/`](./runners/) — v0.2 设计用的实验性合成 runner scorecard。
- [`spec/`](./spec/) — conformance 语义草案与 v0.1 → v0.2 delta。

## 当前 evidence

| Evidence | Layer | Result |
|---|---|---|
| [`longmemeval-s-2026-05-11.md`](./evidence/longmemeval-s-2026-05-11.md) | Retrieval-stage session-id matching | 470 个 LongMemEval_S 有效样本上 `recall_all@10 = 1.0` |

LongMemEval_S evidence 不是端到端答案准确率，也不是 vendor leaderboard。它记录的是 retrieval 层是否能把所有 ground-truth evidence sessions 放进 top-K 窗口。

## Runner 状态

[`runners/`](./runners/) 下的 runner 是实验性的，只使用 synthetic fixtures，不代表外部项目的正式认证。它们输出四级结果（`PASS`、`PARTIAL`、`NOT_APPLICABLE`、`BLOCKED`），用于推进 v0.2 conformance 语义设计。
