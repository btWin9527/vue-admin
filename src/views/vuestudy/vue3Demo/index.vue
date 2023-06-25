<script setup>
import {ref, reactive, toRefs, computed, watch} from "vue";

// 使用defineProps定义props
// 使用defineEmits定义emit

// 变量定义
const count = ref(0)

const state = reactive({
  name: 'vue3'
})

// 计算属性

const countComputed = computed(() => {
  return count.value * 20
})

// 方法使用
const handleChangeName = () => {
  state.name = 'xxx'
}

const handleChangeCount = () => {
  count.value++
}

// watch监听
watch(() => count.value, (newVal, oldVal) => {
  console.log('newVal', newVal)
  console.log('oldVal', oldVal)
})

// 解构state值
const {name} = toRefs(state)

</script>
<template>
  <div>
    <el-button type="primary" @click="handleChangeCount">修改count值</el-button>
    <el-button type="primary" @click="handleChangeName">修改name值</el-button>
    <p>
      count:{{ count }}
    </p>
    <p>countComputed: {{ countComputed }}</p>
    <p>name:{{ name }}</p>
  </div>
</template>
