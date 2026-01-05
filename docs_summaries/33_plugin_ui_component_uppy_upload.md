# Halo 插件 UI 组件：UppyUpload

`UppyUpload` 是 Halo 基于 Uppy 封装的上传组件，专门用于处理附件上传业务，能够与 Halo 的附件管理系统无缝集成。

## 1. 核心职能
*   **用途**: 提供功能强大的文件上传界面，支持多文件、断点续传（取决于后端支持）和上传进度显示。
*   **集成**: 自动适配 Halo 的附件存储策略和权限验证。

## 2. 核心属性 (Props)
*   **`endpoint`**: 上传接口地址（通常指向 Halo 的附件上传 API）。
*   **`meta`**: 携带的额外参数，例如：
    *   `policyName`: 存储策略名称。
    *   `groupName`: 分组名称。
*   **`restrictions`**: 上传限制配置：
    *   `maxFileSize`: 最大文件大小。
    *   `maxNumberOfFiles`: 最大文件数量。
    *   `allowedFileTypes`: 允许的文件类型（如 `['image/*', '.pdf']`）。
*   **`autoProceed`**: 是否在选择文件后立即开始上传。

## 3. 核心事件 (Events)
*   **`uploaded`**: 当文件上传成功时触发，返回服务器返回的附件对象。
*   **`error`**: 当上传失败时触发，返回错误信息。

## 4. 示例代码
```vue
<script setup lang="ts">
import { ref } from "vue";

const onUploaded = (file: any, response: any) => {
  console.log("上传成功:", response.body);
};

const onError = (error: any) => {
  console.error("上传出错:", error);
};
</script>

<template>
  <UppyUpload
    endpoint="/api/v1alpha1/attachments/upload"
    :meta="{ policyName: 'local' }"
    :restrictions="{
      maxFileSize: 10485760, // 10MB
      allowedFileTypes: ['image/*']
    }"
    @uploaded="onUploaded"
    @error="onError"
  />
</template>
```

## 5. 注意事项
*   **权限**: 确保调用上传接口的用户具有相应的 `attachment:upload` 权限。
*   **响应式**: 组件会根据父容器的大小自动调整 UI 布局。
