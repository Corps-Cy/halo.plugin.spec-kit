# Halo 服务端扩展点：通知器 (Notifier)

`Notifier`（响应式版本为 `ReactiveNotifier`）是通知系统的投递端扩展，允许插件为 Halo 注入新的通知渠道，如钉钉机器人、飞书、自定义邮件服务或短信网关。

## 1. 核心职能
*   **用途**: 实现将通知内容（Notification）投递到具体渠道的逻辑。
*   **特性**: 插件化。系统发出的通知会根据用户的订阅配置，由对应的 `Notifier` 执行投递。

## 2. 核心接口 `ReactiveNotifier`
插件需要实现该接口。

### 关键方法：
*   **`notify(context)`**: 
    *   **逻辑**: 执行具体的投递动作。
    *   `context`: 包含通知的内容、渲染后的模板、接收者的配置（如邮箱地址、Webhook URL）。
    *   **返回**: `Mono<Void>`。

## 3. 实现步骤

### 第一步：实现接口
```java
@Component
public class MyWebhookNotifier implements ReactiveNotifier {
    @Override
    public Mono<Void> notify(NotificationContext context) {
        // 1. 获取接收者配置 (通常在用户订阅时填写)
        String webhookUrl = context.getReceiverConfig().get("url");

        // 2. 获取通知内容
        String message = context.getRenderedContent();

        // 3. 使用 WebClient 发送请求
        return webClient.post()
            .uri(webhookUrl)
            .bodyValue(Map.of("text", message))
            .retrieve()
            .bodyToMono(Void.class);
    }
}
```

### 第二步：定义 `ExtensionDefinition`
```yaml
apiVersion: plugin.halo.run/v1alpha1
kind: ExtensionDefinition
metadata:
  name: my-webhook-notifier
spec:
  extensionPointName: "reactive-notifier"
  className: "myWebhookNotifier"
  displayName: "Webhook 通知器"
```

## 4. 辅助资源 `NotifierDescriptor`
除了 `ExtensionDefinition`，通常还需要定义一个 `NotifierDescriptor` 资源，用来向用户描述该通知器支持哪些配置项（如：发件人设置、接收人设置）。

```yaml
apiVersion: notification.halo.run/v1alpha1
kind: NotifierDescriptor
metadata:
  name: my-webhook-notifier
spec:
  displayName: "Webhook 通知器"
  # 引用一个定义好的 Setting 资源，用于配置该通知器的全局参数
  senderSettingName: my-webhook-sender-setting
  # 引用一个定义好的 Setting 资源，用于用户在订阅时填写的个人参数 (如 URL)
  receiverSettingName: my-webhook-receiver-setting
```

## 5. 关键机制
*   **解耦**: 业务代码只管发送通知理由（Reason），系统自动根据订阅关系找到对应的 `Notifier` 进行投递。
*   **异步**: 全程响应式，不会因为通知发送慢而阻塞业务。

## 6. 适用场景
*   集成企业即时通讯工具（钉钉、企业微信、飞书）。
*   集成第三方短信、语音告警平台。
*   自定义邮件推送逻辑。
