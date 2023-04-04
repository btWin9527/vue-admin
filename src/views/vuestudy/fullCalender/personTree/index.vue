<template>
  <el-tree
    :data="data"
    show-checkbox
    default-expand-all
    :default-checked-keys="defaultCheckedList"
    node-key="id"
    ref="tree"
    @check="treeChange"
    highlight-current
    :props="defaultProps">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
         <el-color-picker size="mini" v-model="node.color" @change="changeColorPicker($event, data)"/>
        </span>
      </span>
  </el-tree>
</template>

<script>
export default {
  props: {
    defaultCheckedList: {
      type: Array,
      default: () => ([])
    },
    treeChange: {
      type: Function,
      default: () => {
      }
    }
  },
  data() {
    return {
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  methods: {
    changeColorPicker(color, data) {
      console.log(color, 'color')
      console.log(data, 'data')
    }
  }
}
</script>

<style scoped>

</style>
