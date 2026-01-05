# Halo 插件事件共享 (Shared Events)

事件共享是 Halo 提供的一种强大的异步解耦通信机制，允许插件之间、插件与核心之间通过发布/订阅模式进行交互。

## 1. 核心概念
*   **共享事件 (@SharedEvent)**: 标准的 Spring `ApplicationEvent`，只需添加 `@SharedEvent` 注解，Halo 就会将其自动分发到所有插件的事件总线上。
*   **发布者**: 调用 `ApplicationEventPublisher` 发布事件。
*   **订阅者**: 使用标准的 Spring `@EventListener` 监听事件。

## 2. 发布流程

### 第一步：定义共享事件类
事件类应定义在 `api` 模块中，以便其他插件引用。
```java
@SharedEvent
public class MyPluginEvent extends ApplicationEvent {
    private final String message;

    public MyPluginEvent(Object source, String message) {
        super(source);
        this.message = message;
    }
    // getter...
}
```

### 第二步：发布事件
```java
@Service
public class MyService {
    private final ApplicationEventPublisher publisher;

    public void doSomething() {
        // ...业务逻辑
        publisher.publishEvent(new MyPluginEvent(this, "Operation Success"));
    }
}
```

## 3. 订阅流程

### 第一步：引入依赖
订阅方插件必须在其 `plugin.yaml` 中声明对发布方插件的依赖，并引入对应的 API JAR 包。

### 第二步：编写监听器
```java
@Component
public class OtherPluginListener {

    @EventListener
    public void onMyPluginEvent(MyPluginEvent event) {
        log.info("监听到来自其他插件的事件: {}", event.getMessage());
    }
}
```

## 4. 关键点：类加载一致性
*   **重中之重**: 为了让 `@EventListener` 能正确匹配事件类型，发布方和订阅方必须引用**同一个类加载器**加载的事件类。
*   **实践**: 发布方将事件类放在 `api` 模块，订阅方通过 `compileOnly` 引入该 API 包，并确保 `plugin.yaml` 中的依赖声明能让 Halo 建立正确的类共享关系。

## 5. 与标准 Spring 事件的区别
*   **标准 Spring 事件**: 默认仅在当前的 `ApplicationContext`（即单个插件内部）有效。
*   **Halo 共享事件**: 跨越插件边界，实现全系统级的广播。

## 6. 适用场景
*   **审计/日志**: 监听关键业务事件并记录。
*   **缓存清理**: 上游插件数据更新后，下游插件监听事件清理缓存。
*   **扩展逻辑**: 核心事件发生后（如“文章发布”），插件自动执行额外操作。
