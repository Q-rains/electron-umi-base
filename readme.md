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

## 环境搭建
### 安装

然后通过npm下载依赖

```javascript
  $ npm install
```

### 开发
* 同时启动
```javascript
  $ npm start
```
同时启动主进程和渲染进程，渲染进程编译完成会迟于渲染进程，初次显示为空白，需要待渲染进程
准备完成后，通过目录或快捷键手动刷新(目录 `view/refresh` )

* 分步骤启动

首先通过以下命令启动渲染进程(默认端口：8000)

```javascript
  $ npm run start:renderer
```

然后启动主进程

```javascript
  $ npm run start:main
```

### 如何使用node的api

需要在 renderer/public/window_node_api.js中引入相关的api,并挂载到window下才可以

### 打包

```javascript
  $ npm run pack  // 打包macOS
  $ npm run exe   // 打包windows
```

如果想把代码打包成一个dmg文件或者zip文件，可以执行以下命令

```javascript
  $ npm run dist
```

### 打包配置说明 [`package.json`](./package.json)

[electron-builder-参数参考](https://www.electron.build/configuration/configuration)

[category-Mac分类参考](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/uid/TP40009250-SW8)

```js
{
  ...
  "build": {
    "productName": "LittleStrong",// 程序名称
    "files": [ // 需要打包的文件
      "dist/",
      "node_modules/",
      "package.json"
    ],
    "mac": { // 打包mac版本
      "category": "your.app.category.type", // mac app分类 
      "target": [ // 打包类型
        "dmg",
        "zip"
      ]
    },
    "win": { // 打包windows版本
      "target": [ // 打包类型
        "nsis"
      ]
    },
    "nsis": {
      "oneClick": false,
      "perMachine": true,
      "allowToChangeInstallationDirectory": true
    },
    "directories": { // 打包后输出目录
      "output": "release"
    },
    "appId": "com.cn.littlestrong.demo", // appstore包名
    "asar": false //  是否加密处理
  },
}
```
