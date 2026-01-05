# Halo 插件注册与配置 (plugin.yaml)

`plugin.yaml` 是插件的描述文件，位于 `src/main/resources/` 下。它是 Halo 识别并加载插件的核心入口。

## 1. 基础元数据
*   **`apiVersion`**: 目前固定为 `plugin.halo.run/v1alpha1`。
*   **`kind`**: 固定为 `Plugin`。
*   **`metadata.name`**: 
    *   插件的唯一标识符。
    *   **规范**: 最多 253 个字符，仅限小写字母、数字、连字符 (`-`)，必须以字母或数字开头及结尾。

## 2. 核心规格 (`spec`)
*   **`version`**: 插件版本号。
*   **`requires`**: 依赖的 Halo 版本。支持 SemVer 表达式（如 `>=2.10.0`）。
*   **`displayName`**: 插件的显示名称（中文友好）。
*   **`description`**: 插件的详细描述。
*   **`author`**: 作者信息（`name` 和 `website`）。
*   **`logo`**: 插件图标（支持 URL 或相对于 `src/main/resources` 的路径）。
*   **`homepage` / `repo` / `issues`**: 相关项目链接。
*   **`license`**: 授权协议信息。

## 3. 配置相关 (可选)
*   **`settingName`**: 
    *   定义插件配置表单的资源名称。
    *   **建议**: `plugin-name-settings`。
    *   **注意**: 若配置了此项，必须在插件中定义对应的 `Setting` 资源。
*   **`configMapName`**: 
    *   存储配置数据的 ConfigMap 名称。
    *   **建议**: `plugin-name-configmap`。

## 4. 注意事项
*   该文件是强制性的，格式必须为有效的 YAML。
*   字段的准确性直接影响插件的加载和在管理后台的展示。
