# Halo 元数据表单定义规范 (AnnotationSetting)

`AnnotationSetting` 是 Halo 提供的一种特殊的表单资源，专门用于为现有模型（如文章、页面、分类等）扩展“自定义字段”。这些字段的数据会被持久化在资源的 `metadata.annotations` 中。

## 1. 核心职能
*   **用途**: 为特定的 Group/Kind 资源定义注解编辑界面。
*   **存储**: 数据以键值对（Key-Value）形式存储，且**所有值必须是字符串**。
*   **场景**: 例如：为文章增加“下载链接”字段、为用户增加“工号”字段等。

## 2. 核心结构
资源类型为 `AnnotationSetting`。

*   **`targetRef`**: 指定该表单作用的目标资源。
    *   `group`: 目标资源的分组（如 `content.halo.run`）。
    *   `kind`: 目标资源的种类（如 `Post`, `SinglePage`, `User`）。
*   **`formSchema`**: 表单项定义（基于 FormKit Schema）。

## 3. 关键约束
由于 `annotations` 的值只能是字符串，在定义 `formSchema` 时有以下限制：
*   **禁止类型**: 不能使用 `number` (会被转为字符串)、`group`、`array` (repeater) 等复杂嵌套类型。
*   **布尔值处理**: 使用 `checkbox` 时，必须显式指定 `on-value` 和 `off-value` 为字符串（如 `"true"` / `"false"`）。

## 4. 与 `Setting` 资源的区别
*   **`Setting`**: 用于定义插件自身的全局配置，数据存储在独立的 `ConfigMap` 中。
*   **`AnnotationSetting`**: 用于扩展现有资源的属性，数据存储在目标资源自身的 `metadata.annotations` 中。

## 5. YAML 示例
```yaml
apiVersion: v1alpha1
kind: AnnotationSetting
metadata:
  name: post-extended-fields
spec:
  targetRef:
    group: content.halo.run
    kind: Post
  formSchema:
    - $formkit: text
      name: plugin.example.com/download-url
      label: 附件下载地址
    - $formkit: checkbox
      name: plugin.example.com/is-premium
      label: 是否精华文章
      on-value: "true"
      off-value: "false"
```

## 6. 注意事项
*   **命名规范**: 注解的 `name` 强烈建议使用带域名的前缀（如 `plugin.example.com/field-name`），以防与其他插件或系统核心注解冲突。
*   **自动渲染**: 一旦定义了 `AnnotationSetting`，Halo 控制台在编辑对应的资源时（如在文章编辑页的“元数据”选项卡中），会自动渲染出这些表单项。
