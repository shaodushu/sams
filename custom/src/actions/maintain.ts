import Taro from '@tarojs/taro';
import { MAINTAIN_LIST } from '../constants/maintain'
import { API_MAINTAIN_CREATE, API_MAINTAIN_UPDATE, API_MAINTAIN_LIST } from '../constants/api'
import { createApiAction, createAction } from '../libs/redux';

/**
 * 获取维修列表
 * @param role 用户角色
 */
export const dispatchMaintainList = (role) => createApiAction(MAINTAIN_LIST, API_MAINTAIN_LIST, 'post', {
    page: 1,
    size: 100,
    role
})