# Halo API Client 请求库 (@halo-dev/api-client)

`@halo-dev/api-client` 是 Halo 官方提供的一个 JavaScript SDK，旨在简化插件 UI 或外部客户端与 Halo 后端 API 的交互。

## 1. 核心定位
*   **用途**: 提供强类型的 API 调用能力，支持核心资源、控制台业务、个人中心业务以及所有自定义资源（Extensions）的 CRUD 操作。
*   **基础**: 基于 Axios 构建。
*   **兼容性**: 支持浏览器 (Browser) 和 Node.js 环境。

## 2. 预置客户端对象
库中内置了几个针对不同场景的客户端实例：

*   **`coreApiClient`**: **【最常用】** 用于操作所有通过 Extension 定义的资源（文章、分类、标签及插件自定义模型）。
*   **`consoleApiClient`**: 用于管理后台特有的业务逻辑接口。
*   **`ucApiClient`**: 用于个人中心 (User Center) 特有的业务逻辑接口。
*   **`publicApiClient`**: 用于访问无需鉴权的公开接口。

## 3. 自定义配置 (外部应用)
如果在插件 UI 之外使用，需要手动配置 Axios 实例：

```typescript
import { createCoreApiClient } from "@halo-dev/api-client";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://your-halo-site.com",
  headers: {
    Authorization: `Bearer pat_your_personal_access_token`,
  },
});

const coreClient = createCoreApiClient(axiosInstance);
```

## 4. 常用操作示例 (CRUD)

### 获取资源列表
```typescript
const posts = await coreApiClient.extension.list({
  group: "api.halo.run",
  version: "v1alpha1",
  kind: "Post",
});
```

### 创建自定义模型资源
```typescript
await coreApiClient.extension.create({
  group: "todo.plugin.halo.run",
  version: "v1alpha1",
  kind: "Todo",
  data: {
    metadata: { name: "my-first-todo" },
    spec: { title: "学习 Halo 开发", completed: false }
  }
});
```

## 5. 关键特性
*   **类型安全**: 提供了完整的 TypeScript 定义，包含所有核心资源的字段结构。
*   **拦截器**: 内部集成了标准的状态码处理逻辑。
*   **扩展性**: 支持通过 `axiosInstance` 添加自定义拦截器。

## 6. 注意事项
*   **插件环境**: 在插件 UI 开发中，通常直接使用 `@halo-dev/api-client` 导出的预置实例，无需手动配置 BaseURL。
*   **版本要求**: 建议使用与 Halo 核心版本匹配的 SDK 版本。
