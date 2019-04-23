import axios from '@/libs/api.request'

export const create = (data) => {
  return axios.request({
    url: 'admin/admin/create',
    data,
    method: 'post'
  })
}
export const list = (data) => {
  return axios.request({
    url: 'admin/admin/list',
    data,
    method: 'post'
  })
}

export const remove = (id) => {
  return axios.request({
    url: 'admin/admin/remove?id=' + id,
    method: 'get'
  })
}

export const update = (data) => {
  return axios.request({
    url: 'admin/admin/update',
    data,
    method: 'post'
  })
}

export const single = (id) => {
  return axios.request({
    url: 'admin/admin/single?id=' + id,
    method: 'get'
  })
}

export const apartmentBind = (data) => {
  return axios.request({
    url: 'admin/admin/apartment/bind',
    data,
    method: 'post'
  })
}