<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPageNum"
      :page-sizes="pageSizesArr"
      :page-size="pageSize"
      layout="sizes, prev, pager, next"
      :total="totalSize">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    props: {
      // 总条数
      totalSize: {
        default: 0,
        // eslint-disable-next-line vue/require-prop-type-constructor
        type: Number | String
      },
      // 每页条数
      pageSize: {
        default: 0,
        // eslint-disable-next-line vue/require-prop-type-constructor
        type: Number | String
      },
      // 当前页数
      pageNum: {
        default: 1,
        // eslint-disable-next-line vue/require-prop-type-constructor
        type: Number | String
      },
      // 条数切换数组
      pageSizesArr: {
        default() {
          return [10, 20, 30, 40];
        },
        type: Array
      }
    },
    data() {
      return {
        // currentPage: 1
      }
    },
    computed: {
      /*
      * 使用计算属性实现外部传入的值可实现修改后再传递出去
      * */
      currentPageNum: {
        get() {
          return this.pageNum
        },
        set(val) {// 获取页面修改后得页码值，模仿element分页组件获取当前页面
          // this.currentPage = val;
        }
      }
    },
    methods: {
      // 分页条数切换
      handleSizeChange(val) {
        this.$emit('handleSizeChange', val);
      },
      // 页面切换
      handleCurrentChange(val) {
        // console.log(this.currentPage, 'current')
        this.$emit('handleCurrentChange', val);
      }
    }
  }
</script>

<style scoped>

</style>
