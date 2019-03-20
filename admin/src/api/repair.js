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
