<template>
  <div>
    <!-- 自定义按钮组件 -->
    <el-alert
      title="自定义按钮组件"
      type="success"
      effect="dark"/>
    <CustomBtn
      type="primary">
      按钮
    </CustomBtn>
    <el-button type="primary" id="testBtn">按钮</el-button>
    <!-- 自定义switch组件 -->
    <el-alert
      title="自定义switch组件"
      type="success"
      effect="dark"/>
    <CustomSwitch
      v-model="switchValue"
      active-color="#13ce66"
      inactive-color="#ff4949"
      active-text="按月付费"
      inactive-text="按年付费"
    />
    <el-switch
      v-model="elValue"
      active-color="#13ce66"
      inactive-color="#ff4949">
    </el-switch>

  </div>
</template>

<script>
  import {CustomBtn, CustomSwitch} from '_ele/components'

  export default {
    name: 'eleComponents',
    components: {CustomBtn, CustomSwitch},
    data() {
      return {
        /* switch组件参数 */
        switchValue: true,
        elValue: true,
      };
    },
    methods: {
      testClick() {
        console.log(document.getElementById('testBtn'))
      }
    },
    mounted() {
      // 调用dispatch的获取元素方法
      this.$on('getTestBtn', this.testClick);
    }
  }
</script>

<style scoped>

</style>
