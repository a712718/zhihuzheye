import { createStore } from 'vuex';
import http from '@/utils/http'

export interface IUserProps {
  isLogin: boolean;
  name?: string;
  id?: string;
}

export interface IGlobalDataProps {
  user: IUserProps;
  token: string;
  loading: boolean;
}

const store = createStore({
  state(): IGlobalDataProps {
    return {
      user: {
        isLogin: false,
        name: '',
        id: ''
      },
      token: localStorage.getItem('token') || '',
      loading: false
    }
  },
  getters: {},
  mutations: {
    login(state: IGlobalDataProps, payload: any) {
      const token = payload.token;
      console.log('token,,,,', token);
      state.token = token;
      localStorage.setItem('token', token)
      http.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    fetchCurrentUser(state: IGlobalDataProps, payload: any) {
      state.user = {
        isLogin: true,
        name: payload.nickName,
        id: payload._id,
      }
    },
    logout(state: IGlobalDataProps) {
      state.token = '';
      localStorage.removeItem('token');
      http.defaults.headers.common.Authorization = '';
      state.user.isLogin = false;
    },
    setLoading(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    async login(context, payload) {
      // 如果有错误这里data等待不到，返回promise.reject。下面的代码不执行,下面的代码相当于then里的代码
      const { data }  = await http.post('/user/login', payload);
      console.log('await data', data);
      context.commit('login', data)
      return data;
      // 这样写也是返回一个promise因为then、catch里不报错就返回promise.resolve
      // return http.post('/user/login', payload)
      // .then(res => {
      //   // TODO 如果code是其他的统一处理
      //   if (res.data.code === 0) {
      //     // 存储token
      //     console.log('登录成功', res);
      //     context.commit('login', res.data)
      //     // return res.data;
      //   }
      // }).catch(error => {
      //   console.log('登录失败', error);
      //   console.log('登录失败error', error.error);
      // })
    },
   async fetchCurrentUser(context) {
      console.log('actions,,,,,,,fetchCurrentUser,,,,,,');
      // 这么写就可以把异步执行完 在处理接下来的事件， 把then里的结果返回出去是promise（fullfilld）
      const  { data } = await http.get('/user/current');
      console.log('fetchCurrentUser,,,,,data', data);
      context.commit('fetchCurrentUser', data)
      return data;
      // return http.get('/user/current')
      // .then(res => {
      //   if (res.data.code === 0) {
      //     console.log('获取用户信息成功', res);
      //     context.commit('fetchCurrentUser', res.data)
      //     // return res.data;
      //   }
      // }).catch(error => {
      //   console.log('获取用户信息失败', error);
      // })
    },
    async loginAndFetchCurrentUser(context, payload) {
      // 一定要用await才会等 await后面的代码执行完在返回promise 每一步都要用await
     const data = await context.dispatch('login', payload).then(async()=> {
        await context.dispatch('fetchCurrentUser');
      });
      return data;  
    }
    // loginAndFetchCurrentUser(context, payload) {
    //   // 用return 可以以等里面的异步都执行完 每一个里面都要用return
    //   return context.dispatch('login', payload).then(()=>{
    //     console.log('????????');
    //     return context.dispatch('fetchCurrentUser');
    //   });
    // }
  }
})

export default store;