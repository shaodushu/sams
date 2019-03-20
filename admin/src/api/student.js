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
