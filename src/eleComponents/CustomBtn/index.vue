<!--
  参考el-button封装按钮组件
-->

<template>
  <button
    class="gxy-button"
    @click="handleClick"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type? 'gxy-button--'+ type : '',
      size? 'gxy-button--'+ size: '',
      {
        'is-disabled': disabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <i class="el-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <!--
     $slots.default 所有没有被包含在具名插槽中的节点
     -->
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script>
  export default {
    props: {
      loading: Boolean,
      disabled: Boolean,
      autofocus: Boolean,
      plain: Boolean,
      round: Boolean,
      circle: Boolean,
      size: String, // 按钮大小: medium
      nativeType: { // 按钮type类型
        type: String,
        default: 'button'
      },
      type: { // 按钮类型: default,primary
        type: String,
        default: 'default'
      },
      icon: {
        type: String,
        default: ''
      },
    },
    computed: {},
    methods: {
      handleClick(event) {
        this.$emit('click', event);
      }
    }
  }
</script>

<style scoped lang="sass">
  @import "./button.scss"
</style>
