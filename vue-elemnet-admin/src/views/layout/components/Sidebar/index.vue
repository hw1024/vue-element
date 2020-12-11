<template>
    <div>
        <logo :collapse='isCollapse'/>
        <el-scrollbar wrap-class='scrollbar-wrapper'>
            <el-menu
                :default-active='activeMenu'
                :collapse='isCollapse'
                :background-color='variables.menuBg'
                :text-color='variables.menuText'
                :unique-opened='true'
                :collapse-transition='false'
                mode='vertical'>
                <sidebar-item
                    v-for='(route, index) in permission_routes'
                    :key='route.path  + index'
                    :item='route'
                    :base-path='route.path'
                />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import Logo from './Logo';
    import SidebarItem from './SidebarItem';
    import variables from '@/assets/styles/_variables.scss';

    export default {
        components: {SidebarItem, Logo},
        computed: {
            ...mapGetters(['permission_routes', 'sidebar']),
            activeMenu() {
                const route = this.$route;
                const {meta, path} = route;
                if (meta.activeMenu) {
                    return meta.activeMenu;
                }
                return path;
            },
            variables() {
                return variables;
            },
            isCollapse() {
                return !this.sidebar.opened;
            }
        }
    };
</script>
