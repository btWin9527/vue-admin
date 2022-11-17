<!--
 通过组件传递v-model实现外部控制内部状态变更
 适用场景：弹窗类组件
 原理：
    1. 父组件添加v-model='xxx'，子组件需要在props中添加value属性，对应接受v-model的数据
    2. 子组件在computed中定义visible控制弹窗隐藏或显示，分为get和set操作
    3. get方法直接返回this.value值，读值操作
    4. set方法接受传入值 value，调用this.$emit('input',value)，触发v-model操作，修改this.value的值
    5.v-model默认会触发input事件，修改状态后，就会触发get读值操作，实现外部控制和内部状态均可控制状态变更
 -->

<template>
  <div class="about">
    <el-button @click="openDialog">显示弹窗</el-button>
    <customDialog
      :loading="loading"
      v-model="isShow"
      @onConfirm="onConfirm"
    />
  </div>
</template>

<script>

import customDialog from "@/views/vuestudy/vModel/customDialog";

export default {
  data() {
    return {
      // 弹窗状态
      isShow: false,
      // 弹窗确认按钮loading状态
      loading: false,
    }
  },
  components: {customDialog},
  methods: {
    /**
     * 打开弹窗
     */
    openDialog() {
      this.isShow = true
    },
    /**
     * 弹窗确认事件
     */
    onConfirm() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.isShow = false
      }, 1000)
    }
  }
}
</script>
