import {$get, $post} from '@/utils/axios';

// 登录接口
export const apiLogin = (params) => $post('/login', params);
// 登出接口
export const apiLogout = () => $get('/logout');
// 获取用户信息
export const apiUserInfo = () => $get('/getInfo');
// 获取路由信息
export const apiRouters = () => $get('/getRouters');
// 获取图形验证码
export const apiGetCodeImg = (params) => $get('/captchaImage', params);
