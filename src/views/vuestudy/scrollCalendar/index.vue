<template>
  <div class="scrollable-calendar">
    <div class="calendar-wrapper">
      <div v-for="(month, index) in months" :key="index" class="calendar-month">
        <h2>{{ month.format('YYYY-MM') }}</h2>
        <div class="weekdays">
          <div v-for="(weekday,weekIndex) in weekdays" :key="weekIndex"
               class="weekday">
            {{ weekday }}
          </div>
        </div>
        <div class="days">
          <div
            v-for="(day,dayIndex) in getDaysInMonth(month)"
            :key="dayIndex"
            :class="['day', { 'non-current-month': !day.isSame(month, 'month') }]">
            {{ day.date() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    // 开始时间 "YYYY-MM-DD"
    startDate: {
      type: String,
      default: '2023-06-01'
    },
    // 结束时间 "YYYY-MM-DD"
    endDate: {
      type: String,
      default: '2023-12-12'
    },
  },
  data() {
    return {
      // 月份存储
      months: [],
      // 周列表
      weekdays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    };
  },
  created() {
    this.initDate()
  },
  methods: {
    /**
     * 获取月份的天数
     * @param month
     * @returns {*[]}
     */
    getDaysInMonth(month) {
      const firstDay = month.clone().startOf('month').day(1);
      const lastDay = month.clone().endOf('month').day(0); // 最后一列是周日
      const daysInMonth = lastDay.diff(firstDay, 'days') + 1;
      const days = [];

      // 填充当前月份的天数
      for (let i = 0; i < daysInMonth; i++) {
        days.push(firstDay.clone());
        firstDay.add(1, 'day');
      }

      return days;
    },
    /**
     * 初始化日期配置
     */
    initDate() {
      const start = moment(this.startDate, 'YYYY-MM-DD');
      const end = moment(this.endDate, 'YYYY-MM-DD');

      const currentDate = start.clone();
      while (currentDate.isSameOrBefore(end)) {
        this.months.push(currentDate.clone());
        currentDate.add(1, 'month');
      }
    }
  },
};
</script>

<style scoped lang="scss">
/* 自定义日历 */
.scrollable-calendar {
  overflow: auto;
  width: 100%;
  height: 530px;
}

.calendar-month {
  border: 1px solid #ccc;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.weekday {
  padding: 8px;
  border: 1px solid #ccc;
  text-align: center;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.day {
  padding: 8px;
  border: 1px solid #ccc;
  text-align: center;
}

.non-current-month {
  /* 非当前月份的日期样式 */
  color: #ccc;
}
</style>
