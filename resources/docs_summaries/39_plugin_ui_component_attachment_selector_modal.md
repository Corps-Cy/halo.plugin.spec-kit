# Halo 插件 UI 组件：AttachmentSelectorModal

`AttachmentSelectorModal` 是 Halo Console 提供的标准附件选择弹窗组件。它允许插件用户从已上传的附件库中选择一个或多个附件。

## 1. 核心职能
*   **用途**: 提供一个标准的弹窗界面，供用户浏览、搜索和选择附件。
*   **特性**: 自动集成 Halo 的附件管理逻辑，支持分页加载、分组筛选和上传新附件。

## 2. 核心属性 (Props)
*   **`v-model:visible`**: 控制弹窗的显示与隐藏（布尔值）。
*   **`accepts`**: 定义允许选择的文件类型（字符串数组，如 `['image/*']`）。
*   **`min`**: 最小选择数量（默认为 1）。
*   **`max`**: 最大选择数量（设为 1 则为单选）。

## 3. 核心事件 (Events)
*   **`@select`**: 用户确认选择后触发。返回一个包含选中附件对象（`AttachmentLike[]`）的数组。
*   **`@close`**: 弹窗关闭时触发。

## 4. 示例代码
```vue
<script setup lang="ts">
import { ref } from "vue";

const isVisible = ref(false);
const selectedFiles = ref<any[]>([]);

const onSelect = (attachments: any[]) => {
  selectedFiles.value = attachments;
  isVisible.value = false;
  console.log("选中的附件:", attachments);
};
</script>

<template>
  <div class="p-4">
    <VButton @click="isVisible = true">选择图片</VButton>
    
    <AttachmentSelectorModal
      v-model:visible="isVisible"
      :accepts="['image/*']"
      :max="1"
      @select="onSelect"
    />
    
    <div v-if="selectedFiles.length > 0" class="mt-4">
      已选择: {{ selectedFiles[0].metadata.name }}
    </div>
  </div>
</template>
```

## 5. 注意事项
*   **全局组件**: 该组件在 Halo Console 中是全局注册的，通常无需显式 import。
*   **类型定义**: 虽然可以传入 `any`，但建议在 TypeScript 中使用 `@halo-dev/api-client` 提供的 `Attachment` 类型以获得更好的类型提示。
*   **交互**: 选中后通常需要手动将 `visible` 设为 `false` 来关闭弹窗。
