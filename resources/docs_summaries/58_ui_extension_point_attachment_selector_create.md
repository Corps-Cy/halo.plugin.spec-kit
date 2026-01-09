# Halo UI 扩展点：附件选择选项卡 (attachment:selector:create)

## 1. 扩展点 ID
`attachment:selector:create`

## 2. 用途
允许插件向 Halo 标准的附件选择弹窗（Attachment Selector Modal）中注入自定义的标签页。这通常用于接入外部资源库（如第三方图库、表情包库、Unsplash 集成等）。

## 3. 组件接收的 Props
注入的组件会自动接收以下属性：
*   **`selected`**: 当前已选中的附件对象数组（类型为 `AttachmentLike[]`）。

## 4. 注册示例 (index.ts)
插件需要在前端入口通过 `extensionPoints` 进行注册，提供一个符合 `AttachmentSelectProvider` 接口的对象。

```typescript
export default definePlugin({
  extensionPoints: {
    "attachment:selector:create": [
      {
        id: "my-custom-provider",
        label: "第三方图库",
        component: MyStickerSelector, // 你的 Vue 组件
        priority: 10,
      },
    ],
  },
});
```

## 5. 组件实现规范
自定义选择器组件需要实现双向选择逻辑：
*   **接收**: `props.selected` 用于同步已选状态。
*   **反馈**: 当用户在你的组件中选择了资源时，必须通过 `emit("update:selected", [...])` 通知父级弹窗。

```vue
<script setup lang="ts">
const props = defineProps<{
  selected: any[];
}>();

const emit = defineEmits<{
  (e: "update:selected", value: any[]): void;
}>();

const handleSelect = (item: any) => {
  emit("update:selected", [...props.selected, item]);
};
</script>
```
