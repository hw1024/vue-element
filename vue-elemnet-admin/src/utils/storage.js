/**
 * @desc 存储localStorage
 * @author hw
 * @param {String} [name]    -  存储Key
 * @param {String} [content]    -  存储内容
 * @date 2020-12-06
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
};

/**
 * @desc 获取localStorage
 * @author hw
 * @param {String} [name]    -  存储Key
 * @date 2020-12-06
 */
export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
};

/**
 * @desc 删除localStorage
 * @author hw
 * @param {String} [name]    -  存储Key
 * @date 2020-12-06
 */
export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
};
