import axios from "axios";

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

export default service;
