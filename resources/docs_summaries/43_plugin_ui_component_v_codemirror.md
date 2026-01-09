# Halo 插件 UI 组件：VCodeMirror

`VCodeMirror` 是 Halo 封装的 CodeMirror 6 代码编辑器组件，旨在为插件提供高性能、可定制的代码编辑功能。

## 1. 核心职能
*   **用途**: 提供专业的代码编辑界面，支持语法高亮、自动补全、行号显示等功能。
*   **特性**: 
    *   **Vue 3 支持**: 深度集成 Vue 3 的双向绑定。
    *   **可扩展性**: 支持 CodeMirror 6 的扩展机制。

## 2. 核心属性 (Props)
*   **`v-model` (或 `modelValue`)**: 双向绑定编辑器中的代码文本（字符串）。
*   **`language`**: 设置编程语言（例如 `javascript`, `yaml`, `html`, `css`, `java` 等）。
*   **`extensions`**: CodeMirror 6 的扩展数组，用于自定义编辑器行为（如快捷键、主题、Linter 等）。
*   **`height`**: 编辑器高度（例如 `400px`, `auto`）。

## 3. 核心事件 (Events)
*   **`update:modelValue`**: 当内容发生变化时触发。
*   **`change`**: 内容改变后的详细回调。

## 4. 示例代码
```vue
<script setup lang="ts">
import { ref } from "vue";
import { javascript } from "@codemirror/lang-javascript";

const code = ref("console.log('Hello Halo');");
const extensions = [javascript()];
</script>

<template>
  <div class="border rounded p-2">
    <VCodemirror
      v-model="code"
      language="javascript"
      height="300px"
      :extensions="extensions"
    />
  </div>
</template>
```

## 5. 注意事项
*   **性能**: 对于超大型文本，CodeMirror 6 性能优秀，但仍需注意响应式绑定可能带来的开销。
*   **主题**: 默认遵循 Halo Console 的配色方案，通常支持自动跟随系统主题。
*   **扩展加载**: 使用特定语言支持时，可能需要额外安装对应的 CodeMirror 语言包并在组件中引入。
