<template>
    <div>
            <el-menu
                :default-active='activeMenu'
                :text-color='variables.menuText'
                :unique-opened='true'
                :collapse-transition='false'
                mode='horizontal'>
                <sub-item
                    v-for='(route, index) in permission_routes'
                    :key='route.path  + index'
                    :item='route'
                    :base-path='route.path'
                />
            </el-menu>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import SubItem from './SubItem';
    import variables from '@/assets/styles/_variables.scss';

    export default {
        components: {SubItem},
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
        }
    };
</script>
