# Halo 插件 UI 路由定义 (UI Routes)

插件通过在 `definePlugin` 中定义路由，将自定义页面集成到 Halo 控制台 (Console) 或个人中心 (UC)。

## 1. 路由分类
*   **`routes`**: 定义管理后台 (Console) 的路由。
*   **`ucRoutes`**: 定义个人中心 (User Center) 的路由。

## 2. 核心配置项
每个路由对象主要遵循 Vue Router 的标准，并扩展了 `meta` 信息：

*   **`path`**: 路由访问路径。
*   **`name`**: 路由唯一名称。
*   **`component`**: 对应的 Vue 组件。
*   **`parentName`**: **【重要】** 指定父级路由。
    *   若要集成进管理后台的主布局，通常需指定 `parentName: "Root"`。
*   **`meta`**: 元数据，用于控制菜单显示、权限和面包屑。

## 3. 菜单配置 (`meta.menu`)
通过在 `meta` 中定义 `menu` 对象，该路由会自动出现在侧边栏。

*   **`label`**: 菜单显示的名称（支持国际化）。
*   **`icon`**: 菜单图标。支持使用图标组件或图标字符串。
*   **`group`**: 菜单所属分组。常见分组包括：
    *   `content`: 内容
    *   `interface`: 界面
    *   `system`: 系统
    *   `tool`: 工具
*   **`priority`**: 排序权重。数值越大越靠前。

## 4. 权限控制 (`meta.permissions`)
*   类型: `string[]`
*   作用: 只有拥有指定权限的用户才能看到和访问该路由。

## 5. 代码示例
```typescript
import { definePlugin } from "@halo-dev/console-shared";
import TodoView from "./views/TodoView.vue";

export default definePlugin({
  routes: [
    {
      path: "/todos",
      name: "PluginTodoView",
      component: TodoView,
      parentName: "Root", // 集成到主框架
      meta: {
        permissions: ["plugin:todo:view"], // 权限要求
        menu: {
          label: "待办事项",
          icon: "i-lucide-check-square",
          group: "content",
          priority: 10,
        },
      },
    },
  ],
});
```

## 6. 注意事项
*   **Root 挂载**: 几乎所有插件页面都应设置 `parentName: "Root"`，否则页面将无法渲染在 Halo 的主布局内（除非你是在开发一个完全独立的页面）。
*   **子路由**: 插件可以定义嵌套路由，只需通过 `children` 数组声明即可。
*   **国际化**: `label` 建议配合 `$t('...')` 使用以支持多语言。
