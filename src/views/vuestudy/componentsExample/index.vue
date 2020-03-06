<template>
  <div class="component-cont">
    <div class="cont-item">
      <h2 class="cont-item-title">1. 自定义Tab切换</h2>
      <!--
       tab切换配合动态组件
       -->
      <TabSwitch
        @clickActiveLi="clickActiveLi"
        :defaultActiveIdx="tabOption.defaultActiveIdx"
        :tabKey="tabOption.tabKey"
        :tabList="tabOption.tabList"/>
      <!-- 动态组件配合keep-alive避免重新加载 -->
      <transition>
        <keep-alive>
          <component :is="tabOption.currentView"></component>
        </keep-alive>
      </transition>
    </div>
    <div class="cont-item">
      <h2 class="cont-item-title">2. 自定义请求按钮</h2>
      <AjaxButton :customStyle="ajaxBtnOption.customStyle"
                  @clickAjaxBtn="clickAjaxBtn"
                  :loading="ajaxBtnOption.loading">
        异步请求按钮
      </AjaxButton>
    </div>
    <div class="cont-item">
      <h2 class="cont-item-title">3. 自定义渲染大数据tree组件</h2>
<!--      <DataTree/>-->
    </div>
  </div>
</template>

<script>
  import {TabSwitch, AjaxButton,DataTree} from "@/components";
  import {Child1, Child2, Child3} from "./components";
  // tab切换测试数据
  let tabList = [
    {title: '选项卡一'},
    {title: '选项卡二'},
    {title: '选项卡三'}];

  export default {
    components: {
      // eslint-disable-next-line vue/no-unused-components
      TabSwitch,
      AjaxButton,
      DataTree,
      Child1,
      Child2,
      Child3,
    },
    name: 'componentsExm',
    data() {
      return {
        tabOption: {// tab组件切换配置
          defaultActiveIdx: 1,// 默认选中li
          tabKey: 'title',// 默认选中的索引
          tabList,// tab数据
          currentView: 'Child1',
          viewArr: ['Child1', 'Child2', 'Child3']
        },
        ajaxBtnOption: {
          customStyle: {},
          loading: false,
        },
        tree:[
          {
            id:1,
            name:123
          }
        ]
      }
    },
    methods: {
      /* 页面初始化加载*/
      initData() {
        this.imitateAsync();
      },
      /* tab切换相关事件*/
      // 点击tab时触发的事件
      clickActiveLi(val) {
        this.tabOption.currentView = this.tabOption.viewArr[val.index];
        console.log(val, 'tab激活');
      },
      // 模拟异步操作修改tab默认值
      imitateAsync() {
        setTimeout(() => {
          this.tabOption.defaultActiveIdx = 2;
          this.tabOption.currentView = this.tabOption.viewArr[2];
        }, 100)
      },
      /* 异步请求按钮相关事件*/
      // 按钮点击事件
      clickAjaxBtn() {
        this.ajaxBtnOption.loading = true;
        setTimeout(() => {
          this.ajaxBtnOption.loading = false;
        }, 500);
      }
    },
    beforeMount() {
      this.initData();
    }
  }
</script>

<style scoped lang="scss">
  .component-cont {
    padding: 0 20px;

    .cont-item {
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 2px solid #ddd;

      &-title {
        color: #5a5e66;
        transition: color 0.2s;

        &:hover {
          color: #97a8be;
        }
      }
    }
  }
</style>
