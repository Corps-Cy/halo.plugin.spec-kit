# Halo 插件 UI 指令：v-tooltip

`v-tooltip` 是 Halo Console 全局注册的一个 Vue 指令，用于为任何 HTML 元素或组件添加轻量级的文字提示。

## 1. 核心职能
*   **用途**: 当用户悬停 (Hover) 在某个元素上时显示辅助文字说明。
*   **形态**: 它是一个 **Vue 指令 (Directive)**，而非组件。这意味着你可以直接在已有的标签上使用它，而无需嵌套新的标签。

## 2. 使用方法
将文字内容直接赋值给 `v-tooltip` 指令即可。

### 示例代码：
```vue
<template>
  <div class="flex gap-4">
    <!-- 为图标添加提示 -->
    <IconDelete v-tooltip="'彻底删除该项'" class="text-red-500" />
    
    <!-- 为按钮添加提示 -->
    <VButton v-tooltip="'保存当前修改并发布'">发布</VButton>
    
    <!-- 动态内容的提示 -->
    <span v-tooltip="statusDescription">{{ statusName }}</span>
  </div>
</template>

<script setup lang="ts">
const statusName = "运行中";
const statusDescription = "系统一切正常，已运行 24 小时";
</script>
```

## 3. 关键特性
*   **零侵入**: 直接作用于元素，不改变现有的布局结构。
*   **统一风格**: 提示框的背景色、圆角和字体大小自动遵循 Halo Console 的整体 UI 规范。
*   **位置自动策略**: 通常会自动根据元素在屏幕上的位置计算最佳的弹出方向（上、下、左、右）。

## 4. 注意事项
*   **性能**: 对于超长列表中的每一个元素都添加复杂的动态提示可能会有轻微性能影响，但在正常管理后台场景下可忽略不计。
*   **国际化**: 建议传入 `v-tooltip="$t('plugin.tips.delete')"` 以支持多语言。
