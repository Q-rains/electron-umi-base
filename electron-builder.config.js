/**
 * electron-builder的配置文件,使用时通过 --config 指定
 * 如 electron-builder --config ./electron-builder.config.js
 * 各配置项参考官方文档： https://www.electron.build/configuration/configuration
 */

module.exports = {
  productName: 'MINIEYE-DESTOP-APP', //项目名 这也是生成的文件的前缀名
  appId: 'com.electron.xxx',
  copyright: 'Copyright © xxxx', //版权  信息
  extraMetadata: {   // 注入打包后package.json的属性
    main: './main/main.js', // 修改包入口
  },
  directories: {
    output: 'release',  // 输出文件夹
  },
  files: ['appdoc/', 'main/', 'dist/', 'node_modules/', 'package.json'], // 需要打包的文件
  // mac打包配置
  mac: {
    // 包类型，参见 https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/uid/TP40009250-SW8
    category: 'public.app-category.developer-tools',
    target: 'default', // 目标包类型，
  },
  dmg: {
    background: 'build/appdmg.png', // dmg安装窗口背景图
    icon: 'build/icon.icns', // 客户端图标
    iconSize: 100, // 安装图标大小
    // 安装窗口中包含的项目和配置
    contents: [
      { x: 380, y: 280, type: 'link', path: '/Applications' },
      { x: 110, y: 280, type: 'file' },
    ],
    window: { width: 500, height: 500 }, // 安装窗口大小
  },
  linux: {
    target: ['AppImage', 'deb'],
  },
  win: {
    target: ['squirrel', 'portable'],
    icon: 'build/icon.ico', // 客户端图标
  },
  asar: {
    smartUnpack: true,  // asar打包, 智能提取第三方模块
  },
  // asar: false,
};
