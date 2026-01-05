# Halo 插件 UI 组件：AttachmentFileTypeIcon

`AttachmentFileTypeIcon` 是一个专门用于展示文件类型图标的组件。它能根据文件名后缀自动适配显示相应的图标（如 PDF 图标、Word 图标、压缩包图标等）。

## 1. 核心职能
*   **用途**: 提供可视化的文件类型标识。
*   **场景**: 在附件列表、文件选择器或任何需要展示文件信息的场景中使用。

## 2. 核心属性 (Props)
*   **`fileName` (必填)**: 文件名（字符串）。组件会解析其后缀名来决定显示什么图标。
*   **`displayExt`**: 是否在图标上显示扩展名文本（布尔值，默认为 `true`）。
*   **`width` / `height`**: 图标的宽高（数值，默认为 `10`，单位通常是 rem 或 em，视具体实现而定，建议根据实际效果调整）。

## 3. 示例代码
```vue
<template>
  <div class="flex flex-col gap-4">
    <!-- 显示图片图标 -->
    <AttachmentFileTypeIcon 
      file-name="image.png" 
      :width="32" 
      :height="32" 
    />
    
    <!-- 显示 PDF 图标，不显示文字后缀 -->
    <AttachmentFileTypeIcon 
      file-name="document.pdf" 
      :display-ext="false"
    />
    
    <!-- 显示压缩包图标 -->
    <AttachmentFileTypeIcon file-name="backup.zip" />
  </div>
</template>
```

## 4. 注意事项
*   该组件是**纯展示**组件，不包含点击预览或下载功能。
*   对于无法识别的后缀名，它通常会显示一个通用的未知文件图标。
*   图标样式通常是矢量图 (SVG)，支持任意尺寸缩放而不失真。
