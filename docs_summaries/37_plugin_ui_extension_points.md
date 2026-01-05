# Halo 插件 UI 扩展点 (UI Extension Points)

UI 扩展点是 Halo 插件前端开发中最重要的概念之一。它允许插件在不修改 Halo 核心代码的前提下，向特定的界面位置注入自定义组件。

## 1. 核心定位
*   **用途**: 在 Console (管理后台) 或 UC (个人中心) 的预留位置插入插件组件。
*   **机制**: 声明式注入。插件在 `definePlugin` 中声明要注入的扩展点 ID 和对应的组件，Halo 运行时会自动渲染。

## 2. 注册方式
在 `ui/src/index.ts` 的 `definePlugin` 函数中使用 `extensionPoints` 字段。

```typescript
export default definePlugin({
  extensionPoints: {
    // 键名为扩展点 ID，值为组件数组
    "dashboard:widget:pushed": [
      {
        name: "MyCustomWidget",
        component: () => import("./components/MyWidget.vue"),
        // 可选：优先级，数值越大越靠前
        priority: 10,
        // 可选：传递给组件的属性 (注意：不同扩展点支持的 props 不同)
        props: {
          title: "我的插件挂件",
        },
      },
    ],
  },
});
```

## 3. 常见扩展点分类

### 仪表盘 (Dashboard)
*   **`dashboard:widget:pushed`**: 向仪表盘注入小挂件。

### 文章/页面编辑器 (Editor)
*   **`editor:toolbar:item:pushed`**: 向编辑器工具栏注入按钮。
*   **`editor:bubble-menu:item:pushed`**: 向气泡菜单注入选项。
*   **`editor:sidebar:pushed`**: 向编辑器右侧边栏注入面板。

### 列表操作 (List Operations)
*   **`post:list-item:operation:pushed`**: 文章列表的操作项（更多菜单内）。
*   **`attachment:list-item:operation:pushed`**: 附件列表的操作项。

### 详情页标签 (Detail Tabs)
*   **`plugin:detail:tab:pushed`**: 插件详情页的新标签页。
*   **`user:detail:tab:pushed`**: 用户详情页的新标签页。

### 选择器扩展
*   **`attachment:selector:tab:pushed`**: 附件选择弹窗中的新标签页（如接入外部图库）。

## 4. 数据交互 (Props)
每个扩展点都会向注入的组件传递特定的 Props。例如：
*   **列表操作项**: 通常会收到 `item` (当前行的数据对象)。
*   **编辑器扩展**: 可能会收到 `editor` 实例或 `content`。
*   **仪表盘挂件**: 通常收到环境信息。

**组件内部接收示例**:
```vue
<script setup lang="ts">
const props = defineProps<{
  item?: any; // 如果是列表操作项，item 就是当前行的数据
}>();
</script>
```

## 5. 注意事项
*   **懒加载**: 强烈建议使用 `() => import(...)` 方式注册组件，以减小主包体积。
*   **冲突避免**: `name` 字段必须唯一，建议带上插件名作为前缀。
*   **样式兼容**: 注入的组件会处于 Halo 的 UI 上下文中，应尽量使用 `@halo-dev/components` 或 Tailwind CSS 以保持风格一致。
