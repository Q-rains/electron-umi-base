# umi-electron-javascript

### 基于umijs + electron + javascript的基础开发环境

## 主要特性
- 支持整个应用的热重载，electron main服务使用javascript，不进行额外的构建，render使用react(umi脚手架)

## 项目结构

```ssh
.
|-- build
|   |-- icon.icns                         // 打包后程序图标 MacOS
|   |-- icon.ico                          // 打包后程序图标 Windows
|-- dist                                  // 项目编译输出目录
|   |-- renderer                          // 页面编译目录
|-- release                               // 打包输出目录
|-- main                                  // 主程序目录
|   `-- main.js                           // 主程序入口
|-- renderer                              // React项目页面(umi根目录结构)
|     |-- assets
|     |   `-- yay.jpg
|     |-- config
|     |   |-- config.js                   // umijs配置
|     |   `-- webpack.config.js           // umijs-webpack配置
|     |-- models
|     |   `-- global.js
|     |-- pages
|         `-- index.js
|     |-- public
|         `-- window_node_api.js          // 如果需要引用node的api，需要在这个js里面提前引入，并挂载到window下
|     `-- global.js
|-- package.json                          // 项目依赖以及打包配置
`-- README.md                             // 项目说明文档
```

### 环境搭建

##### 安装

通过npm下载依赖
```
   npm install
```

##### 开发

* 同时启动
```
   npm start
```
同时启动主进程和渲染进程，渲染进程编译完成会迟于渲染进程，初次显示为空白，需要待渲染进程
准备完成后，通过目录或快捷键手动刷新(目录 `view/refresh` )

* 分步骤启动

首先通过以下命令启动渲染进程(默认端口：8000)

```javascript
   npm run start:renderer
```

然后启动主进程

```javascript
   npm run start:main
```
##### 依赖包安装
**！！！仅在生产环境依赖的包安装在 dependencies 下**

开发过程中，需要引入各种npm包，安装时需要注意安装类型，在打包时，`node_modules`只会打入 `dependencies` 包

* node相关，在生产环境使用的包，应安装为 `dependencies`，
* node中在`NODE_ENV=development`环境时使用的包，应安装为 `devDependencies`，且仅在`NODE_ENV=development`下引入使用
* 前端 react 的包由于会经过了react脚手架打包，生产环境不需要使用，应安装为 `devDependencies`

```
// 生产环境包，对应写入package.json 中 dependencies 下
npm install package-name  

// 开发环境，对应写入 package.json 中 devDependencies 下
npm install package-name --save-dev  // 开发环境包
```


##### 如何使用node的api

node的api不参与react编译，需要在 `renderer/public/window_node_api.js` 中引入相关的api，并挂载到window下，即可在react中使用

##### 如何拓展devtools插件

通过 `electron-devtools-installer`库安装
在 `development`环境下，已默认安装 react-devtools 和 redux-devtools ; 如需要其它插件，可在文件 `main/utils/installlDevtoolExt.js` 中增加
文档参考： [electron-devtools-installer](https://github.com/MarshallOfSound/electron-devtools-installer)

### 项目打包

##### 构建测试包
```
npm run pack   // 仅输出包,方便测试
```

##### 构建安装包

1. 执行前端资源打包

```
npm run build  // react资源打包
```

2. 运行electron构建命令,输出安装包

```
npm run dist  // 按当前平台打包
npm run dist-mac // mac包
npm run dist-win // windows包
npm run dist-linux // linux包
npm run dist-all   // 所有平台包
```


#### 打包配置说明 [`electron-builder.config.js`](./electron-builder.config.js)

单独抽出了js配置文件，在使用时通过 `--config` 参数指定，如： `electron-builder --config ./electron-builder.config.js`

各配置规则请参考文件中注释和官方文档：

[electron-builder-参数参考](https://www.electron.build/configuration/configuration)

[category-Mac分类参考](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/uid/TP40009250-SW8)

