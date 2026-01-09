# Halo Plugin Spec Kit (HPS)

A powerful AI-driven CLI toolkit for developing **Halo 2.x Plugins**. 
It turns your vague ideas into professional, high-quality plugin code using **Agentic Workflow** and **Product Thinking**.

![HPS Logo](https://img.shields.io/badge/HPS-v1.0.0-cyan) ![License](https://img.shields.io/badge/License-MIT-green)

[中文文档](README_zh.md)

## ✨ Core Features

*   **🤖 AI Architect Mode**: HPS acts as a **Senior Product Manager**. It doesn't just write code; it helps you brainstorm, analyze UX, and draft professional Feature Specs.
*   **🧠 Smart Context**: Automatically identifies your needs and injects **only the relevant** Halo technical documentation, saving 90% of tokens.
*   **🌍 Robust i18n**: Native support for **English and Chinese**. The AI adapts its thinking language based on your preference.
*   **🚀 Seamless Workflow**: One command to initialize -> launch AI -> start coding.

## 📦 Installation

```bash
npm install -g halo-plugin-spec-kit
```

## 🚀 Quick Start (Chat-Driven Development)

**You don't need to remember complex commands. Just chat with the AI.**

### 1. Initialize & Launch
```bash
hps init my-awesome-plugin
# Follow the wizard to select 'zh/en' and your AI tool (Cursor/Gemini).
# It will automatically launch the AI environment for you.
```

### 2. "I want a feature..."
In your AI Chat (Cursor/Gemini), just say:
> **"I want to build a Daily Check-in feature."**

### 3. AI Takes Over
The AI will automatically:
1.  Run `hps new daily-checkin`.
2.  **Draft a professional Product Spec** for you (Data Models, UX Flow, Permissions).
3.  Ask for your review.

### 4. "Go ahead."
Once you approve, the AI will:
1.  Run `hps code daily-checkin`.
2.  **Smartly load Halo docs** (e.g., *Reconciler Guide*, *UI Components*).
3.  Generate production-ready Java & Vue code.

## 🛠 Manual Commands

If you prefer manual control:

*   `hps init [name]`: Create project & setup AI context.
*   `hps start`: Launch AI environment (if you closed it).
*   `hps new <feature>`: AI drafts a Spec.
*   `hps code <feature>`: AI generates Code.

## 📄 License

MIT