<template>
  <div
    class="gxy-tabs__active-bar"
    :class="`is-${rootTabs.tabPosition}`"
    :style="barStyle"
  ></div>
</template>

<script>
  export default {
    name:'TabBar',
  }
</script>

<style scoped>

</style>
