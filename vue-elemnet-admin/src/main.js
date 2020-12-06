import Vue from 'vue'
import ElementUI from 'element-ui';
import i18n from './locale'
import '@/assets/styles/element-variables.scss'
import '@/assets/styles/index.scss' // global css
import App from './App.vue'
import router from './router'
import store from './store'
import './components';
import './assets/icons'

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
