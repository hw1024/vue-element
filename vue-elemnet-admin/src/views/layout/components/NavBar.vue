<template>
    <div class='nav-bar'>
        <div v-if='device==="mobile" || navMenuMode === "vertical"'>
            <hamburger id='hamburger-container' :is-active='sidebar.opened' class='hamburger-container'
                       @toggleClick='toggleSideBar'/>
            <breadcrumb v-if='whetherBreadcrumb' id='breadcrumb-container' class='breadcrumb-container'/>
        </div>
        <template v-else>
            <div class='risk-logo'>
                <img :src='logo' height='40px' alt='maxLogoKey'/>
            </div>
            <nav-menu ref='navMenu'></nav-menu>
        </template>
        <div class='right-menu'>
            <template v-if='device!=="mobile"'>
                <screen-full v-if='whetherScreenFull' class='right-menu-item hover-effect'></screen-full>
            </template>
            <dr-lang-select v-if='whetherLangSelect' class='right-menu-item hover-effect'></dr-lang-select>
            <user-info/>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import logoImg from '@/assets/images/logo.png';
    import UserInfo from './UserInfo'
    import NavMenu from './NavMenu'
    import Hamburger from './Hamburger'
    import Breadcrumb from './Breadcrumb'
    import ScreenFull from './ScreenFull'

    export default {
        components: {
            UserInfo,
            NavMenu,
            Breadcrumb,
            Hamburger,
            ScreenFull
        },
        data() {
            return {
                logo: logoImg
            }
        },
        computed: {
            ...mapState({
                sidebar: state => state.app.sidebar,
                device: state => state.app.device,
                navMenuMode: state => state.settings.navMenuMode,
                whetherBreadcrumb: state => state.settings.whetherBreadcrumb,
                whetherScreenFull: state => state.settings.whetherScreenFull,
                whetherLangSelect: state => state.settings.whetherLangSelect
            }),
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('toggleSideBar')
            }
        }
    }
</script>

<style lang='scss' scoped>
    .nav-bar {
        display: flex;
        justify-content: space-between;
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
        }
    }
</style>
