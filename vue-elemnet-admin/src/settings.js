module.exports = {
    title: 'XX管理系统',

    /**
     * 是否启用全屏显示功能
     */
    whetherScreenFull: process.env.NODE_ENV === 'development',

    /**
     * 是否启用国际化功能
     */
    whetherLangSelect: process.env.NODE_ENV === 'development',

    /**
     * 是否显示面包屑
     */
    whetherBreadcrumb: process.env.NODE_ENV === 'development',

    /**
     * 是否显示 tagsView
     */
    tagsView: true,

    /**
     * 是否固定头部
     */
    fixedHeader: false,

    /**
     * 是否显示logo
     */
    sidebarLogo: true,

    /**
     * @type {string | array} 'production' | ['production', 'development']
     * @description Need show err logs component.
     * The default is only used in the production env
     * If you want to also use it in dev, you can pass ['production', 'development']
     */
    errorLog: 'production'
};
