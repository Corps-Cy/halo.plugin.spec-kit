# Halo 插件权限与角色模板 (Role Templates)

Halo 的权限管理高度借鉴了 Kubernetes 的 RBAC (基于角色的访问控制) 模型。插件通过定义“角色模板 (Role Templates)”来声明其 API 和 UI 的访问权限。

## 1. 核心概念
*   **角色模板 (Role Template)**: 本质上是一个 `Role` 资源，但带有特定的标签 `halo.run/role-template: "true"`。
*   **声明位置**: 存放于插件的 `src/main/resources/extensions/` 目录下。
*   **作用**: 定义哪些 API 组、哪些资源、哪些操作（谓词）是允许的。

## 2. 资源型权限规则 (Resource-Type Rules)
针对遵循 `/apis/{group}/{version}/{resource}` 规范的 Extension 资源。

### 规则字段：
*   **`apiGroups`**: 资源所属的组（对应 `@GVK` 中的 group）。
*   **`resources`**: 资源名称（通常是 `plural` 形式）。
*   **`verbs`**: 允许的操作。
    *   `get`, `list`, `watch` (对应 HTTP GET)
    *   `create` (对应 HTTP POST)
    *   `update`, `patch` (对应 HTTP PUT/PATCH)
    *   `delete`, `deletecollection` (对应 HTTP DELETE)
    *   `*` (代表所有操作)

## 3. 非资源型权限规则 (Non-Resource-Type Rules)
针对自定义的 Controller 路径（如 `/healthz` 或自定义的 REST API）。

### 规则字段：
*   **`nonResourceURLs`**: 路径列表，支持通配符 `*`。
*   **`verbs`**: 允许的 HTTP 方法（小写）。

## 4. UI 权限与元数据注解
通过注解（Annotations）将后端权限与前端 UI 关联：

*   **`rbac.authorization.halo.run/module`**: 在权限管理界面中对权限进行分组显示。
*   **`rbac.authorization.halo.run/display-name`**: 权限的显示名称。
*   **`rbac.authorization.halo.run/ui-permissions`**: **【核心】** 声明该角色模板对应的 UI 权限标识符。前端的 `v-permission` 指令或 `HasPermission` 组件将根据此标识符判断显隐。
*   **`rbac.authorization.halo.run/dependencies`**: 声明依赖的其他角色模板。

## 5. YAML 示例
定义一个“待办事项管理”的角色模板：

```yaml
apiVersion: v1alpha1
kind: Role
metadata:
  name: todo-manager
  labels:
    halo.run/role-template: "true"
  annotations:
    rbac.authorization.halo.run/module: "待办事项插件"
    rbac.authorization.halo.run/display-name: "管理权限"
    rbac.authorization.halo.run/ui-permissions: '["plugin:todo:manage"]'
rules:
  # 允许对 Todo 资源进行所有操作
  - apiGroups: ["todo.plugin.halo.run"]
    resources: ["todos"]
    verbs: ["*"]
  # 允许访问自定义统计接口
  - nonResourceURLs: ["/apis/todo.plugin.halo.run/v1alpha1/stats"]
    verbs: ["get"]
```

## 6. 关键机制
*   **聚合**: Halo 会将这些模板展示在管理后台的“角色管理”中，管理员可以将多个模板组合成一个角色分配给用户。
*   **自动校验**: 一旦定义并加载，Halo 的安全框架会自动拦截不符合规则的 API 请求。
*   **命名规范**: 模板 `name` 建议加上插件名前缀，防止与核心或其他插件冲突。
