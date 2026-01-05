# Halo 登录增强 (Login Handler Enhancer)

`LoginHandlerEnhancer` 是 Halo 提供的一个核心工具接口，用于确保插件自定义的登录逻辑（如 OAuth2、扫码登录等）能够与系统的标准登录行为（如审计日志、Remember-Me 状态、安全校验等）保持一致。

## 1. 核心职能
*   **用途**: 当插件实现自定义登录方式时，调用此接口告知 Halo 登录的结果，从而触发系统级的后续处理。
*   **目的**: 解决自定义登录逻辑与系统核心逻辑不一致的问题（例如：自定义登录后没有记录登录日志，或者没有正确设置会话 Cookie）。

## 2. 核心接口方法
`LoginHandlerEnhancer` 提供了两个关键方法：

*   **`onLoginSuccess(LoginSuccessEvent event)`**:
    *   在自定义登录验证成功后调用。
    *   **作用**: 触发系统记录成功日志、更新用户最后登录时间、设置安全上下文和 Cookie。
*   **`onLoginFailure(LoginFailureEvent event)`**:
    *   在自定义登录验证失败后调用。
    *   **作用**: 触发系统记录失败日志、可能的 IP 锁定逻辑等。

## 3. 使用场景
如果你的插件正在开发以下功能，则需要使用它：
*   **第三方授权登录**: 接入 GitHub、微信等第三方登录。
*   **多因素认证 (MFA)**: 在标准登录后增加额外的校验步骤。
*   **自定义认证协议**: 实现如 LDAP 或 CAS 等认证方式。

## 4. 代码实现示例
假设插件通过一个自定义的 Controller 处理登录逻辑：

```java
@Component
public class MyCustomAuthHandler {

    private final LoginHandlerEnhancer loginHandlerEnhancer;

    public MyCustomAuthHandler(LoginHandlerEnhancer loginHandlerEnhancer) {
        this.loginHandlerEnhancer = loginHandlerEnhancer;
    }

    public Mono<Void> handleLogin(ServerWebExchange exchange, User user) {
        // 1. 插件内部的验证逻辑...
        boolean success = verify(user);

        if (success) {
            // 2. 验证成功后，通知系统进行“登录增强”处理
            return loginHandlerEnhancer.onLoginSuccess(
                LoginSuccessEvent.builder()
                    .user(user)
                    .exchange(exchange)
                    .build()
            );
        } else {
            // 3. 验证失败
            return loginHandlerEnhancer.onLoginFailure(
                LoginFailureEvent.builder()
                    .username(user.getMetadata().getName())
                    .exchange(exchange)
                    .reason("Invalid credentials")
                    .build()
            );
        }
    }
}
```

## 5. 注意事项
*   **非拦截器**: 它是被动调用的工具类，而不是自动触发的拦截器。
*   **响应式**: 方法返回 `Mono<Void>`，必须在响应式流中正确处理订阅。
*   **用户上下文**: 调用 `onLoginSuccess` 后，Halo 会处理剩余的会话创建工作，开发者无需再手动操作 Session 或 Cookie。
