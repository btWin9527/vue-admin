<template>
  <el-radio-group v-model="switchRoles">
    <el-radio-button label="editor"/>
    <el-radio-button label="admin"/>
  </el-radio-group>
</template>

<script>
  export default {
    computed: {
      roles() {
        return this.$store.getters.roles
      },
      switchRoles: {
        get() {
          return this.roles[0]
        },
        set(val) {
          return this.$store.dispatch('user/changeRoles', val).then(() => {
            this.$emit('change')
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
