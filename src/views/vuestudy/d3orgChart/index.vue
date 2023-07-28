<template>
  <div>
    <Chart :data="data"></Chart>
  </div>
</template>

<script>
import Chart from "@/views/vuestudy/d3orgChart/Chart";

export default {
  data() {
    return {
      data: null
    }
  },
  components: {
    Chart
  },
  created() {
    this.$nextTick(() => {
      this.data = [
        {
          "name": "Ian Devling",
          "imageUrl": "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/cto.jpg",
          "id": "O-6066",
          "parentId": "",
        },
        {
          "name": " Leverling Janet",
          "imageUrl": "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/female.jpg",
          "id": "O-6068",
          "parentId": "O-6066",
        },
      ];
    })
  },
}
</script>

<style scoped>

</style>
