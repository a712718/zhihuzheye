<template>
  <div>注册</div>
  <validate-form @form-submit="onFormSubmit">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
      <validate-input type="input" v-model="formdata.email" placeholder="请输入email" class="x-input" :rules="emailRules"></validate-input>
    </div>
     <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">昵称</label>
      <validate-input type="input" v-model="formdata.nickName" placeholder="请输入昵称" class="x-input"></validate-input>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">密码</label>
      <validate-input type="password" v-model="formdata.password" placeholder="请输入密码" class="x-input" :rules="passwordRules"></validate-input>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">重复密码</label>
      <validate-input type="password" v-model="formdata.repeatPassword" placeholder="请输入重复密码" class="x-input" :rules="passwordRules"></validate-input>
    </div>
  </validate-form>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ValidateInput from '../components/ValidateInput.vue';
import ValidateForm from '../components/ValidateForm.vue';
import creatMessage  from '@/components/createMessage';
import http from '@/utils/http';
import api from '@/api';

export default defineComponent({
  name: 'Register',
  components: {
    ValidateInput,
    ValidateForm,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
     const formdata = reactive({
      email: '',
      nickName: '',
      password: ''
    });
    const emailRules = [{
      type: 'required',
      message: '不能为空'
    },{
      type: 'email',
      message: '请输入符合规范的邮箱'
    }]
    const onFormSubmit = async () => {
      http.post(api.register, {
        email: formdata.email,
        nickName: formdata.nickName,
        password: formdata.password
      }).then((res: any) => {
        if (res.code === 0) {
          creatMessage('注册成功', 'success');
          router.push({
            name: 'login'
          })
        } else {
          creatMessage(res.error, 'error');
        }
      }).catch((error) => {
        creatMessage(error.error, 'error');
      }) 
    }

    return {
      formdata,
      emailRules,
      onFormSubmit,
    }
  },
})
</script>
<style scoped>

</style>