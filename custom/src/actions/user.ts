import Taro from '@tarojs/taro';
import { USER_LOGIN, USER_INFO, USER_BOUND, USER_WATER, USER_ELECTRICITY, USER_BOUND_REMOVE } from '../constants/user';
import { API_USER_LOGIN, API_USER_BOUND, API_USER_WATER, API_USER_ELECTRICITY, API_USER_BOUND_REMOVE } from '../constants/api';
import { createApiAction, createAction } from '../libs/redux';

/**
 * 绑定用户
 * @param role 
 * @param tel 
 */
export const dispatchBoundUser = (role: String, tel: String) =>
	createApiAction(USER_BOUND, API_USER_BOUND, 'post', {
		role,
		tel
	});

export const dispatchBoundRemove = (role: String) => createApiAction(USER_BOUND_REMOVE, API_USER_BOUND_REMOVE, 'get', { role })

export const dispatchSetUser = (userinfo: Object) => createAction(USER_INFO, { userinfo });

export const dispatchSetWater = () => createApiAction(USER_WATER, API_USER_WATER)

export const dispatchSetElectricity = () => createApiAction(USER_ELECTRICITY, API_USER_ELECTRICITY)


/**
 * 用户登录
 */
export function dispatchUserLogin() {
	return async (dispatch) => {
		try {
			const login = await Taro.login();
			const { rawData } = await Taro.getUserInfo();
			await dispatch(
				createApiAction(USER_LOGIN, API_USER_LOGIN, 'post', {
					code: login.code,
					userinfo: JSON.parse(rawData)
				})
			);
			return true;
		} catch (error) {
			return false;
		}
	};
}

/**
 * 查看用户信息是否失效
 */
export function dispatchCheckUser() {
	return async (dispatch) => {
		try {
			let userinfo = Taro.getStorageSync('userinfo');
			let token = Taro.getStorageSync('token');
			if (token && userinfo) {
				const checkSession = await Taro.checkSession();
				if (checkSession.errMsg === 'checkSession:ok') {
					await dispatch(dispatchSetUser(userinfo));
					return true;
				}
			}
			return false;
		} catch (error) {
			return false;
		}
	};
}
