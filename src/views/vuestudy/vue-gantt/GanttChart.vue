<template>
  <div :style="{width: `${tickWidth * 24}px`}">
    <div class="x-axis">
      <div
        v-for="(tick, index) in ticks"
        :key="index"
        class="x-axis__tick"
        :style="{ left: `${tick * tickWidth}px` }"
      >
        <span class="tick_num">{{ index | timeMark }}</span>
      </div>
    </div>

    <!-- 事件容器区域 -->
    <div class="event-cont">
      <!-- 事件渲染区域
      tips:通过left和right坐标，确认事件宽度 -->
      <div class="event-render"
           :style="{
            left: `${2 * tickWidth}px`,
            right:`${ (24-7) * tickWidth}px`,
            background: 'red'
      }"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ticks: Array.from({length: 25}, (_, i) => i),
      tickWidth: 60
    };
  },
  filters: {
    // 时间刻度显示
    timeMark(val) {
      if (!val && val !== 0) return ''
      let valStr = val.toString()
      return valStr.padStart(2, '0') + ':00'
    }
  }
};
</script>

<style lang="scss" scoped>
.x-axis {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f0f0f0;
  margin-bottom: 40px;
}

.x-axis__tick {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: #ccc;

  .tick_num {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translate(-50%, 100%);
  }

}

.event-cont {
  height: 68px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  position: relative;

  .event-render {
    position: absolute;
    top: 0;
    height: 100%;
  }
}
</style>
