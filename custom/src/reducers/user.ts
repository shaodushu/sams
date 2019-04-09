import Taro from '@tarojs/taro';
import { USER_LOGIN, USER_INFO, USER_BOUND, USER_WATER, USER_ELECTRICITY } from '../constants/user';
import { formatTime } from '../libs/tools';

const INITIAL_STATE = {
	userinfo: {},
	water: [],
	electricity: []
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
		case USER_BOUND:
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
		case USER_WATER: {
			let water = action.payload;

			return {
				...state,
				water: water.map((item) => {
					return {
						...item,
						date: formatTime(item.date)
					}
				})
			}
		}
		case USER_ELECTRICITY: {
			let electricity = action.payload;
			return {
				...state,
				electricity: electricity.map((item) => {
					return {
						...item,
						date: formatTime(item.date)
					}
				})
			}
		}
		default:
			return state;
	}
}
