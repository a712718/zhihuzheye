<template>
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
  <Message :message="message" v-if="messageVisible"></Message>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ValidateInput from '../components/ValidateInput.vue';
import ValidateForm from '../components/ValidateForm.vue';
import Message from '../components/Message.vue';

export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm,
    Message
  },
  setup() {
    const store = useStore();
    const router = useRouter();
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
    const message = ref('');
    const messageVisible = ref(false)
    const onFormSubmit = (result: boolean) => {
      store.dispatch('loginAndFetchCurrentUser',formdata)
       .then(() => {
         console.log('loginAndFetchCurrentUser success,,,,,,,,,');
         router.push({
           name: 'home'
         })
       }).catch(error => {
          console.log('loginAndFetchCurrentUser error,,,,,,,,,');
         message.value = error
         messageVisible.value = true
       })
      console.log('app onFormSubmit result', result);
    }

    return {
      formdata,
      emailRules,
      onFormSubmit,
      message,
      messageVisible
    }
  },
})
</script>
<style scoped>

</style>