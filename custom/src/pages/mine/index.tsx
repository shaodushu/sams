import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { AtList, AtListItem } from 'taro-ui';
import IUser from '../../interfaces/user';
interface IProps {
	userinfo: IUser;
}
@connect((state) => state.user)
class Index extends Component<IProps, {}> {
	config: Config = {
		navigationBarTitleText: '个人信息'
	};
	render() {
		const { userinfo } = this.props;
		return (
			<AtList>
				<AtListItem title={userinfo.nickName} />
				<AtListItem title={userinfo.roleName} />
				<AtListItem title={userinfo.gender === 1 ? '男' : '女'} />
				<AtListItem title={`${userinfo.country},${userinfo.province},${userinfo.city}`} />
			</AtList>
		);
	}
}

export default Index;
