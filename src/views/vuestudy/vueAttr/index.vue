<template>
  <div>
    1. ref
    + 定义在普通元素，获取当前dom元素
    + 定义在组件上，获取的是当前组件的Vue实例
    2. computed
    + 处理复杂计算
    【+】 计算属性的值不能直接修改
    + 计算属性中包含的任何一个值发生变化，计算属性的结果都会变化，而watch监听只能获取到单个值的变化
    3. watch监听
    + watch可以监听获取到新值和旧值
    + 监听对象或数组时，需要使用deep进行深度监听
    4. $set,$delete
    + 处理改变新增属性时，未触发视图更新
    +
    <div>
      <span>计算属性值:{{computedData1}}</span>
      <el-button type="danger" @click="editComputedData1">错误修改修改计算属性的值</el-button>
    </div>
    <hr>
    <div>
      <span>计算属性值:{{computedData2}}</span>
      <el-button type="success" @click="editComputedData2">正确修改修改计算属性的值</el-button>
    </div>
    <div>
      <input type="text" v-model="testData3"/>
      <span>watch监听数据变化:{{watchData}}</span>
    </div>
    <div>
      <h3>
        <i class="el-icon-star-on"></i>
        <span>$set:改变新增属性时，未触发视图更新</span>
      </h3>
      <div>
        <p>姓名：{{user.name}}</p>
        <p>年龄：{{user.age}}</p>
        <el-button @click="add">添加</el-button>
        <el-button @click="deleteData">删除姓名</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        testData1: 1,
        testData2: 2,
        tempData: 333,// 借助tempData间接修改computedData2
        testData3: '',
        watchData: '',
        watchData2: {
          a: 1
        },
        user: {
          name: 'aaaa'
        }
      }
    },
    computed: {
      computedData1() {// 计算属性的值不能直接修改
        return this.testData1;
      },
      computedData2: {// 修改计算属性值
        set(val) {// val表示计算属性的被修改值
          this.tempData = val;
        },
        get() {
          return this.tempData * 2
        }
      }
    },
    methods: {
      editComputedData1() {
        this.computedData1 = 3;
      },
      editComputedData2() {// 修改计算属性的值
        this.tempData = ++this.tempData;
      },
      add() {
        this.$set(this.user,'age',18);// 页面新增属性进行刷新页面
      },
      deleteData(){
        // this.$delete(this.user,'name');
        this.$delete(this.user,'age');
      }
    },
    watch: {
      testData3(newVal) {
        this.watchData = newVal;
      },
      watchData2: {
        handler(newVal) {
          console.log(newVal, 'new')
        },
        deep: true// 内部属性 深度监听
      }
    }
  }
</script>

<style scoped>

</style>
