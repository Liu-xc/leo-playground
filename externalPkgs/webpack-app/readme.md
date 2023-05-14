1. 执行 Webpack 命令需要安装 Webpack-cli，可以 -D 安装在项目范围内
2. html 文件需要添加 html-webpack-plugin
3. 配置多入口时，可以配置入口之间的依赖关系，通过 dependOn 实现，以此可以把一些通用模块打到一个 chunk 然后让多个入口去引用
