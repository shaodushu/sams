import axios from '@/libs/api.request'

export const create = (data) => {
  return axios.request({
    url: 'admin/repair/create',
    data,
    method: 'post'
  })
}
export const list = (data) => {
  return axios.request({
    url: 'admin/repair/list',
    data,
    method: 'post'
  })
}

export const remove = (id) => {
  return axios.request({
    url: 'admin/repair/remove?id=' + id,
    method: 'get'
  })
}

export const update = (data) => {
  return axios.request({
    url: 'admin/repair/update',
    data,
    method: 'post'
  })
}

export const single = (id) => {
  return axios.request({
    url: 'admin/repair/single?id=' + id,
    method: 'get'
  })
}