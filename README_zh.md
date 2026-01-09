# Halo Plugin Spec Kit (HPS)

> **Halo 2.x 插件开发的 AI 原生基础设施**

[![NPM Version](https://img.shields.io/npm/v/@cysupper/halo-plugin-spec-kit?color=cyan)](https://www.npmjs.com/package/@cysupper/halo-plugin-spec-kit)
![License](https://img.shields.io/badge/License-MIT-green)

[English Documentation](README.md) | [🐞 提交反馈](https://github.com/Corps-Cy/halo.plugin.spec-kit/issues)

HPS 不仅仅是一个 CLI 脚手架，它是驻扎在你终端里的 **"AI 产品架构师"**。它能帮你把模糊的想法（例如“我想做一个签到功能”）转化为高质量、符合 Halo 官方规范（响应式、扩展机制、安全）的生产级代码。

---

## 🌟 核心价值

*   **产品思维 (Product Thinking)**: AI 会主动帮你分析需求、设计数据模型 (GVK)、规划用户体验 (UX) 和权限控制 (RBAC)，而不仅仅是机械地写代码。
*   **Token 节省 (Smart Context)**: 独创的 **智能上下文** 技术。当你开发“上传”功能时，它只会提取“附件存储”相关的 Halo 文档，节省 90% Token，防止 AI 产生幻觉。
*   **Halo 原生**: 强制遵循官方最佳实践（Project Reactor, Reconciler 模式）。

---

## 🧩 功能矩阵

| 功能特性 | 状态 | 说明 |
| :--- | :---: | :--- |
| **Agentic Workflow** | ✅ | Init -> 自动 Spec -> 自动 Code 闭环。 |
| **智能上下文** | ✅ | 基于关键词按需注入技术文档。 |
| **无缝启动** | ✅ | 初始化后自动唤起 AI 环境。 |
| **跨平台支持** | ✅ | 支持 macOS, Windows, Linux。 |

### 🤖 AI 模型支持
| AI 工具 | 状态 | 集成等级 |
| :--- | :---: | :--- |
| **Cursor IDE** | ✅ | **L4 (最佳)**: 全自动执行命令，体验丝滑。 |
| **Gemini CLI** | ✅ | **L4 (最佳)**: 管道式上下文注入，极客首选。 |
| **GitHub Copilot** | ✅ | L2: 通过 `.github` 文件注入 Prompt。 |
| **Ollama** | ✅ | L2: 本地大模型支持 (Modelfile)。 |
| *Claude Code* | 🚧 | *计划中* |
| *DeepSeek API* | 🚧 | *计划中* |

### 🌍 多语言支持
| 语言 | 状态 | 说明 |
| :--- | :---: | :--- |
| **English** | ✅ | 默认支持。 |
| **中文 (Chinese)** | ✅ | 原生支持中文提示词、UI 和文档生成。 |
| *日语* | 🚧 | *计划中* |
| *韩语* | 🚧 | *计划中* |

---

## 📦 安装指南

```bash
# 通过 NPM 全局安装
npm install -g @cysupper/halo-plugin-spec-kit
```

## 🚀 快速开始 (对话式开发)

**你不需要记忆复杂的命令，只需要和 AI 聊天。**

### 1. 初始化项目
```bash
hps init my-awesome-plugin
```
*跟随向导选择 "中文" 和你使用的 AI 工具 (Cursor 或 Gemini)。初始化完成后，它会自动为你打开 AI 环境。*

### 2. "我想做一个功能..."
在 AI 聊天框中（Cursor Chat 或 Gemini CLI），直接输入：
> **“我想做一个‘每日签到’功能。”**

### 3. AI 架构师 (Draft)
AI 会自动运行 `hps new`，并为你**起草一份专业的产品规格书**，包含：
*   **GVK 模型**: `CheckInRecord`
*   **扩展点**: `Console Dashboard` (仪表盘), `Theme Injection` (主题注入)
*   **UX 流程**: 按钮交互与反馈

### 4. AI 工程师 (Code)
当你确认方案后，AI 会自动运行 `hps code`。它会**智能读取**相关的 Halo 技术文档（例如：*如何写 Reconciler*、*如何使用 UI 组件库*），并生成可运行的代码。

---

## 🛠 命令参考

| 命令 | 描述 |
| :--- | :--- |
| `hps init [name]` | 初始化项目，配置 AI，并启动环境。 |
| `hps start` | 手动启动 AI 开发环境 (如果你关闭了窗口)。 |
| `hps new <feat>` | (AI 专用) 起草功能规格书。 |
| `hps code <feat>` | (AI 专用) 生成带智能上下文的开发指令。 |

## 🤝 贡献代码

欢迎提交 PR！

## 📄 许可证

MIT © [Corps-Cy](https://github.com/Corps-Cy)