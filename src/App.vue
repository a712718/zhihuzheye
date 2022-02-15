<template>
  <div class="container">
    <global-header :user="user"></global-header>
    <validate-form @formSubmit.prevent="onFormSubmit">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <validate-input type="input" v-model="formdata.email" placeholder="请输入email" class="x-input" :rules="emailRules"></validate-input>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <validate-input type="password" v-model="formdata.password" placeholder="请输入password" class="x-input" :rules="passwordRules"></validate-input>
      </div>
    </validate-form>
    <column-list :list="list"></column-list>
  </div>
  
</template>

<script lang="ts">    
import { ref, defineComponent, reactive } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import ColumnList, { IColumnProps } from './components/ColumnList.vue';
import GlobalHeader, { IUserProps } from './components/GlobalHeader.vue';
import ValidateInput from './components/ValidateInput.vue';
import ValidateForm from './components/ValidateForm.vue'

let testData: IColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 3,
    title: 'test3的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧 这是的test1专栏，有一段非常有意思的简介，可以更新一下欧'
    // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  }
]
const userData: IUserProps = {
  isLogin: true,
  name: '马红',
  id: 1
}
export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader,
    ValidateInput,
    ValidateForm
  },
  setup(){
    const list = ref(testData);
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
      console.log('app onFormSubmit result', result);
    }
    return {
      list,
      user: userData,
      formdata,
      emailRules,
      onFormSubmit
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
