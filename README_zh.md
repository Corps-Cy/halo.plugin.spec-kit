# Halo Plugin Spec Kit (HPS)

> **Halo 2.x 插件开发的 AI 原生基础设施**

[![NPM Version](https://img.shields.io/npm/v/@cysupper/halo-plugin-spec-kit?color=cyan)](https://www.npmjs.com/package/@cysupper/halo-plugin-spec-kit)
![License](https://img.shields.io/badge/License-MIT-green)

[English Documentation](README.md) | [🐞 提交反馈](https://github.com/Corps-Cy/halo.plugin.spec-kit/issues)

HPS 是一个驻扎在终端里的 **"AI 产品架构师"**。它能帮你把模糊的想法转化为高质量、符合官方规范的插件代码。

---

## 📦 安装指南

我们提供三种安装方式，**强烈推荐使用方式 1**。

### 方式 1：通过 NPM 安装 (推荐 ⭐)
这是最标准、最易于更新的方式。
```bash
npm install -g @cysupper/halo-plugin-spec-kit
```

### 方式 2：直接从 GitHub 安装
无需手动克隆，直接指向 GitHub 仓库。
```bash
npm install -g github:Corps-Cy/halo.plugin.spec-kit
```

### 方式 3：从 Release 手动安装 (源码安装)
1. 从 [GitHub Releases](https://github.com/Corps-Cy/halo.plugin.spec-kit/releases) 下载最新的 `.zip` 或 `.tar.gz` 压缩包。
2. 解压文件。
3. 进入目录并执行：
```bash
npm install -g .
```

---

## 🚀 快速开始 (对话式开发)

### 1. 初始化项目
```bash
hps init my-awesome-plugin
```
*跟随向导选择“中文”和 AI 工具。完成后会自动为你打开 AI 环境。*

### 2. “我想做一个功能...”
在 AI 聊天框（Cursor 或 Gemini）中直接输入：
> **“我想做一个‘文章打赏’功能。”**

### 3. AI 架构师模式 (起草)
AI 会自动运行 `hps new`，并为你**起草一份专业的产品规格书**。

### 4. AI 工程师模式 (编码)
确认方案后，AI 会自动运行 `hps code`，**智能读取** Halo 文档并生成代码。

---

## 🛠 手动命令参考

*   `hps init [项目名]`: 初始化项目并配置 AI 上下文。
*   `hps start`: 手动启动 AI 开发环境 (支持 Win/Mac/Linux)。
*   `hps new <功能名>`: (AI 专用) 起草功能规格书。
*   `hps code <功能名>`: (AI 专用) 生成带智能上下文的开发指令。

## 📄 许可证

MIT © [Corps-Cy](https://github.com/Corps-Cy)
