# Halo UI 权限控制 (UI Permission)

UI 权限控制是 Halo 前后端权限体系的桥梁。它允许开发者定义纯字符串形式的权限标识（如 `plugin:todo:view`），并在后端角色模板中声明这些标识，最终在前端用于控制菜单和按钮的显隐。

## 1. 核心流程
1.  **定义 (后端)**: 在 `Role` 资源的注解中声明 UI 权限标识。
2.  **分配 (后端)**: 将该角色分配给用户（通过 RoleBinding）。
3.  **消费 (前端)**: 用户的 Token 中携带了这些权限，前端组件通过指令或组件读取并判断。

## 2. 定义 UI 权限
在 `src/main/resources/extensions` 下的角色模板 YAML 中：

```yaml
apiVersion: v1alpha1
kind: Role
metadata:
  name: todo-viewer
  labels:
    halo.run/role-template: "true"
  annotations:
    # 核心：声明该角色拥有的 UI 权限
    rbac.authorization.halo.run/ui-permissions: |
      ["plugin:todo:view", "plugin:todo:read-only"]
rules:
  # 后端 API 权限 (GVK + Verbs)
  - apiGroups: ["todo.plugin.halo.run"]
    resources: ["todos"]
    verbs: ["get", "list"]
```

## 3. 使用 UI 权限 (前端)

### 3.1 路由/菜单守卫
在 `ui/src/index.ts` 的路由定义中：
```typescript
routes: [
  {
    path: "/todos",
    name: "PluginTodoView",
    meta: {
      // 只有拥有此权限的用户才能看到菜单并访问路由
      permissions: ["plugin:todo:view"],
      menu: { ... }
    }
  }
]
```

### 3.2 元素/按钮守卫
在 Vue 组件中：
```vue
<template>
  <!-- 使用 v-permission 指令 -->
  <VButton v-permission="['plugin:todo:create']">新建任务</VButton>

  <!-- 使用 HasPermission 组件 -->
  <HasPermission :permissions="['plugin:todo:manage']">
    <div class="admin-panel">...</div>
  </HasPermission>
</template>
```

## 4. 最佳实践
*   **命名规范**: 推荐格式 `plugin:{plugin-name}:{resource}:{action}`。例如 `plugin:todo:task:delete`。
*   **粒度**:
    *   `view`: 用于控制菜单和只读页面的访问。
    *   `manage`: 用于控制增删改按钮的显示。
*   **对应关系**: UI 权限通常应与后端 API 规则（Rules）保持逻辑一致。例如，如果 UI 权限允许看到“删除按钮”，那么对应的后端 Rules 必须包含 `delete` 谓词。
