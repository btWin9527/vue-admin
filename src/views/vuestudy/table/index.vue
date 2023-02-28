<template>
  <div className="article">
    <h2 className="article-title">文章列表分页</h2>
    <!-- 文章列表 -->
    <Table :data="articleList" :columns="columns">
      <el-table-column
        slot="table_operation"
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </Table>
    <!-- 分页组件 -->
    <Pagination
      v-show="totalSize>0" :total="totalSize"
      :page.sync="pageNum" :limit.sync="pageSize"
      @pagination="getArticle"/>
  </div>
</template>

<script>
import {Pagination} from '@/components/Pagination'
import {Table} from "@/components/Table";
import {getArticle} from "@/api/article";
import {parseTime} from "@/utils";


export default {
  name: 'table',
  data() {
    return {
      articleList: [],// 文章列表
      pageNum: 1,// 文章列表默认页码
      pageSize: 10,// 每页条数
      totalSize: 0,// 总条数条数
      // 表格配置
      columns: [
        {prop: 'id', label: 'Id'},
        {
          prop: 'timestamp',
          label: 'Date',
          formatter: (_, __, cellValue) => parseTime(cellValue, '{y}-{m}-{d} {h}:{i}')
        },
        {prop: 'title', label: 'Title'},
        {prop: 'author', label: 'Id'},
        {prop: 'pageviews', label: 'Readings'},
      ]
    }
  },
  components: {
    Table,
    Pagination
  },
  methods: {
    async getArticle() {
      // getArticle({
      //   page: this.pageNum,
      //   limit: this.pageSize,
      // }).then((res) => {
      //   console.log(res,'resssss')
      // }).catch((err) => {
      //   console.log(err,'rrr')
      // })
      /*
      * 通过async/await处理接口返回异常
      * */
      const [listData, listErr] = await this.$promise(getArticle({
        page: this.pageNum,
        limit: this.pageSize,
      }));
      if (listData && listData.code == 20000) {
        let {data} = listData;
        this.articleList = data.items;
        console.log(this.articleList, ' this.articleList')
        this.totalSize = data.total;
      }
      if (listErr) throw new Error('Could not find article list');// 处理请求异常
    },
  },
  beforeMount() {
    this.getArticle();
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
