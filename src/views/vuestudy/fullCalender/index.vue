<template>
  <div class="calendar-cont">
    <div class="aside">
      <!-- 小日历 -->
      <searchCalendar
        :date-type="dateType" :date-range="dateRange"
        :default-date="selectMonth"
        @selectCalender="selectCalender"/>
      <!-- 人员选择 -->
      <personTree :tree-change="treeChange"/>
    </div>
    <!-- 日历面板 -->
    <div class="calendar">
      <full-calendar
        ref="calendar"
        :config="config" class="full-calender"
      />
    </div>
  </div>
</template>

<script>
import personTree from "@/views/vuestudy/fullCalender/personTree/index.vue";
import {FullCalendar} from "vue-full-calendar";
import 'fullcalendar/dist/locale/zh-cn';
import searchCalendar
  from "@/views/vuestudy/fullCalender/searchCalendar/index.vue";
import "fullcalendar/dist/fullcalendar.min.css";
import {
  getMonthDate,
  bindEvent,
  calendarConfig,
} from "./helper";

export default {
  components: {
    FullCalendar,
    searchCalendar,
    personTree
  },
  name: 'vueFullCalendar',
  data() {
    return {
      // 当前日期范围
      dateRange: [],
      //当前选中的月份
      selectMonth: this.$moment().format('YYYY-MM-DD'),
      // 查询类型
      dateType: 'month',
      events: [
        {
          title: '123 \n test',
          start: '2023-03-31 10:20:30',
          end: '2023-03-31 11:20:30',
          // 配置背景颜色
          backgroundColor: '#999',
        },
        {
          title: 'test2',
          start: '2023-03-31 10:20:30',
          end: '2023-03-31 11:20:30',
        },
        {
          title: 'test3',
          start: '2023-03-31 10:40:30',
          end: '2023-03-31 11:50:30',
        },
        {
          title: 'another test',
          start: '2023-04-02 10:20:30',
          end: '2023-04-02 11:20:30',
        },
      ],
      config: null
    }
  },
  created() {
    this.initConfig()
    this.initEvent()
  },
  methods: {
    treeChange(_, {checkedNodes}) {
      console.log(checkedNodes, '选中的节点')
    },
    initConfig() {
      this.$set(this, 'config', calendarConfig(this.events))
    },
    initEvent() {
      this.$nextTick(() => {
        //点击上个月
        this.clickPrevMonth()
        // 点击下个月
        this.clickNextMonth()
        // 点击今天
        this.clickToday()
        // 点击月
        this.changeMonthType()
        // 点击周
        this.changeWeekType()
        // 点击日
        this.changeDayType()
      })
    },
    next() {
      this.$refs.calendar?.fireMethod('next')
    },
    prev() {
      this.$refs.calendar?.fireMethod('prev')
    },
    gotoDate(date) {
      this.$refs.calendar?.fireMethod('gotoDate', date)
    },
    // 选中筛选日期
    selectCalender(val) {
      console.log(val, '小日历选择日期')
      this.selectMonth = val;
      this.gotoDate(new Date(val))
    },
    clickPrevMonth() {
      bindEvent('.fc-prev-button', () => {
        console.log('prev')
        getMonthDate()
      })
    },
    clickNextMonth() {
      bindEvent('.fc-next-button', () => {
        console.log('next')
        getMonthDate()
      })
    },
    clickToday() {
      bindEvent('.fc-today-button', () => {
        console.log('today')
      })
    },
    changeMonthType() {
      bindEvent('.fc-today-button', () => {
        console.log('moth')
      })
    },
    changeWeekType() {
      bindEvent('.fc-agendaWeek-button', () => {
        console.log('week')
      })
    },
    changeDayType() {
      bindEvent('.fc-agendaDay-button', () => {
        console.log('day')
      })
    }
  }
}

</script>
<style scoped lang="scss">
.calendar-cont {
  display: flex;

  .aside {
    width: 300px;
  }

  .calendar {
    flex: 1;
    font-size: 14px;
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
  }
}


.full-calender ::v-deep {

  /* 日历表头样式 */
  .fc-header-toolbar {
    background-color: #f6f6f6;
    border: none;
    border-radius: 5px 5px 0 0;
  }

  .fc-header-title {
    font-weight: bold;
  }

  .fc-button {
    background-color: #fff;
    border: none;
    border-radius: 3px;
    color: #007bff;
    margin-right: 5px;
  }

  .fc-button:hover {
    background-color: #007bff;
    color: #fff;
  }

  /* 日历事件样式 */
  .fc-event {
    background-color: #007bff;
    border: 1px solid transparent;
    color: #fff;
    border-radius: 3px;
  }

  .fc-event:hover {
    //background-color: #0056b3;
  }
}
</style>
