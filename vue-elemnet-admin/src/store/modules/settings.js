
import defaultSettings from '@/settings'

const {whetherScreenFull, whetherLangSelect, whetherBreadcrumb, title, tagsView, fixedHeader, sidebarLogo} = defaultSettings;

const state = {
    title: title,
    whetherLangSelect: whetherLangSelect,
    whetherScreenFull: whetherScreenFull,
    whetherBreadcrumb: whetherBreadcrumb,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo
};

const mutations = {
    CHANGE_SETTING: (state, {key, value}) => {
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    }
};

const actions = {
    changeSetting({commit}, data) {
        commit('CHANGE_SETTING', data)
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

