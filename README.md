# Halo Plugin Spec Kit (HPS)

> **The AI-Native Infrastructure for Halo 2.x Plugin Development**

[![NPM Version](https://img.shields.io/npm/v/@cysupper/halo-plugin-spec-kit?color=cyan)](https://www.npmjs.com/package/@cysupper/halo-plugin-spec-kit)
![License](https://img.shields.io/badge/License-MIT-green)
![Node](https://img.shields.io/badge/Node-%3E%3D14-blue)

[🇨🇳 中文文档](README_zh.md) | [🐞 Report Issue](https://github.com/Corps-Cy/halo.plugin.spec-kit/issues)

HPS is an **AI Product Architect** toolkit that turns your vague ideas into production-ready Halo 2.x plugins using **Agentic Workflow** and **Smart Context**.

---

## 📦 Installation

We provide three ways to install HPS. **Option 1 is highly recommended.**

### Option 1: Via NPM (Recommended ⭐)
The easiest way to stay updated.
```bash
npm install -g @cysupper/halo-plugin-spec-kit
```

### Option 2: Direct from GitHub
Install directly using the GitHub URL (no clone needed).
```bash
npm install -g github:Corps-Cy/halo.plugin.spec-kit
```

### Option 3: Manual from Release (Offline/Dev)
1. Download the latest `.zip` or `.tar.gz` from [GitHub Releases](https://github.com/Corps-Cy/halo.plugin.spec-kit/releases).
2. Extract the archive.
3. In the directory, run:
```bash
npm install -g .
```

---

## 🚀 Quick Start (Chat-Driven)

### 1. Initialize & Launch
```bash
hps init my-awesome-plugin
```
*Follow the wizard to setup 'zh/en' and your AI tool. HPS will auto-launch the AI for you.*

### 2. "I want a feature..."
In your AI Chat (Cursor/Gemini), just say:
> **"I want to build a Article Reward feature."**

### 3. AI Architect Mode (Draft)
The AI automatically runs `hps new` and **drafts a professional spec** (Models, UX flow).

### 4. AI Developer Mode (Code)
Once approved, the AI runs `hps code` to load **relevant Halo docs** and generate code.

---

## 🧩 Feature Matrix

| Feature | Status | AI Support | Level |
| :--- | :---: | :--- | :---: |
| Agentic Workflow | ✅ | **Cursor IDE** | L4 (Best) |
| Smart Context | ✅ | **Gemini CLI** | L4 (Best) |
| Seamless Launch | ✅ | GitHub Copilot | L2 |
| i18n (En/Zh) | ✅ | Ollama | L2 |

---

## 🛠 Command Reference

*   `hps init [name]`: Create project & setup AI context.
*   `hps start`: Launch AI environment manually.
*   `hps new <feat>`: (Agent) Draft a feature specification.
*   `hps code <feat>`: (Agent) Generate code with smart context.

## 📄 License

MIT © [Corps-Cy](https://github.com/Corps-Cy)