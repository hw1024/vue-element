<template>
    <div class='navbar'>
        <hamburger id='hamburger-container' :is-active='sidebar.opened' class='hamburger-container'
                   @toggleClick='toggleSideBar'/>
        <breadcrumb id='breadcrumb-container' class='breadcrumb-container'/>
        <div class='right-menu'>
            <template v-if='device!=="mobile"'>
                <screen-full v-if='whetherScreenFull' class='right-menu-item hover-effect'></screen-full>
            </template>
            <dr-lang-select v-if='whetherLangSelect' class='right-menu-item hover-effect'></dr-lang-select>
            <el-dropdown class='avatar-container right-menu-item hover-effect' trigger='hover'>
                <div class='avatar-wrapper'>
                    <dr-svg-icon :icon-class='"user"'></dr-svg-icon>
                </div>
                <el-dropdown-menu slot='dropdown'>
                    <router-link to='/user/profile'>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided @click.native='logout'>
                        <span>退出登录</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Hamburger from './Hamburger'
    import Breadcrumb from './Breadcrumb'
    import ScreenFull from './ScreenFull'
    import DrLangSelect from "@/components/global/DrLangSelect";

    export default {
        components: {
            DrLangSelect,
            Breadcrumb,
            Hamburger,
            ScreenFull
        },
        computed: {
            ...mapState({
                sidebar: state => state.app.sidebar,
                device: state => state.app.device,
                whetherScreenFull: state => state.settings.whetherScreenFull,
                whetherLangSelect: state => state.settings.whetherLangSelect,
                needTagsView: state => state.settings.tagsView,
                fixedHeader: state => state.settings.fixedHeader
            }),
            classObj() {
                return {
                    hideSidebar: !this.sidebar.opened,
                    openSidebar: this.sidebar.opened,
                    withoutAnimation: this.sidebar.withoutAnimation,
                    mobile: this.device === 'mobile'
                }
            }
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('toggleSideBar')
            },
            async logout() {
                this.$confirm('确定注销并退出系统吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('LogOut').then(() => {
                        location.href = '/index';
                    })
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
    .navbar {
        height: 50px;
        overflow: hidden;
        position: relative;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

        .hamburger-container {
            line-height: 46px;
            height: 100%;
            float: left;
            cursor: pointer;
            transition: background .3s;
            -webkit-tap-highlight-color: transparent;

            &:hover {
                background: rgba(0, 0, 0, .025)
            }
        }

        .breadcrumb-container {
            float: left;
        }

        .errLog-container {
            display: inline-block;
            vertical-align: top;
        }

        .right-menu {
            float: right;
            height: 100%;
            line-height: 50px;

            &:focus {
                outline: none;
            }

            .right-menu-item {
                display: inline-block;
                padding: 0 12px;
                height: 100%;
                font-size: 18px;
                color: #5a5e66;
                vertical-align: text-bottom;

                &.hover-effect {
                    cursor: pointer;
                    transition: background .3s;

                    &:hover {
                        background: rgba(0, 0, 0, .025)
                    }
                }
            }

            .avatar-container {
                margin-right: 30px;

                .avatar-wrapper {
                    position: relative;

                    .user-avatar {
                        cursor: pointer;
                        width: 40px;
                        height: 40px;
                        border-radius: 10px;
                    }

                    .el-icon-caret-bottom {
                        cursor: pointer;
                        position: absolute;
                        right: -20px;
                        top: 25px;
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>
