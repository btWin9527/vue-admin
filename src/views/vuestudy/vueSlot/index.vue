<template>
  <div>
    1. slot + 默认插槽 + 具名插槽 + 作用域插槽
    <el-button type="text" @click="showElDialog">点击打开 Dialog</el-button>
    <el-button type="text" @click="dialogVisible2 = true"
      >点击打开 Dialog2</el-button
    >

    <!-- el-Dialog弹窗优化关闭效果 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      ref="elDialog"
      class="promptDialog"
      :before-close="closeElDialog"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeElDialog">取 消</el-button>
        <el-button type="primary" @click="closeElDialog">确 定</el-button>
      </span>
    </el-dialog>
    <div>
      <div class="item">1</div>
      <div class="item">2</div>
      <div class="item">3</div>
      <div class="item" ref="testItem">4</div>
      <div class="item">5</div>
    </div>

    <!-- 自定义弹窗优化效果 -->
    <CusDialog :visible="dialogVisible2" ref="customRef">
      <el-button type="primary" @click="close">关闭</el-button>
    </CusDialog>
  </div>
</template>

<script>
import CusDialog from "./CusDialog";
export default {
  components: {
    CusDialog
  },
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false
    };
  },
  methods: {
    close() {
      let itemIdRect = this.$refs.testItem.getBoundingClientRect();
      let itemIdX = itemIdRect.x;
      let itemIdY = itemIdRect.y;
      let dialogCont = this.$refs.customRef.$refs.dialogCont;
      let dialogContRect = dialogCont.getBoundingClientRect();
      let dialogContX = dialogContRect.x;
      let dialogContY = dialogContRect.y;
      let dialogContWidth = dialogContRect.width;
      let dialogContHeight = dialogContRect.height;
      dialogCont.style["transform"] = `translate3d(${-(
        dialogContX -
        itemIdX +
        dialogContWidth * 0.48
      )}px,
       ${-(dialogContY - itemIdY + dialogContHeight * 0.48)}px, 0)
       scale(0.06)`;
      let test12 = document.querySelector("#test1");
      test12.style.background = "#fafafa";
      setTimeout(() => {
        this.dialogVisible2 = false;
      }, 950);
    },
    // 展示弹窗 -- 需要清除transform属性
    showElDialog() {
      let dialogCont = this.$refs.elDialog.$refs.dialog;
      if (dialogCont) dialogCont.style.transform = "";
      this.dialogVisible = true;
    },
    closeElDialog() {
      let itemIdRect = this.$refs.testItem.getBoundingClientRect();
      let targetEleX = itemIdRect.x;
      let targetEleY = itemIdRect.y;
      this.closeAnimate(
        {
          targetEleX,
          targetEleY,
          dialogRef: "elDialog",
          scaleRate: 0.06
        },
        () => (this.dialogVisible = false)
      );
    },
    /**
     * @method  closeAnimate  弹窗关闭指定位置缩放动画
     * @params  {Object} options      配置项参数
     * @params  {Number} options.targetEleX   指定元素横坐标
     * @params  {Number} options.targetEleY   指定元素纵坐标
     * @params  {String} options.dialogRef    需要关闭弹窗的ref名称
     * @params  {Number} options.scaleRate    弹窗缩小比例(0~1)
     * @params  {Function} callback    动画结束回调方法
     */
    closeAnimate({ targetEleX, targetEleY, dialogRef, scaleRate }, callback) {
      let dialogContRef = this.$refs[dialogRef].$refs.dialog;
      let dialogContRect = dialogContRef.getBoundingClientRect();
      let dialogContX = dialogContRect.x;
      let dialogContY = dialogContRect.y;
      let dialogContW = dialogContRect.width;
      let dialogContH = dialogContRect.height;
      let offsetRate = (1 - scaleRate) / 2;
      dialogContRef.style["transform"] = `translate3d(${-(
        dialogContX -
        targetEleX +
        dialogContW * offsetRate
      )}px,
       ${-(dialogContY - targetEleY + dialogContH * offsetRate)}px, 0)
       scale(${scaleRate})`;
      setTimeout(() => {
        callback();
      }, 950);
    }
  }
};
</script>

<style scoped lang="scss">
.item {
  background-color: goldenrod;
  margin-bottom: 20px;
  width: 200px;
}
.promptDialog /deep/ .el-dialog {
  transition: all 0.8s linear;
}
</style>
