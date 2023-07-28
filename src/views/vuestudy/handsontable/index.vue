<template>
  <div>
    <div id="table"></div>
  </div>
</template>

<script>
import Handsontable from '@/libs/handsontable.full.min.js'
import '@/libs/handsontable.full.min.css'

export default {
  name: 'Handsontable',
  data() {
    return {
      tableData: [
        {
          id: 0,
          name: '数字',
          value: 100,
          value2: 100
        },
        {
          id: 1,
          name: '文本',
          value: "测试文本",
          value2: "测试文本2"
        },
        {
          id: 2,
          name: '日期',
          value: "2023-06-15",
          value2: "2023-06-01"
        },
        {
          id: 3,
          name: '字典',
          value: "选项一",
          value2: "选项二"

        },
        {
          id: 4,
          name: '字典2',
          value: "选项三",
          value2: "选项四"

        }
      ]
    }
  },
  methods: {
  },
  mounted() {
    var hotElement = document.querySelector('#table');
    var hotSettings = {
      data: this.tableData,
      dynamicConfig: [
        {
          type: 'numeric',
          numericFormat: {
            pattern: '0.0000'
          }
        },
        {type: 'text'},
        {type: 'date', dateFormat: 'YYYY-MM-DD',},
        {type: 'autocomplete', source: ['选项一', '选项二']},
        {type: 'autocomplete', source: ['选项三', '选项四']},
      ],
      columns: [
        {
          data: 'name',
          type: 'text',
          width: 40,
          readOnly: true
        },
        {
          data: 'value',
          type: 'dynamic',
        },
        {
          data: 'value2',
          type: 'dynamic',
          validator: function (value, callback, row, col) {
            if (row == 0) {
              let exp = /^[+-]?\d*(\.\d*)?(e[+-]?\d+)?$/;
              if (!exp.test(value)) {
                callback(false);
                return;
              }
            }
            callback(true);
          }

        }
      ],
      stretchH: 'all',
      width: 1200,
      autoWrapRow: true,
      height: 300,
      maxRows: 22,
      manualRowResize: true,
      manualColumnResize: true,
      rowHeaders: true,
      colHeaders: [
        '指标',
        '指标值',
        '指标值2'
      ],
      manualRowMove: true,
      manualColumnMove: true,
      contextMenu: true,
      filters: true,
      dropdownMenu: true,
      columnSorting: true,
      sortIndicator: true,
      // language: 'zh-CN'
    };
    var hot = new Handsontable(hotElement, hotSettings);
  }
}
</script>

<style scoped>

</style>
