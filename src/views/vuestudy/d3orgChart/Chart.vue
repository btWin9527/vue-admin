<template>
  <div ref="svgElementContainer"></div>
</template>

<script>
import { OrgChart } from "d3-org-chart";

export default {
  name: "Chart",
  props: ["data"],
  data() {
    return {
      chartReference: null,
    };
  },
  watch: {
    data(value) {
      this.renderChart(value);
    },
  },
  created() {},
  methods: {
    renderChart(data) {
      if (!this.chartReference) {
        this.chartReference = new OrgChart();
      }
      this.chartReference
        .container(this.$refs.svgElementContainer) // node or css selector
        .data(data)
        .nodeHeight((d) => 120)
        .nodeContent(function (d, i, arr, state) {
          return `
            <div style="padding-top:30px;background-color:none;margin-left:1px;height:${
              d.height
            }px;border-radius:2px;overflow:visible">
              <div style="height:${
                d.height - 32
              }px;padding-top:0px;background-color:white;border:1px solid lightgray;">

                <img src=" ${
                  d.data.imageUrl
                }" style="margin-top:-30px;margin-left:${d.width / 2 - 30}px;border-radius:100px;width:60px;height:60px;" />

               <div style="margin-right:10px;margin-top:15px;float:right">${
                 d.data.id
               }</div>

               <div style="margin-top:-30px;background-color:#3AB6E3;height:10px;width:${
                 d.width - 2
               }px;border-radius:1px"></div>

               <div style="padding:20px; padding-top:35px;text-align:center">
                   <div style="color:#111672;font-size:16px;font-weight:bold"> ${
                     d.data.name
                   } </div>
      </div>
          `;
        })
        .onNodeClick((d) => console.log(d + " node clicked"))
        .render();
    },
  },
};
</script>

<style scoped>
</style>
