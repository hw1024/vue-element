import Vue from 'vue'
import i18n from './locale'
import ElementUI from 'element-ui';
import '@/assets/styles/element-variables.scss'
import '@/assets/styles/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import './components';
import './assets/icons'
import './permission' // permission control
import './mock';   //引入mock.js模拟数据

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
});

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app');
