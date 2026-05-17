<div align="center">

# iHow Memory

### 面向 AI Agent 的持久、可审计、可交接记忆开放规范草案

[![License: CC BY 4.0](https://img.shields.io/badge/license-CC%20BY%204.0-blue.svg)](./LICENSE-SPEC)
[![Status: Draft v0.1](https://img.shields.io/badge/status-draft%20v0.1-yellow.svg)](./docs/release-scope-v0.1.zh-CN.md)
[![Spec: Draft](https://img.shields.io/badge/spec-draft%20v0.1-brightgreen.svg)](./spec/protocol-draft-v0.1.md)
[![Feedback: Welcome](https://img.shields.io/badge/feedback-welcome-purple.svg)](https://github.com/iHow1/ihow-memory-standard/issues)

[English](./README.md) · [白皮书](./whitepaper/whitepaper-public-v0.1.zh-CN.md) · [协议草案](./spec/protocol-draft-v0.1.md) · [可靠性场景](./scenarios/reliability-scenarios-v0.1.md) · [机制图](./docs/diagrams.zh-CN.md)

</div>

AI Agent 在单次对话里已经足够聪明，但真实工作往往跨会话、跨工具、跨模型、跨人接手。

iHow Memory 定义一套本地优先的记忆与交接可靠性层，让不同 agent、工具和人可以共享持久、可限定、可审计的项目上下文，而不是每次都依赖某个聊天窗口里的隐藏历史。

> v0.1 是开放规范草案，正在征求 RFC 式审阅，不是代码发布。本仓库只发布规格、场景、图解和文档，不包含实现代码。
>
> v0.1 first published by iHow1, 2026-05。

## 一张图看懂问题

```mermaid
flowchart LR
  U["人类操作者"] --> A["Agent A 开始工作"]
  A --> E["事件: 决策、文件、反馈、阻塞"]
  E --> W["写回: 候选长期记忆"]
  W --> R["审核: 通过、修订、拒绝"]
  R --> M["项目记忆: 有范围、可审计"]
  M --> C["上下文包: 给下一次任务"]
  C --> B["Agent B 继续工作，不再从零开始"]
  M --> AU["审计: 为什么用了这条记忆"]
```

## 为什么重要

多数 AI 工作流不是失败在模型能力，而是失败在交接边界：

| 失忆类型 | 真实后果 |
|---|---|
| 改稿失忆 | 同一个反馈要重复说很多次。 |
| 换工具失忆 | 从一个 AI 工具切到另一个工具，项目状态丢失。 |
| 接手失忆 | 新人或新 agent 必须翻完整历史，才能继续做事。 |
| 安全漂移 | 硬约束被当成普通建议，最后被忽略。 |

iHow Memory 把记忆看成共享的项目基础设施，而不是某个 agent 的私有功能。

## 谁适合关注？

- 正在用多个 AI 编程或写作工具做长期项目的团队。
- 需要超越聊天历史的 AI 产品与 agent 构建者。
- 依赖稳定交接的运营、客服、咨询和交付团队。
- 需要跨工具保留项目状态的研究、分析和内容团队。
- 需要本地优先、可审计 AI 工作流记忆的组织。

## 它和普通记忆有什么不同

- 本地优先：项目记忆默认留在操作者选择的环境里。
- 人可读：持久状态可以检查、修改、回滚。
- 模型无关：记忆语义不绑定某个 LLM 厂商。
- 多 agent 原生：交接是第一等可靠性目标。
- 可审计：记忆有来源、范围、审核状态和生命周期记录。
- 以一致性为核心：用行为验收标准衡量质量，而不是限定存储技术。

## 和其他方案的区别

| 方案 | 主要关注 | iHow Memory 的差异 |
|---|---|---|
| 聊天历史 | 单个产品会话内的回忆 | 定义跨会话、跨工具的持久项目记忆。 |
| 向量数据库 / RAG | 找相似文本 | 增加范围、审核状态、硬约束、写回和审计。 |
| Agent 记忆平台 | 个性化或应用内记忆 | 聚焦多 agent 接力可靠性和一致性标准。 |
| 手工项目文档 | 人维护的笔记 | 定义 agent 可记录、读取和审计记忆的协议语义。 |

## v0.1 发布内容

| 内容 | 文件 |
|---|---|
| 非技术读者概览 | [`docs/overview-for-non-technical-readers.zh-CN.md`](./docs/overview-for-non-technical-readers.zh-CN.md) |
| 机制图 | [`docs/diagrams.zh-CN.md`](./docs/diagrams.zh-CN.md) |
| 中文白皮书 | [`whitepaper/whitepaper-public-v0.1.zh-CN.md`](./whitepaper/whitepaper-public-v0.1.zh-CN.md) |
| 英文白皮书 | [`whitepaper/whitepaper-public-v0.1.en.md`](./whitepaper/whitepaper-public-v0.1.en.md) |
| 协议草案 | [`spec/protocol-draft-v0.1.md`](./spec/protocol-draft-v0.1.md) |
| 可靠性场景 | [`scenarios/reliability-scenarios-v0.1.md`](./scenarios/reliability-scenarios-v0.1.md) |
| 一致性测试方向 | [`conformance/README.zh-CN.md`](./conformance/README.zh-CN.md) |
| 发布范围 | [`docs/release-scope-v0.1.zh-CN.md`](./docs/release-scope-v0.1.zh-CN.md) |
| 安全边界 | [`docs/security-boundary.zh-CN.md`](./docs/security-boundary.zh-CN.md) |

## 五个可靠性场景

v0.1 定义了五个验收式场景：

1. Cross-Tool Handoff / 跨工具接力
2. Feedback Pattern Capture / 反馈规律沉淀
3. Constraint Preservation / 禁忌约束执行
4. Human Team Handoff / 新人接手
5. Model Migration / 跨模型迁移

每个场景都包含 Given、When、Then、失败模式和验收标准。

## 四个核心接口

协议草案定义四个核心接口：

- `events`：工作流事件写入
- `context`：最小上下文包读取
- `writeback`：候选长期记忆写回与审核
- `audit`：记忆来源、使用和生命周期追溯

同时定义 tenant、customer、project、user 四层隔离边界。

## v0.1 不包含什么

本仓库刻意不包含：

- 工具接入代码
- SDK
- 运行时服务
- 托管服务代码
- 部署配方
- 私有运维流程
- 客户特定材料
- 生成型 benchmark 数据

第一版公开发布的重点是先定义可靠性语言，再决定何时公开实现细节。

## License

- 规格与场景材料使用 CC BY 4.0。见 [`LICENSE-SPEC`](./LICENSE-SPEC)。
- 白皮书与文档材料使用 CC BY 4.0。见 [`LICENSE-DOCS`](./LICENSE-DOCS)。
- iHow Memory 名称与标识不授予无限制品牌使用权。见 [`TRADEMARK.md`](./TRADEMARK.md)。

v0.1 不授予任何软件许可证；若未来发布代码，会通过单独的 LICENSE 文件公开。

## 参与方式

欢迎帮助我们一起完善这份规范草案：

- 发现术语不清、失败模式缺失或安全边界问题，可以开 issue。
- 可以建议新的可靠性场景。
- 可以审阅 conformance 方向，提出行为级验收标准。
- 可以反馈实现经验，但不要提交私有代码或客户材料。

## 状态

v0.1 draft for review。
