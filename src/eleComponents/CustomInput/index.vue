<template>
  <div :class="[
    type === 'textarea' ? 'gxy-textarea' : 'gxy-input',
    inputSize ? 'gxy-input--' + inputSize : '',
    {
      'is-disabled': inputDisabled,
      'is-exceed': inputExceed,
      'gxy-input-group': $slots.prepend || $slots.append,
      'gxy-input-group--append': $slots.append,
      'gxy-input-group--prepend': $slots.prepend,
      'gxy-input--prefix': $slots.prefix || prefixIcon,
      'gxy-input--suffix': $slots.suffix || suffixIcon || clearable || showPassword
    }
    ]"
       @mouseenter="hovering = true"
       @mouseleave="hovering = false"
  >
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="gxy-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        :tabindex="tabindex"
        v-if="type !== 'textarea'"
        class="gxy-input__inner"
        v-bind="$attrs"
        :type="showPassword ? (passwordVisible ? 'text': 'password') : type"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autoComplete || autocomplete"
        ref="input"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :aria-label="label"
      >
      <!-- 前置内容 -->
      <span class="gxy-input__prefix" v-if="$slots.prefix || prefixIcon">
        <slot name="prefix"></slot>
        <i class="gxy-input__icon"
           v-if="prefixIcon"
           :class="prefixIcon">
        </i>
      </span>
      <!-- 后置内容 -->
      <span
        class="gxy-input__suffix"
        v-if="getSuffixVisible()">
        <span class="gxy-input__suffix-inner">
          <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
            <slot name="suffix"></slot>
            <i class="gxy-input__icon"
               v-if="suffixIcon"
               :class="suffixIcon">
            </i>
          </template>
          <i v-if="showClear"
             class="el-input__icon el-icon-circle-close gxy-input__clear"
             @mousedown.prevent
             @click="clear"
          ></i>
          <i v-if="showPwdVisible"
             class="el-input__icon el-icon-view gxy-input__clear"
             @click="handlePasswordVisible"
          ></i>
          <span v-if="isWordLimitVisible" class="gxy-input__count">
            <span class="gxy-input__count-inner">
              {{ textLength }}/{{ upperLimit }}
            </span>
          </span>
        </span>
        <i class="gxy-input__icon"
           v-if="validateState"
           :class="['gxy-input__validateIcon', validateIcon]">
        </i>
      </span>
      <!-- 后置元素 -->
      <div class="gxy-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      :tabindex="tabindex"
      class="gxy-textarea__inner"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      ref="textarea"
      v-bind="$attrs"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autocomplete="autoComplete || autocomplete"
      :style="textareaStyle"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :aria-label="label"
    >
    </textarea>
    {{ isWordLimitVisible }}
    <span v-if="isWordLimitVisible && type === 'textarea'" class="gxy-input__count">{{ textLength }}/{{
        upperLimit
      }}</span>
  </div>
</template>

<script>
import emitter from '@/mixins/emitter'; // 配置多级组件调用事件绑定
import Migrating from '@/mixins/migrating'; // 开发环境下提示一些迁移或者即将修改的属性和方法的(应用方法: getMigratingConfig)
import calcTextareaHeight from './calcTextareaHeight'; // 通过获取要计算textarea上的style, 并赋值给js生成的textarea元素，并计算它的高度进而推算可放大和缩小的范围
import merge from '@/utils/merge'; //
import {isKorean} from '@/utils/shared'; // 是否是朝鲜语

export default {
  name: 'CustomInput',
  componentName: 'CustomInput',
  mixins: [emitter, Migrating],
  inheritAttrs: false, // 组件将不会把未被注册的props呈现为普通的html属性，
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  data() {
    return {
      textareaCalcStyle: {},
      hovering: false,
      focused: false,
      isComposing: false,
      passwordVisible: false
    };
  },

  props: {
    value: [String, Number], // 同 v-model
    size: String, // 输入框尺寸
    resize: String, // 控制是否能被用户缩放
    form: String, // 原生属性
    disabled: Boolean, // 禁用
    readonly: Boolean, // 只读
    type: { // text, textarea
      type: String,
      default: 'text'
    }, // 输入框类型
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    /** @Deprecated in next major version */
    autoComplete: {
      type: String,
      validator(val) {
        process.env.NODE_ENV !== 'production' &&
        console.warn('[Element Warn][Input]\'auto-complete\' property will be deprecated in next major version. please use \'autocomplete\' instead.');
        return true;
      }
    },
    validateEvent: { // 是否触发表单校验
      type: Boolean,
      default: true
    },
    suffixIcon: String, // 输入框尾部图标
    prefixIcon: String, // 输入框头部图标
    label: String, // 关联的文字
    clearable: { // 是否可清空
      type: Boolean,
      default: false
    },
    showPassword: { // 是否显示切换密码图标
      type: Boolean,
      default: false
    },
    showWordLimit: { // 是否显示输入字数统计
      type: Boolean,
      default: false
    },
    tabindex: String
  },

  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    validateState() {
      return this.elFormItem ? this.elFormItem.validateState : '';
    },
    needStatusIcon() {
      return this.elForm ? this.elForm.statusIcon : false;
    },
    validateIcon() {
      return {
        validating: 'el-icon-loading',
        success: 'el-icon-circle-check',
        error: 'el-icon-circle-close'
      }[this.validateState];
    },
    textareaStyle() {
      return merge({}, this.textareaCalcStyle, {resize: this.resize});
    },
    inputSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    inputDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
    nativeInputValue() {
      return this.value === null || this.value === undefined ? '' : String(this.value);
    },
    showClear() {
      return this.clearable &&
        !this.inputDisabled &&
        !this.readonly &&
        this.nativeInputValue &&
        (this.focused || this.hovering);
    },
    showPwdVisible() {
      return this.showPassword &&
        !this.inputDisabled &&
        !this.readonly &&
        (!!this.nativeInputValue || this.focused);
    },
    isWordLimitVisible() {
      return this.showWordLimit &&
        this.$attrs.maxlength &&
        (this.type === 'text' || this.type === 'textarea') &&
        !this.inputDisabled &&
        !this.readonly &&
        !this.showPassword;
    },
    upperLimit() {
      return this.$attrs.maxlength;
    },
    textLength() {
      if (typeof this.value === 'number') {
        return String(this.value).length;
      }

      return (this.value || '').length;
    },
    inputExceed() {
      // show exceed style if length of initial value greater then maxlength
      return this.isWordLimitVisible &&
        (this.textLength > this.upperLimit);
    }
  },

  watch: {
    value(val) {
      this.$nextTick(this.resizeTextarea);
      if (this.validateEvent) {
        // 调用多级父组件方法
        this.dispatch('ElFormItem', 'el.form.change', [val]);
      }
    },
    // native input value is set explicitly
    // do not use v-model / :value in template
    // see: https://github.com/ElemeFE/element/issues/14521
    nativeInputValue() {
      this.setNativeInputValue();
    },
    // when change between <input> and <textarea>,
    // update DOM dependent value and styles
    // https://github.com/ElemeFE/element/issues/14857
    type() {
      this.$nextTick(() => {
        this.setNativeInputValue();
        this.resizeTextarea();
        this.updateIconOffset();
      });
    }
  },

  methods: {
    focus() {
      this.getInput().focus();
    },
    blur() {
      this.getInput().blur();
    },
    getMigratingConfig() {
      return {
        props: {
          'icon': 'icon is removed, use suffix-icon / prefix-icon instead.',
          'on-icon-click': 'on-icon-click is removed.'
        },
        events: {
          'click': 'click is removed.'
        }
      };
    },
    handleBlur(event) {
      this.focused = false;
      this.$emit('blur', event);
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.blur', [this.value]);
      }
    },
    select() {
      this.getInput().select();
    },
    resizeTextarea() {
      if (this.$isServer) return;
      const {autosize, type} = this;
      if (type !== 'textarea') return;
      if (!autosize) {
        this.textareaCalcStyle = {
          minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
        };
        return;
      }
      const minRows = autosize.minRows;
      const maxRows = autosize.maxRows;

      this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
    },
    setNativeInputValue() {
      const input = this.getInput();
      if (!input) return;
      if (input.value === this.nativeInputValue) return;
      input.value = this.nativeInputValue;
    },
    handleFocus(event) {
      this.focused = true;
      this.$emit('focus', event);
    },
    handleCompositionStart() {
      this.isComposing = true;
    },
    handleCompositionUpdate(event) {
      const text = event.target.value;
      const lastCharacter = text[text.length - 1] || '';
      this.isComposing = !isKorean(lastCharacter);
    },
    /* 当文本段落的组成完成或取消时, compositionend 事件将被触发 (具有特殊字符的触发, 需要一系列键和其他输入 */
    handleCompositionEnd(event) {
      if (this.isComposing) {
        this.isComposing = false;
        this.handleInput(event);
      }
    },
    handleInput(event) {
      // should not emit input during composition
      // see: https://github.com/ElemeFE/element/issues/10516
      // 判断是否支持compositionstart 事件，优化输入中文时在输入状态触发oninput事件
      if (this.isComposing) return;
      // hack for https://github.com/ElemeFE/element/issues/8548
      // should remove the following line when we don't support IE
      if (event.target.value === this.nativeInputValue) return;

      this.$emit('input', event.target.value);

      // ensure native input value is controlled
      // see: https://github.com/ElemeFE/element/issues/12850
      this.$nextTick(this.setNativeInputValue);
    },
    handleChange(event) {
      this.$emit('change', event.target.value);
    },
    calcIconOffset(place) {
      let elList = [].slice.call(this.$el.querySelectorAll(`.el-input__${place}`) || []);
      if (!elList.length) return;
      let el = null;
      for (let i = 0; i < elList.length; i++) {
        if (elList[i].parentNode === this.$el) {
          el = elList[i];
          break;
        }
      }
      if (!el) return;
      const pendantMap = {
        suffix: 'append',
        prefix: 'prepend'
      };

      const pendant = pendantMap[place];
      if (this.$slots[pendant]) {
        el.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${this.$el.querySelector(`.el-input-group__${pendant}`).offsetWidth}px)`;
      } else {
        el.removeAttribute('style');
      }
    },
    updateIconOffset() {
      this.calcIconOffset('prefix');
      this.calcIconOffset('suffix');
    },
    clear() {
      this.$emit('input', '');
      this.$emit('change', '');
      this.$emit('clear');
    },
    handlePasswordVisible() {
      this.passwordVisible = !this.passwordVisible;
      this.focus();
    },
    getInput() { // 获取绑定的引用信息, 及 dom元素
      return this.$refs.input || this.$refs.textarea;
    },
    getSuffixVisible() {
      return this.$slots.suffix ||
        this.suffixIcon ||
        this.showClear ||
        this.showPassword ||
        this.isWordLimitVisible ||
        (this.validateState && this.needStatusIcon);
    }
  },
  created() {
    this.$on('inputSelect', this.select);
  },
  mounted() {
    this.setNativeInputValue();
    this.resizeTextarea();
    this.updateIconOffset();
  },
  updated() {
    this.$nextTick(this.updateIconOffset);
  }
};
</script>
<style scoped lang="scss">
@import "./input";
</style>
