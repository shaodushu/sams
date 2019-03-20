import axios from '@/libs/api.request'


export const list = (data) => {
  return axios.request({
    url: 'admin/electricity/list',
    data,
    method: 'post'
  })
}
