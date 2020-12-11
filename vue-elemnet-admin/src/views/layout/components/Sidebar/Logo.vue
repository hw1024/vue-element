<template>
    <div class='dr-logo-container' :class='{"collapse":collapse}'>
        <transition name='drLogoFade'>
            <router-link v-if='collapse' key='collapse' class='dr-logo-link' to='/'>
                <img v-if='logo' alt='sidebar-logo' :src='logo' class='dr-logo'>
                <h1 v-else class='dr-title'>{{ title }} </h1>
            </router-link>
            <router-link v-else key='expand' class='dr-logo-link' to='/'>
                <img v-if='logo' alt='sidebar-logo' :src='logo' class='dr-logo'>
                <h1 class='dr-title'>{{ title }} </h1>
            </router-link>
        </transition>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import logoImg from '@/assets/images/logo.png';

    export default {
        name: 'SidebarLogo',
        props: {
            collapse: {
                type: Boolean,
                required: true
            }
        },
        computed: {
            ...mapState({
                title: state => state.settings.title
            }),
        },
        data() {
            return {
                logo: logoImg
            }
        }
    }
</script>

<style lang='scss' scoped>
    .dr-logo-container {
        position: relative;
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: #2b2f3a;
        text-align: center;
        overflow: hidden;

        & .dr-logo-link {
            height: 100%;
            width: 100%;

            & .dr-logo {
                width: 32px;
                height: 32px;
                vertical-align: middle;
                margin-right: 12px;
            }

            & .dr-title {
                display: inline-block;
                line-height: 50px;
                margin: 0;
                color: #fff;
                font-weight: 600;
                font-size: 14px;
                font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
                vertical-align: middle;
            }
        }

        &.collapse {
            .dr-logo {
                margin-right: 0;
            }
        }
    }

    .drLogoFade-enter-active {
        transition: opacity 1.5s;
    }

    .drLogoFade-enter, .drLogoFade-leave-to {
        opacity: 0;
    }
</style>
