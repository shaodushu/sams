import Taro from '@tarojs/taro';
import { APARTMENT_LIST } from '../constants/apartment'
import { API_APARTMENT_LIST } from '../constants/api'
import { createApiAction, createAction } from '../libs/redux';

export const dispatchApartmentList = () => createApiAction(APARTMENT_LIST, API_APARTMENT_LIST, 'post', {
    page: 1,
    size: 100,
    name: null
})