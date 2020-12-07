<template>
  <router-view :key='key'></router-view>
</template>

<script>
  export default {
    name: 'SubMenu',
    computed: {
      key() {
        return this.$route.fullPath
      }
    }
  }
</script>
