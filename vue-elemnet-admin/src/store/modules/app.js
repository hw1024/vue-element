import {getStore, setStore} from '@/utils/storage';

const app = {
    state: {
        language: getStore('language') || 'zh-CN',
        device: 'desktop',
        sidebar: {
            opened: getStore('sidebarStatus') ? !!+getStore('sidebarStatus') : true,
            withoutAnimation: false
        },
    },
    mutations: {
        // 中英文切换
        SET_LANGUAGE: (state, language) => {
            state.language = language;
            setStore('language', language);
        },
        TOGGLE_DEVICE: (state, device) => {
            state.device = device
        },
        TOGGLE_SIDEBAR: state => {
            state.sidebar.opened = !state.sidebar.opened;
            state.sidebar.withoutAnimation = false;
            if (state.sidebar.opened) {
                setStore('sidebarStatus', '1')
            } else {
                setStore('sidebarStatus', '0')
            }
        },
        CLOSE_SIDEBAR: (state, withoutAnimation) => {
            setStore('sidebarStatus', '0');
            state.sidebar.opened = false;
            state.sidebar.withoutAnimation = withoutAnimation
        },
    },
    actions: {
        // 中英文切换
        setLanguage({commit}, language) {
            commit('SET_LANGUAGE', language);
        },
        toggleDevice({commit}, device) {
            commit('TOGGLE_DEVICE', device)
        },
        toggleSideBar({commit}) {
            commit('TOGGLE_SIDEBAR')
        },
        closeSideBar({commit}, {withoutAnimation}) {
            commit('CLOSE_SIDEBAR', withoutAnimation)
        },
    }
};

export default app;
