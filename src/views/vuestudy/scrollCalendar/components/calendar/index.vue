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
            :class="['day',{ 'non-between-date': !isBetweenDate(day) }]">
            <div class="day-content" v-if="day.date && day.date()">
              <div>{{ day.date() }}</div>
              <!-- 当天信息 -->
              <slot name="dateCell"
                    :day="$moment(day).format('YYYY-MM-DD')"></slot>
            </div>
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
    // 开始时间
    startDate: {
      type: String,
      default: '2023-06-01'
    },
    // 结束时间
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
  computed: {
    // 获取开始时间和结束时间中间的月份
    diffMonth() {
      const start = moment(this.startDate, 'YYYY-MM');
      const end = moment(this.endDate, 'YYYY-MM');
      // 判断开始日期和结束日期中间相差几个月, 向上取整
      return Math.ceil(end.diff(start, 'months', true));
    }
  },
  created() {
    this.initDate()
  },
  methods: {
    /**
     * 判断给定日期是否在开始时间和结束时间之间
     */
    isBetweenDate(date) {
      return moment(date).isBetween(this.startDate, this.endDate, null, '[]')
    },
    /**
     * 获取给定日期是周几
     * @param date
     * @returns {number} 要求返回1～7
     * @desc  如果日期为周日，.day返回的为0，需要转换为7
     */
    getWeekDay(date) {
      let week = moment(date).day()
      return week === 0 ? 7 : week
    },
    /**
     * 通过日期获取月份
     */
    getMonthByDate(date) {
      return moment(date).format('YYYY-MM');
    },
    /**
     * 区分开始时间和结束时间生成日历
     */
    departTimeGenerateCalendar(month, startMonth, endMonth) {
      let firstDay = null;
      // 当月日期需要补充的天数
      let diffDay = 0;
      // 当月需要遍历的天数
      let daysInMonth = 0;

      // 如果开始时间在这个月
      if (this.getMonthByDate(month) === startMonth) {
        let startWeekDate = moment(this.startDate).startOf('isoWeek')
        // 本周开始月份在本月取周一的天数，否则取开始日期的天数
        let startMoment = this.getMonthByDate(month) === this.getMonthByDate(startWeekDate) ?
          startWeekDate : moment(this.startDate);
        // 如果日期为周日，.day返回的为0，需要转换为7
        const startDay = this.getWeekDay(startMoment)
        firstDay = startMoment.clone();
        // 当月总共需要遍历天
        daysInMonth = month.daysInMonth() - startMoment.date() + 1;
        diffDay = startDay - 1;
      }

      // 如果结束时间在这个月
      if (this.getMonthByDate(month) === endMonth) {
        firstDay = month.clone().startOf('month');
        diffDay = this.getWeekDay(firstDay) - 1;
        // 本周结束月份在本月取周日的天数，否则取结束日期的天数
        let endWeekDate = moment(this.endDate).endOf('isoWeek')
        daysInMonth = this.getMonthByDate(month) === this.getMonthByDate(endWeekDate) ?
          endWeekDate.date() : moment(this.endDate).date();
      }

      // 填充上个月的天数空格
      const days = Array(diffDay).fill({}, 0)
      // 填充当前月份的天数
      for (let i = 0; i < daysInMonth; i++) {
        days.push(firstDay.clone());
        firstDay.add(1, 'day');
      }
      return days;
    },
    /**
     * 获取月份的天数
     * @param month
     * @returns {*[]}
     */
    getDaysInMonth(month) {
      // 开始时间和结束时间在一个月或开始日期和结束日期都不在本月
      let startMonth = this.getMonthByDate(this.startDate);
      let endMonth = this.getMonthByDate(this.endDate);
      if (startMonth === endMonth ||
        (this.getMonthByDate(month) !== startMonth &&
          this.getMonthByDate(month) !== endMonth)) {
        return this.generateMonthCalendar(month);
      }
      // 处理开始月份在本月或结束月份在本月的显示情况
      return this.departTimeGenerateCalendar(month, startMonth, endMonth)
    },
    /**
     * 生成普通月日历
     */
    generateMonthCalendar(month) {
      const firstDay = month.clone().startOf('month');
      // 当月开始日期到周一差几天
      const diffDay = this.getWeekDay(firstDay) - 1;
      // 当月总共有多少天
      const daysInMonth = month.daysInMonth();
      // 填充上个月的天数空格
      const days = Array(diffDay).fill({}, 0)
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
      const currentDate = moment(this.startDate, 'YYYY-MM-DD').clone();
      for (let i = 0; i <= this.diffMonth; i++) {
        this.months.push(currentDate.clone());
        currentDate.add(1, 'month');
      }
    },
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
  border: 1px solid #ddd;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.weekday {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: center;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.day {
  padding: 8px;
  height: 100px;
  border: 1px solid #ddd;
}

/* 非当前日期范围的日期样式 */
.non-between-date {
  color: #ccc;
}
</style>
