<template>
  <div>
    <el-alert
      title="自定义按钮组件"
      type="success"
      effect="dark"/>
    <CustomBtn
      type="primary">
      按钮
    </CustomBtn>
    <el-button type="primary">按钮</el-button>
  </div>
</template>

<script>
  import {CustomBtn} from '_ele/components'

  export default {
    components: {CustomBtn},
  }
</script>

<style scoped>

</style>
