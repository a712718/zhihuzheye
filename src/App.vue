<template>
  <div class="container">
    <global-header :user="user"></global-header>
    <loader v-if="loading"></loader>
    <router-view></router-view>
    {{VUE_APP_DESC}}
  </div>
  
</template>

<script lang="ts">    
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalHeader, { IUserProps } from './components/GlobalHeader.vue';
import Loader from '@/components/Loader.vue'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loader
  },
  setup(){
    const store = useStore();
    const user = computed(() => store.state.user)
    const loading = computed(() => store.state.loading)
    console.log('process.env.VUE_APP_DESC', process.env.VUE_APP_DESC);
    return {
      user,
      loading,
      VUE_APP_DESC: process.env.VUE_APP_DESC
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
