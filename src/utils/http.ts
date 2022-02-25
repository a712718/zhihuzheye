import axios from 'axios';
import router from '@/router';

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
    config.data = {
      ...config.data,
      icode: mukeCode
    }
  }
  return config
})

// 添加响应拦截器
instance.interceptors.response.use(response => {
  // 对响应数据处理
  console.log('对响应数据处理',response);
  return Promise.resolve(response.data);
}, error => {
  // 对响应错误处理
  console.log('对响应错误处理error', error);
  console.log('对响应错误处理error.response', error.response)
  console.log('对响应错误处理error.response.data', error.response.data)
  console.log('对响应错误处理error.response.status', error.response.status)
  console.log('对响应错误处理error.response.headers', error.response.headers)
  // const status = error.response.status;
  // if (status === 404) {
  //   router.push({
  //     name: 'NotFound'
  //   })
  // 
  return Promise.reject(error.response.data);
})


export default instance;