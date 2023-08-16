import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { notification } from 'antd';

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        const { status, statusText, data } = error.response;
        notification.warning({
          message: `${status}: ${statusText}`,
          description: data?.message,
        });
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        notification.error({
          message: '连接失败',
          description: '您的当前连接响应失效，请重新尝试！',
        });
      } else {
        // 发送请求时出了点问题
        notification.error({
          message: '网络异常',
          description: '您的网络发生异常，无法连接服务器！',
        });
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 自动填充JWT头
      const token = localStorage.getItem('token') || '';
      return { ...config, headers: { Authorization: `Bearer ${token}` } };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 响应后拦截，自动刷新JWT
      const authorization = response.headers['authorization'];
      if (authorization) {
        localStorage.setItem('token', authorization.slice(7));
      }
      return response;
    },
  ],
};
