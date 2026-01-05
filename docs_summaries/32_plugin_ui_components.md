# Halo 插件 UI 组件 (UI Components)

为了保持与 Halo Console 视觉风格的高度统一，插件开发应优先使用官方提供的组件库和业务组件。

## 1. 组件库分类
Halo 插件开发涉及两类主要组件：

*   **基础组件库 (`@halo-dev/components`)**: 提供基础的 UI 原子组件（按钮、输入框、对话框等）。
*   **业务组件与指令**: 由 Halo Console 全局注册，插件可以直接在模板中使用，无需手动引入。

## 2. 基础组件库使用
*   **库名**: `@halo-dev/components`
*   **用法**: 在 Vue 组件中局部引入。

### 代码示例 (使用 VButton):
```vue
<script setup lang="ts">
import { VButton } from "@halo-dev/components";
</script>

<template>
  <VButton type="primary">点击我</VButton>
</template>
```

## 3. 常用业务组件 (全局可用)
这些组件专门为 Halo 的业务场景设计，插件可以直接调用：

*   **`AttachmentSelectorModal`**: 附件选择弹窗。
*   **`UppyUpload`**: 附件上传组件。
*   **`UserSelector`**: 用户选择器。
*   **各种图标组件**: 通常通过 `i-lucide-*` 或类似的 UnoCSS 类名使用。

## 4. 全局指令
Halo Console 还预置了一些实用的全局指令：
*   **`v-permission`**: 根据权限控制元素的可见性。
    ```html
    <button v-permission="['plugin:todo:delete']">删除</button>
    ```
*   **`v-tooltip`**: 显示文字提示。

## 5. 视觉一致性保证
*   **设计规范**: 遵循 Halo 官方的 UI 设计语言（类似 Material Design 结合简洁风格）。
*   **配色与间距**: 通过预设的 CSS 变量或 Tailwind/UnoCSS 类名（如 `bg-primary`, `p-4`）来保持一致。

## 6. 注意事项
*   **避免污染**: 尽量不要在插件中编写大量的全局 CSS，优先使用原子化 CSS。
*   **版本兼容**: 确保 `@halo-dev/components` 的版本与 Halo 核心版本匹配，以获得最佳的兼容性。
