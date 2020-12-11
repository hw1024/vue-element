<template>
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
</template>

<script>
    export default {
        name: 'UserInfo',
        methods: {
            /**
             * @desc 注销方法
             */
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
</style>
