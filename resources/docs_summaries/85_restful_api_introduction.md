# Halo RESTful API 介绍 (Introduction)

Halo 2.x 的 RESTful API 采用了类 Kubernetes 的设计风格，为控制台（Console）、个人中心（UC）以及外部客户端提供统一的数据交互接口。

## 1. 设计风格
*   **声明式风格**: 模仿 Kubernetes 的 API 设计，资源通过 Group、Version、Kind (GVK) 进行组织。
*   **非阻塞**: 后端基于 Spring WebFlux，API 调用具有高性能异步特性。

## 2. 路径规范 (URL Patterns)
API 路径遵循统一的资源定位规范：

*   **核心资源与插件资源**:
    *   通用格式: `/apis/{group}/{version}/{resources}/{name}`
    *   示例: `/apis/api.halo.run/v1alpha1/posts`
    *   插件示例: `/apis/todo.plugin.halo.run/v1alpha1/todos`

*   **Console 专用 API**: `/api/console.halo.run/v1alpha1/...`
*   **UC 专用 API**: `/api/uc.halo.run/v1alpha1/...`

## 3. 认证方式
*   **个人访问令牌 (Personal Access Token, PAT)**: 
    *   开发者可以在“个人中心 -> 个人资料 -> 访问令牌”中生成。
    *   使用方式: 在 HTTP 请求头中添加 `Authorization: Bearer <your-token>`。
*   **Basic Auth**: 自 Halo 2.20 起默认禁用，不推荐使用。

## 4. API 文档与在线调试
*   **Swagger UI**: 
    *   官方在线文档: [https://api.halo.run](https://api.halo.run)
    *   本地环境: 如果开启了开发者模式，通常可以通过 `/swagger-ui.html` 访问。
*   **OpenAPI 规范**: 整个系统完全符合 OpenAPI v3 规范，支持通过各种工具（如 Postman, Insomnia）导入。

## 5. 关键点
*   **强类型**: 所有的 Extension 资源都有严格的结构定义。
*   **权限绑定**: API 访问受 RBAC 权限控制，必须在角色模板中声明对应的谓词（get, list, create 等）权限。
