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
