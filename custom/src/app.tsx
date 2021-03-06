import '@tarojs/async-await';
import Taro, { Component, Config } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';

import Launch from './pages/main/launch';

import configStore from './store';

import './app.scss';
import 'taro-ui/dist/style/index.scss'
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();

class App extends Component {
	/**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
	config: Config = {
		pages: [
			'pages/main/launch',
			'pages/main/index',
			'pages/message/index',
			'pages/message/detail',
		],
		window: {
			backgroundColor: '#eeeeee',
			backgroundTextStyle: 'light',
			navigationBarBackgroundColor: '#fff',
			navigationBarTitleText: '宿舍管理',
			navigationBarTextStyle: 'black'
		},
		tabBar: {
			custom: false,
			color: '#5d5d5d',
			selectedColor: '#519CEA',
			list: [
				{
					pagePath: 'pages/main/index',
					text: '首页',
					iconPath: './asset/img/home.png',
					selectedIconPath: './asset/img/home-fill.png'
				},
				{
					pagePath: 'pages/message/index',
					text: '公告',
					iconPath: './asset/img/detail.png',
					selectedIconPath: './asset/img/detail-fill.png'
				}
			]
		},
		subPackages: [{
			root: 'pages/visit/',
			pages: ['index']
		}, {
			root: 'pages/mine/',
			pages: ['index', 'bound', 'water', 'electricity', 'apartment', 'report']
		}, {
			root: 'pages/maintain/',
			pages: ['index', 'manage', 'maintain']
		}]
	};

	componentDidMount() { }

	componentDidShow() { }

	componentDidHide() { }

	componentCatchError() { }

	componentDidCatchError() { }

	// 在 App 类中的 render() 函数没有实际作用
	// 请勿修改此函数
	render() {
		return (
			<Provider store={store}>
				<Launch />
			</Provider>
		);
	}
}

Taro.render(<App />, document.getElementById('app'));
