export default [
  {
    path: '/',
    component: '../layouts/index.js',
    routes: [
      {
        path: '/',
        component: './page1/index',
      },
      {
        path: '/page2',
        component: './page2/page2.js',
      },
    ],
  },
];
