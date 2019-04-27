import axios from '@/libs/api.request'


export const list = (data) => {
  return axios.request({
    url: 'admin/maintain/list',
    data,
    method: 'post'
  })
}

export const remove = (id) => {
  return axios.request({
    url: 'admin/maintain/remove?id=' + id,
    method: 'get'
  })
}

export const update = (data) => {
  return axios.request({
    url: 'admin/maintain/update',
    data,
    method: 'post'
  })
}

export const single = (id) => {
  return axios.request({
    url: 'admin/maintain/single?id=' + id,
    method: 'get'
  })
}