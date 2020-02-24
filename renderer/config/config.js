import pageRoutes from './router.config';

// ref: https://umijs.org/config/
export default {
  history:'hash',
  outputPath: `../dist/renderer`,
  publicPath: './',
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'c1_destop_tool',
      dll: false,
      hardSource: false,
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  routes: pageRoutes,
}
