import axios from '@/libs/api.request'


export const list = (data) => {
    return axios.request({
        url: 'admin/visitor/list',
        data,
        method: 'post'
    })
}