import {getStore, setStore} from '@/utils/storage';

const app = {
  state: {
    language: getStore('language') || 'zh-CN',
  },
  mutations: {
    // 中英文切换
    SET_LANGUAGE: (state, language) => {
      state.language = language;
      setStore('language', language);
    }
  },
  actions: {
    // 中英文切换
    setLanguage({commit}, language) {
      commit('SET_LANGUAGE', language);
    },
  }
};

export default app;
