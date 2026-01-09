# Halo 控制器与协调器 (Controller & Reconciler)

协调器是 Halo 2.x 业务逻辑的核心居住地。它通过监听 Extension 资源的变化，确保系统的“实际状态”最终符合用户的“期望状态”。

## 1. 核心接口 `Reconciler`
一个协调器必须实现 `run.halo.app.extension.controller.Reconciler` 接口。

### 核心方法：`Result reconcile(Request request)`
*   **入参**: `Request` 仅包含资源的 `name`。
*   **逻辑**: 需要根据 `name` 从 `ExtensionClient` 获取完整的资源对象，然后对比 `spec` 和 `status`。
*   **返回值**: `Result`。
    *   `null`: 处理成功，无需重试。
    *   `Result(true, Duration.ofSeconds(10))`: 出错或由于外部原因需要延迟 10 秒后重试。

## 2. 协调逻辑准则
1.  **幂等性 (Idempotency)**: 同样的操作执行多次结果应一致。因为协调器可能会因为各种原因（网络抖动、并发、错误）被多次触发。
2.  **只看状态**: 不要假设你是被哪种事件（创建、更新）触发的，只看当前的 `spec` 应该是什么，并把系统状态改过去。
3.  **错误重试**: 协调器内部抛出异常会导致自动重试，重试间隔通常会指数级增加。

## 3. 注册与配置 (`setupWith`)
每个协调器通常也是一个 Spring Bean，并实现 `run.halo.app.extension.controller.Controller` 接口。

```java
@Component
public class MyReconciler implements Reconciler, Controller {
    
    @Override
    public Result reconcile(Request request) {
        // 业务逻辑...
        return null;
    }

    @Override
    public void setupWith(ControllerBuilder builder) {
        builder.extension(Todo.class) // 监听 Todo 资源
               .workerCount(2)        // 并发处理数
               // .onUpdateMatcher(...) // 可选：过滤事件
               ;
    }
}
```

## 4. 关键模式
*   **Finalizers (终止器)**: 用于在资源被彻底删除前执行清理逻辑（如删除关联的文件或外部 API 数据）。
*   **Status 更新**: 协调器应负责更新资源的 `status` 字段，以反馈执行结果。

## 5. 代码示例
```java
public Result reconcile(Request request) {
    // 1. 获取资源
    return client.fetch(Todo.class, request.getName())
        .flatMap(todo -> {
            // 2. 检查是否正在被删除
            if (todo.getMetadata().getDeletionTimestamp() != null) {
                // 执行清理逻辑...
                return Finalizers.removeFinalizer(client, todo, "my-finalizer");
            }
            // 3. 执行核心业务逻辑 (如调用外部 API)
            // 4. 更新 Status
            todo.getStatus().setPhase("Completed");
            return client.updateStatus(todo);
        })
        .map(it -> Result.none())
        .onErrorResume(e -> Mono.just(new Result(true, Duration.ofSeconds(30))));
}
```
**注意**: 这里的代码使用了 **Project Reactor (Mono/Flux)**，因为 Halo 2.x 后端是全异步的。
