# Halo 静态资源代理 (ReverseProxy)

`ReverseProxy` 资源允许插件将其内部资源（通常是 `src/main/resources` 下的静态文件）通过一个特定的 URL 路径暴露给外部访问。

## 1. 核心职能
*   **用途**: 为插件内部的静态资源（如图片、图标、JS、CSS 等）提供对外访问的 URL。
*   **限制**: 目前该功能主要针对 **文件系统** 的代理，不支持代理外部 URL 或 API。

## 2. 定义方式
由于 `ReverseProxy` 本身也是一个 Extension，建议通过 YAML 声明式地定义，存放在 `src/main/resources/extensions` 目录下。

### YAML 结构示例：
```yaml
apiVersion: plugin.halo.run/v1alpha1
kind: ReverseProxy
metadata:
  name: my-asset-proxy
spec:
  rules:
    - path: /assets/res/**          # 外部访问路径 (相对于插件根路径)
      file:
        directory: static/images/   # 对应的插件内部目录 (相对于 src/main/resources/)
```

## 3. 访问规则
*   **基础路径**: 所有代理路径都会挂载在 `/plugins/{plugin-name}/assets/` 下。
*   **映射逻辑**: 如果访问 `/plugins/my-plugin/assets/res/logo.png`，Halo 会在插件的 `src/main/resources/static/images/` 目录下查找 `logo.png`。

## 4. 关键点
*   **通配符**: 支持 `**` 进行递归映射。
*   **文件名映射**: 如果指定了 `filename` 字段，则该路径将直接映射到一个固定文件。
*   **自动注册**: 只要 YAML 文件放在指定的资源目录下，Halo 会在插件启动时自动加载并生效，无需编写 Java 代码。

## 5. 适用场景
*   插件自定义控制台图标。
*   插件注入到主题中的图片素材。
*   需要由浏览器直接下载的模板文件。
