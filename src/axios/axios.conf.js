import axios from 'axios'
import { Message } from 'element-ui'

const downloadUrl = url => {
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function () {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}

const apiAxios = (method, url, params, response) => {
  Axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null
  }).then((res) => {
    if (res.data.code === 0) {
      response(res.data)
    } else {
      Message({
        showClose: true,
        message: res.data.message,
        type: 'error'
      })
    }
  })
}

let Axios = axios.create({
  /* eslint-disable no-undef */
  baseURL: WXCONF.apiHost,
  timeout: 5000,
  // withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// 请求拦截器
Axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
Axios.interceptors.response.use(response => {
  // 返回的是excel 直接调用浏览器下载
  if (response.headers && (response.headers['content-type'].indexOf('application/x-msdownload') != -1 || response.headers['content-type'].indexOf('application/vnd.ms-excel') != -1)) {
    downloadUrl(response.request.responseURL)
    return {
      code: 0,
      message: 'success'
    }
  } else {
    return response
  }
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误(400)'
        break
      case 401:
        err.message = '未授权，请重新登录'
        break
      case 403:
        err.message = '拒绝访问'
        break
      case 404:
        err.message = '请求错误,未找到该资源'
        break
      case 405:
        err.message = '请求方法未允许'
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        err.message = '服务器错误'
        break
      case 501:
        err.message = '网络未实现'
        break
      case 502:
        err.message = '网络错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网络超时'
        break
      case 505:
        err.message = 'HTTP版本不受支持'
        break
      default:
        err.message = `连接错误${err.response.status}`
    }
  } else {
    err.message = '连接到服务器失败'
  }
  Message({
    showClose: true,
    message: err.message,
    type: 'error'
  })
  return Promise.reject(err)
})

// 请求方法封装
export default {
  get: function (url, params, response) {
    return apiAxios('GET', url, params, response)
  },
  post: function (url, params, response) {
    return apiAxios('POST', url, params, response)
  },
  put: function (url, params, response) {
    return apiAxios('PUT', url, params, response)
  },
  delete: function (url, params, response) {
    return apiAxios('DELETE', url, params, response)
  }
}
