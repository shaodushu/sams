import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View } from '@tarojs/components';
import { AtList, AtListItem, AtButton } from 'taro-ui';
import IUser from '../../interfaces/user';
import * as Util from '../../libs/util'
import { dispatchBoundRemove } from '../../actions/user'
import './index.scss'
interface IProps {
	dispatchBoundRemove;
	userinfo: IUser;
}
@connect((state) => state.user, {
	dispatchBoundRemove
})
class Index extends Component<IProps, {}> {
	config: Config = {
		navigationBarTitleText: '个人信息'
	};
	async removeBound() {
		try {
			Util.showLoading('解除绑定中...')
			const { dispatchBoundRemove, userinfo } = this.props
			await dispatchBoundRemove(userinfo.role)
			Util.hideLoading()
			Taro.navigateBack()
		} catch (error) {
			Util.hideLoading()
			Util.showToast('解除绑定失败')
		}
	}
	render() {
		const { userinfo } = this.props;
		return (
			<View className='index'>
				<AtList>
					<AtListItem title={userinfo.nickName} />
					<AtListItem title={userinfo.roleName} />
					<AtListItem title={userinfo.gender === 1 ? '男' : '女'} />
					<AtListItem title={`${userinfo.country},${userinfo.province},${userinfo.city}`} hasBorder={false} />
				</AtList>
				<AtButton type="primary" className="index_btn" onClick={this.removeBound.bind(this)}>
					解除绑定
				</AtButton>
			</View>
		);
	}
}

export default Index;
