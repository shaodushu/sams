import axios from '@/libs/api.request'


export const list = (data) => {
  return axios.request({
    url: 'admin/water/list',
    data,
    method: 'post'
  })
}

export const remove = (id) => {
  return axios.request({
    url: 'admin/water/remove?id=' + id,
    method: 'get'
  })
}

export const update = (data) => {
  return axios.request({
    url: 'admin/water/update',
    data,
    method: 'post'
  })
}
export const single = (id) => {
  return axios.request({
    url: 'admin/water/single?id=' + id,
    method: 'get'
  })
}