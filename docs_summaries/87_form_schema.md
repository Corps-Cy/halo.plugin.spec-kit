# Halo 表单定义规范 (Form Schema)

Halo 2.x 的表单系统基于 **FormKit Schema** 构建，通过 YAML 或 JSON 描述表单结构。它广泛应用于插件设置、主题配置以及元数据（Annotations）编辑界面。

## 1. 核心结构
表单定义通常嵌套在 `Setting` 资源的 `spec.forms` 下。

*   **`group`**: 表单分组标识。
*   **`label`**: 分组的显示名称。
*   **`formSchema`**: 具体的表单项数组。

### 核心语法项：
*   **`$formkit`**: 指定组件类型（如 `text`, `select`, `attachment`）。
*   **`name`**: 字段名，对应存储时的 Key。
*   **`label`**: 字段的显示标签。
*   **`value`**: 默认值。
*   **`help`**: 帮助提示文字。
*   **`if`**: 条件渲染表达式（如 `if: "$value.enable_feature === true"`）。

## 2. 基础组件库
*   **`text`**: 标准单行文本。
*   **`password`**: 密码输入框。
*   **`textarea`**: 多行文本。
*   **`radio` / `checkbox`**: 单选/多选。
*   **`number`**: 数字输入。

## 3. Halo 增强型业务组件
Halo 针对 CMS 场景提供了大量专用组件：
*   **`select`**: 增强型下拉框（支持多选、搜索、动态数据源）。
*   **`attachment`**: 附件选择器。
*   **`code`**: 代码编辑器。
*   **`iconify`**: 图标选择器。
*   **`array`**: 数组/列表容器，用于定义可重复的表单组（替代已废弃的 `repeater`）。
*   **内容选择类**:
    *   `postSelect` (文章选择), `singlePageSelect` (页面选择)。
    *   `categorySelect`, `tagSelect` (分类/标签选择)。
    *   `menuSelect` (菜单选择)。

## 4. 校验规则 (`validation`)
支持 FormKit 的标准校验语法：
*   格式: `validation: "required|length:5,20"`
*   自定义消息: `validation-label: "用户名"`

## 5. YAML 示例
```yaml
spec:
  forms:
    - group: base
      label: 基础设置
      formSchema:
        - $formkit: text
          name: api_key
          label: API 密钥
          validation: required
        - $formkit: attachment
          name: default_logo
          label: 默认图标
        - $formkit: array
          name: features
          label: 功能列表
          formSchema:
            - $formkit: text
              name: feature_name
              label: 功能名称
```

## 6. 注意事项
*   **强映射**: 表单中的 `name` 必须与后端配置读取模型（如 Record 字段名）严格一致。
*   **动态性**: 建议利用 `if` 逻辑减少界面复杂度，仅显示当前开启功能相关的设置。
