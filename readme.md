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
    |-- config                            // main-process的配置文件
    |-- ipc                               // main-process ipc逻辑
    |-- utils                             // main-process 的一些工具方法
|   `-- main.js                           // 主程序入口
|-- renderer                              // React项目页面(umi根目录结构)
|     |-- assets                          // 前端使用的图片等资源
|     |-- config
|         `-- config.js                   // umijs配置
|         `-- router.config.js            // umijs路由配置(项目采用配置式路由)
|     |-- layouts                         // 通用的页面布局
|     |-- mock                            // mock.js 模拟api配置 
|     |-- models                          // redux dva的model配置
|     |   `-- global.js
|     |-- pages                           // 页面文件
|         |-- pagex
|             `index.js
|     |-- public                          // 直接使用的公共文件
|         `-- window_node_api.js          // 如果需要引用node的api，需要在这个js里面提前引入，并挂载到window下
|     |-- service                         // 数据服务，包括ipc、ajax、socket
|     |-- utils                           // 工具函数
|         `-- request.js                  // axios 请求库的简单统一配置
|         `-- util.js                     // 自己封装的工具函数库
|     `-- global.js                       // 此文件会在入口文件的最前面被自动引入，可以在这里加载补丁，做一些初始化的操作等
      `-- global.css                      // 全局的css文件，在前端入口文件最前被引入
`-- dev-app-update.yml                    // electron-updater的开发环境配置(生成环境应配置 electron-builder.config.js 的 publish)      
`-- electron-builder.config.js            // electron-builder的打包配置文件
`-- index.js                              // 入口文件
`-- package.json                          // 项目依赖以及打包配置
`-- README.md                             // 项目说明文档
```
其中 `renderer` 文件加下按照 `umi` 脚手架约定，参考文档：[目录及约定](https://umijs.org/zh/guide/app-structure.html)
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

##### 数据请求
* http请求：
使用 `axios`,前端、node环境均可使用，`renderer/utils/request.js` 中进行了简单前端的统一请求配置
文档参考[axios](http://axios-js.com/zh-cn/docs/)

* socket请求：
在node环境中，使用 `ws` 库，这是一个标准的WebSocket实现，文档参考[ws](https://github.com/websockets/ws)

在electron中, 前端环境也能直接使用 `ws` 库， 在`renderer/public/window_node_api.js`中引入即可

当然，在前端环境中，也可以直接使用浏览器标准的 Websocket 接口，文档参考 [WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)

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
#### 打包后的客户端版本
和 `package.json` 中的 `version` 属性一致，** ！！！正式打包前，请更新 `version` 值 **

#### 打包配置说明 [`electron-builder.config.js`](./electron-builder.config.js)

单独抽出了js配置文件，在使用时通过 `--config` 参数指定，如： `electron-builder --config ./electron-builder.config.js`

各配置规则请参考文件中注释和官方文档：

[electron-builder-参数参考](https://www.electron.build/configuration/configuration)

[category-Mac分类参考](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/uid/TP40009250-SW8)

### 客户端更新

* 没有包管理服务器


使用 `electron-updater` ,逻辑见 `main/utils/appUpdater.js`,不需要有正式的包管理服务器，仅需静态文件服务即可。

参见文档 [electron-updater](https://www.electron.build/auto-update)

静态文件服务应包含打包后的所有文件(包括包文件和yml文件)，实际是每次更新时，会先下载比较 `latest-xx.yml` 文件

生产环境配置 `electron-builder.config.js  publish` ,开发环境配置 `dev-app-update.yml`,设置静态文件服务的包文件夹存储地址即可


* 有包管理服务器

直接使用`electron`自带的 `autoUpdate` 接口，注意：包管理服务应提供对应要求的接口

参见文档：
[Electron 更新](https://www.electronjs.org/docs/tutorial/updates)  [auto-updater Api](https://www.electronjs.org/docs/api/auto-updater)

逻辑见 `main/utils/appAutoUpdater.js`，在`main/config/config.js`中配置服务地址，并在`main.js`中调用

推荐开源的私有服务 [electron-release-server](https://github.com/ArekSredzki/electron-release-server)

