import axiosInstance from '@/utils/request';

/**
 * eg. 请求发生http错误
 * 127.0.0.1:6800/api/test/xxx 是一个不存在的地址，请求会报错
 * */
export async function getApiTestHttpError(params) {
  return axiosInstance.get('127.0.0.1:6800/api/test/xxx', {
    params,
  });
}


/**
 * eg.利用 mock.js 可以在开发环境模拟api请求数据(生产环境不生效，请确保真实api可用)
 * /api/list 在 ../mock/index 中进行了模拟
 * */
export async function getApiList(params) {
  return axiosInstance.get('/api/list', {
    params,
  });
}
