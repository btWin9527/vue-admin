/*
*
* @description  遍历寻找所有子孙组件，假如子孙组件和componentName组件名称相同的话，则触发$emit的事件方法，数据为 params.
 如果没有找到 则使用递归的方式 继续查找孙组件，直到找到为止，否则继续递归查找，直到找到最后一个都没有找到为止
* */
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.name;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}

export default {
  methods: {
    /**
     * @method dispatch                     查找所有父级，直到找到要找到的父组件，并在身上触发指定的事件
     * @param  componentName        组件名
     * @param  eventName            事件名
     * @param  params        触发时带入的参数
     */
    dispatch(componentName, eventName, params) {
      // 查找到当前元素的父组件，如果没有就使用根节点，并取父组件的组件名用于后期匹配
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;
      // while循环，用于循环父组件，直到找到或者到达根元素，匹配不到
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name;
        }
      }
      // 当有匹配到的父组件时，就去触发父组件的对应的事件函数
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    /**
     * @method broadcast            事件广播
     * @param  componentName        组件名
     * @param  eventName            事件名
     * @param  params        触发时带入的参数
     */
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
