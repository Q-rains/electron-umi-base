import { defineConfig } from 'umi';

export default defineConfig({
  chainWebpack(config) {
    // 设置 alias
    config.target('electron-renderer')
  },
  webpack5: {},
  history: { type: 'hash' },
  outputPath: `../dist/renderer`,
  publicPath: './',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/page2', component: '@/pages/Page2/index' },
  ],
  fastRefresh: {},
});
