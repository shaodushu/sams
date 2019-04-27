import axios from '@/libs/api.request'

export const create = (data) => {
  return axios.request({
    url: 'admin/student/create',
    data,
    method: 'post'
  })
}
export const list = (data) => {
  return axios.request({
    url: 'admin/student/list',
    data,
    method: 'post'
  })
}

export const remove = (id) => {
  return axios.request({
    url: 'admin/student/remove?id=' + id,
    method: 'get'
  })
}

export const update = (data) => {
  return axios.request({
    url: 'admin/student/update',
    data,
    method: 'post'
  })
}

export const single = (id) => {
  return axios.request({
    url: 'admin/student/single?id=' + id,
    method: 'get'
  })
}