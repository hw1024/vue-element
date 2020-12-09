// components/index.js
import Vue from 'vue';
// 自动加载 global 目录下的 .vue 结尾的文件
const componentsContext = require.context('./global', true, /\.vue$/);
componentsContext.keys().forEach(component => {
    const componentConfig = componentsContext(component);
    /**  兼容 import export 和 require module.export 两种规范 */
    const componentName = component.replace(/^\.\//, '').replace(/\.vue/, '');
    const ctrl = componentConfig.default || componentConfig;
    Vue.component(componentName, ctrl);
});
// 自动加载 module 目录下的 .vue 结尾的文件
const requireComponent = require.context('./module', true, /\.vue$/);
requireComponent.keys().forEach(component => {
    const componentConfig = requireComponent(component);
    /**  兼容 import export 和 require module.export 两种规范 */
    const componentName = component.replace(/^\.\//, '').replace(/\.vue/, '');
    const ctrl = componentConfig.default || componentConfig;
    Vue.component(componentName, ctrl);
});




