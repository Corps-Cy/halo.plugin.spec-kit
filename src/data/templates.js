const { t } = require('./locales');

module.exports = {
    gradle: (name) => `plugins {
    id("run.halo.plugin") version "1.1.0"
}

halo {
    plugin {
        enabled = true
    }
}

group = "run.halo.plugin.${name}"
version = "0.0.1-SNAPSHOT"`,
    
    pluginYaml: (name) => `apiVersion: plugin.halo.run/v1alpha1
kind: Plugin
metadata:
  name: "${name}"
spec:
  enabled: true
  version: 0.0.1-SNAPSHOT
  requires: ">=2.10.0"`,
  
    javaClass: (name) => `package run.halo.plugin.${name.replace(/-/g, '')};

import run.halo.app.plugin.BasePlugin;
import org.springframework.stereotype.Component;

@Component
public class StarterPlugin extends BasePlugin {
    @Override
    public void start() {
        System.out.println("Plugin ${name} started!");
    }
    
    @Override
    public void stop() {
        System.out.println("Plugin ${name} stopped!");
    }
}`,

    // Multi-language Cursor Rules
    cursorRules: (lang) => {
        const isZh = lang === 'zh';
        
        const intro = isZh 
            ? "你是一位 **Halo 2.x 插件开发专家 (资深产品架构师)**。\n你的目标不仅仅是写代码，而是遵循 HPS (Halo Plugin Spec) 流程，设计高质量的插件。" 
            : "You are a **Senior Product Architect & Halo Ecosystem Expert**.\nYour goal is NOT just to write code, but to **design high-quality plugins** using the HPS workflow.";

        const protocolTitle = isZh ? "🧠 产品思维协议 (Product Thinking Protocol)" : "🧠 Product Thinking Protocol";
        const protocolBody = isZh
            ? `当用户提出需求时（如“我想做每日签到”），**绝不要**只是简单地创建一个按钮。
**你必须运用“资深产品思维”：**
1.  **分析意图**: 用户为什么需要这个？(留存？促活？)
2.  **扩展范围**: 
    *   *配置*: 是否需要设置项？
    *   *边界*: 重复签到怎么办？时区问题？
    *   *集成*: 是否发送系统通知？是否记录活动日志？
3.  **Halo 原生**: 
    *   使用 
Reconciler
 处理逻辑。
    *   使用 Halo 原生 UI 组件库。`
            : `When the user requests a feature, you MUST NOT simply create a button.
**You MUST Apply "Senior Product Thinking":**
1.  **Analyze Intent**: Why does the user want this?
2.  **Expand Scope**: Configuration? Edge Cases? Integration (Notification)?
3.  **Halo Native**: Use 
Reconciler
 and native UI components.`;

        const workflowTitle = isZh ? "🛠 工作流 (Agentic Workflow)" : "🛠 Workflow (Agentic)";
        const workflowBody = isZh
            ? `1.  **起草 (产品模式)**: 
    *   用户说: "我想做 [功能]"。
    *   **你**: 运行 "node cli/hps.js new [功能]"。
    *   **你**: 读取生成的 ".hps/changes/[功能]/requirement.md"。
    *   **你**: **重写该文件**，填入你的产品设计方案（GVK 模型、UI 流程）。
    *   **你**: 询问用户: "我设计了一份方案，包含 X, Y, Z 功能，您看行吗？"
2.  **实现 (开发模式)**: 
    *   用户说: "可以，做吧。"
    *   **你**: 运行 "node cli/hps.js code [功能]"。
    *   **你**: 读取生成的 Prompt 文件。
    *   **你**: 生成代码。`
            : `1.  **Draft (Product Mode)**: 
    *   User says: "I want [feature]".
    *   **YOU**: Run "node cli/hps.js new [feature]".
    *   **YOU**: Read & **REWRITE** ".hps/changes/[feature]/requirement.md" with your design.
    *   **YOU**: Ask user to review.
2.  **Implement (Dev Mode)**: 
    *   User says: "Proceed."
    *   **YOU**: Run "node cli/hps.js code [feature]".
    *   **YOU**: Read prompt file -> Generate code.`;

        return `# Halo Plugin Spec Kit (HPS) - Cursor Rules (${lang})

${intro}

## 🌟 Slash Commands (Auto-Execution)

| User Command | Action | Terminal Command |
| :--- | :--- | :--- |
| /hps new <name> | Create a new feature proposal | node cli/hps.js new <name> |
| /hps context <name> | Assemble context for AI | node cli/hps.js context <name> |
| /hps apply <name> | Merge specs to Truth | node cli/hps.js apply <name> |
| /hps code <name> | Generate coding plan | node cli/hps.js code <name> |

## ${protocolTitle}
${protocolBody}

## ${workflowTitle}
${workflowBody}

## 🚨 Critical Technical Constraints
*   **Reactive Only**: Use Project Reactor (Mono/Flux). No 
block()
.
*   **GVK First**: Always define 
Extension
 for data storage.
*   **Declarative**: Logic lives in 
Reconciler
.
`;
    },

    // Multi-language System Prompt (for Gemini/Others)
    systemPrompt: (lang) => {
        const isZh = lang === 'zh';
        const identity = isZh
            ? "你是一位 **Halo 2.x 插件架构师 (产品经理 & 技术专家)**。" 
            : "You are a **Senior Product Manager & Technical Architect** for Halo 2.x plugins.";
        
        const behavior = isZh
            ? `1. **主动思考**: 不要等用户给细节。如果用户说“相册”，你要想到“上传、缩略图、权限、懒加载”。
2. **严格把关**: 如果用户想写同步 IO 代码，**制止他**，并给出 Reactive 方案。
3. **生态融合**: 尽可能复用 Halo 现有的系统（附件、评论、通知）。`
            : `1. **Be Proactive**: Don't wait for details.
2. **Be Strict**: No blocking IO. Enforce Reactive patterns.
3. **Be Integrated**: Use Halo's existing systems (Attachment, Notification).`;

        const autoCmds = isZh
            ? `*   **"/hps new [name]"**:
    *   **动作**: 运行命令 -> 读取 'requirement.md' -> **以资深产品经理身份重写内容** -> 请求确认。
*   **"/hps code [name]"**:
    *   **动作**: 运行命令 -> 读取输出文件 -> 写代码。`
            : `*   **"/hps new [name]"**:
    *   **Action**: Run cmd -> Read 'requirement.md' -> **HEAVILY EDIT as PM** -> Ask review.
*   **"/hps code [name]"**:
    *   **Action**: Run cmd -> Read Output File -> Write Code.`;

        return `# SYSTEM IDENTITY: HPS Architect (${lang})

${identity}
The user relies on you to turn vague ideas into **professional, robust, and native** Halo features.

## 🧠 Behavior Guidelines
${behavior}

## ⚡️ Pseudo-Commands & Autonomy
${autoCmds}

## 🧠 Core Philosophy
1.  **Spec-First**: We never write code without a Spec.
2.  **Reactive**: We use Project Reactor (Mono/Flux) for everything.
3.  **Extension-Oriented**: Business logic lives in Reconcilers.
`;
    },

    hpsMd: (projectName) => `# Halo Plugin Spec (HPS) - Project Context

This project uses the HPS (Halo Plugin Spec) workflow for Halo 2.x plugin development. 
The AI assistant should prioritize these instructions and recognize slash commands.

## 🛠 Available Slash Commands (via HPS CLI)

| Command | Description | Action |
| :--- | :--- | :--- |
| /hps.new <name> | Start a new feature proposal | Execute: node cli/hps.js new <name> |
| /hps.context <name> | Assemble context for design | Execute: node cli/hps.js context <name> |
| /hps.apply <name> | Merge specs to truth | Execute: node cli/hps.js apply <name> |
| /hps.code <name> | Generate coding implementation plan | Execute: node cli/hps.js code <name> |

## 📐 Project Identity
*   **Project Name**: 
${projectName}
*   **Framework**: Halo 2.x (Spring Boot 3, WebFlux, Vue 3)
*   **Architecture**: Resource-Oriented (GVK + Reconcilers)

## 📖 Knowledge Base
*   **Master Spec**: "ai_specs/00_master_spec.md"
*   **Collaboration Manual**: "ai_specs/01_collaboration_manual.md"
*   **Documentation Index**: "docs_summaries/"

## 📋 Development Workflow
1.  **SPECIFY**: Use "/hps.new" to create a proposal. AI must act as a Senior PM to draft the spec.
2.  **PLAN**: Use "/hps.context" to gather documentation and generate a design prompt.
3.  **IMPLEMENT**: Use "/hps.code" to generate implementation details based on validated specs.
`,

    hpsProjectSpec: (name) => `# HPS Project Spec: ${name}

## 1. Project Constraints
- **Target Halo Version**: 2.10.x +
- **Language**: Java 17, TypeScript (Vue 3)
- **Architecture**:
    - Backend: Reactive (Project Reactor) ONLY. No blocking I/O.
    - Frontend: Vue 3 Composition API.

## 2. Directory Map
- ".hps/": Source of Truth for AI specs.
- "src/main/java": Backend logic (Extensions & Reconcilers).
- "ui/src": Frontend logic.
`,

    hpsRequirement: (name) => {
        // We can detect lang from the 't' module state, or pass it in.
        // For simplicity, let's look at the process-wide locale since we call init() globally.
        const { getLang } = require('./locales');
        const isZh = getLang() === 'zh';

        if (isZh) {
            return `# 功能需求说明书: ${name}

> 🤖 **AI 注意**: 请以“资深产品经理”的思维填充此文档。
> 不要只列出基本功能。请深入考虑 **用户体验 (UX)**、**边界情况** 以及 **Halo 生态融合**。

## 1. 产品概述 (Product Overview)
> (核心价值是什么？用户是谁？为什么需要这个功能？)

## 2. 用户故事与 UX 流程 (User Stories)
- [ ] 作为 [用户], 我想要 [动作], 以便 [收益].
- [ ] UX 流程: 用户点击 -> 弹窗打开 -> ...

## 3. Halo 集成与技术规格 (Technical Specs)

### 3.1 扩展模型 (Extensions/CRD)
> 定义 GVK。考虑增加状态字段、时间戳、配置项。
> - **Kind**: ...
> - **Group**: ...
> - **Fields**: ...

### 3.2 扩展点 (System Hooks)
> 如何融入 Halo 系统？
> - [ ] 设置菜单?
> - [ ] 控制台仪表盘?
> - [ ] 主题注入?
> - [ ] 通知中心?

## 4. 权限与安全 (Permission & Security)
> 谁能做什么？定义 RBAC 规则。
`;
        } else {
            return `# Feature Requirement: ${name}

> 🤖 **AI NOTE**: Please fill this with a Senior Product Manager mindset.
> Don't just list basic functions. Think about UX, Edge Cases, and Halo Integration.

## 1. Product Overview
> (What is the core value? Who is the user? Why do we need this?)

## 2. User Stories & UX Flow
- [ ] As a [User], I want to [Action], so that [Benefit].
- [ ] UX Flow: User clicks -> Modal opens -> ...

## 3. Halo Integration & Technical Specs

### 3.1 Extensions (Data Models)
> Define the GVKs. Consider adding fields for status, timestamps, and config.
> - **Kind**: ...
> - **Group**: ...
> - **Fields**: ...

### 3.2 Extension Points (System Hooks)
> How does this blend into Halo?
> - [ ] Settings Menu?
> - [ ] Console Dashboard?
> - [ ] Theme Injection?
> - [ ] Notification Center?

## 4. Permission & Security
> Who can do what? Define RBAC rules.
`;
        }
    },

    hpsTasks: () => `# Implementation Tasks

> AI Instructions: Break down the implementation into small, testable steps.

- [ ] **Step 1: Define Extension (GVK)**
    - Create "src/main/java/.../extension/MyResource.java"
    - Apply "@GVK" and "@Schema".

- [ ] **Step 2: Backend Logic (Reconciler)**
    - Create "src/main/java/.../reconciler/MyResourceReconciler.java"
    - Implement "Reconciler<MyResource>".

- [ ] **Step 3: Frontend UI**
    - Create "ui/src/views/MyPage.vue"
    - Register route in "ui/src/index.ts".

- [ ] **Step 4: Verify**
    - Run "./gradlew build".
    - Check console logs.
`
};
