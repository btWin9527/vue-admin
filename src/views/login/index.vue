<!-- 登录页面 -->
<template>
  <div class="login">
    <h1 class="login-tit">登录</h1>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="username">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        form: {
          name: 'admin',
          password: '123'
        }
      }
    },
    methods: {
      async handleLogin() {
        let {name, password} = this.form;
        try {
          await this.$store.dispatch('user/login', {
            username: name,
            password
          });
          await this.$message({
            message: '登录成功',
            type: 'success'
          });
          await this.$router.push({path: '/'});
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .login {
    max-width: 600px;

    &-tit {
      text-align: center;
    }
  }
</style>
