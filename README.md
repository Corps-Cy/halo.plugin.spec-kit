# Halo Plugin Spec Kit (HPS)

> **The AI-Native Infrastructure for Halo 2.x Plugin Development**

[![NPM Version](https://img.shields.io/npm/v/@cysupper/halo-plugin-spec-kit?color=cyan)](https://www.npmjs.com/package/@cysupper/halo-plugin-spec-kit)
![License](https://img.shields.io/badge/License-MIT-green)
![Node](https://img.shields.io/badge/Node-%3E%3D14-blue)

[🇨🇳 中文文档](README_zh.md) | [🐞 Report Issue](https://github.com/Corps-Cy/halo.plugin.spec-kit/issues)

HPS is not just a CLI; it is an **AI Product Architect** that lives in your terminal. It bridges the gap between your vague ideas ("I want a check-in feature") and production-ready Halo plugin code (Reactive, Extension-based, Secure).

---

## 🌟 Why HPS?

*   **Product Thinking**: The AI helps you draft professional specs (UX, Data Models, Permissions) before writing a single line of code.
*   **Token Efficiency**: **Smart Context** technology injects ONLY relevant Halo docs (e.g., "Attachment Storage" when you ask for "Upload"), saving 90% of tokens.
*   **Halo Native**: Enforces official best practices (Project Reactor, Reconciler Pattern).

---

## 🧩 Feature Matrix

| Feature | Status | Description |
| :--- | :---: | :--- |
| **Agentic Workflow** | ✅ | Init -> Auto-Spec -> Auto-Code loop. |
| **Smart Context** | ✅ | Dynamic knowledge injection based on intent keywords. |
| **Seamless Launch** | ✅ | Auto-launch AI environment after init. |
| **Cross-Platform** | ✅ | macOS, Windows, Linux supported. |

### 🤖 AI Support
| AI Tool | Status | Integration Level |
| :--- | :---: | :--- |
| **Cursor IDE** | ✅ | **L4 (Best)**: Full auto-execution of commands. |
| **Gemini CLI** | ✅ | **L4 (Best)**: Pipe-based context injection. |
| **GitHub Copilot** | ✅ | L2: Prompt injection via `.github/instructions`. |
| **Ollama** | ✅ | L2: Local LLM support via `Modelfile`. |
| *Claude Code* | 🚧 | *Coming Soon* |
| *DeepSeek API* | 🚧 | *Coming Soon* |

### 🌍 Language Support
| Language | Status | Note |
| :--- | :---: | :--- |
| **English** | ✅ | Default. |
| **Chinese (中文)** | ✅ | Native support for prompts & UI. |
| *Japanese* | 🚧 | *Planned* |
| *Korean* | 🚧 | *Planned* |

---

## 📦 Installation

```bash
# Install globally via NPM
npm install -g @cysupper/halo-plugin-spec-kit
```

## 🚀 Usage Guide

### 1. Initialize Project
```bash
hps init my-awesome-plugin
```
*Follow the wizard to select your language (zh/en) and AI tool. HPS will automatically launch the environment for you.*

### 2. "I want a feature..."
In your AI Chat (Cursor/Gemini), just say:
> **"I want to build a Daily Check-in feature."**

### 3. AI Architect Mode (Draft)
The AI will automatically run `hps new` and **draft a professional Product Spec** for you, covering:
*   **GVK Models**: `CheckInRecord`
*   **Extension Points**: `Console Dashboard`, `Theme Injection`
*   **UX Flow**: Button interaction & Feedback

### 4. AI Developer Mode (Code)
Once you approve the spec, the AI runs `hps code`. It smartly reads **only the relevant Halo technical docs** (e.g., *How to write a Reconciler*, *How to use UI Components*) and generates the code.

---

## 🛠 Command Reference

| Command | Description |
| :--- | :--- |
| `hps init [name]` | Initialize project, configure AI, and launch environment. |
| `hps start` | Manually launch the AI environment (if you closed it). |
| `hps new <feat>` | (Agent Use) Draft a feature specification. |
| `hps code <feat>` | (Agent Use) Generate coding prompts with smart context. |

## 🤝 Contributing

We welcome contributions! Please fork the repository and submit a Pull Request.

## 📄 License

MIT © [Corps-Cy](https://github.com/Corps-Cy)
