<template>
  <div>
    <el-button v-loading="loading" type="primary" @click="submit" v-db-click>测试</el-button>
    <calendar :start-date="startDate" :end-date="endDate">
      <template #dateCell="{day}">
        <div>
<!--          {{ day }}-->
        </div>
      </template>
    </calendar>
  </div>
</template>

<script>
import calendar
  from "@/views/vuestudy/scrollCalendar/components/calendar/index.vue";

export default {
  components: {
    calendar
  },
  data() {
    return {
      startDate: '2023-04-30',
      endDate: '2023-05-04',
      loading: false
    }
  },
  methods:{
    submit(){
      this.loading = true
      setTimeout(() => {
      console.log(123,'发起请求')
      this.loading = false
      },100)
    }
  }
}
</script>

<style scoped>

</style>
