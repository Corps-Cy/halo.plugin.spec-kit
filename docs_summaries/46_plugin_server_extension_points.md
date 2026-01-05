# Halo 服务端扩展点 (Server-side Extension Points)

服务端扩展点允许插件在不修改 Halo 核心逻辑的前提下，为系统注入特定的功能实现（如：新的存储方式、认证方式、内容处理逻辑等）。

## 1. 核心概念
*   **扩展点接口 (Extension Point Interface)**: 由 Halo 核心定义的接口，描述了某种功能的标准行为。
*   **实现类 (Implementation)**: 插件通过实现这些接口来提供具体功能。
*   **ExtensionDefinition**: 每一个扩展点的实现必须对应一个 `ExtensionDefinition` 资源，用于向系统描述该实现（名称、说明、指向的扩展点）。

## 2. 实现流程

### 第一步：编写实现类
实现类必须是一个 Spring Bean (`@Component`)，并实现指定的扩展点接口。

```java
@Component
public class MyEmailNotifier implements ReactiveNotifier {
    @Override
    public Mono<Void> notify(Notification notification) {
        // 实现邮件发送逻辑...
        return Mono.empty();
    }
}
```

### 第二步：定义 `ExtensionDefinition` 资源
通常在 `src/main/resources/extensions` 下创建一个 YAML 文件。

```yaml
apiVersion: plugin.halo.run/v1alpha1
kind: ExtensionDefinition
metadata:
  name: my-email-notifier
spec:
  displayName: "我的邮件通知器"
  description: "通过自定义 API 发送邮件"
  # 关键：指定该实现所属的扩展点 ID
  extensionPointName: "reactive-notifier"
  # 关键：指定对应的 Spring Bean 名称 (通常是类名首字母小写)
  className: "myEmailNotifier"
```

## 3. 常见扩展点列表
*   **`reactive-notifier`**: 响应式通知器（如邮件、短信、Webhook）。
*   **`attachment-storage`**: 附件存储方案（如 OSS、S3、本地存储）。
*   **`post-content-processor`**: 文章内容处理器（用于在展示前修改文章 HTML）。
*   **`comment-subject-display`**: 评论主体显示扩展。
*   **`web-filter`**: 标准 Web 过滤器。
*   **`auth-security-filter`**: 安全认证过滤器。
*   **`username-password-auth-manager`**: 用户名密码认证管理器。

## 4. 关键机制
*   **松耦合**: 核心只调用接口，具体由哪个插件实现、开启了哪个实现，由系统配置和 `ExtensionDefinition` 决定。
*   **动态性**: 插件卸载时，对应的 `ExtensionDefinition` 会失效，核心会自动切换或停用该功能。
*   **组合性**: 某些扩展点支持多个实现同时工作（如多个内容处理器按顺序执行）。

## 5. 注意事项
*   **Bean 名称**: `className` 必须与 Spring 容器中的 Bean ID 严格一致。
*   **注册**: 确保实现类所在的包被插件正确扫描。
