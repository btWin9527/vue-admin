<template>
  <div>
    <div class="dialog-bg" v-if="opened" id="test1"></div>
    <div class="dialog" v-show="opened">
      <div class="dialog-cont" ref="dialogCont">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      opened: false
    };
  },
  watch: {
    visible(val) {
      this.opened = val;
      if (val && this.$refs.dialogCont) {
        this.$refs.dialogCont.style.transform = "";
      }
    }
  }
};
</script>

<style scoped lang="scss">
.dialog {
  z-index: 1001;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;

  &-cont {
    position: relative;
    margin: 0 auto 50px;
    margin-top: 15vh;
    background: #ffffff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    width: 50%;
    height: 400px;
    transition: all 0.8s linear;
  }
}

.dialog-bg {
  z-index: 1000;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
  transition: all 0.8s linear;
}
</style>
