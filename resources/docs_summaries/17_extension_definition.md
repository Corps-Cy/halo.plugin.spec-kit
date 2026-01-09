# Halo 扩展定义 (Extension Definition)

Extension 是 Halo 2.x 的核心数据模型规范，任何持久化数据都应通过定义 Extension 来实现。

## 1. 核心类与接口
*   **基类**: 必须继承 `run.halo.app.extension.AbstractExtension`。
*   **注解**: 必须使用 `@GVK` 标注类的元数据。

## 2. `@GVK` 注解详解
GVK 代表 Group, Version, Kind。
*   `group`: 分组名 (通常为倒置域名, 如 `plugin.example.com`)。
*   `version`: API 版本 (如 `v1alpha1`)。
*   `kind`: 资源类型 (类名, 如 `Todo`)。
*   `plural`: 复数形式 (如 `todos`)。
*   `singular`: 单数形式 (如 `todo`)。

## 3. 内部结构
一个典型的 Extension 类包含以下部分：
*   **Spec (期望状态)**: 静态内部类。定义用户可配置的字段。
*   **Status (实际状态)**: (可选) 静态内部类。定义系统运行时的状态字段。
*   **Metadata**: (继承自父类) 包含 name, labels, annotations, version 等。

## 4. 字段校验 (@Schema)
Halo 使用 OpenAPI 的 `@Schema` 注解进行字段描述和校验：
*   `description`: 字段描述。
*   `requiredMode`: 是否必填。
*   `minLength` / `maxLength`: 字符串长度限制。
*   `minimum` / `maximum`: 数值范围限制。
*   `pattern`: 正则校验。

## 5. 代码示例
```java
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@GVK(group = "todo.plugin.halo.run", version = "v1alpha1", kind = "Todo", plural = "todos", singular = "todo")
public class Todo extends AbstractExtension {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Spec spec;

    @Schema(description = "Todo status")
    private Status status;

    @Data
    public static class Spec {
        @Schema(description = "Todo title", requiredMode = Schema.RequiredMode.REQUIRED, maxLength = 100)
        private String title;

        @Schema(description = "Is completed")
        private Boolean completed;
    }

    @Data
    public static class Status {
        private Instant completedAt;
    }
}
```

## 6. 注册
定义完 Extension 后，**必须**在插件启动时注册：
```java
// 在 StarterPlugin.start() 中
schemeManager.register(Todo.class);
```
**注意**: 在新版 Halo 中，可能通过 Spring Bean 自动扫描注册，具体需视版本而定，但显式注册是最稳妥的。
