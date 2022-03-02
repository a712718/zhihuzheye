import axios from 'axios';
// import router from '@/router';
import store from '@/store';


const instance = axios.create({
  baseURL: 'http://apis.imooc.com/api/'
})

// 发消息中统一添加icode
instance.interceptors.request.use( config => {
  console.log('request config', config);
  const mukeCode = '5CD4944B827AC23C';
  if (config.method === 'get') {
    config.params = {
      ...config.params,
      icode: mukeCode
    }
  } else {
    if (config.data instanceof FormData) {
      config.data.append('icode', mukeCode);
    } else {
      config.data = {
        ...config.data,
        icode: mukeCode
      }
    }
  }
  store.commit('setLoading', true);
  return config
})

// 添加响应拦截器
instance.interceptors.response.use(response => {
  // 对响应数据处理
  setTimeout(()=>{
    store.commit('setLoading', false);
  },2000)
  console.log('对响应数据处理',response);
  if(response.data.code === 0) {
    return Promise.resolve(response.data);
  }
  return Promise.reject(response.data);
}, error => {
  // 对响应错误处理
  console.log('对响应错误处理error.response', error.response)
  store.commit('setLoading', false);
  // const status = error.response.status;
  // if (status === 404) {
  //   router.push({
  //     name: 'NotFound'
  //   })
  // 
  // 这里如果不return，默认也会返回Promise.reject(error)此时在业务组件中用http获取数据catch里的error很复杂
  return Promise.reject(error.response.data);
})


export default instance;