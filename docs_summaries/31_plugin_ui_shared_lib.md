# Halo 插件 UI 共享工具库 (@halo-dev/ui-shared)

`@halo-dev/ui-shared` (原 `@halo-dev/console-shared`) 是插件前端开发的核心工具包，提供了大量与 Halo 核心共享的状态、工具函数和事件。

## 1. 核心定位
*   **一致性**: 确保插件与 Halo Console 在数据处理、日期格式、权限校验等方面保持逻辑一致。
*   **提效**: 封装了常用的状态管理（Pinia）和业务逻辑，避免插件重复实现。

## 2. 状态管理 (Stores)
集成了 Pinia 存储，允许插件访问 Halo 的全局状态：
*   **`currentUser`**: 获取当前登录用户信息（`userStore.currentUser`）。
*   **`globalInfo`**: 获取站点全局信息（如站点标题、版本号、系统设置等）。

## 3. 核心工具类 (Utils)
*   **`date`**: 基于 `dayjs` 的封装。
    *   `format()`: 格式化时间。
    *   `toRelative()`: 显示相对时间（如“3 分钟前”）。
*   **`permission`**: 权限检查。
    *   `has(permissionName)`: 检查当前用户是否拥有某项权限。
*   **`attachment`**: 附件处理。
    *   `getThumbnailUrl(attachment)`: 获取缩略图地址。
*   **`id`**: 唯一 ID 生成。
    *   支持生成 UUID v7 (时间有序)。

## 4. 事件总线 (Events)
提供全局事件订阅机制，方便插件监听系统状态变化：
*   **`core:plugin:configMap:updated`**: 当插件自身的配置（ConfigMap）被更新时触发。

## 5. 代码示例 (权限检查与用户信息)
```typescript
import { utils, stores } from "@halo-dev/ui-shared";

// 1. 使用 Store 获取用户名
const userStore = stores.currentUser();
console.log("当前用户:", userStore.currentUser?.user.metadata.displayName);

// 2. 使用 Utils 检查权限
const canEdit = utils.permission.has("plugin:todo:edit");

// 3. 使用 Utils 格式化时间
const formattedDate = utils.date.format(new Date(), "YYYY-MM-DD HH:mm:ss");
```

## 6. 使用要求
*   **依赖版本**: 插件 `package.json` 中的 `@halo-dev/ui-shared` 需保持与 Halo 版本兼容。
*   **核心限制**: 在 `plugin.yaml` 的 `spec.requires` 中应明确指定 Halo 最低版本要求，以确保共享库的 API 可用。
*   **外部化**: 在 Vite/Rsbuild 配置中，应将该库标记为 `external`，由 Halo 环境运行时注入。
