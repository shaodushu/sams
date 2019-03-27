import Fly from 'flyio/dist/npm/wx'
import Taro from '@tarojs/taro'
import CONFIG from '../config'

class httpRequest {
  constructor() {
    // 存储请求队列
    this.queue = []
  }
  // 销毁请求实例
  destroy(url) {
    this.queue = this.queue.filter(cur => cur.url !== url)
    return this.queue.length
  }
  // 请求拦截
  interceptors(instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      if (!config.url.includes('/custom/user/login')) {
        let token = Taro.getStorageSync('token')
        config.headers = {
          Cookie: token
        }
      }
      // 在发送请求之前做些什么
      return config
    }, error => {
      console.log(error)
      return Promise.reject(error)
    })

    // 添加响应拦截器
    instance.interceptors.response.use(res => {
      let {
        data,
        headers
      } = res
      const is = this.destroy(url)
      if (!is) {
        // setTimeout(() => {}, 500)
      }

      if (url.includes('/custom/user/login')) {
        for (const key in headers) {
          if (key === 'set-cookie') {
            Taro.setStorageSync('token', headers[key][0].split(';')[0].split('=')[1])
          }
        }
        if (is) {}
      }
      return data
    }, error => {
      return Promise.reject(error)
    })
  }
  // 创建实例
  create() {
    let fly = new Fly
    fly.config.baseURL = CONFIG.host
    fly.config.headers = {
      'Content-Type': 'application/json; charset=utf-8'
    }
    return fly
  }
  // 请求实例
  send(options) {
    const {
      url,
      data
    } = options
    let instance = this.create()
    this.interceptors(instance, url)
    options = Object.assign({}, options)
    this.queue.push(options)
    return instance.request(url, data, options)
  }
}
export default httpRequest
