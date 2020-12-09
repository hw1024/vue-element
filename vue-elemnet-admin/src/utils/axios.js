import axios from 'axios';
import {Notification, MessageBox, Message} from 'element-ui';
import store from '@/store';
import {getToken} from '@/utils/auth';
import errorCode from '@/utils/errorCode'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 3 * 60 * 1000, // 请求超时时间
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
    },
    // 返回数据类型
    responseType: 'json'
});

service.interceptors.request.use(config => {
    if (store.getters.token) {
        config.headers['Authorization'] = store.getters.token || getToken() // 让每个请求携带自定义token
    }
    if (store.getters.language) {
        config.headers['Accept-Language'] = store.getters.language
    }
    return config;
}, error => {
    console.log(error);
    return Promise.resolve(error);
});

// http response 拦截器
service.interceptors.response.use(response => {

    // 未设置状态码则默认成功状态
    const code = response.data.code || 200;
    // 获取错误信息
    const msg = errorCode[code] || response.data.msg || errorCode['default'];
    if (code === 401) {
        MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }
        ).then(() => {
            store.dispatch('LogOut').then(() => {
                location.href = '/index';
            })
        })
    } else if (code === 500) {
        Message({
            message: msg,
            type: 'error'
        });
        return Promise.reject(new Error(msg))
    } else if (code !== 200) {
        Notification.error({
            title: msg
        });
        return Promise.reject('error')
    } else {
        return response.data
    }
}, (error) => {
    let {message} = error;
    if (message === 'Network Error') {
        message = '后端接口连接异常';
    } else if (message.includes('timeout')) {
        message = '系统接口请求超时';
    } else if (message.includes('Request failed with status code')) {
        message = '系统接口' + message.substr(message.length - 3) + '异常';
    }
    Message({
        message: message,
        type: 'error',
        duration: 5 * 1000
    });
    return Promise.resolve(error);
});


export const $get = (url, params = {}) => {
    return service({
        method: 'get',
        url: `${url}`,
        params: params,
    });
};

export const $post = (url = '', params = {}) => {
    return service({
        method: 'post',
        url: `${url}`,
        data: params,
    });
};

