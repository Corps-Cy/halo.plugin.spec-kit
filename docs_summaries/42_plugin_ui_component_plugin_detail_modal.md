# Halo 插件 UI 组件：PluginDetailModal

`PluginDetailModal` 是一个标准的插件详情弹窗组件。它允许在一个弹窗中完整展示某个插件的信息（如名称、作者、描述）以及该插件的配置项，而无需跳转到专门的插件管理页面。

## 1. 核心职能
*   **用途**: 在当前页面直接弹出插件的详情和设置界面。
*   **场景**: 例如，你在自己的插件中引导用户去配置另一个插件，或者在快速操作入口中显示当前插件的设置。

## 2. 核心属性 (Props)
*   **`name` (必填)**: 插件的元数据名称（即 `plugin.yaml` 中的 `metadata.name`）。
*   **`visible` / `v-if`**: 通常结合 `v-if` 来控制该组件的挂载和显示。

## 3. 核心事件 (Events)
*   **`@close`**: 当用户关闭弹窗时触发。

## 4. 示例代码
```vue
<script setup lang="ts">
import { ref } from "vue";

const isVisible = ref(false);

const handleClose = () => {
  isVisible.value = false;
  console.log("插件详情弹窗已关闭");
};
</script>

<template>
  <div class="p-4">
    <!-- 按钮：打开目标插件的设置详情 -->
    <VButton @click="isVisible = true">配置评论插件</VButton>
    
    <PluginDetailModal 
      v-if="isVisible" 
      name="plugin-comment-widget" 
      @close="handleClose"
    />
  </div>
</template>
```

## 5. 注意事项
*   **标准一致性**: 该组件渲染的内容与 Halo 系统“插件管理”列表点击详情后的内容完全一致，包括插件提供的 `Setting` 表单。
*   **依赖性**: 调用时需确保目标插件已安装，否则可能显示空白或错误提示。
*   **无感跳转**: 它提供了一种“不中断当前流程”的配置方式，提升了用户体验。
