# Halo 服务端扩展点：用户名密码认证管理器 (UsernamePasswordAuthenticationManager)

`UsernamePasswordAuthenticationManager` 允许插件接管或扩展 Halo 的标准登录验证逻辑（即用户名 + 密码登录）。

## 1. 核心职能
*   **用途**: 提供自定义的身份验证实现。
*   **特性**: 这是一个 **SINGLETON (单例)** 扩展点。当系统中存在多个实现并启用了其中一个时，它将替换 Halo 默认的数据库验证逻辑。
*   **场景**: 接入 LDAP、企业统一身份认证、外部数据库校验等。

## 2. 核心接口 `UsernamePasswordAuthenticationManager`
插件需要实现该接口。

### 关键方法：
*   **`authenticate(username, password)`**: 
    *   **逻辑**: 执行具体的验证操作。
    *   **返回**: `Mono<AuthenticationResponse>`。
        *   验证成功：返回包含用户信息和认证状态的响应。
        *   验证失败：返回错误信息。

## 3. 实现步骤

### 第一步：实现接口
```java
@Component
public class LdapAuthenticationManager implements UsernamePasswordAuthenticationManager {
    @Override
    public Mono<AuthenticationResponse> authenticate(String username, String password) {
        // 1. 调用 LDAP SDK 进行校验...
        boolean isValid = ldapCheck(username, password);
        
        if (isValid) {
            // 2. 校验成功，返回用户认证信息
            return Mono.just(AuthenticationResponse.authenticated(username));
        }
        
        // 3. 校验失败
        return Mono.just(AuthenticationResponse.unauthenticated("Ldap 验证失败"));
    }
}
```

### 第二步：定义 `ExtensionDefinition`
```yaml
apiVersion: plugin.halo.run/v1alpha1
kind: ExtensionDefinition
metadata:
  name: ldap-auth-manager
spec:
  extensionPointName: "username-password-authentication-manager"
  className: "ldapAuthenticationManager"
  displayName: "LDAP 认证管理器"
```

## 4. 关键机制
*   **单例覆盖**: 系统全局只能启用一个认证管理器。一旦启用插件提供的实现，系统内置的 `DefaultUsernamePasswordAuthenticationManager` 将被停用。
*   **安全增强**: 建议配合 `LoginHandlerEnhancer` 使用，以确保自定义认证成功后能触发标准的审计和 Session 处理流程。

## 5. 适用场景
*   企业级内网系统的 LDAP / AD 域集成。
*   将 Halo 挂载到已有的第三方用户中心。
*   实现特殊的密码加密/比对算法。
