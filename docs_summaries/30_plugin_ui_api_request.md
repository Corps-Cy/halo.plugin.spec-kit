# Halo 插件 UI API 请求 (API Request)

插件前端需要与 Halo 核心或插件后端进行通信，Halo 提供了一套封装好的 API 客户端库。

## 1. 核心依赖
*   **库名**: `@halo-dev/api-client`
*   **底层实现**: 基于 **Axios**。
*   **特性**: 自动处理认证 Token、统一的错误处理、响应式数据支持。

## 2. 内置 API 客户端
针对不同的用途，Halo 提供了几个预置的客户端对象：

*   **`coreApiClient`**: 用于操作 Halo 的核心资源（如文章、分类、用户等）以及所有的 **Extensions (自定义模型)**。
*   **`consoleApiClient`**: 用于管理后台相关的业务操作。
*   **`ucApiClient`**: 用于个人中心 (User Center) 相关的业务操作。
*   **`publicApiClient`**: 用于访问无需登录的公开接口。

## 3. 调用自定义插件 API
如果插件在后端定义了自定义的 RESTful 接口（通过控制器或 WebSocket），通常使用 `axiosInstance` 来直接调用。

### 路径规范:
自定义 API 的路径通常遵循：`/apis/{group}/{version}/{plural}/{name}/...`

### 代码示例 (调用自定义接口):
```typescript
import { axiosInstance } from "@halo-dev/api-client";

// 发起 GET 请求
async function fetchData() {
  const response = await axiosInstance.get("/apis/plugin.example.com/v1alpha1/my-resources");
  return response.data;
}

// 发起 POST 请求
async function saveData(data: any) {
  const response = await axiosInstance.post("/apis/plugin.example.com/v1alpha1/my-resources", data);
  return response.data;
}
```

## 4. 操作自定义模型 (Extension CRUD)
对于通过插件定义的 Extension 资源，推荐使用 `coreApiClient.extension` 进行标准 CRUD 操作。

### 代码示例:
```typescript
import { coreApiClient } from "@halo-dev/api-client";

// 获取名为 "my-todo" 的 Todo 资源
const todo = await coreApiClient.extension.get({
  group: "todo.plugin.halo.run",
  version: "v1alpha1",
  kind: "Todo",
  name: "my-todo"
});

// 更新资源
await coreApiClient.extension.update({
  group: "todo.plugin.halo.run",
  version: "v1alpha1",
  kind: "Todo",
  name: "my-todo",
  data: { ...todo, spec: { ... } }
});
```

## 5. 关键点
*   **响应拦截**: 客户端会自动拦截 401/403 等状态码并引导至登录页。
*   **类型定义**: `@halo-dev/api-client` 包含了绝大多数核心资源的 TypeScript 类型定义，建议开发时开启类型检查。
*   **异步操作**: 所有请求均返回 `Promise`，建议使用 `async/await` 语法。
