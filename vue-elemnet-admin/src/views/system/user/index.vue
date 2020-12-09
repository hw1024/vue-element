<template>
    <div class="home">
        <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
      <span class="el-dropdown-link">
        下拉菜单<em class="el-icon-arrow-down el-icon--right"></em>
      </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :disabled="language==='zh-CN'" command="zh-CN">中文</el-dropdown-item>
                <el-dropdown-item :disabled="language==='en-US'" command="en-US">English</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-row>
            <el-button><h3 class="title">{{ $t('login.title') }}</h3></el-button>
            <el-button type="primary">主要按钮</el-button>
            <el-button type="success">成功按钮</el-button>
            <el-button type="info">信息按钮</el-button>
            <el-button type="warning">警告按钮</el-button>
            <el-button type="danger">危险按钮</el-button>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        computed: {
            language() {
                return this.$store.getters.language
            }
        },
        methods: {
            handleSetLanguage(lang) {
                this.$i18n.locale = lang;
                this.$store.dispatch('setLanguage', lang);
                this.$message({
                    message: '设置语言成功',
                    type: 'success'
                })
            }
        }
    }
</script>
