# 目标
实现一个文件服务器，能够向网页提供资源，并且当本地资源发生变更时，可以通知网页重新拉取

# TODO

## 文件读写操作

### 功能
- 读取 HTML 模板
- 通过资源进行替换，生成模板内容
- 将更新后内容写入模板

### 涉及模块
- Buffer
- fs (write\read)
- stream

## Server

### 功能
- 资源变更监听
- 请求响应
- 主动推送 (option)

### 涉及模块
- http
- net
- websocket (option)

## Optional
- 资源编译 (babel)
- node 框架


# 待了解

- node 项目框架
- node 的应用领域
- node 项目配置
- node 热门包
