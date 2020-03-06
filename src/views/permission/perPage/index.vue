<template>
  <div class="per-cont">
    <h3>页面权限</h3>
    <SwitchRoles @change="handleRolesChange"/>
  </div>
</template>

<script>
  import SwitchRoles from '../SwitchRoles'

  export default {
    components: {
      SwitchRoles,
    },
    methods: {
      handleRolesChange() {
        this.$router.push({ path: '/permission/index?' + +new Date() })
      }
    }
  }
</script>

<style scoped lang="scss">
  .per-cont {
    padding-left: 20px;
  }
</style>
