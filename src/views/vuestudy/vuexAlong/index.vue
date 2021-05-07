<template>
  <div>
    <button @click="testVuexAlong(++num)">测试</button>
    {{ test }}
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  data() {
    return {
      num: 1
    }
  },
  computed: {
    ...mapGetters(['test']),
  },
  methods: {
    ...mapActions("testVuexAlong", {
      testVuexAlong: "testVuexAlong",
    }),
  }
}
</script>

<style scoped>

</style>
