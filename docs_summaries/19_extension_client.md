# Halo 资源客户端 (ExtensionClient)

`ExtensionClient` 是插件与 Halo 资源（Extensions）交互的主要手段，类似于 K8s 的客户端。

## 1. 客户端类型
*   **`ReactiveExtensionClient` (推荐)**: 基于 Project Reactor (Mono/Flux)，用于 WebFlux 异步环境。
*   **`ExtensionClient`**: 阻塞式版本，用于旧有的同步逻辑或某些特殊的后台任务。

## 2. 核心 CRUD 方法
无论哪种客户端，都提供以下标准操作：
*   **`fetch(class, name)`**: 根据名称获取单个资源。
*   **`listAll(class)`**: 获取该类型的所有资源。
*   **`listBy(class, listOptions)`**: 根据条件筛选和分页。
*   **`create(object)`**: 创建新资源。
*   **`update(object)`**: 更新资源（完全替换 `spec`）。
*   **`updateStatus(object)`**: 仅更新 `status` 字段。
*   **`delete(object/class, name)`**: 删除资源。
*   **`patch(object, patch)`**: 局部更新资源。

## 3. 查询与筛选
### LabelSelector
用于根据资源元数据中的 `labels` 进行筛选。

### FieldSelector (QueryFactory)
用于根据资源的特定字段值进行筛选。
*   支持操作：`equal`, `notEqual`, `in`, `notIn`, `contains`, `notContains` 等。
*   支持逻辑组合：`and`, `or`。

## 4. 分页与排序 (`ListOptions`)
使用 `ListOptions` 来定义分页参数：
*   `page`: 页码（从 1 开始）。
*   `size`: 每页条数。
*   `sort`: 排序字段及方向 (Direction.ASC/DESC)。

## 5. 代码示例 (Reactive)
```java
// 1. 查询
reactiveClient.listBy(Todo.class, ListOptions.builder()
    .fieldSelector(QueryFactory.equal("spec.completed", false))
    .labelSelector(LabelSelector.equal("priority", "high"))
    .page(1)
    .size(10)
    .build());

// 2. 创建并处理结果
Todo todo = new Todo();
// 设置 spec...
reactiveClient.create(todo)
    .doOnSuccess(created -> log.info("Created: {}", created.getMetadata().getName()))
    .subscribe();
```

## 6. 注意事项
*   **状态分离**: 更新业务逻辑时使用 `update`，更新处理进度或结果时使用 `updateStatus`。
*   **异常处理**: 资源不存在时，`fetch` 通常返回空的 Mono，而不会抛出 Exception，需注意处理。
