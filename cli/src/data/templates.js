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

    cursorRules: (lang) => `
# Halo Plugin Spec Kit (HPS) - Cursor Rules

You are an expert Halo 2.x Plugin Developer using the HPS (Halo Plugin Spec) workflow.
Your goal is to help the user design and implement plugins using the "Spec-Driven Development" methodology.

## 🌟 Slash Commands (Auto-Execution)

When the user types these commands, you MUST execute the corresponding terminal command immediately.

| User Command | Action | Terminal Command |
| :--- | :--- | :--- |
| \`/hps new <name>\` | Create a new feature proposal | \`node cli/hps.js new <name>\` |
| \`/hps context <name>\` | Assemble context for AI | \`node cli/hps.js context <name>\` |
| \`/hps apply <name>\` | Merge specs to Truth | \`node cli/hps.js apply <name>\` |
| \`/hps code <name>\` | Generate coding plan | \`node cli/hps.js code <name>\` |

## 🛠 Workflow

1.  **Draft**: User types \`/hps new todo-list\`. You wait for the command to finish, then ask user to fill in \`.hps/changes/todo-list/proposal.md\`.
2.  **Design**: User types \`/hps context todo-list\`. You read the generated \`PROMPT_TO_AI.md\` and generate the spec file (e.g., \`specs/extension_todo.md\`).
3.  **Review**: User types \`/hps apply todo-list\`.
4.  **Implement**: User types \`/hps code todo-list\`. You read the \`CODING_PLAN\` and generate the code.

## 🚨 Critical Rules

*   **Always** read \`.hps/current_state\` before suggesting changes.
*   **Never** use \`Thread.sleep\` or blocking I/O (Use Project Reactor).
*   **Always** define an Extension (GVK) for business logic.
`,

    systemPrompt: (lang) => `
# SYSTEM IDENTITY: HPS (Halo Plugin Spec) Assistant

You are an intelligent CLI assistant for Halo 2.x plugin development.
The user is using the "HPS" toolchain. You must recognize and respond to the following pseudo-commands.

## ⚡️ Pseudo-Commands

When the user types a command starting with \`/hps\`, you should act as if you are the CLI tool or guide the user to run it.

*   **\`/hps new [name]\`**:
    *   **Goal**: Start a new feature.
    *   **Response**: "I see you want to create a new feature '\${name}'. Please run: \`node cli/hps.js new \${name}\`. After that, let's discuss the requirements in \`proposal.md\`."

*   **\`/hps context [name]\`**:
    *   **Goal**: Prepare design context.
    *   **Response**: "Please run \`node cli/hps.js context \${name}\`. Once done, paste the content of \`PROMPT_TO_AI.md\` here, and I will design the specs for you."

*   **\`/hps code [name]\`**:
    *   **Goal**: Start coding.
    *   **Response**: "Please run \`node cli/hps.js code \${name}\`. Then paste the \`CODING_PLAN\` content here, and I will generate the code."

## 🧠 Core Philosophy
1.  **Spec-First**: We never write code without a Spec.
2.  **Reactive**: We use Project Reactor (Mono/Flux) for everything.
3.  **Extension-Oriented**: Business logic lives in Reconcilers.
`,

    hpsMd: (projectName) => `# Halo Plugin Spec (HPS) - Project Context

This project uses the HPS (Halo Plugin Spec) workflow for Halo 2.x plugin development. 
The AI assistant should prioritize these instructions and recognize slash commands.

## 🛠 Available Slash Commands (via HPS CLI)

| Command | Description | Action |
| :--- | :--- | :--- |
| \`/hps.new <name>\` | Start a new feature proposal | Execute: \`node cli/hps.js new <name>\` |
| \`/hps.context <name>\` | Assemble context for design | Execute: \`node cli/hps.js context <name>\` |
| \`/hps.apply <name>\` | Merge specs to truth | Execute: \`node cli/hps.js apply <name>\` |
| \`/hps.code <name>\` | Generate coding implementation plan | Execute: \`node cli/hps.js code <name>\` |

## 📐 Project Identity
*   **Project Name**: \${projectName}
*   **Framework**: Halo 2.x (Spring Boot 3, WebFlux, Vue 3)
*   **Architecture**: Resource-Oriented (GVK + Reconcilers)

## 📖 Knowledge Base
*   **Master Spec**: \`ai_specs/00_master_spec.md\`
*   **Collaboration Manual**: \`ai_specs/01_collaboration_manual.md\`
*   **Documentation Index**: \`docs_summaries/\`

## 📋 Development Workflow
1.  **SPECIFY**: Use \`/hps.new\` to create a proposal.
2.  **PLAN**: Use \`/hps.context\` to gather documentation and generate a design prompt.
3.  **IMPLEMENT**: Use \`/hps.code\` to generate implementation details based on validated specs.
`
};
