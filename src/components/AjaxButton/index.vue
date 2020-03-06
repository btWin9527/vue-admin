<template>
      <!-- 此组件支持自定义按钮文字和自定义按钮图片 -->
  <button
    :style="customStyle"
    @click="handleClick" class="ajaxBtn" :class="{loadingBtn:loading}">
    <span v-if="loading"><i class="el-icon-loading"></i>loading...</span>
    <span v-else><slot></slot></span>
  </button>
</template>

<script>
  export default {
    name: 'shadowButton',
    props: {
      customStyle: {
        default() {
          return {}
        },
        type: Object
      },
      loading: {
        default: true,
        type: Boolean
      }
    },
    methods: {
      handleClick() {
        this.$emit('clickAjaxBtn');
      }
    }
  }
</script>
<style scoped lang="scss">
  .ajaxBtn {
    position: relative;
    padding: 12px 20px;
    border-radius: 4px;
    color: #fff;
    background-color: #409eff;
    border: 1px solid #409eff;

    &:hover,
    &.loadingBtn {
      background: #66b1ff;
      border-color: #66b1ff;
    }


    .el-icon-loading {
      margin-right: 4px;
    }
  }

</style>
