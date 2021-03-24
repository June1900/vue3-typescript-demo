// 首先引入axios和上一步封装的cookie方法
import axios, { AxiosInstance } from 'axios';

import { setToken, setRefreshToken, getToken, getTokenKey, getRefreshToken, getRefreshTokenKey, removeToken } from '@/utils/plugins/cookie';

export class Interceptors {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://eba86297-94d1-4fd9-82e8-62d5bce8c355.mock.pstmn.io',
      timeout: 10000
    });
    // 初始化拦截器
    this.init();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  init() {
    // 请求接口拦截器
    this.instance.interceptors.request.use(
      config => {
        // 判断一下是否有cookie 如果有的话则把cookie放入请求头中
        if (getToken()) {
          config.headers[getTokenKey()] = getToken();
          config.headers[getRefreshTokenKey()] = getRefreshToken();
        }
        return config;
      },
      err => {
        console.error(err);
      }
    );

    this.instance.interceptors.response.use(
      response => {
        const res = response.data;
        if (!response.status.toString().startsWith('2') || res.code === -1) {
          // 如果状态码不是2开头或者接口code返回-1 则是返回错误信息
          console.error('系统错误，请检查API是否正常！');
          return;
        }
        if (res.code !== 0) {
          if (res.code === -3) {
            console.error('登录过期');
            removeToken();
          } else {
            if (res.msg) {
              console.error(res.msg);
            }
          }
          return Promise.resolve(res);
        } else {
          // 返回成功则把token存储一下
          const headers = response.headers;
          const token = headers.token;
          const refresh_token = headers['refresh-token'];
          if (token && refresh_token) {
            setToken(token);
            setRefreshToken(refresh_token);
          }
          return res;
        }
      },
      error => {
        if (error.message === 'Request failed with status code 500') {
          console.error('系统错误，请检查API是否正常！');
        }
        let code = -110;
        if (error && error.response && error.response.status) {
          code = error.response.status;
          // 登陆过期
          if (code === 401 || code === -3) {
            removeToken();
          }
        } else {
          console.error(error.message);
        }
        const err = { errCode: -110, errMsg: error.message || 'Error' };
        return Promise.resolve(err);
      }
    );
  }

  // 返回一下
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getInterceptors() {
    return this.instance;
  }
}

