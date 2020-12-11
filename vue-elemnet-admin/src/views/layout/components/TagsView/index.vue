<template>
    <div id='tags-view-container' class='tags-view-container'>
        <scroll-pane ref='scrollPane' class='tags-view-wrapper' @scroll='handleScroll'>
            <router-link
                v-for='tag in visitedViews'
                ref='tag'
                :key='tag.path'
                :to='{ path: tag.path, query: tag.query, fullPath: tag.fullPath }'
                tag='span'
                class='tags-view-item'
                @click.middle.native='!isAffix(tag)?closeSelectedTag(tag):""'
                @contextmenu.prevent.native='openTagsMenu(tag,$event)'
            >
                {{ tag.title }}
                <span v-if='!isAffix(tag)' class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)'></span>
            </router-link>
        </scroll-pane>
        <ul v-show='contextMenuVisible' :style='{left:contextLeft+"px",top:contextTop+"px"}' class='contextmenu'>
            <li @click='refreshSelectedTag(selectedTag)'>刷新页面</li>
            <li v-if='!isAffix(selectedTag)' @click='closeSelectedTag(selectedTag)'>关闭当前</li>
            <li @click='closeOthersTags'>关闭其他</li>
            <li @click='closeAllTags(selectedTag)'>关闭所有</li>
        </ul>
    </div>
</template>

<script>
    import path from 'path'
    import ScrollPane from './ScrollPane'
    import Global from '@/views/layout/components/global.js';

    export default {
        components: {ScrollPane},
        data() {
            return {
                contextMenuVisible: false,
                contextTop: 0,
                contextLeft: 0,
                selectedTag: {},
                affixTags: []
            }
        },
        computed: {
            visitedViews() {
                return this.$store.state.tagsView.visitedViews || []
            },
            routes() {
                return this.$store.state.permission.routes || []
            },
        },
        watch: {
            $route() {
                this.addTags();
                this.moveToCurrentTag()
            },
            contextMenuVisible(value) {
                if (value) {
                    document.body.addEventListener('click', this.closeTagsMenu)
                } else {
                    document.body.removeEventListener('click', this.closeTagsMenu)
                }
            }
        },
        mounted() {
            this.initTags();
            this.addTags()
        },
        methods: {
            /**
             * @desc 初始化标签页
             */
            initTags() {
                const affixTags = this.affixTags = this.filterAffixTags(this.routes);
                for (const tag of affixTags) {
                    if (tag.name) {
                        this.$store.dispatch('tagsView/addVisitedView', tag)
                    }
                }
            },
            /**
             * @desc 过滤标签页
             */
            filterAffixTags(routes, basePath = '/') {
                let tags = [];
                routes.forEach(route => {
                    if (route.meta && route.meta.affix) {
                        const tagPath = path.resolve(basePath, route.path);
                        tags.push({
                            fullPath: tagPath,
                            path: tagPath,
                            name: route.name,
                            meta: {...route.meta}
                        })
                    }
                    if (route.children) {
                        const tempTags = this.filterAffixTags(route.children, route.path);
                        if (tempTags.length >= 1) {
                            tags = [...tags, ...tempTags]
                        }
                    }
                });
                return tags
            },
            /**
             * @desc 判断是否为当前页面的标签页
             */
            isAffix(tag) {
                return tag.meta && tag.meta.affix
            },
            /**
             * @desc 新增标签页
             */
            addTags() {
                const {name} = this.$route;
                if (name) {
                    this.$store.dispatch('tagsView/addView', this.$route)
                }
                return false
            },
            /**
             * @desc 关闭其他标签页
             */
            moveToCurrentTag() {
                const tags = this.$refs.tag;
                console.log(tags);
                this.$nextTick(() => {
                    for (const tag of tags) {
                        if (tag.to.path === this.$route.path) {
                            this.$refs.scrollPane.moveToTarget(tag);
                            if (tag.to.fullPath !== this.$route.fullPath) {
                                this.$store.dispatch('tagsView/updateVisitedView', this.$route)
                            }
                            break
                        }
                    }
                })
            },
            /**
             * @desc 打开右键菜单方法
             */
            openTagsMenu(tag, e) {
                const menuMinWidth = 105;
                const offsetLeft = this.$el.getBoundingClientRect().left;
                const offsetWidth = this.$el.offsetWidth;
                const maxLeft = offsetWidth - menuMinWidth;
                const left = e.clientX - offsetLeft + 15;
                this.contextLeft = left > maxLeft ? maxLeft : left; // 设置右键菜单显示距离左侧距离
                this.contextTop = e.clientY;  // 设置右键菜单显示距离顶部距离
                this.selectedTag = tag;  // 设置当前选中的tag页
                this.contextMenuVisible = true;
            },
            /**
             * @desc 关闭右键菜单方法
             */
            closeTagsMenu() {
                this.contextMenuVisible = false
            },
            /**
             * @desc tags标签页滑动回调方法，滑动时关闭右键菜单
             */
            handleScroll() {
                this.closeTagsMenu()
            },
            /**
             * @desc 刷新当前选择中页面
             */
            refreshSelectedTag(view) {
                this.$store.dispatch('tagsView/delCachedView', view).then(() => {
                    const {fullPath} = view;
                    this.$nextTick(() => {
                        this.$router.replace({
                            path: '/redirect' + fullPath
                        })
                    })
                });
                Global.$emit('removeCache', 'refreshSelectedTag', this.selectedTag);
            },
            /**
             * @desc 关闭当前选择中页面
             */
            closeSelectedTag(view) {
                this.$store.dispatch('tagsView/delView', view).then(({visitedViews}) => {
                    if (this.isActive(view)) {
                        this.toLastView(visitedViews, view)
                    }
                });
                Global.$emit('removeCache', 'closeSelectedTag', view);
            },
            /**
             * @desc 关闭其他
             */
            closeOthersTags() {
                this.$router.push(this.selectedTag);
                this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
                    this.moveToCurrentTag()
                });
                Global.$emit('removeCache', 'closeOthersTags', this.selectedTag);
            },
            /**
             * @desc 关闭所有页面
             */
            closeAllTags(view) {
                this.$store.dispatch('tagsView/delAllViews').then(({visitedViews}) => {
                    if (this.affixTags.some(tag => tag.path === this.$route.path)) {
                        return
                    }
                    this.toLastView(visitedViews, view)
                });
                Global.$emit('removeCache', 'closeAllTags');
            },
            toLastView(visitedViews, view) {
                const latestView = visitedViews.slice(-1)[0];
                if (latestView) {
                    this.$router.push(latestView.fullPath)
                } else {
                    if (view.name === 'Dashboard') {
                        this.$router.replace({path: '/redirect' + view.fullPath})
                    } else {
                        this.$router.push('/')
                    }
                }
            },
        }
    }
</script>

<style lang='scss' scoped>
    .tags-view-container {
        height: 34px;
        width: 100%;
        background: #fff;
        border-bottom: 1px solid #d8dce5;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);

        .tags-view-wrapper {
            .tags-view-item {
                display: inline-block;
                position: relative;
                cursor: pointer;
                height: 26px;
                line-height: 26px;
                border: 1px solid #d8dce5;
                color: #495060;
                background: #fff;
                padding: 0 8px;
                font-size: 12px;
                margin-left: 5px;
                margin-top: 4px;

                &:first-of-type {
                    margin-left: 15px;
                }

                &:last-of-type {
                    margin-right: 15px;
                }

                &.active {
                    background-color: #42b983;
                    color: #fff;
                    border-color: #42b983;

                    &::before {
                        content: '';
                        background: #fff;
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        position: relative;
                        margin-right: 2px;
                    }
                }
            }
        }

        .contextmenu {
            margin: 0;
            background: #fff;
            z-index: 3000;
            position: absolute;
            list-style-type: none;
            padding: 5px 0;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 400;
            color: #333;
            box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);

            li {
                margin: 0;
                padding: 7px 16px;
                cursor: pointer;

                &:hover {
                    background: #eee;
                }
            }
        }
    }
</style>

<style lang='scss'>
    .tags-view-wrapper {
        .tags-view-item {
            .el-icon-close {
                width: 16px;
                height: 16px;
                vertical-align: 2px;
                border-radius: 50%;
                text-align: center;
                transition: all .3s cubic-bezier(.645, .045, .355, 1);
                transform-origin: 100% 50%;

                &:before {
                    transform: scale(.6);
                    display: inline-block;
                    vertical-align: -3px;
                }

                &:hover {
                    background-color: #b4bccc;
                    color: #fff;
                }
            }
        }
    }
</style>
