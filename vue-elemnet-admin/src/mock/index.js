import Mock from 'mockjs'

import loginAPI from './login'
// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
    timeout: '300-600'
});

Mock.mock(/\/admin\/login/, 'post', loginAPI.loginByUsername);
Mock.mock(/\/admin\/getInfo/, 'get', loginAPI.getInfo);
Mock.mock(/\/admin\/getRouters/, 'get', loginAPI.getRouters);
Mock.mock(/\/admin\/logout/, 'post', loginAPI.logout);

export default Mock
