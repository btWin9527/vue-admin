<template>
  <transition name="gxy-loading-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="gxy-loading-mask"
      :style="{backgroundColor: background || ''}"
      :class="[customClass,{'is-fullscreen': fullscreen}]">
      <div class="gxy-loading-spinner">
        <svg v-if="!spinner" class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none"/>
        </svg>
        <i v-else :class="spinner"></i>
        <p v-if="text" class="gxy-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>

</template>

<script>
export default {
  data() {
    return {
      text: null, // 加载文案
      spinner: null, // 自定义加载图标类名
      background: null, // 背景颜色
      fullscreen: true, // 是否显示为全屏
      visible: true, // 是否显示
      customClass: '', // 自定义class类名
    }
  },
  methods: {
    /* 过渡动画结束回调 */
    handleAfterLeave() {
      this.$emit('after-leave');
    },
    /* 设置加载文案 */
    setText(text) {
      this.text = text;
    }
  }
}
</script>
