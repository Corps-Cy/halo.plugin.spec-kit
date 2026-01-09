# Halo Plugin Spec Kit (HPS)

HPS 是一个专为 **Halo 2.x 插件开发** 打造的 AI 原生 CLI 工具链。
它不仅仅是一个脚手架，更是一个 **"AI 产品架构师"**，能够将你模糊的想法转化为高质量、符合官方规范的插件代码。

![HPS Logo](https://img.shields.io/badge/HPS-v1.0.0-cyan) ![License](https://img.shields.io/badge/License-MIT-green)

[English Documentation](README.md)

## ✨ 核心特性

*   **🤖 AI 架构师模式**: HPS 充当资深产品经理的角色。它会主动帮你分析需求、设计数据模型、规划 UX 流程，而不仅仅是机械地写代码。
*   **🧠 智能上下文 (Smart Context)**: 独创的按需加载机制。当你开发“上传”功能时，它只会提取“附件存储”相关的 Halo 文档，节省 90% Token，防止 AI 产生幻觉。
*   **🌍 强健的中文支持**: 完美支持中文工作流。AI 会用中文思考、用中文回复，生成的文档也是中文的。
*   **🚀 无缝启动**: `hps init` -> 自动配置 -> 自动唤起 Cursor/Gemini，一气呵成。

## 📦 安装

```bash
npm install -g halo-plugin-spec-kit
```

## 🚀 快速开始 (对话式开发)

**你不需要记忆复杂的命令，只需要和 AI 聊天。**

### 1. 初始化与启动
```bash
hps init my-awesome-plugin
# 跟随向导选择 "中文" 和你使用的 AI 工具 (Cursor 或 Gemini)。
# 初始化完成后，它会自动为你打开 AI 环境。
```

### 2. "我想做一个功能..."
在 AI 聊天框中（Cursor Chat 或 Gemini CLI），直接输入：
> **“我想做一个‘每日签到’功能。”**

### 3. AI 接管工作
AI 会自动执行以下操作：
1.  后台运行 `hps new daily-checkin`。
2.  **为你起草一份专业的产品规格书**（包含 GVK 模型定义、前端组件选择、权限控制）。
3.  把写好的方案展示给你看，请求确认。

### 4. "开始做吧"
当你确认方案后，AI 会：
1.  后台运行 `hps code daily-checkin`。
2.  **智能读取 Halo 技术文档**（例如：*Reconciler 写法*、*UI 组件库指南*）。
3.  生成可直接运行的 Java 和 Vue 代码。

## 🛠 手动命令参考

如果你喜欢手动控制：

*   `hps init [项目名]`: 初始化项目并配置 AI 上下文。
*   `hps start`: 启动 AI 开发环境 (支持 Windows/Mac/Linux)。
*   `hps new <功能名>`: 让 AI 起草功能规格书。
*   `hps code <功能名>`: 让 AI 生成代码指令。

## 📄 许可证

MIT
