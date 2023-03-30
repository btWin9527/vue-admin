<template>
  <div class="calendar">
    <full-calendar :config="config" class="full-calender"/>
  </div>
</template>

<script>
import moment from 'moment'
import {FullCalendar} from "vue-full-calendar";
import 'fullcalendar/dist/locale/zh-cn'

import "fullcalendar/dist/fullcalendar.min.css";

export default {
  components: {
    FullCalendar
  },
  name: 'vueFullCalendar',
  data() {
    return {
      config: {
        // 用于配置日历表头的参数，包括left、center和right三个子属性，分别表示表头左侧、中间和右侧的内容，可以使用预定义的按钮、自定义按钮、日期格式化字符串等进行配置
        header: {
          left: 'today',
          center: 'prev title next',
          // right: 'month,week,day'
        },
        // 用于设置日历支持的多种视图模式和相关的配置参数，可以自定义视图模式、标题、日期范围、事件格式化字符串等
        // views: '',
        // 用于设置日历的事件数据，可以使用一个数组或者一个返回数组的函数
        events: [
          {
            title: 'test',
            allDay: true,
            start: moment(),
            end: moment().add(1, 'd'),
          },
          {
            title: 'test2',
            allDay: true,
            start: moment(),
            end: moment().add(1, 'h'),
          },
          {
            title: 'test3',
            allDay: true,
            start: moment(),
            end: moment().add(2, 'h'),
          },
          {
            title: 'another test',
            start: moment().add(2, 'd'),
            end: moment().add(2, 'd').add(2, 'h'),
          },
        ],
        // 日期选择操作
        selectable: false,
        // 用于设置日历的默认视图模式，包括month、basicWeek、basicDay、agendaWeek和agendaDay五种视图模式
        defaultView: 'month',
        // 语言
        locale: 'zh',
        eventDurationEditable: false,
        // 用于设置日历是否可编辑，包括事件的添加、修改和删除操作
        editable: false,
        // 用于设置日历事件在某个日期范围内的最大数量，可以通过一个“更多”链接展示所有事件
        eventLimit: 2,
        // 用于设置日历的事件数据源，可以使用一个数组或者一个返回数组的函数，每个数据源可以包含一个或多个事件
        eventSources: [],
        // 用于设置日历事件的渲染函数，可以用于自定义事件的HTML内容和CSS样式。
        eventRender: function (event, element) {
          // console.log(event)
        },
        // 用于设置日历事件的调整大小事件处理函数，当用户调整一个事件的大小时，将调用该函数并传递事件对象和调整后的大小作为参数
        eventResize: () => {
        },
        // 用于设置日历事件的拖放事件处理函数，当用户拖动一个事件到另一个位置时，将调用该函数并传递事件对象和拖放后的位置作为参数
        eventDrop: () => {
          return false
        },
        // 用于设置日历事件的单击事件处理函数，当用户单击一个事件时，将调用该函数并传递事件对象作为参数
        eventClick: () => {
          return false
        },
      },
    }
  }
}

</script>
<style scoped lang="scss">
.calendar {
  font-size: 14px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
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
    color: #fff;
    border-radius: 3px;
  }

  .fc-event:hover {
    background-color: #0056b3;
  }
}
</style>
