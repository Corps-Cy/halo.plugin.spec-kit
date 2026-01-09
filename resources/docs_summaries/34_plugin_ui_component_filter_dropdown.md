# Halo 插件 UI 组件：FilterDropdown

`FilterDropdown` 是一个通用的下拉筛选组件，常用于数据列表的过滤和排序操作。

## 1. 核心职能
*   **用途**: 提供一个标准化的下拉选择界面，支持单选或清除选择。
*   **场景**: 在管理后台的资源列表页（如文章列表、日志列表）上方，用于按状态、分类或排序规则筛选数据。

## 2. 核心属性 (Props)
*   **`v-model` (或 `modelValue`)**: 绑定选中的值。
*   **`label`**: 下拉框的显示文本（如“状态”、“排序”）。
*   **`items`**: 下拉选项数组。每个元素应包含：
    *   `label`: 显示的文本。
    *   `value`: 对应的数值/代码。

## 3. 核心事件 (Events)
*   **`update:modelValue`**: 当选中项发生变化时触发。

## 4. 示例代码
```vue
<script setup lang="ts">
import { ref } from "vue";

const filterValue = ref("creationTimestamp,desc");

const sortOptions = [
  { label: "按创建时间降序", value: "creationTimestamp,desc" },
  { label: "按创建时间升序", value: "creationTimestamp,asc" },
  { label: "按更新时间降序", value: "updateTimestamp,desc" },
];
</script>

<template>
  <div class="flex items-center gap-2">
    <FilterDropdown 
      v-model="filterValue" 
      label="排序方式" 
      :items="sortOptions" 
    />
    <p>当前值: {{ filterValue }}</p>
  </div>
</template>
```

## 5. 注意事项
*   **一致性**: 使用该组件可以确保插件列表页的筛选交互与 Halo 核心模块（如文章管理）完全一致。
*   **清空**: 该组件通常支持点击已选中项进行反选（清除），开发者应处理好值为 `null` 或空字符串的情况。
