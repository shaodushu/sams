import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text, Image, Button } from '@tarojs/components';
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui';
import * as actions from '../../actions/user';
import { connect } from '@tarojs/redux';

import './launch.scss';

type PageStateProps = {
	options;
};

type PageDispatchProps = {
	dispatchCheckUser;
	dispatchUserLogin;
};

type PageOwnProps = {};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Launch {
	props: IProps;
}

@connect((state) => state.user, actions)
class Launch extends Component {
	config: Config = {
		navigationBarTextStyle: 'white',
		navigationBarBackgroundColor: '#00adb5'
	};
	state = {
		loading: '...',
		isAuth: true,
		jumpPath: '/pages/main/index'
	};
	index = 1;
	loadingTime;
	componentWillMount() {}
	componentDidMount() {
		this.autoLogin();
		//设置加载动态文字
		let { loading } = this.state,
			length = loading.length;
		this.loadingTime = setInterval(() => {
			if (this.index === length) {
				this.index = 0;
				this.setState({
					loading
				});
			} else {
				this.index++;
				this.setState({
					loading: loading.substring(0, this.index)
				});
			}
		}, 300);
	}
	componentWillUnmount() {
		clearInterval(this.loadingTime);
	}
	async autoLogin() {
		const { dispatchCheckUser, dispatchUserLogin } = this.props,
			{ jumpPath } = this.state;
		try {
			const setting = await Taro.getSetting();
			if (setting.authSetting['scope.userInfo']) {
				console.log('%c 用户已授权', 'color:#19be6b');
				const checkUser = await dispatchCheckUser();
				if (checkUser) {
					console.log('%c 用户已存在', 'color:#19be6b');
					this.jumpUrl(jumpPath);
				} else {
					const result = await dispatchUserLogin();
					if (result) {
						console.log('%c 重新获取到用户信息', 'color:#19be6b');
						this.jumpUrl(jumpPath);
					} else {
						this.setState({
							isAuth: false
						});
					}
				}
			} else {
				this.setState({
					isAuth: false
				});
			}
		} catch (error) {
			if (typeof error === 'object') {
				error = error.errMsg;
			}
			// Taro.showToast({
			// 	title: error,
			// 	icon: 'none'
			// });
		}
	}
	async getUserinfo(e) {
		const { errMsg } = e.detail,
			{ dispatchUserLogin } = this.props,
			{ jumpPath } = this.state;
		try {
			if (errMsg === 'getUserInfo:ok') {
				Taro.showLoading({
					title: '授权中...'
				});
				await dispatchUserLogin();
				Taro.hideLoading();
				this.setState({
					isAuth: false
				});
				this.jumpUrl(jumpPath);
			} else {
				Taro.showModal({
					title: '提示',
					content: '微信授权为微信官方提供,不会记录您的任何隐私信息',
					showCancel: false
				});
			}
		} catch (error) {
			if (typeof error === 'object') {
				error = error.errMsg;
			}
			// Taro.showToast({
			// 	title: error,
			// 	icon: 'none'
			// });
		}
	}
	jumpUrl(jumpPath) {
		Taro.switchTab({
			url: jumpPath
		});
	}
	render() {
		const { loading, isAuth } = this.state;
		return (
			<View className="launch">
				<View className="launch-loading">
					<View className="sk-cube-grid">
						<View className="sk-cube sk-cube1" />
						<View className="sk-cube sk-cube2" />
						<View className="sk-cube sk-cube3" />
						<View className="sk-cube sk-cube4" />
						<View className="sk-cube sk-cube5" />
						<View className="sk-cube sk-cube6" />
						<View className="sk-cube sk-cube7" />
						<View className="sk-cube sk-cube8" />
						<View className="sk-cube sk-cube9" />
					</View>
					<Text className="launch-loading_text">加载中{loading}</Text>
					<Image
						className="launch-loading_wave"
						mode="scaleToFill"
						src={require('../../asset/img/wave.gif')}
					/>
				</View>
				<View className="launch-desc">
					<Text className="title">宿舍管理</Text>
					<Text className="intr">宿舍管理</Text>
				</View>
				<AtModal isOpened={!isAuth}>
					<AtModalHeader>宿舍管理</AtModalHeader>
					<AtModalContent>
						<View className="at-article">
							<View className="at-article__h3">该程序获得以下授权：</View>
							<View className="at-article__info">获取你的公开信息(昵称和头像等),以便为你提供更好的服务.</View>
						</View>
					</AtModalContent>
					<AtModalAction>
						<Button openType="getUserInfo" onGetUserInfo={this.getUserinfo.bind(this)}>
							授权登陆
						</Button>
					</AtModalAction>
				</AtModal>
			</View>
		);
	}
}
export default Launch as ComponentClass<PageOwnProps, PageState>;
