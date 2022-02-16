<template>
  <div class="container">
    <global-header :user="user"></global-header>
    <router-view></router-view>
  </div>
  
</template>

<script lang="ts">    
import { defineComponent } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalHeader, { IUserProps } from './components/GlobalHeader.vue';

const userData: IUserProps = {
  isLogin: false,
  name: '马红',
  id: 1,
}

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
  },
  setup(){
    return {
      user: userData,
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
