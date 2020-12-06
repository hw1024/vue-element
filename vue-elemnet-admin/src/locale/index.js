import Vue from 'vue';
import VueI18n from 'vue-i18n';
import {getStore} from '@/utils/storage';
import zhCN from './lang/zh-CN';
import enUS from './lang/en-US';
import elementEnLocale from 'element-ui/lib/locale/lang/en';
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN';

Vue.use(VueI18n);
Vue.locale = () => {};
// 设置语言 选项 en | zh
const locale =  getStore('language') || 'zh-CN';
// 加载语言环境
const messages = {
  'en-US': Object.assign(enUS, elementEnLocale),
  'zh-CN': Object.assign(zhCN, elementZhLocale),
};

const i18n = new VueI18n({
  locale,
  messages,
  silentTranslationWarn: true
});

export default i18n;
