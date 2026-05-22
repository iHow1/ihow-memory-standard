# 治理说明

iHow Memory Standard 由 `iHow1/ihow-memory-standard` 仓库的维护者和 steward 维护。当前阶段，`iHow1` 下的仓库 owner 是活跃维护者组。

本文说明谁来做决定。`CONTRIBUTING.zh-CN.md` 说明如何参与贡献。

## 维护者与 Steward

维护者和 steward 负责：

- 审阅 RFC 和 pull request；
- 保持已发布范围和安全边界；
- 决定 v0.x 到 v0.y 的版本升级；
- 批准实验性 runner 升级为 official runner classification；
- 在 runner 内容过时、误导或不安全时降级或移除。

维护者角色可随项目发展扩展。维护者状态变化应记录在公开 issue、pull request 或 governance 更新中。

## RFC 流程

以下实质变更应通过带 `spec-rfc` label 的 GitHub issue 提出：

- 协议语义；
- 可靠性场景；
- conformance runner 分类；
- fixture 策略；
- 命名空间、安全或审计规则。

拼写、措辞和文档澄清类小改动不需要 RFC，除非维护者要求。

## 版本升级

标准从 v0.x 升级到 v0.y 需要：

- 维护者共识；
- 至少 7 个自然日的公开 RFC 讨论期；
- 已接受变更和延期问题的书面总结；
- 没有维护者指出的未解决安全、隐私或第三方背书风险。

安全或隐私边界的紧急修正可以更快合入，但事后应公开记录原因。

## 实验性 Runner 升级

实验性 external runner 只有在以下条件全部满足时，才能升级为 official classification：

- 第三方 runtime 已合并 fixture 引用的行为或 artifact；
- fixture 的 pinned reference 已更新到 upstream default branch 上的 post-merge commit；
- 第三方 runtime 维护者明确知晓该 runner 存在，并且没有反对 official classification；或者该 runner 是本标准自己的 self-conformance runtime；
- `ihow-memory-standard` 维护者或 steward 以书面形式批准升级。

Official classification 只改变 runner 分类，不代表商业认证、背书或完整 protocol conformance。

## Veto、降级与移除

第三方 runtime 的维护者可以请求修正、降级或移除引用其 runtime 的 runner。当 runner 不准确、过时、误导、不安全，或可能暗示未经授权的背书时，本仓维护者应合理尊重这些请求。

本仓维护者也可以在以下情况降级或移除 runner：

- upstream 行为已偏离 pinned fixture；
- 引用无法复现；
- fixture 不再满足 public-safety policy；
- runner 措辞暗示未获得的背书或认证。

## 与贡献指南的关系

`CONTRIBUTING.zh-CN.md` 说明适合贡献的内容类型和贡献许可。

`GOVERNANCE.md` / `GOVERNANCE.zh-CN.md` 说明谁来决策、RFC 如何审阅，以及 official runner 或版本升级如何决定。
