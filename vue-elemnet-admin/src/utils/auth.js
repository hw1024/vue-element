import {getStore, setStore, removeStore} from './storage';

const TOKEN_KEY = 'accessToken';

export function setToken(token) {
  return setStore(TOKEN_KEY, token, {expires: 1})
}

export function getToken() {
  const token = getStore(TOKEN_KEY);
  if (token) return token;
  else return false;
}

export function removeToken() {
  return removeStore(TOKEN_KEY)
}
