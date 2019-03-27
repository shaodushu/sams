import Taro from '@tarojs/taro'

const PAGE_LEVEL_LIMIT = 10

/**
 * 
 * @param {*} title 
 * @param {*} content 
 * @param {*} showCancel 
 */
export const showModal = (title, content, showCancel = true, confirmText = '确定', cancelText = '取消') => {
  return new Promise((resolve, reject) => {
    Taro.showModal({
      title: title,
      content: content,
      // confirmColor: "#2a8ce5",
      showCancel: showCancel,
      confirmText: confirmText,
      cancelText: cancelText,
      success: (res) => {
        resolve(res)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })

}
export const openSetting = (type, error) => {
  if (error && error.errMsg === `${type}:fail auth deny`) {
    Taro.showModal({
      title: '提示',
      content: '请在设置页面打开相应权限',
      success(msg) {
        if (msg.confirm) {
          Taro.openSetting()
        }
      }
    })
  }
}
export const hideLoading = () => {
  Taro.hideLoading();
}
export const showLoading = (title, mask = false) => {
  Taro.showLoading({
    title: title,
    mask: mask
  })
}
export const showToast = (title = 'loading', icon = 'none', duration = 1500) => {
  Taro.showToast({
    title: title,
    icon: icon,
    mask: true,
    duration: duration
  })
}
// 处理微信跳转超过10层
export function jumpUrl(url, options = {}) {
  const pages = Taro.getCurrentPages()
  let method = options.method || 'navigateTo'
  if (url && typeof url === 'string') {
    if (method == 'navigateTo' && pages.length >= PAGE_LEVEL_LIMIT - 3) {
      method = 'redirectTo'
    }

    if (method == 'navigateToByForce') {
      method = 'navigateTo'
    }

    if (method == 'navigateTo' && pages.length == PAGE_LEVEL_LIMIT) {
      method = 'redirectTo'
    }

    Taro[method]({
      url
    })
  }
}

export default {
  hideLoading,
  showLoading,
  showToast,
  showModal,
  openSetting
}
