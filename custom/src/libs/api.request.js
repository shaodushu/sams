import Taro from '@tarojs/taro'
import * as Util from './util'
// import RZLTDEBUG from './debug'
import Fly from './fly'

const fly = new Fly()

export default async (url, method = 'get', data) => {
  try {
    return await fly.send({ url, method, data })
  } catch (error) {
    if (error.status === 0) {
      Util.showToast(error.message)
      return Promise.reject(error)
    }
    error = error.response
    if (error) {
      // if (error.status !== 403 && error.status !== 401 && options.url !== '/custom/errorlog/create') {
      //   RZLTDEBUG.notifyError(error, 'api', options)
      // }
      if (error.status === 403 || error.status === 401) {
        Taro.clearStorageSync('userinfo')
        Taro.clearStorageSync('token')
        Taro.reLaunch({
          url: '/pages/main/launch'
        })
      } else if (error.status === 500) {
        if (error.data && error.data.msg) {
          Util.showModal('提示', error.data.msg, false);
        } else {
          Util.showModal('提示', '500', false);
        }

      } else if (error.status === 502) {
        Util.showToast('服务器正在外太空遨游')
      } else if (error.status === 404) {
        Util.showToast('服务器无法响应')
      }
    } else {
      Util.showToast('网络已断开连接')
    }
    return Promise.reject(error)
  }
}
