# Halo 插件 UI 指令：v-permission

`v-permission` 是 Halo Console 全局注册的一个 Vue 指令，用于根据用户权限动态显示或隐藏 DOM 元素或组件。

## 1. 核心职能
*   **用途**: 前端权限守卫。如果当前登录用户不具备指定的权限，该指令所在的元素将不会被渲染（类似于 `v-if` 的逻辑）。
*   **形态**: 它是一个 **Vue 指令 (Directive)**。

## 2. 使用方法
支持传入单个权限字符串或多个权限组成的数组。

### 示例代码：
```vue
<template>
  <div class="flex gap-2">
    <!-- 单个权限检查 -->
    <VButton v-permission="'plugin:todo:create'" type="primary">
      新建任务
    </VButton>
    
    <!-- 多个权限检查 (通常是满足其中之一即可，具体视实现而定，通常为 OR 逻辑) -->
    <VButton v-permission="['plugin:todo:manage', 'plugin:todo:delete']" type="danger">
      批量删除
    </VButton>
  </div>
</template>
```

## 3. 与 `HasPermission` 组件的对比
*   **`v-permission` (指令)**: 
    *   更简洁，直接写在元素上。
    *   适合简单的显隐逻辑。
*   **`HasPermission` (组件)**: 
    *   适合包裹一段复杂的 HTML 或多个组件。
    *   语义化更强。

## 4. 注意事项
*   **安全性**: 记住前端的 `v-permission` 仅是为了提升用户体验（隐藏不可用的操作）。**核心的安全校验必须在后端接口中实现**。
*   **动态性**: 指令会自动响应用户权限的变化。
*   **全局可用**: 无需 import，直接在插件模板中使用。
