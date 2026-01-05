# Halo 插件对象管理 (Object Management)

Halo 插件系统紧密集成 Spring 框架，允许开发者像开发标准 Spring Boot 项目一样管理插件内部的对象。

## 1. Spring 上下文关系
*   **独立上下文**: 每个插件拥有自己独立的 Spring `ApplicationContext`。
*   **隔离性**: 这种隔离确保了插件间的 Bean 不会发生命名冲突，同时也方便了插件的动态加载和卸载。

## 2. 核心 Bean 的注入
Halo 核心提供了一系列 **Shared Beans (共享 Bean)**，插件可以直接通过 `@Autowired` 或构造器注入这些核心服务。
### 常用共享 Bean 列表：
*   **`ReactiveExtensionClient`**: 用于非阻塞地操作 Extension 资源（推荐使用）。
*   **`ExtensionClient`**: 用于阻塞式操作 Extension 资源。
*   **`SchemeManager`**: 用于管理资源的元数据和结构。
*   **`UserService` / `RoleService`**: 用户和权限管理。
*   **`OptionService`**: 系统选项配置。
*   **`PostService` / `CategoryService`**: 文章、分类等内容管理。

## 3. 插件内部 Bean 管理
*   **标准注解**: 插件内可使用 `@Component`, `@Service`, `@Repository`, `@Controller` 等标准注解定义 Bean。
*   **组件扫描**: Halo 会自动扫描插件包路径下的注解类。
*   **配置类**: 支持使用 `@Configuration` 和 `@Bean` 进行更复杂的对象初始化。

## 4. 依赖注入范式
推荐使用 **构造器注入** 替代字段注入（`@Autowired`），这样不仅符合 Spring 的最佳实践，也便于编写单元测试。

```java
@Component
public class MyService {
    private final ReactiveExtensionClient extensionClient;

    public MyService(ReactiveExtensionClient extensionClient) {
        this.extensionClient = extensionClient;
    }
}
```

## 5. 与核心交互的注意事项
*   虽然可以注入核心 Bean，但核心 Bean 默认**无法**反向注入插件内部定义的 Bean（除非通过特殊的扩展点接口）。
*   插件间的 Bean 相互不可见，除非通过特定机制导出。
