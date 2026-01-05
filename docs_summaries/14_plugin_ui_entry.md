# Halo 插件 UI 入口文件 (UI Entry Point)

UI 插件的入口文件通常位于 `ui/src/index.ts`，它是连接插件前端代码与 Halo 控制台的桥梁。

## 1. 核心职能
*   **入口定位**: 该文件是 UI 插件的唯一入口，最终会被构建工具（Vite/Rsbuild）编译为 `main.js`。
*   **注册中心**: 所有的路由、组件、扩展点注入都必须在此文件中声明。

## 2. `definePlugin` 函数
插件必须通过 `definePlugin` 函数来定义其前端行为。

### 结构示例：
```typescript
import { definePlugin } from "@halo-dev/console-shared";
import MyView from "./views/MyView.vue";

export default definePlugin({
  // 注册全局 Vue 组件
  components: [
    {
      name: "MyGlobalComponent",
      component: () => import("./components/MyGlobalComponent.vue"),
    },
  ],
  
  // 注册管理后台路由
  routes: [
    {
      path: "/my-plugin-page",
      name: "MyPluginPage",
      component: MyView,
      meta: {
        menu: {
          group: "content", // 所属菜单分组
          label: "我的插件页面",
          icon: "i-lucide-box",
        },
      },
    },
  ],

  // 注册个人中心路由
  ucRoutes: [],

  // 注入扩展点
  extensionPoints: {
    "dashboard:widget:pushed": [
      {
        name: "MyDashboardWidget",
        component: () => import("./components/MyWidget.vue"),
      },
    ],
  },
});
```

## 3. 核心配置项
*   **`components`**: 注册全局可用的 Vue 组件，通常用于被其他插件或核心引用。
*   **`routes`**: 定义管理后台的访问路径。
    *   `meta.menu`: 配置是否在左侧菜单栏显示，以及显示的位置、图标和标签。
*   **`ucRoutes`**: 定义个人中心 (User Center) 的访问路径。
*   **`extensionPoints`**: **【最强扩展能力】**
    *   通过扩展点，插件可以无需修改核心代码，直接向特定位置（如：仪表盘、文章编辑器侧边栏、列表操作项等）注入自己的组件。

## 4. 运行机制
1.  Halo 加载插件的 `main.js`。
2.  执行 `definePlugin` 导出的配置对象。
3.  Halo 的 Console 框架解析该对象，并自动完成菜单合并、路由注册和扩展点渲染。
