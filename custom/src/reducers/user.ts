import Taro from '@tarojs/taro';
import { USER_LOGIN, USER_INFO } from '../constants/user';
const INITIAL_STATE = {
	userinfo: {}
};
const filterRole = (role) => {
	switch (role) {
		case 0:
			return '超管';
		case 1:
			return '宿舍管理员';
		case 2:
			return '学生';
		case 3:
			return '维修人员';
		case -1:
		default:
			return '游客';
	}
};
export default function user(state = INITIAL_STATE, action) {
	switch (action.type) {
		case USER_LOGIN: {
			let userinfo = action.payload;
			userinfo = {
				...userinfo,
				roleName: filterRole(userinfo.role)
			};
			Taro.setStorageSync('userinfo', userinfo);
			return {
				...state,
				userinfo
			};
		}
		case USER_INFO: {
			const { userinfo } = action.data;
			Taro.setStorageSync('userinfo', userinfo);
			return {
				...state,
				userinfo
			};
		}
		default:
			return state;
	}
}
