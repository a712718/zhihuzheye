<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a class="navbar-brand" href="#">知乎者也专栏</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item" @click="login"><a href="#" class="btn btn-outline-light my-2">登陆</a></li>
      <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">注册</a></li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <!-- <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">您好：{{user.name}}</a></li> -->
      <li class="list-inline-item">
        <dropdown :title="`你好 ${user.name}`">
          <dropdown-item @click="create"><a href="#" class="dropdown-item">新建文章</a></dropdown-item>
          <dropdown-item disabled><a href="#" class="dropdown-item">编辑资料</a></dropdown-item>
          <dropdown-item @click="logout"><a href="#" class="dropdown-item">退出登陆</a></dropdown-item>
        </dropdown>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {useStore} from 'vuex';
import { useRouter } from 'vue-router';
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue';

export interface IUserProps {
  isLogin: boolean;
  name?: string;
  id?: string;
}
export default defineComponent({
  name: 'ColumnList',
  components: {
   Dropdown,
   DropdownItem
  },
  props: {
    user: {
      type: Object as PropType<IUserProps>,
      required: true
    }
  },
  setup() {
    const store = useStore();
    const router = useRouter(); 
    const logout = () => {
      store.commit('logout');
    }
    const login = () => {
      router.push({
        name: 'login'
      })
    }
    const create = () => {
      router.push({
        name: 'create'
      })
    }
    return {
      logout,
      login,
      create
    }
  }
})
</script>
<style scoped>

</style>