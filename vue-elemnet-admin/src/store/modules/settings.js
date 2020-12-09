import defaultSettings from '@/settings'

const {whetherScreenFull, whetherLangSelect, tagsView, fixedHeader, sidebarLogo} = defaultSettings;

const state = {
    whetherLangSelect: whetherLangSelect,
    whetherScreenFull: whetherScreenFull,
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

