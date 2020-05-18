import mockjs from 'mockjs';

export default {
  'GET /api/list': mockjs.mock({
    'list|8': [{
      id: '@id',
      city: '@city',
      'value|1-100': 50,
      'type|0-2': 1,
      'cc|1-2000': 34,
      imgUrl: mockjs.Random.image('720x480'),
    }],
  }),
  'GET /api/test/fail': mockjs.mock({
    code: 500,
    data: {
      errorMsg:'出错了'
    },
  }),
};
