/*
* @description
* 该文件主要是用于开发环境下提示一些迁移或者即将修改的属性和方法的
* 例如：
* <el-input  icon="el-icon-date"/>
* 因为icon属性被删除，则会在控制台提示属性移除的提示
* */
import {kebabCase} from '@/utils';

/**
 * Show migrating guide in browser console.
 *
 * Usage:
 * import Migrating from 'element-ui/src/mixins/migrating';
 *
 * mixins: [Migrating]
 *
 * add getMigratingConfig method for your component.
 *  getMigratingConfig() {
 *    return {
 *      props: {
 *        'allow-no-selection': 'allow-no-selection is removed.',
 *        'selection-mode': 'selection-mode is removed.'
 *      },
 *      events: {
 *        selectionchange: 'selectionchange is renamed to selection-change.'
 *      }
 *    };
 *  },
 */
export default {
  mounted() {
    // 开发环境下
    if (process.env.NODE_ENV === 'production') return;
    if (!this.$vnode) return;
    const {props = {}, events = {}} = this.getMigratingConfig();
    // 获取当前组件的配置
    const {data, componentOptions} = this.$vnode;
    const definedProps = data.attrs || {};
    const definedEvents = componentOptions.listeners || {};
    // 查找待
    for (let propName in definedProps) {
      // hasOwnProperty只是保证是defineProps下的属性
      propName = kebabCase(propName); // compatible with camel case
      if (props[propName]) {
        console.warn(`[Element Migrating][${this.$options.name}][Attribute]: ${props[propName]}`);
      }
    }

    for (let eventName in definedEvents) {
      eventName = kebabCase(eventName); // compatible with camel case
      if (events[eventName]) {
        console.warn(`[Element Migrating][${this.$options.name}][Event]: ${events[eventName]}`);
      }
    }
  },
  methods: {
    // 获取迁移属性或者方法
    getMigratingConfig() {
      return {
        props: {},
        events: {}
      };
    }
  }
};
