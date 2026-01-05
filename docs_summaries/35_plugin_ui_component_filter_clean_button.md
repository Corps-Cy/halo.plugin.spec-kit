# Halo 插件 UI 组件：FilterCleanButton

`FilterCleanButton` 是一个简单的辅助组件，用于一键重置或清空当前列表应用的所有筛选条件。

## 1. 核心职能
*   **用途**: 提供一个标准化的“清空筛选”按钮。
*   **场景**: 通常放置在 `FilterDropdown` 组件组的末尾。当用户选择了多个筛选条件后，点击此按钮可快速将所有筛选参数恢复到默认状态。

## 2. 核心属性 (Props)
*   该组件较为简单，主要通过样式表现其功能。在复杂的组合中，可能会配合当前激活的筛选计数显示。

## 3. 核心事件 (Events)
*   **`@click`**: 当用户点击按钮时触发。开发者应在此事件的处理函数中重置所有的 `v-model` 变量并重新发起数据请求。

## 4. 示例代码
```vue
<script setup lang="ts">
import { ref } from "vue";

const status = ref("");
const category = ref("");

const handleClear = () => {
  status.value = "";
  category.value = "";
  console.log("所有筛选已重置");
  // 重新加载数据...
};
</script>

<template>
  <div class="flex items-center gap-2">
    <!-- 其他筛选组件 -->
    <FilterDropdown v-model="status" label="状态" :items="[...] " />
    
    <!-- 清空按钮 -->
    <FilterCleanButton v-show="status || category" @click="handleClear" />
  </div>
</template>
```

## 5. 注意事项
*   **显示时机**: 建议仅在存在已激活的筛选条件时（如变量不为空）才显示该按钮，以减少界面冗余。
*   **交互一致性**: 该组件通常以文字链接或小图标的形式存在，符合 Halo 管理后台的极简设计规范。
