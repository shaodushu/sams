import Taro from '@tarojs/taro';
import { USER_LOGIN, USER_INFO } from '../constants/user';
import { API_USER_LOGIN } from '../constants/api';
import { createApiAction, createAction } from '../libs/redux';

export const dispatchSetUser = (userinfo: Object) => createAction(USER_INFO, { userinfo });
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
