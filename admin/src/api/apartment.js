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
