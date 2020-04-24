<script>
  import TabNav from './tab-nav';

  export default {
    name: 'GxyTabs',
    components: {
      TabNav
    },
    props: {
      type: String, // 风格类型
      activeName: String, //
      closable: Boolean, // 标签是否可关闭
      addable: Boolean, // 标签是否可添加
      value: {},  // 绑定值，选项卡中的name(即默认激活哪一个选项卡,name值在tab-pane中绑定的唯一值)
      editable: Boolean, // 标签是否同时可增加和关闭
      tabPosition: { // 选项卡所在位置
        type: String,
        default: 'top'
      },
      beforeLeave: Function, // 切换标签之前的钩子函数
      stretch: Boolean // 标签的宽度是否自撑开
    }
  }
</script>
