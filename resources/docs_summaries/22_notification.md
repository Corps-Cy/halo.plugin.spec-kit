# Halo 通知系统 (Notification System)

Halo 提供了一套基于事件驱动的消息通知机制，允许插件向用户发送系统提醒、业务动态等通知。

## 1. 核心概念
*   **ReasonType**: 通知类型定义。定义了某种通知的元数据（如：名称、所属分组）。
*   **Reason**: 通知的具体实例。包含通知发生时的上下文参数（变量）。
*   **NotificationTemplate**: 通知模板。使用 Thymeleaf 语法定义不同渠道（站内信、邮件等）的渲染内容。
*   **NotificationReasonEmitter**: 用于发送通知的接口。

## 2. 发送通知的流程

### 第一步：定义通知类型 (`ReasonType`)
通常以 YAML 资源形式定义在 `src/main/resources/extensions/`。
```yaml
apiVersion: notification.halo.run/v1alpha1
kind: ReasonType
metadata:
  name: comment-received
spec:
  displayName: "收到新评论"
  group: content-update
```

### 第二步：定义通知模板 (`NotificationTemplate`)
定义通知在不同渠道的展示内容。
```yaml
apiVersion: notification.halo.run/v1alpha1
kind: NotificationTemplate
metadata:
  name: comment-received-template
spec:
  reasonType: comment-received
  channel: internal-message # 站内信
  content: "您收到一条来自 [(${author})] 的新评论。"
```

### 第三步：在代码中发送通知
注入 `NotificationReasonEmitter` 并调用其 `publish` 方法。
```java
@Service
public class CommentService {
    private final NotificationReasonEmitter reasonEmitter;

    public Mono<Void> onCommentReceived(Comment comment) {
        // 创建 Reason 对象，包含业务参数
        Reason reason = new Reason();
        reason.setReasonType("comment-received");
        reason.setParameters(Map.of(
            "author", comment.getAuthorName(),
            "content", comment.getContent()
        ));
        
        // 发送通知
        return reasonEmitter.publish(reason);
    }
}
```

## 3. 核心机制
*   **解耦**: 插件只需发送 `Reason`，无需关心用户是否订阅或通过什么渠道接收。
*   **订阅制**: 用户可以在 Halo 后端配置自己对哪些 `ReasonType` 感兴趣，以及接收渠道。
*   **响应式**: 发送接口返回 `Mono<Void>`，符合 2.x 的非阻塞标准。

## 4. 适用场景
*   用户互动提醒（评论、点赞）。
*   业务状态变更（订单发货、审核通过）。
*   系统安全告警。
