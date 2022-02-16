<template>
  <div>login</div>
  <validate-form @form-submit="onFormSubmit">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <validate-input type="input" v-model="formdata.email" placeholder="请输入email" class="x-input" :rules="emailRules"></validate-input>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <validate-input type="password" v-model="formdata.password" placeholder="请输入password" class="x-input" :rules="passwordRules"></validate-input>
    </div>
  </validate-form>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import http from '../utils/http'
import ValidateInput from '../components/ValidateInput.vue';
import ValidateForm from '../components/ValidateForm.vue';

export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup() {
     console.log('login');
     const formdata = reactive({
      email: '',
      password: ''
    });
    const emailRules = [{
      type: 'required',
      message: '不能为空'
    },{
      type: 'email',
      message: '请输入符合规范的邮箱'
    }]
    const onFormSubmit = (result: boolean) => {
      http.post('/user/login', {
        "email": "111@test.com",
        "password": "111111"
      }).then(res => {
        // TODO 如果code是其他的统一处理
        if (res.data.code === 0) {
          console.log('登录成功', res);
          // 存储token
          const token = res.data.data.token;
          console.log('token,,,,', token);
        }
        
      }).catch(error => {
        console.log('登录失败', error);
      })
      console.log('app onFormSubmit result', result);
    }

    return {
      formdata,
      emailRules,
      onFormSubmit
    }
  },
})
</script>
<style scoped>

</style>