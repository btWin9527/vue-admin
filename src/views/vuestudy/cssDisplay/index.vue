<template>
  <div>
    <h3>flex布局</h3>
    <p>需求：实现多个item元素，每列排列3个元素，相间隔20px，内容占满剩余区域</p>
    <div class="flex-cont container">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    <h3>grid布局</h3>
    <div class="grid-cont container">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.container {
  display: var(--display);
}

.flex-cont {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.grid-cont {
  display: grid;
  // 宽度平均3等分
  grid-template-columns: repeat(3, 1fr);
  // 列间距20px
  grid-column-gap: 20px;
}

.item {
  height: 100px;
  background-color: #4bc5e8;
  margin-bottom: 10px;
}

.grid-cont .item {
  width: 100%;
}

.flex-cont .item {
  // 每行3个，中间有2个间距，宽度即为（100%-20*2）/ 3
  width: calc((100% - 20px * 2) / 3);
}
</style>
