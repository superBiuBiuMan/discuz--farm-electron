import axios from "axios";
import {message} from "ant-design-vue";

const service = axios.create({
  baseURL:"http://127.0.0.1:8888",
  // baseURL: process.env.VUE_APP_BASE_API,
  // baseURL: process.env.VUE_APP_BASE_API,
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

//响应拦截器
service.interceptors.response.use(
  (response) => {
    if(response && response.data === '请登录'){
      message.error("请登录");
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service;
