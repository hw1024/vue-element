import {getStore, setStore, removeStore} from './storage';

const TOKEN_KEY = 'accessToken';

/**
 * @desc 存储登录信息token
 * @author hw
 * @param {String} [token]    -  存储token值
 * @date 2020-12-06
 */
export function setToken(token) {
    return setStore(TOKEN_KEY, token, {expires: 1})
}

/**
 * @desc 获取登录信息token
 * @author hw
 * @date 2020-12-06
 */
export function getToken() {
    const token = getStore(TOKEN_KEY);
    if (token) return token;
    else return false;
}

/**
 * @desc 移除登录信息token
 * @author hw
 * @date 2020-12-06
 */
export function removeToken() {
    return removeStore(TOKEN_KEY)
}
