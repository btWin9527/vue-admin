<template>
  <ul class="tab-switch">
    <li v-for="(item,index) in tabList"
        class="tab-li"
        :class="{active:activeIdx===index}"
        @click="clickActiveLi(item,index)"
        :key="index">
      {{item[tabKey]}}
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      tabList: { // tab数据
        default() {
          return [];
        },
        type: Array
      },
      tabKey: { // tab显示对应的key值
        default: 'title',
        type: String
      },
      defaultActiveIdx: {// 默认选中的tab值
        default: 0,
        type: Number
      }
    },
    data() {
      return {
        activeIdx: 0,// tab激活的索引值
      }
    },
    methods: {
      /**
       * @method clickActiveLi 点击li时触发事件
       * @param {Object} item  激活li对应的名称
       * @param {Number} index 激活li对应的索引
       */
      clickActiveLi(item, index) {
        this.activeIdx = index;
        this.$emit('clickActiveLi', {item, index});
      }
    },
    watch: {
      // 处理默认选中状态修改
      defaultActiveIdx(newVal) {
        this.activeIdx = newVal;
      }
    }
  }
</script>

<style scoped lang="scss">
  .tab-switch {
    display: flex;
    height: 40px;
    max-width: 600px;
    background-color: #f5f7fa;
    border: 1px solid #dcdfe6;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    border-bottom: 1px solid #e4e7ed;
    color: #1f2d3d;

    .tab-li {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      font-size: 14px;
      transition: all 0.3s;

      &.active {
        background-color: #fff;
        color: #409eff;
      }
    }
  }
</style>
