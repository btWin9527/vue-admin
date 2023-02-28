<template>
  <el-table :data="data" :height="height" :max-height="maxHeight" border
            stripe tooltip-effect="light"
            @selection-change="handleSelectionChange" :size="tableSize"
            :style="{width: tableWidth}">
    <el-table-column v-if="showCheckBox" type="selection"
                     width="45"/>
    <template v-for="(item, index) in columns">
      <el-table-column
        v-if="item.show !== false"
        :key="index"
        :fixed="item.fixed"
        :prop="item.prop"
        :label="item.label"
        :align="item.align ? item.align:'center'"
        :width="item.width"
        :show-overflow-tooltip="true"
        :formatter="item.formatter ? item.formatter : formatterValue">
      </el-table-column>
    </template>
    <slot name="table_operation"/>
  </el-table>
</template>

<script>
export default {
  name: 'Table',
  props: {
    tableWidth: [String, Number],
    columns: Array,
    data: Array,
    showCheckBox: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: "100%"
    },
    maxHeight: {
      type: Number,
      default: 2000
    },
    tableSize: {
      type: String,
      default: 'medium'
    },
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val);
    },
    formatterValue(row, column, cellValue) {
      return cellValue;
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table {
  // 解决table组件内容滚动时页面滚动条同步滚动
  overflow: auto;
  // 必须设置
  position: relative;

  ::v-deep .el-table__fixed-header-wrapper thead th > .cell {
    white-space: nowrap !important; /* 禁止表头换行 */
  }

  ::v-deep .el-table__header-wrapper thead th > .cell {
    white-space: nowrap !important; /* 禁止表头换行 */
  }

  ::v-deep .el-table__body-wrapper {
    height: 100% !important;
  }
}
</style>
