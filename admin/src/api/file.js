import axios from '@/libs/api.request'

export const importWater = (data) => {
  return axios.request({
    url: 'admin/file/importWater',
    data,
    method: 'post'
  })
}
export const importElectricity = (data) => {
  return axios.request({
    url: 'admin/file/importElectricity',
    data,
    method: 'post'
  })
}
