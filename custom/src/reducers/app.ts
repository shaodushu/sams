import { APP_MENU_LIST } from '../constants/app';
const INITIAL_STATE = {
	menuList: []
};
const MENU_LIST = [
	{
		iconInfo: { prefixClass: 'sams', value: 'eye' },
		path: '/pages/visit/index',
		value: '拜访',
		type: -1
	},
	{
		iconInfo: { prefixClass: 'sams', value: 'wrench' },
		value: '维修',
		path: '/pages/maintain/index',
		type: 3
	},
	{
		iconInfo: { prefixClass: 'sams', value: 'wrench' },
		value: '报修',
		path: '/pages/maintain/index',
		type: 2
	},

	{
		iconInfo: { prefixClass: 'sams', value: 'water', size: 21 },
		value: '用水',
		path: '/pages/mine/water',
		type: 2
	},
	{
		iconInfo: { prefixClass: 'sams', value: 'electrical-equipment', size: 21 },
		value: '用电',
		path: '/pages/mine/electricity',
		type: 2
	},
	// {
	// 	iconInfo: { prefixClass: 'sams', value: 'calendar' },
	// 	value: '考勤',
	// 	path: '',
	// 	type: 2
	// }
	{
		iconInfo: { prefixClass: 'sams', value: 'apartment', size: 21 },
		value: '公寓',
		path: '/pages/mine/apartment',
		type: 2
	}
];
export default function app(state = INITIAL_STATE, action) {
	switch (action.type) {
		case APP_MENU_LIST: {
			let { role } = action.data;
			return {
				...state,
				menuList: MENU_LIST.filter((item) => (item.type === role || item.type === -1))
			};
		}
		default:
			return state;
	}
}
