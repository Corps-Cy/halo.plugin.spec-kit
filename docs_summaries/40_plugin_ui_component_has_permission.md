# Halo 插件 UI 组件：HasPermission

`HasPermission` 是一个用于权限控制的容器组件。它允许开发者根据当前登录用户是否拥有特定权限，来决定是否渲染其内部包含的 UI 元素。

## 1. 核心职能
*   **用途**: 条件渲染。如果用户拥有权限，则显示内部内容；否则不渲染。
*   **场景**: 控制敏感操作按钮（如“删除”、“设置”）或整个功能模块的可见性。

## 2. 核心属性 (Props)
*   **`permissions` (必填)**: 一个字符串数组，包含所需的权限标识符（如 `['plugin:todo:manage']`）。

## 3. 与 `v-permission` 指令的区别
*   **`v-permission`**: 是一个指令，作用于单个 DOM 元素。适合简单的按钮级控制。
*   **`HasPermission`**: 是一个组件，作为一个包裹器（Wrapper）。适合包裹一段复杂的 HTML 结构或多个组件，逻辑上更清晰，也方便在权限不满足时进行统一占位处理（虽然目前主要是不渲染）。

## 4. 示例代码
```vue
<template>
  <div>
    <h1>任务详情</h1>
    
    <!-- 仅拥有管理权限的用户可以看到此区域 -->
    <HasPermission :permissions="['plugin:todo:manage']">
      <div class="admin-actions">
        <VButton type="secondary">编辑</VButton>
        <VButton type="danger">删除任务</VButton>
      </div>
    </HasPermission>
    
    <p>任务内容...</p>
  </div>
</template>
```

## 5. 注意事项
*   **响应式**: 该组件会自动响应用户登录状态或权限的变化。
*   **后端配合**: 这里的权限控制仅限于 UI 层面的展示。为了安全，后端接口（Controller 或 Reconciler）也必须同步进行权限校验。
*   **全局可用**: 该组件在 Halo Console 中是全局注册的。
