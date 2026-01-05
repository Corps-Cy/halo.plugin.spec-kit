# Halo 扩展获取 (ExtensionGetter)

`ExtensionGetter` 是 Halo 提供的一个服务端接口，用于插件获取和管理由 Halo 核心或其他插件提供的扩展点（Extension Points）实现。

## 1. 核心职能
*   **用途**: 获取特定扩展接口的已启用实现。
*   **特性**: 允许插件动态地接入 Halo 提供的各种功能（如：搜索引擎、存储方案、认证方式等），而无需关心具体的实现类。

## 2. 与 `ExtensionClient` 的区别
*   **`ExtensionClient`**: 用于操作 **数据模型 (CRD)**，如 Todo, Post, Category 等。它关注的是“数据”。
*   **`ExtensionGetter`**: 用于获取 **扩展功能实现**，如某个已启用的 `SearchEngine` 或 `StorageProvider`。它关注的是“行为/功能”。

## 3. 核心方法
根据扩展点的类型（单例或多实例），提供不同的获取方式：

*   **`getEnabledExtension(Class<T> extensionPoint)`**:
    *   获取单个已启用的扩展实现。
    *   如果用户没有配置，通常会返回系统默认的一个。
    *   适用于 `SINGLETON` 类型的扩展点。
*   **`getEnabledExtensions(Class<T> extensionPoint)`**:
    *   获取所有已启用的扩展实现列表。
    *   适用于 `MULTI_INSTANCE` 类型的扩展点。
*   **`getExtensions(Class<T> extensionPointClass)`**:
    *   获取所有已定义的扩展实现，不论其是否被启用。

## 4. 代码实现示例
假设我们需要在插件中使用当前系统已启用的“搜索引擎”功能：

```java
@Service
public class MySearchService {

    private final ExtensionGetter extensionGetter;

    public MySearchService(ExtensionGetter extensionGetter) {
        this.extensionGetter = extensionGetter;
    }

    public void doSearch(String keyword) {
        // 获取当前启用的搜索引擎扩展实现
        extensionGetter.getEnabledExtension(SearchEngine.class)
            .ifPresent(searchEngine -> {
                searchEngine.search(keyword);
            });
    }
}
```

## 5. 关键点
*   **解耦**: 插件开发者只需要依赖接口（如 `SearchEngine`），具体的实现可以由不同的插件提供（如 Elasticsearch 插件或 Meilisearch 插件）。
*   **动态性**: 当用户在后台切换了默认实现时，`ExtensionGetter` 获取到的对象会自动更新。
*   **安全**: 该方法是线程安全的，适合在 Spring Bean 中直接使用。
