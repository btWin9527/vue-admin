<template>
  <div>
    <GanttChart :events="events"/>
  </div>
</template>

<script>
import GanttChart from './GanttChart.vue';

export default {
  components: {
    GanttChart
  },
  data() {
    return {
      events: [
        {
          id: 1,
          title: '会议',
          times: ['09', '12'],
          colspan: 12 - 9 + 1,
          rowspan: 1
        },
        {
          id: 2,
          title: '休息',
          times: ['08', '14'],
          colspan: 14 - 8 + 1,
          rowspan: 1
        },
        {
          id: 3,
          title: '工作',
          times: ['07', '12'],
          colspan: 12 - 7 + 1,
          rowspan: 1
        }
      ]
    };
  }
};
</script>
