# Halo 插件开发准备 (Plugin Preparation)

## 技能要求
1.  **后端**: 熟练掌握 Java Web 开发及 Spring Boot 框架。
2.  **前端**: 熟悉 Vue 3 和 TypeScript (用于开发插件的控制台扩展)。
3.  **基础**: 了解 Git 操作、Node.js 包管理 (pnpm)。
4.  **架构认知**: **必须**阅读过《Halo 架构概览》，理解 Extension 和 Reconciler 概念。

## 软件环境
1.  **Node.js**: 建议版本 20 LTS (文档提到 18+)。
2.  **Git**: 必需。
3.  **运行环境**: 能够通过 Docker 或本地源码成功运行 Halo (参考 02_run.md)。

## 工具推荐 (CLI)
虽然此页面未详细列出，但官方通常推荐使用：
*   `pnpm create halo-plugin`: 用于快速脚手架生成插件项目。

## 核心前提
在开始开发插件前，确保你已经有一个可运行的 Halo 实例，以便进行插件的动态加载和调试。
