import axios from 'axios';

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

export default instance;