<template>
  <FormCreate :fields="fields" :formData="formData"/>
</template>

<script>
import {FormCreate} from "@/components";

export default {
  components: {
    FormCreate
  },

  data() {
    return {
      formData: {
        user: '',
        password: ''
      },
      fields: [
        {
          label: '用户',
          prop: 'user',
          type: 'text',
          placeholder: '请输入用户名'
        },
        {
          label: '密码',
          prop: 'password',
          type: 'text',
          placeholder: '请输入密码'
        },
      ]
    }
  },
}
</script>

