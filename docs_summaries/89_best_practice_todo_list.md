# Halo 最佳实践案例：Todo List 完整流程

这个官方 Demo 展示了开发一个功能完整的 Halo 插件的标准路径。

## 1. 资源模型定义 (Extension)
*   **类名**: `Todo`
*   **GVK**: `group: todo.plugin.halo.run`, `version: v1alpha1`, `kind: Todo`。
*   **Spec**: 包含 `title` (String) 和 `done` (Boolean)。
*   **注册**: 在插件的 `start()` 生命周期中通过 `schemeManager.register(Todo.class)` 注册。这一步会自动生成对应的 CRUD RESTful API。

## 2. 后端逻辑
*   **API 验证**: 注册后，可以通过 `/swagger-ui.html` 验证接口（`/apis/todo.plugin.halo.run/v1alpha1/todos`）是否已自动生成并可用。
*   **生命周期**: 插件停止时需注销资源，防止内存泄漏。

## 3. 前端 UI 开发 (Vue 3)
*   **路由配置**: 在 `ui/src/index.ts` 中使用 `definePlugin` 注册 `/todos` 路由。
*   **菜单集成**: 设置 `meta.menu`，指定分组为“工具 (Tool)”，并配置图标。
*   **页面实现**:
    *   引入 `todomvc-app-css` 样式。
    *   定义 TypeScript 接口映射后端的 `Todo` 结构。
    *   使用 Axios (通过 `@halo-dev/api-client`) 调用后端生成的 API 实现增删改查。
*   **功能点**: 列表展示、回车创建任务、双击编辑标题、点击复选框同步 `done` 状态、底部的状态筛选（全部/未完成/已完成）。

## 4. 关键价值（为什么是最佳实践）
1.  **最小化代码**: 开发者只需定义模型，无需手写 Controller 和 Service 层，系统自动处理持久化和 API 暴露。
2.  **类型安全**: 后端 GVK 与前端 TS 接口一一对应。
3.  **UI 统一**: 演示了如何将自定义页面完美嵌入管理后台菜单体系。
