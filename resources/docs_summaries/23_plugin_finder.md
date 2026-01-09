# Halo 插件为主题提供数据 (Finder)

`Finder` 是插件与主题（Theme）之间的桥梁，允许插件将其管理的数据暴露给主题模板（如 Thymeleaf）。

## 1. 核心职能
*   **用途**: 让主题开发者能够调用插件的方法获取数据。
*   **场景**: 例如：一个友情链接插件需要让主题在侧边栏显示链接列表；一个天气插件需要让主题显示当前天气情况。

## 2. 实现步骤

### 第一步：定义接口
接口必须继承 `run.halo.app.extension.Finder` (或其子接口，视版本而定，通常是一个普通的 Java 接口即可，但方法需返回响应式类型)。
```java
public interface MyPluginFinder {
    Mono<String> getHello(String name);
    Flux<Todo> listAllTodos();
}
```

### 第二步：实现接口并添加 `@Finder` 注解
*   必须使用 `@Finder` 注解标注实现类。
*   **命名规范**: 建议以插件名作为前缀，防止重名冲突（如 `myPluginTodoFinder`）。
*   **注册**: 实现类应作为一个 Spring `@Component`。

```java
@Component
@Finder("myPluginTodoFinder")
public class MyPluginFinderImpl implements MyPluginFinder {
    private final ReactiveExtensionClient extensionClient;

    public MyPluginFinderImpl(ReactiveExtensionClient extensionClient) {
        this.extensionClient = extensionClient;
    }

    @Override
    public Mono<String> getHello(String name) {
        return Mono.just("Hello, " + name);
    }

    @Override
    public Flux<Todo> listAllTodos() {
        return extensionClient.listAll(Todo.class);
    }
}
```

## 3. 主题端调用
主题开发者可以在 Thymeleaf 模板中直接通过注解定义的名称访问：

```html
<!-- 在主题模板中 -->
<ul>
    <li th:each="todo : ${myPluginTodoFinder.listAllTodos()}">
        <span th:text="${todo.spec.title}"></span>
    </li>
</ul>
```

## 4. 关键点
*   **响应式**: 方法返回值必须是 `Mono` 或 `Flux`，因为 Halo 2.x 的模板引擎是异步渲染的。
*   **参数**: Finder 方法可以接受参数，由主题模板传入。
*   **无状态**: Finder 应该只负责数据查询，不建议在其中包含修改状态的操作。
