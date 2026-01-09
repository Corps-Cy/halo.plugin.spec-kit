# Halo Plugin Spec Kit (HPS)

A powerful AI-driven CLI toolkit for developing **Halo 2.x Plugins**. 
It turns your vague ideas into professional, high-quality plugin code using **Agentic Workflow** and **Product Thinking**.

![HPS Logo](https://img.shields.io/badge/HPS-v1.0.0-cyan) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Core Features

*   **🤖 AI Architect Mode**: Not just a coder. HPS acts as a Senior Product Manager to help you draft comprehensive Feature Specs (`hps new`).
*   **🧠 Smart Context**: Automatically injects only the relevant Halo technical documentation into your prompts, saving 90% of tokens (`hps code`).
*   **🌍 Robust i18n**: Full support for English and Chinese workflows.
*   **🚀 Seamless Launch**: One command to initialize a project and launch your AI environment (`hps init`).

## 📦 Installation

### Option 1: Install from NPM (Recommended)
```bash
npm install -g halo-plugin-spec-kit
```

### Option 2: Install from Source
```bash
git clone https://github.com/<your-username>/halo.plugin.spec-kit.git
cd halo.plugin.spec-kit
npm link
```

## 🚀 Quick Start

### 1. Initialize a Project
```bash
hps init my-plugin
cd my-plugin
```
*Follow the wizard to select your language (zh/en) and AI tool (Cursor/Gemini).*

### 2. Design a Feature (Product Mode)
Tell the AI (or run manually):
```bash
hps new daily-checkin
```
*The AI will read the generated Spec template and help you fill in the details (UX, Data Models, Permissions).*

### 3. Generate Code (Dev Mode)
Once the Spec is ready:
```bash
hps code daily-checkin
```
*The AI will read the context and generate the implementation code.*

## 🛠 Commands

*   `hps init [name]`: Initialize a new project and AI context.
*   `hps new <feature>`: Draft a new feature specification.
*   `hps code <feature>`: Generate coding prompts based on specs.
*   `hps start`: Launch the AI environment (Cursor/Gemini).

## 📄 License

MIT
