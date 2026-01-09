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
version = "0.0.1-SNAPSHOT"
`,
    
    pluginYaml: (name) => `apiVersion: plugin.halo.run/v1alpha1
kind: Plugin
metadata:
  name: "${name}"
spec:
  enabled: true
  version: 0.0.1-SNAPSHOT
  requires: ">=2.10.0"
`,
  
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

    // New: Project-level System Prompt Configuration
    agentPrompt: (lang) => {
        const isZh = lang === 'zh';
        return isZh ? `# HPS 智能体配置 (Agent Configuration)

## 👤 角色定义 (Identity)
你是一位 **Halo 2.x 插件架构师**。
你精通 Spring WebFlux, Project Reactor 和 Vue 3。
你的目标是辅助开发者构建高质量、符合官方规范的插件。

## 🧠 核心思维模型 (Mindset)
1.  **产品导向**: 当用户提出模糊需求时，主动补充细节（UX、配置项、边界条件）。
2.  **严格规范**: 
    - 后端必须使用 **全异步 (Reactive)** 模式，严禁 
block()\n.
    - 数据模型必须通过 **Extension (CRD)** 定义。
    - 业务逻辑必须写在 **Reconciler** 中。
3.  **上下文感知**: 善用 
hps code
 提供的技术文档，不要凭空捏造 API。

## ⚡️ 行为准则 (Behavior)
- **拒绝**: 如果用户要求写同步 JDBC 代码，请拒绝并提供 R2DBC 方案。
- **引导**: 引导用户使用 
hps new
 起草 Spec，而不是直接写代码。
` : `# HPS Agent Configuration

## 👤 Identity
You are a **Halo 2.x Plugin Architect**.
Expert in Spring WebFlux, Project Reactor, and Vue 3.

## 🧠 Core Mindset
1.  **Product-First**: Enhance vague requests with professional details (UX, Config, Edge cases).
2.  **Strict Standards**:
    - Backend MUST be **Reactive**. No 
block()\n.
    - Data MUST use **Extension (CRD)**.
    - Logic MUST live in **Reconcilers**.
3.  **Context-Aware**: Use the technical docs provided by 
hps code
.

## ⚡️ Behavior
- **Refuse** blocking I/O patterns.
- **Guide** user to use 
hps new
 for specs first.
`;
    },

    cursorRules: (lang) => {
        // Reuse the logic from agentPrompt but format for Cursor
        // ... (Keep existing logic or simplify to reference agentPrompt if possible, 
        // but Cursor Rules usually need specific command formatting)
        const isZh = lang === 'zh';
        // ... (Existing cursorRules content ...)
        // To save space, I will output the same robust content as before
        const intro = isZh 
            ? "你是一位 **Halo 2.x 插件开发专家**。"
            : "You are a **Senior Product Architect & Halo Ecosystem Expert**.";
        
        return `# Halo Plugin Spec Kit (HPS) - Cursor Rules (${lang})

${intro}

## 🌟 Slash Commands (Auto-Execution)

| User Command | Action | Terminal Command |
| :--- | :--- | :--- |
| /hps new <name> | Create a new feature proposal | node cli/hps.js new <name> |
| /hps context <name> | Assemble context for AI | node cli/hps.js context <name> |
| /hps apply <name> | Merge specs to Truth | node cli/hps.js apply <name> |
| /hps code <name> | Generate coding plan | node cli/hps.js code <name> |

## 🧠 Product Thinking Protocol
(See .hps/agent.md for full details)

## 🚨 Critical Technical Constraints
*   **Reactive Only**: Use Project Reactor (Mono/Flux). No 
block()\n.
*   **GVK First**: Always define 
Extension
 for data storage.
`;
    },

    systemPrompt: (lang) => {
        // This is legacy/fallback. We will prefer .hps/agent.md now.
        return ""; 
    },

    hpsMd: (projectName) => `# Halo Plugin Spec (HPS) - Project Context

This project uses the HPS (Halo Plugin Spec) workflow.

## 📂 Key Files
- 
.hps/agent.md
: **The Brain**. Defines AI role and rules.
- 
.hps/project.md
: Project-specific constraints.
`,

    hpsProjectSpec: (name) => `# HPS Project Spec: ${name}

## 1. Project Constraints
- **Target Halo Version**: 2.10.x +
- **Language**: Java 17, TypeScript (Vue 3)
- **Architecture**: Reactive (Project Reactor). No blocking I/O.

## 2. Directory Map
- 
.hps/
: Source of Truth for AI specs.
- 
src/main/java
: Backend logic.
- 
ui/src
: Frontend logic.
`,

    hpsRequirement: (name) => {
        const { getLang } = require('./locales');
        const isZh = getLang() === 'zh';

        if (isZh) {
            return `# 功能需求说明书: ${name}

> 🤖 **AI 注意**: 请以“资深产品经理”的思维填充此文档。

## 1. 产品概述
> (核心价值是什么？)

## 2. 用户故事
- [ ] 作为 [用户], 我想要 [动作], 以便 [收益].

## 3. 技术规格 (Halo)
### 3.1 模型 (Extensions)
> - **Kind**: ...
### 3.2 扩展点
> - [ ] 菜单?
`;
        } else {
            return `# Feature Requirement: ${name}

> 🤖 **AI NOTE**: Please fill this with a Senior Product Manager mindset.

## 1. Product Overview
> (Core value?)

## 2. User Stories
- [ ] As a [User], I want to [Action].

## 3. Technical Specs (Halo)
### 3.1 Extensions
> - **Kind**: ...
### 3.2 Extension Points
> - [ ] Menu?
`;
        }
    },

    hpsTasks: () => `# Implementation Tasks

- [ ] **Step 1: Define Extension (GVK)**
- [ ] **Step 2: Backend Logic (Reconciler)**
- [ ] **Step 3: Frontend UI**
- [ ] **Step 4: Verify**
`
};