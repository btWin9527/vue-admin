<template>
  <div
    class="gxy-switch"
    :class="{'is-disabled':disabled,'is-checked':checked}"
    role="switch"
    @click.prevent="switchValue"
  >
    <input
      class="gxy-switch__input"
      @change="handleChange"
      ref="input"
      :id="id"
      :name="name"
      :true-value="activeValue"
      :false-value="inactiveValue"
      :disabled="disabled"
      @keydown.enter="switchValue"
      type="checkbox">

    <!-- 显示左边的标签 -->
    <span
      :class="['gxy-switch__label','gxy-switch__label--left',!checked?'is-active':'']"
      v-if="inactiveIconClass || inactiveText">
      <i :class="[inactiveIconClass]" v-if="inactiveIconClass"></i>
        <span v-if="!inactiveIconClass && inactiveText">{{inactiveText}}</span>
      </span>
    <!-- 中间开关 -->
    <span class="gxy-switch__core" ref="core"
          :style="{'width':coreWidth + 'px'}"></span>
    <!-- 显示右边的标签 -->
    <span
      :class="['el-switch__label', 'el-switch__label--right', checked ? 'is-active' : '']"
      v-if="activeIconClass || activeText">
      <i :class="[activeIconClass]" v-if="activeIconClass"></i>
      <span v-if="!activeIconClass && activeText" :aria-hidden="!checked">{{ activeText }}</span>
    </span>
  </div>
</template>

<script>
  import emitter from '@/mixins/emitter';
  import Focus from '@/mixins/focus'; // 默认聚焦

  export default {
    name: 'CustomSwitch',
    mixins: [Focus('input'), emitter],
    props: {
      value: { // 绑定值    boolean/string/number
        type: [Boolean, String, Number],
        default: false
      },
      disabled: { // 是否禁用
        type: Boolean,
        default: false
      },
      width: { // switch的宽度(px)
        type: Number,
        default: 40
      },
      activeIconClass: { // switch打开时所显示的图标的类名
        type: String,
        default: ''
      },
      inactiveIconClass: { // switch 关闭时所显示图标的类名
        type: String,
        default: ''
      },
      activeText: String, // switch打开时的文字描述
      inactiveText: String, // switch关闭时的文字描述
      activeColor: { // switch打开时的背景颜色
        type: String,
        default: ''
      },
      inactiveColor: { // switch关闭时的背景颜色
        type: String,
        default: ''
      },
      activeValue: { // switch 打开时的值
        type: [Boolean, String, Number],
        default: true
      },
      inactiveValue: { // switch 关闭时的值
        type: [Boolean, String, Number],
        default: false
      },
      name: { // switch对应的name值
        type: String,
        default: ''
      },
      id: String, // 元素id绑定
    },
    data() {
      return {
        coreWidth: this.width,
      };
    },
    created() {
      /* ~表示按位取反，在十进制中可以理解为 ~X = -(X+1) */
      if (!~[this.activeValue, this.inactiveValue].indexOf(this.value)) {
        // 判断this.value在前面数组中是否存在, 不存在true,存在false
        this.$emit('input', this.inactiveValue);
      }
    },
    computed: {
      checked() { // 当前开关的状态
        return this.value === this.activeValue; // 父组件中v-model的值是否等于switch打开时的值
      },
    },
    watch: {
      checked() {
        this.$refs.input.checked = this.checked;
        if (this.activeColor || this.inactiveColor) { // 自定义激活或未激活的背景色
          this.setBackgroundColor();
        }
      }
    },
    methods: {
      handleChange(event) {
        // todo: 测试dispatch方法
        this.dispatch('eleComponents', 'getTestBtn');
        const val = this.checked ? this.inactiveValue : this.activeValue;
        this.$emit('input', val);
        this.$emit('change', val);
        this.$nextTick(() => {
          // 修改value值并非立即生效，为了防止父组件未修改值，这里重复赋值
          this.$refs.input.checked = this.checked;
        });
      },
      /* 设置背景颜色 */
      setBackgroundColor() {
        let newColor = this.checked ? this.activeColor : this.inactiveColor;
        this.$refs.core.style.borderColor = newColor;
        this.$refs.core.style.backgroundColor = newColor;
      },
      /* 未禁用状态下添加enter事件 */
      switchValue() {
        !this.switchDisabled && this.handleChange();
      },
    },
    mounted() {
      /* istanbul ignore if */
      /* 计算覆盖率的时候忽略if语句块 */
      this.coreWidth = this.width || 40;
      if (this.activeColor || this.inactiveColor) {
        this.setBackgroundColor();
      }
      this.$refs.input.checked = this.checked;
    }
  }
</script>

<style scoped lang="scss">
  @import "./switch";
</style>
