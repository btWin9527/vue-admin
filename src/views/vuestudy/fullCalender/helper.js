import moment from 'moment'


/**
 * 日历配置项
 * @param events
 * @returns {{editable: boolean, selectable: boolean, eventRender: eventRender, locale: string, eventDrop: (function(): boolean), defaultView: string, eventClick: eventClick, eventResize: eventResize, allDaySlot: boolean, customButtons: {prevMonthCustom: {text: string, click: customButtons.prevMonthCustom.click}, prevYearCustom: {text: string, click: customButtons.prevYearCustom.click}}, header: {left: string, center: string}, eventDurationEditable: boolean, eventOverlap: boolean, eventLimit: number, views: {month: {titleFormat: string}}, events}}
 */
export const calendarConfig = (events) => {
  return {
    customButtons: {
      prevYearCustom: {
        text: '上一年',
        click: function () {

        }
      },
      prevMonthCustom: {
        text: '上月',
        click: function () {

        }
      },
    },
    // 用于配置日历表头的参数，包括left、center和right三个子属性，分别表示表头左侧、中间和右侧的内容，可以使用预定义的按钮、自定义按钮、日期格式化字符串等进行配置
    header: {
      left: 'today',
      center: 'prev title next',
      // right: 'month,week,day'
    },
    // 是否显示全天事件
    allDaySlot: false,
    // 用于设置日历支持的多种视图模式和相关的配置参数，可以自定义视图模式、标题、日期范围、事件格式化字符串等
    views: {
      month: {
        titleFormat: "YYYY年MMM"
      }
    },
    // 用于设置日历的事件数据，可以使用一个数组或者一个返回数组的函数
    events,
    // 是否允许事件重叠
    eventOverlap: false,
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
    // eventSources: [],
    // 用于设置日历事件的渲染函数，可以用于自定义事件的HTML内容和CSS样式。
    eventRender: function (event, element) {
      // console.log(event, 'evt')
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
    },
  }
}


/**
 * 绑定事件
 * @param className
 * @param callback
 */
export const bindEvent = (
  className = '',
  callback = () => {
  }
) => {
  const el = document.querySelector(className)
  el.addEventListener('click', () => {
    callback(el)
  })
}

/**
 * 获取当月起止时间
 */
export const getMonthDate = () => {
  const text = document.querySelector('.fc-center h2').innerText
  const year = text.substring(0, 4)
  let month = text.substring(5, 7)
  month = isNaN(month) ? text.substring(5, 6) : month
  const date = new Date(`${year}-${month}`)
  const startDate = firstDay(date) + ' 00:00:00'
  const endDate = lastDay(date) + ' 23:59:59'
  return {startDate, endDate}
}

/**
 * 获取当月第一天
 * @param value
 * @returns {string}
 */
export const firstDay = function (value) {
  // console.log(value)
  return moment(value).startOf('month').format('YYYY-MM-DD');
}
/**
 * 获取当月最后一天
 * @param value
 * @returns {string}
 */
export const lastDay = function (value) {
  return moment(value).endOf('month').format('YYYY-MM-DD');
}
