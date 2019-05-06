import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtList, AtListItem, AtActivityIndicator, AtFab } from 'taro-ui';
import * as Util from '../../libs/util';
import { dispatchSetElectricity } from '../../actions/user'
import './electricity.scss'

interface IProps {
	dispatchSetElectricity;
	electricity;
}

@connect(state => state.user, {
	dispatchSetElectricity
})
class Electricity extends Component<IProps, {}> {
	config: Config = {
		navigationBarTitleText: '用电信息'
	};
	state = {
		loading: true
	}
	async componentDidShow() {
		this.setState({
			loading: true
		})
		await this.props.dispatchSetElectricity()
		this.setState({
			loading: false
		})
	}
	onReportedData() {
		Util.jumpUrl('/pages/mine/report')
	}
	render() {
		const { electricity } = this.props, { loading } = this.state;
		return (
			<View className="electricity">
				{loading && <AtActivityIndicator mode='center'></AtActivityIndicator>}
				{!loading && <AtList>
					{electricity.map((item, index) => <AtListItem key={index} title={item.aname + '-' + item.dnum}
						note={item.date} extraText={item.consume + '°'} iconInfo={{
							prefixClass: 'sams',
							size: 25,
							color: '#2db7f5', value: 'electrical-equipment',
						}} hasBorder={index !== (electricity.length - 1)} />)}

				</AtList>}
				<View className="electricity_btn" onClick={this.onReportedData.bind(this)}>
					<AtFab>用电</AtFab>
				</View>
			</View>
		);
	}
}

export default Electricity