import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import {
	AtGrid,
	AtAvatar,
	AtIcon,
	AtTag,
	AtActivityIndicator
} from 'taro-ui';

import { Card } from '../../component'
import './index.scss';
import IVerses from '../../interfaces/verses';
import IUser from '../../interfaces/user';
import { dispatchSetMenu } from '../../actions/app';
import * as Util from '../../libs/util';

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
	userinfo: IUser;
	menuList;
};

type PageDispatchProps = {
	dispatchSetMenu;
};

type PageOwnProps = {};

type PageState = {
	recommend: IVerses;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Index {
	props: IProps;
}
@connect(
	({ app, user }) => ({
		...app,
		...user
	}),
	{
		dispatchSetMenu
	}
)
class Index extends Component {
	/**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
	config: Config = {
		navigationBarTitleText: '首页',
		navigationBarTextStyle: 'white',
		navigationBarBackgroundColor: '#519CEA',
		enablePullDownRefresh: true
	};
	state = {
		recommend: {
			origin: '',
			author: '',
			content: ''
		},
		loading: true
	};
	componentWillReceiveProps() { }
	componentWillUnmount() { }
	onPullDownRefresh() {
		//获取菜单
		const { userinfo, dispatchSetMenu } = this.props;
		dispatchSetMenu(userinfo.role);
		Taro.stopPullDownRefresh()
	}
	componentDidShow() {
		this.setState({
			loading: true
		})
		//获取推荐
		this.getRecommend();
		//获取菜单
		const { userinfo, dispatchSetMenu } = this.props;
		dispatchSetMenu(userinfo.role);
	}

	componentDidHide() { }
	async getRecommend() {
		try {
			const { data } = await Taro.request({
				url: 'https://api.gushi.ci/all.json'
			});
			this.setState({
				recommend: data,
				loading: false
			});
		} catch (error) { }
	}
	handleRoleBound() {
		const { userinfo } = this.props;
		if (userinfo.role > -1) {
			Util.jumpUrl('/pages/mine/index');
		} else {
			Util.jumpUrl('/pages/mine/bound');
		}
	}
	handleGoto(obj) {
		Util.jumpUrl(obj.path)
	}
	render() {
		const { recommend, loading } = this.state,
			{ userinfo, menuList } = this.props;
		return (
			<View className="index">
				<View className="header">
					<View className="mine-desc">
						<AtAvatar className="avator" image={userinfo.avatarUrl} />
						<View className="mine-info">
							<View className="mine-info_name">{userinfo.nickName}</View>
							<View className="mine-info_tag">
								<AtTag size="small">{userinfo.roleName}</AtTag>
							</View>
						</View>
						<AtIcon prefixClass="sams" value="idcard" size="30" onClick={this.handleRoleBound.bind(this)} />
					</View>
					<Image
						className="wave"
						mode="scaleToFill"
						src={require('../../asset/img/wave.gif')}
					/>
				</View>
				<View className="content">
					<AtGrid mode="rect" data={menuList} onClick={this.handleGoto.bind(this)} />
				</View>
				<View className="footer">
					<Card title="每日一推">
						<View className="at-article__content">
							{loading && <AtActivityIndicator mode='center'></AtActivityIndicator>}
							{!loading && <View className="at-article__section">
								<View className="at-article__h3">{recommend.content}</View>
								<View className="at-article__info">
									{recommend.author} 《{recommend.origin}》
								</View>
							</View>}
						</View>

					</Card>
				</View>
			</View>
		);
	}
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>;
