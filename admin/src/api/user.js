import axios from '@/libs/api.request'

export const login = ({ account, password }) => {
  const data = {
    account,
    password
  }
  return axios.request({
    url: 'admin/authLogin',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token,id) => {
  return axios.request({
    url: 'admin/userInfo',
    params: {
      id,
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'admin/logout',
    method: 'get'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'admin/message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}
