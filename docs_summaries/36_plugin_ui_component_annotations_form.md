# Halo 插件 UI 组件：AnnotationsForm

`AnnotationsForm` 是一个专门用于管理资源元数据中 **Annotations (注解)** 的表单组件。它能够根据资源的分组（Group）和种类（Kind），自动生成对应的配置表单项。

## 1. 核心职能
*   **用途**: 提供一个统一的界面来编辑资源的注解。
*   **特性**: 它是声明式的。你不需要手动编写每一个 input，它会根据系统中定义的 `MetadataForm` 或 `AnnotationDefinition` 自动渲染表单项。
*   **场景**: 当你定义了一个自定义模型（Extension），并且希望在 UI 中提供一个设置区域来修改该模型的注解时使用。

## 2. 核心属性 (Props)
*   **`group` (必填)**: 资源所属的组（如 `todo.plugin.halo.run`）。
*   **`kind` (必填)**: 资源的种类（如 `Todo`）。
*   **`value`**: 一个对象，包含了当前已有的注解键值对（通常对应资源的 `metadata.annotations`）。
*   **`v-model`**: 用于双向绑定表单数据。

## 3. 简化逻辑
*   **自动渲染**: 只要后台定义了相关的 `MetadataForm` 资源，`AnnotationsForm` 就能自动识别并显示对应的表单组件（如开关、输入框、下拉框等）。
*   **校验集成**: 自动集成定义的校验逻辑，确保填入的注解符合规范。

## 4. 示例代码
```vue
<script setup lang="ts">
import { ref } from "vue";

const annotations = ref({
  "todo.plugin.halo.run/priority": "high",
  "todo.plugin.halo.run/notify": "true"
});

const handleSubmit = async () => {
  // 保存注解到后端资源...
  console.log("提交的注解数据:", annotations.value);
};
</script>

<template>
  <div class="p-4">
    <AnnotationsForm
      v-model="annotations"
      group="todo.plugin.halo.run"
      kind="Todo"
    />
    <VButton @click="handleSubmit">保存配置</VButton>
  </div>
</template>
```

## 5. 注意事项
*   **与 MetadataForm 配合**: 该组件的生效依赖于后端是否通过 `MetadataForm` 资源定义了该 `group` 和 `kind` 下的注解表单结构。
*   **前缀规范**: 注解的 Key 建议带上插件的域名作为前缀，以防冲突。
