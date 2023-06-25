<script setup>
import {Highlight} from '@/components/Highlight'
import {reactive} from "vue"

const highlightDemo = reactive({
  highlight: 'Highlight',
  message: 'The best time to plant a tree is ten years ago, followed by now.',
  keys1: 'ten years ago',
  keys2: 'now'
})

const keyClick = (key) => {
  console.log(key, 'key')
}

</script>

<template>
  <Highlight :keys="[highlightDemo.keys1, highlightDemo.keys2]"
             @click="keyClick">
    {{ highlightDemo.message }}
  </Highlight>
</template>
