# Halo 架构概览 (Framework Architecture)

## 核心设计理念
Halo 2.0+ 引入了**声明式 API (Declarative API)**，设计灵感高度借鉴了 Kubernetes。它从传统的命令式 MVC 模式转型为“资源-协调”模式。

## 关键概念
1.  **Extension (资源/扩展)**: 
    *   定义：所有的核心模型（文章、分类、标签、插件配置等）都是 Extension。
    *   结构：参考 K8s CRD，包含 `metadata` (元数据), `spec` (期望状态), 和 `status` (当前/实际状态)。
    *   持久化：通过 `ExtensionClient` 进行操作，支持非阻塞的 R2DBC。
2.  **Reconciler (协调器/控制器)**:
    *   作用：负责执行“协调循环 (Reconciliation Loop)”。它会不断对比资源的 `spec` 和 `status`。
    *   目标：如果两者不一致，协调器会采取行动，直到实际状态趋于期望状态。
3.  **Reactive Stack (响应式技术栈)**:
    *   底层基于 **Spring Boot 3**, **Netty**, **Project Reactor**, **WebFlux** 和 **R2DBC**。
    *   **重要约束**：开发过程中应尽量避免阻塞式调用 (Blocking I/O)。

## 架构组成
*   **Halo Core**: 提供基础模块，如安全、插件管理、主题管理、内置内容模型。
*   **Extensions**: 统一的数据管理模型。
*   **Plugin Module**: 处理插件加载、通信和扩展点。

## 开发范式转变
*   **传统方式 (1.x)**: UI -> Controller -> Service -> DAO -> DB (命令式)。
*   **现代方式 (2.x)**: UI -> 修改 Extension 的 `spec` -> 协调器检测到变化并处理业务 -> 更新 Extension 的 `status` (声明式)。
