<template>
    <el-breadcrumb class='app-breadcrumb' separator='/'>
        <transition-group name='breadcrumb'>
            <el-breadcrumb-item v-for='(item,index) in currentPath' :key='item.path'>
                <span v-if='item.redirect==="noRedirect" || index===currentPath.length-1' class='no-redirect'>{{ item.meta.title }}</span>
                <a v-else @click.prevent='handleLink(item)'>{{ item.meta.title }}</a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script>
    import {pathToRegexp} from 'path-to-regexp'

    export default {
        name: 'Breadcrumb',
        data() {
            return {
                currentPath: null, // 显示当前页面的路径，快速返回之前的任意页面。
            }
        },
        watch: {
            $route(route) {
                // route.path.startsWith检测字符串是否以'/redirect/'开始
                if (route.path.startsWith('/redirect/')) {
                    return
                }
                this.getBreadcrumb()
            }
        },
        created() {
            this.getBreadcrumb()
        },
        methods: {
            /**
             * @desc 获取当前页面路径
             */
            getBreadcrumb() {
                let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
                const first = matched[0];
                if (!this.isDashboard(first)) {
                    matched = [{path: '/index', meta: {title: '首页'}}].concat(matched)
                }
                this.currentPath = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
            },
            /**
             * @desc 判断是否为首页
             */
            isDashboard(route) {
                const name = route && route.name;
                if (!name) {
                    return false
                }
                return name.trim() === '首页'
            },
            pathCompile(path) {
                const {params} = this.$route;
                let toPath = pathToRegexp.compile(path);
                return toPath(params)
            },
            /**
             * @desc 路由跳转方法
             */
            handleLink(item) {
                const {redirect, path} = item;
                if (redirect) {
                    this.$router.push(redirect);
                    return
                }
                this.$router.push(this.pathCompile(path))
            }
        }
    }
</script>

<style lang='scss' scoped>
    .app-breadcrumb.el-breadcrumb {
        display: inline-block;
        font-size: 14px;
        line-height: 50px;
        margin-left: 8px;

        .no-redirect {
            color: #97a8be;
            cursor: text;
        }
    }
</style>
