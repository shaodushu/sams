import axios from '@/libs/api.request'

export const importWater = (data) => {
  return axios.request({
    url: 'admin/water/importWater',
    data,
    method: 'post'
  })
}

export const list = (data) => {
  return axios.request({
    url: 'admin/water/list',
    data,
    method: 'post'
  })
}
