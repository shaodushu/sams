import axios from '@/libs/api.request'


export const list = (data) => {
  return axios.request({
    url: 'admin/electricity/list',
    data,
    method: 'post'
  })
}

export const remove = (id) => {
  return axios.request({
    url: 'admin/electricity/remove?id='+id,
    method: 'get'
  })
}
export const update = (data) => {
  return axios.request({
    url: 'admin/electricity/update',
    data,
    method: 'post'
  })
}

export const single = (id) => {
  return axios.request({
    url: 'admin/electricity/single?id=' + id,
    method: 'get'
  })
}