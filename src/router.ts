import {createRouter, createWebHistory } from 'vue-router';
import store from './store';
import http from '@/utils/http'
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import NotFound from './views/404.vue'
import Create from './views/Create.vue'

const routerHistory = createWebHistory();

const routes = [
  {
    path: '/',
    name: 'home', 
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {redirectToHome: true}
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/create',
    name: 'create',
    component: Create,
    meta: { requireLogin: true }
  }
];

const router = createRouter({
  history: routerHistory,
  routes: routes
})

router.beforeEach((to, from, next) => {
  console.log('router.beforeEach,,,,');
  const {token, user} = store.state;
  const {redirectToHome, requireLogin} = to.meta
  if(!user.isLogin){
    if(token) {
      http.defaults.headers.common.Authorization = `Bearer ${token}`;
      store.dispatch('fetchCurrentUser')
      .then(() => {
        if (redirectToHome) {
          next('/')
        } else {
          next();
        }
      }).catch(()=>{
        store.commit('logout');
        next('login')
      })
    } else {
      if(requireLogin){
        next('login');
      } else {
        next();
      }
    }
  } else {
    if (redirectToHome) {
      next('/');
    } else {
      next();
    }
  }

})
export default router