<template>
    <div>
        <dr-svg-icon :icon-class='isFullscreen?"exit-fullscreen":"fullscreen"' @click='click'></dr-svg-icon>
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
            click() {
                if (!screenFull.isEnabled) {
                    this.$message({
                        message: 'you browser can not work',
                        type: 'warning'
                    });
                    return false
                }
                screenFull.toggle()
            },
            change() {
                this.isFullscreen = screenFull.isFullscreen
            },
            init() {
                if (screenFull.isEnabled) {
                    screenFull.on('change', this.change)
                }
            },
            destroy() {
                if (screenFull.isEnabled) {
                    screenFull.off('change', this.change)
                }
            }
        }
    }
</script>
