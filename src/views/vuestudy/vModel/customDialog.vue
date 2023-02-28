<template>
  <div class="ConfirmPop">
    <el-dialog
      :visible="visible"
      @close="visible = false">
      <div class="modal-content-demo">
        内容区
      </div>
      <template v-slot:footer>
        <div class="footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button
            type="primary"
            :loading="loading" @click="onConfirm">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    // 这里接收的这里改成了value
    value: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    visible: {
      get() {
        return this.value
      },
      set(val) {
        // 当visible改变的时候，触发父组件的 input方法，在该方法中更改传入子组件的值
        // 这里触发的事件改成了input
        this.$emit('input', val)
      }
    }
  },
  methods: {
    onConfirm() {
      this.$emit('onConfirm')
    },
  }
}
</script>

