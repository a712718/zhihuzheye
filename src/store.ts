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
}

const store = createStore({
  state(): IGlobalDataProps {
    return {
      user: {
        isLogin: false,
        name: '',
        id: ''
      },
      token: localStorage.getItem('token') || ''
    }
  },
  getters: {},
  mutations: {
    login(state: IGlobalDataProps, payload: any) {
      console.log('mutations,,,,,,,login,,,,,,');
      const token = payload.data.token;
      state.token = token;
      localStorage.setItem('token', token)
      http.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    fetchCurrentUser(state: IGlobalDataProps, payload: any) {
      console.log('mutations,,,,,,,fetchCurrentUser,,,,,,');
      state.user = {
        isLogin: true,
        name: payload.data.nickName,
        id: payload.data._id,
      }
      console.log('fetchCurrentUser mutations  payload', payload)
    },
    logout(state: IGlobalDataProps) {
      state.token = '';
      localStorage.removeItem('token');
      http.defaults.headers.common.Authorization = '';
    }
  },
  actions: {
    login(context, payload) {
      console.log('actions,,,,,,,login,,,,,,');
      return http.post('/user/login', payload)
      .then(res => {
        // TODO 如果code是其他的统一处理
        if (res.data.code === 0) {
          // 存储token
          console.log('登录成功', res);
          context.commit('login', res.data)
          // return res.data;
        }
      }).catch(error => {
        console.log('登录失败', error);
      })
    },
    fetchCurrentUser(context) {
      console.log('actions,,,,,,,fetchCurrentUser,,,,,,');
      // 这么写就可以把异步执行完 在处理接下来的事件， 把then里的结果返回出去是promise（fullfilld）
      return http.get('/user/current')
      .then(res => {
        if (res.data.code === 0) {
          console.log('获取用户信息成功', res);
          context.commit('fetchCurrentUser', res.data)
          // return res.data;
        }
      }).catch(error => {
        console.log('获取用户信息失败', error);
      })
    },
    async loginAndFetchCurrentUser(context, payload) {
      context.dispatch('login', payload).then(()=>{
        context.dispatch('fetchCurrentUser');
      });
    }
  }
})

export default store;