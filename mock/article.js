import Mock from 'mockjs'
import classIds from './jsonAnsers.json';

const List = [];
const count = 100;

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>';
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3';

// 生成n调数据放入List中
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',// id自增
    timestamp: +Mock.Random.date('T'),// 随机时间戳
    author: '@first',
    reviewer: '@first',
    title: '@title(5,10)',//生成5-10个单词组成的标dfd题
    content_short: 'mock data',
    content: baseContent,
    forecast: '@float(0,100,2,2)',// 生成0到100之间的浮点数,小数点后尾数为2到2位
    importance: '@integer(1,3)',// 生成1到3之间的整数
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft', 'deleted'],
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300,5000)',
    image_uri,
    platforms: ['a-platform'],
  }));
}

export default [
  // 文章列表接口
  {
    url: '/article/list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  // 文章详情接口
  {
    url: '/article/detail',
    type: 'get',
    response: config => {
      const {id} = config.query;
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },
  //
  {
    url: '/article/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            {key: 'PC', pv: 1024},
            {key: 'mobile', pv: 1024},
            {key: 'ios', pv: 1024},
            {key: 'android', pv: 1024}
          ]
        }
      }
    }
  },
  // 增
  {
    url: '/article/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 修改
  {
    url: '/article/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 自动解答数据测试
  {
    url: '/article/classId',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: classIds
      }
    }
  }
]
