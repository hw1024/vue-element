import store from '@/store'

const {body} = document;
const WIDTH = 992;

export default {
    watch: {
        $route(route) {
            if (this.device === 'mobile' && this.sidebar.opened) {
                store.dispatch('closeSideBar', {withoutAnimation: false})
            }
        }
    },
    beforeMount() {
        window.addEventListener('resize', this.resizeHandler)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resizeHandler)
    },
    mounted() {
        const isPhone = this.isMobile();
        if (isPhone) {
            store.dispatch('toggleDevice', 'mobile');
            store.dispatch('closeSideBar', {withoutAnimation: true})
        }
    },
    methods: {
        isMobile() {
            const rect = body.getBoundingClientRect();
            return rect.width - 1 < WIDTH
        },
        resizeHandler() {
            if (!document.hidden) {
                const isPhone = this.isMobile();
                store.dispatch('toggleDevice', isPhone ? 'mobile' : 'desktop');
                if (isPhone) {
                    store.dispatch('closeSideBar', {withoutAnimation: true})
                }
            }
        }
    }
}
