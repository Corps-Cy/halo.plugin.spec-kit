# Halo 插件 UI 组件：SearchInput

`SearchInput` 是一个专为搜索场景设计的输入框组件。它通常用于管理后台的列表页顶部，供用户通过关键字筛选数据。

## 1. 核心职能
*   **用途**: 提供标准的搜索输入界面。
*   **特性**: 
    *   **非实时触发**: 默认情况下，它通常在用户按下 **Enter (回车)** 键时才触发搜索逻辑，避免了频繁的 API 请求。
    *   **UI 规范**: 样式完全符合 Halo Console 的搜索栏规范。

## 2. 核心属性 (Props)
*   **`v-model` (或 `modelValue`)**: 双向绑定输入框的值。
*   **`placeholder`**: 输入框的提示文字（如“搜索任务...”）。

## 3. 核心事件 (Events)
*   **`update:modelValue`**: 当输入值改变（通常是按下回车或点击清除图标）时触发，用于同步状态并触发数据刷新。

## 4. 示例代码
```vue
<script setup lang="ts">
import { ref } from "vue";

const keyword = ref("");

const handleSearch = () => {
  console.log("执行搜索，关键字为:", keyword.value);
  // 在此处发起后端 API 请求...
};
</script>

<template>
  <div class="flex items-center gap-2">
    <SearchInput 
      v-model="keyword" 
      placeholder="输入关键字搜索任务" 
      @keyup.enter="handleSearch"
    />
    <!-- 注意：有些版本可能通过监听 v-model 的变化直接触发 handleSearch -->
  </div>
</template>
```

## 5. 注意事项
*   **防抖与触发**: 虽然该组件外观简单，但在处理大量数据列表时，建议配合回车键触发或使用防抖逻辑，以减轻后端服务器压力。
*   **清空功能**: 组件通常内置了清空图标，点击后会将 `v-model` 的值设为空字符串，并触发更新。
*   **全局可用**: 该组件在 Halo Console 中是全局注册的。
