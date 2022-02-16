import {createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import NotFound from './views/404.vue'

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
    component: Login
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: routerHistory,
  routes: routes
})

router.beforeEach((to, from) => {
  console.log('router to,,,', to);
  console.log('router from,,,', from)

})
export default router