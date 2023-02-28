<template>
  <el-form :model="formData" ref="form" :rules="rules" label-width="100px">
    <el-form-item v-for="(field, index) in fields" :key="field.id"
                  :label="field.label" :prop="field.prop">
      <!-- 输入框 -->
      <el-input v-if="field.type === 'text'" v-model="formData[field.prop]"
                :placeholder="field.placeholder"></el-input>
      <!-- 下拉框 -->
      <el-select v-else-if="field.type === 'select'"
                 v-model="formData[field.prop]"
                 :placeholder="field.placeholder">
        <el-option v-for="(option, i) in field.options" :key="i"
                   :label="option.label" :value="option.value"></el-option>
      </el-select>
      <!-- 切换开关 -->
      <el-switch v-else-if="field.type === 'boolean'"
                 v-model="formData[field.prop]"></el-switch>
      <!-- 日期选择器 -->
      <el-date-picker v-else-if="field.type === 'date'"
                      v-model="formData[field.prop]" :type="field.dateType"
                      :placeholder="field.placeholder"></el-date-picker>
      <!-- 时间选择器 -->
      <el-time-picker v-else-if="field.type === 'time'"
                      v-model="formData[field.prop]"
                      :placeholder="field.placeholder"></el-time-picker>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    fields: {
      type: Array,
      required: true,
    },
    formData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rules: {},
    };
  },
};
</script>
