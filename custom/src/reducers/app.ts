import { APP_MENU_LIST } from '../constants/app';
const INITIAL_STATE = {
	menuList: [
		{
			iconInfo: { prefixClass: 'sams', value: 'eye' },
			value: '拜访'
		}
	]
};
const MENU_LIST = [
	{
		iconInfo: { prefixClass: 'sams', value: 'wrench' },
		value: '维修',
		type: 3
	},
	{
		iconInfo: { prefixClass: 'sams', value: 'wrench' },
		value: '报修',
		type: 2
	},

	{
		iconInfo: { prefixClass: 'sams', value: 'water', size: 21 },
		value: '用水',
		type: 2
	},
	{
		iconInfo: { prefixClass: 'sams', value: 'electrical-equipment', size: 21 },
		value: '用电',
		type: 2
	},
	{
		iconInfo: { prefixClass: 'sams', value: 'calendar' },
		value: '考勤',
		type: 2
	}
];
export default function app(state = INITIAL_STATE, action) {
	switch (action.type) {
		case APP_MENU_LIST: {
			let { role } = action.data,
				{ menuList } = state;
			menuList.concat(MENU_LIST.filter((item) => item.type === role));
			return {
				...state,
				menuList
			};
		}
		default:
			return state;
	}
}
