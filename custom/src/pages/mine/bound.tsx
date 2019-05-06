import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtRadio, AtForm, AtInput, AtButton } from 'taro-ui';
import { dispatchBoundUser } from '../../actions/user';
import * as Util from '../../libs/util';
import './bound.scss';
interface IProps {
	dispatchBoundUser;
}
@connect((state) => state.user, {
	dispatchBoundUser
})
class Bound extends Component<IProps, {}> {
	config: Config = {
		navigationBarTitleText: '用户绑定'
	};
	state = {
		role: '2',
		tel: ''
	};
	handleSetRole(role) {
		this.setState({
			role
		});
	}
	handleSetTel(tel) {
		this.setState({
			tel
		});
	}
	async handleUserBound() {
		const { dispatchBoundUser } = this.props,
			{ role, tel } = this.state;
		if (tel) {
			try {
				Util.showLoading('提交中...');
				await dispatchBoundUser(parseInt(role), tel);
				Util.hideLoading();
				Util.showToast('绑定成功');
				Taro.navigateBack();
			} catch (error) {
				Util.hideLoading();
			}
		} else {
			Util.showToast('请填写手机号');
		}
	}
	render() {
		const { role, tel } = this.state;
		return (
			<View className="bound">
				<AtForm>
					<AtRadio
						options={[
							// { label: '宿管', value: '1' },
							{ label: '学生', value: '2' },
							{ label: '运维', value: '3' }
						]}
						value={role}
						onClick={this.handleSetRole.bind(this)}
					/>
					<AtInput
						name="value"
						title="手机号"
						type="text"
						placeholder="手机号"
						value={tel}
						onChange={this.handleSetTel.bind(this)}
					/>
				</AtForm>
				<AtButton type="primary" className="bound_btn" onClick={this.handleUserBound}>
					提交
				</AtButton>
			</View>
		);
	}
}

export default Bound;
