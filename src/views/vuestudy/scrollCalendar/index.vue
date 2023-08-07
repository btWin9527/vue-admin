<template>
  <div>
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
      endDate: '2023-05-04'
    }
  },
}
</script>

<style scoped>

</style>
