import axios from '@/libs/api.request'

export const create = (data) => {
  return axios.request({
    url: 'admin/apartment/create',
    data,
    method: 'post'
  })
}
export const update = (data) => {
  return axios.request({
    url: 'admin/apartment/update',
    data,
    method: 'post'
  })
}

export const list = (data) => {
  return axios.request({
    url: 'admin/apartment/list',
    data,
    method: 'post'
  })
}

export const remove = (id) => {
  return axios.request({
    url: 'admin/apartment/remove?id='+id,
    method: 'get'
  })
}

export const single = (id) => {
  return axios.request({
    url: 'admin/apartment/single?id=' + id,
    method: 'get'
  })
}