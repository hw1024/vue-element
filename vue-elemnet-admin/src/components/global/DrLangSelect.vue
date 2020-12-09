<template>
    <el-dropdown trigger='hover' class='international' @command='selectLang'>
        <div class='avatar-wrapper'>
            <dr-svg-icon :icon-class='"language"'></dr-svg-icon>
        </div>
        <el-dropdown-menu slot='dropdown'>
            <el-dropdown-item :disabled='lang==="zh-CN"' command='zh-CN'>中文</el-dropdown-item>
            <el-dropdown-item :disabled='lang==="en-US"' command='en-US'>English</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
    export default {
        name: 'DrLangSelect',
        computed: {
            lang() {
                return this.$store.getters.language
            },
        },
        methods: {
            selectLang(lang) {
                if (lang !== this.lang) {
                    this.$i18n.locale = lang;
                    this.$store.dispatch('setLanguage', lang);
                    this.$message({
                        message: '设置语言成功',
                        type: 'success'
                    })
                }
            }
        }
    }
</script>

