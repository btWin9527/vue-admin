<template>
  <div class="small-calendar">
    <div class="search-header">
      <i class="el-icon-back icon" @click="selectDate('prev')"></i>
      <span>{{ value | filterLastStr }}</span>
      <i class="el-icon-right icon" @click="selectDate('next')"></i>
    </div>
    <el-calendar v-model="value" class="search-calendar">
      <template slot="dateCell" slot-scope="{date, data}">
        <p :class="{
          'in-range': dateType === 'week' && isIncludesRange(data.day)
        }" @click.stop="selectCalender(data.day)">{{ data.day | filterDay }}</p>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  props: {
    // 默认筛选时间
    defaultDate: {
      type: String,
      default: ''
    },
    // 日期类型
    dateType: {
      type: String,
      default: 'month'
    },
    // 日期范围
    dateRange: {
      type: Array,
      default: () => ([])
    }
  },
  watch: {
    defaultDate(value) {
      if (value) this.value = value
    }
  },
  data() {
    return {
      value: this.$moment().format("yyyy-MM-DD")
    }
  },
  filters: {
    // 获取字符串最后两位
    filterDay(val) {
      return typeof val === 'string' && val.slice(-2)
    },
    // 截取字符串最后三位
    filterLastStr(val) {
      return typeof val === 'string' && val.slice(0, -3)
    },
  },
  methods: {
    // 判断指定日期是否在当前日期范围内
    isIncludesRange(date) {
      let [startDate, endDate] = this.dateRange;
      let diffStart = this.$moment(date).diff(this.$moment(startDate), 'day')
      let diffEnd = this.$moment(date).diff(this.$moment(endDate), 'day')
      return diffStart >= 0 && diffEnd <= 0
    },
    // 切换月份
    selectDate(type) {
      let key = type === 'prev' ? 'subtract' : 'add'
      let value = this.$moment(this.value)[key](1, 'months').format('YYYY-MM-DD')
      this.value = value;
      this.$emit('selectCalender', value)
    },
    // 选中筛选日期
    selectCalender(value) {
      this.value = value;
      this.$emit('selectCalender', value)
    }
  }
}
</script>

<style scoped lang="scss">
// 搜索日历模块样式
.search-calendar {
  width: 260px;

  ::v-deep {
    .el-calendar-day {
      padding: 0;
      height: 26px;
      line-height: 26px;
      text-align: center;
      font-size: 12px;
      user-select: none;
    }

    thead {
      font-size: 14px;
    }

    .prev, .current, .next {
      border: none !important;
    }

    .el-calendar__header {
      display: none;
    }
  }
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .icon {
    padding: 4px;
    cursor: pointer;
  }
}

.in-range {
  background-color: #AEC2D7;
}

.small-calendar {
  width: 260px;
}
</style>
