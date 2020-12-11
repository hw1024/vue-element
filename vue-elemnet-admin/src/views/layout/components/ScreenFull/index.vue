<template>
    <div>
        <dr-svg-icon :icon-class='isFullscreen?"exit-fullscreen":"fullscreen"' @click='fullScreenClick'></dr-svg-icon>
    </div>
</template>

<script>
    import screenFull from 'screenfull'

    export default {
        name: 'ScreenFull',
        data() {
            return {
                isFullscreen: false
            }
        },
        mounted() {
            this.init()
        },
        beforeDestroy() {
            this.destroy()
        },
        methods: {
            /**
             * @desc 全屏方法页面初始化
             */
            init() {
                if (screenFull.isEnabled) {
                    screenFull.on('change', this.screenChange)
                }
            },
            /**
             * @desc 全屏显示按钮点击方法
             */
            fullScreenClick() {
                if (!screenFull.isEnabled) {
                    this.$message({
                        message: 'you browser can not work',
                        type: 'warning'
                    });
                    return false
                }
                screenFull.toggle()
            },
            /**
             * @desc 全屏效果切换方法
             */
            screenChange() {
                this.isFullscreen = screenFull.isFullscreen
            },
            /**
             * @desc 页面销毁清除全屏效果
             */
            destroy() {
                if (screenFull.isEnabled) {
                    screenFull.off('change', this.screenChange)
                }
            }
        }
    }
</script>
