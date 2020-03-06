<template>
  <div class="per-cont">
    <h3>指令权限</h3>
    <SwitchRoles @change="handleRolesChange"/>
    <div :key="key" style="margin-top:30px;">
      <div>
        <span v-permission="['admin']" class="permission-alert">
          <el-tag class="permission-tag" size="small">admin权限</el-tag>
        </span>
        <el-tag v-permission="['admin']" class="permission-sourceCode" type="info">
          v-permission="['admin']"
        </el-tag>
      </div>
      <div>
        <span v-permission="['editor']" class="permission-alert">
          <el-tag class="permission-tag" size="small">editor权限</el-tag>
        </span>
        <el-tag v-permission="['editor']" class="permission-sourceCode" type="info">
          v-permission="['editor']"
        </el-tag>
      </div>
      <div>
        <span v-permission="['admin','editor']" class="permission-alert">
          Both
          <el-tag class="permission-tag" size="small">admin</el-tag> and
          <el-tag class="permission-tag" size="small">editor</el-tag> can see this
        </span>
        <el-tag v-permission="['admin','editor']" class="permission-sourceCode" type="info">
          v-permission="['admin','editor']"
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script>
  import permission from '@/directive/permission/index.js' // 权限判断指令
  import checkPermission from '@/utils/permission' // 权限判断函数
  import SwitchRoles from '../SwitchRoles'

  export default {
    data() {
      return {
        key: 1 // 为了能每次切换权限的时候重新初始化指令
      }
    },
    components: {
      SwitchRoles,
    },
    directives: {permission},
    methods: {
      handleRolesChange() {
        this.key++
      },
      checkPermission,
    }
  }
</script>

<style scoped lang="scss">
.per-cont {
  padding-left: 20px;
}
</style>
