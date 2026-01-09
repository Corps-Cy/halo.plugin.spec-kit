# Halo 插件 WebSocket 实现 (WebSocket)

Halo 插件可以通过实现 `WebSocketEndpoint` 接口轻松集成实时双向通信功能。

## 1. 核心接口 `WebSocketEndpoint`
插件开发者无需手动配置底层的 WebSocket 容器，只需定义一个实现该接口的 Spring Bean 即可。

### 接口方法：
*   **`groupVersion()`**: 定义 API 的分组和版本（如 `plugin.example.com/v1alpha1`）。
*   **`urlPath()`**: 定义具体的路径（如 `chat`）。
*   **`handler()`**: 返回核心的处理逻辑 `WebSocketHandler`。

## 2. 自动注册机制
*   **注册路径**: `ws://{host}:{port}/apis/{groupVersion}/{urlPath}`。
*   **生命周期**: 随插件启用自动开启，随插件禁用自动关闭。

## 3. 代码实现示例

```java
@Component
public class MyChatEndpoint implements WebSocketEndpoint {

    @Override
    public String groupVersion() {
        return "my-plugin.halo.run/v1alpha1";
    }

    @Override
    public String urlPath() {
        return "chat";
    }

    @Override
    public WebSocketHandler handler() {
        return session -> {
            // 处理接收到的消息 (Inbound)
            return session.receive()
                .map(WebSocketMessage::getPayloadAsText)
                .map(text -> "Echo from Halo: " + text.toUpperCase())
                // 构建发送的消息 (Outbound)
                .map(session::textMessage)
                .as(session::send);
        };
    }
}
```

## 4. 关键点
*   **Reactive**: 基于 Spring WebFlux 的 `WebSocketHandler`，全异步非阻塞。
*   **Session 管理**: `WebSocketSession` 提供了获取客户端信息（ID、属性、握手信息）和手动关闭连接的能力。
*   **消息类型**: 支持文本消息 (`textMessage`)、二进制消息 (`binaryMessage`)、Ping/Pong。

## 5. 安全与权限
*   **权限校验**: 默认情况下，WebSocket 路径受 Halo 的安全框架保护。可以在 `groupVersion` 和 `urlPath` 对应的 API 权限配置中进行授权。
*   **认证**: 握手时会自动关联当前的 `SecurityContext`。

## 6. 适用场景
*   实时通知/消息推送。
*   在线协作（如多人同时编辑）。
*   后台长时间任务的进度反馈。
