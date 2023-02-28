<template>
  <div>
    <!-- 自定义按钮组件 -->
    <el-alert
      title="自定义按钮组件"
      type="success"
      effect="dark"/>
    <CustomBtn
      type="primary">
      自定义
    </CustomBtn>
    <el-button type="primary" id="testBtn">el-按钮</el-button>
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
    <!-- 自定义input组件 -->
    <el-alert
      title="自定义input组件"
      type="success"
      effect="dark"/>
    <!-- icon属性被ui框架删除，使用时会在控制台提示属性已经删除(@/utils/migrating.js 该文件处理迁移提示) -->
    <CustomInput
      v-model="cusInput"
      style="width: 200px;"
      placeholder="自定义输入框"
      clearable
      icon="el-icon-date"
      type="textarea"
      showWordLimit/>
    <el-input v-model="elInput" style="width: 200px;" placeholder="el 输入框" clearable/>
  </div>
</template>

<script>
import {CustomBtn, CustomSwitch, CustomInput} from '_ele/components'

export default {
  name: 'eleComponents',
  components: {CustomBtn, CustomSwitch, CustomInput},
  data() {
    return {
      /* switch组件参数 */
      switchValue: true,
      elValue: true,
      /* input组件参数 */
      elInput: '',
      cusInput: ''
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

