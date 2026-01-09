# Halo 服务端扩展点：附件存储 (AttachmentStorage)

`AttachmentStorage`（内部接口名为 `AttachmentHandler`）扩展点允许插件为 Halo 注入新的附件存储方案，如阿里云 OSS、腾讯云 COS、S3 等。

## 1. 核心职能
*   **用途**: 自定义文件的上传与物理存储逻辑。
*   **特性**: 插件化的存储引擎，用户可以在后台选择并配置不同的存储插件。

## 2. 核心接口 `AttachmentHandler`
插件需要实现该接口。注意，Halo 2.x 全面拥抱响应式，因此该接口方法返回 `Mono`。

### 关键方法：
*   **`upload(file, config)`**: 
    *   **逻辑**: 处理文件流上传。
    *   **返回**: 成功后返回存储后的元数据（如 URL）。
*   **`delete(filename, config)`**: 
    *   **逻辑**: 从物理存储中删除文件。
*   **`getSharedURL(...)`** (可选):
    *   **逻辑**: 生成带有效期的共享链接。

## 3. 实现步骤

### 第一步：实现接口
```java
@Component
public class MyS3AttachmentHandler implements AttachmentHandler {
    @Override
    public Mono<AttachmentResponse> upload(FilePart filePart, StorageConfig config) {
        // 调用 S3 SDK 进行异步上传...
        return Mono.just(new AttachmentResponse(...));
    }

    @Override
    public Mono<Void> delete(String filename, StorageConfig config) {
        // 调用 S3 SDK 执行删除...
        return Mono.empty();
    }
}
```

### 第二步：定义 `ExtensionDefinition`
```yaml
apiVersion: plugin.halo.run/v1alpha1
kind: ExtensionDefinition
metadata:
  name: my-s3-storage
spec:
  extensionPointName: "attachment-handler"
  className: "myS3AttachmentHandler"
  displayName: "My S3 Storage"
```

## 4. 关键点
*   **配置管理**: 每个存储插件通常需要配置（如 AccessKey, Bucket）。开发者应定义一个配套的 `Setting` 资源，Halo 会将用户填写的配置在调用 `upload` 时通过 `config` 参数传入。
*   **全异步**: 附件上传通常涉及网络 I/O，必须使用响应式 SDK（如 AWS SDK v2 的异步版本）。

## 5. 常见用途
*   云存储集成（阿里云、腾讯云、华为云、七牛云）。
*   私有化存储（Minio, FastDFS）。
*   FTP / SFTP 远程存储。
