<template>
  <div>
    excel读取
    <input type="file" @change="handleFileUpload" accept=".xlsx"/>
  </div>
</template>

<script>
var XLSX = require("xlsx");
import quantify from './quantify.json'

export default {
  data() {
    return {
      fileList: [],
      file: {},
      // 定量指标数组
      quantifyList: quantify,
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.file = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, {type: 'array'});
        // 读取第一张表的数据
        const worksheet = workbook.Sheets[workbook.SheetNames[1]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});
        // 返回的数据是一个二维数组，数组下标表示的是excel行号-1，数组元素表示的是excel每一行的数据
        // 假设当前需要的数据位置在第5～17行，第2～6列
        const result = jsonData.slice(4, 17).map(item => item.slice(2, 6));
        // 判断数据是否符合筛选要求要求
        this.formatData(result)
      };
      reader.readAsArrayBuffer(this.file);
    },
    formatData(data){
      data.forEach((itemList, itemListIndex) => {
        itemList.forEach((item,itemIndex) => {
          let filterList = this.quantifyList.filter((quantifyItem) => item.includes(quantifyItem))
          if(filterList.length){
            let rowIndex = 5 + itemListIndex
            let columnIndex = 3 + itemIndex
            console.log(rowIndex,'rowIndex')
            console.log(columnIndex,'columnIndex')
            console.log(filterList[0],'name')
          }
        })
      })

    }
  }
}
</script>

<style scoped>

</style>
