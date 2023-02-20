<template>
  <div class="article">
    <h2 class="article-title">自定义列表</h2>
    <!-- 文章列表 -->
    <!-- 分页器 -->
    <pagination
      :pageSize="pageSize"
      :totalSize="totalSize"
      :pageNum="pageNum"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"/>
  </div>
</template>

<script>
import pagination from "./pagination.vue";

export default {
  data() {
    return {
      pageNum: 1,// 文章列表默认页码
      pageSize: 5,// 每页条数
      totalSize: 0,// 总条数条数
    }
  },
  components: {
    pagination,
  },
  created() {

  },
  methods: {
    // 分页切换
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getArticle(this.pageNum, this.pageSize);
    },
    // 页面显示数量
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageNum = 1;
      this.getArticle(this.pageNum, this.pageSize);
    },
  }
}
</script>

<style scoped lang="scss">
.article {
  padding-left: 20px;

  &-title {
    color: #303133;
  }
}
</style>
