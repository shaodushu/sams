import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View } from '@tarojs/components';
import { AtList, AtListItem, AtActivityIndicator, AtFab } from 'taro-ui';
import * as Util from '../../libs/util';
import { dispatchSetWater } from '../../actions/user'
import './water.scss'
interface IProps {
	dispatchSetWater;
	water;
}

@connect(state => state.user, {
	dispatchSetWater
})
class Water extends Component<IProps, {}> {
	config: Config = {
		navigationBarTitleText: '用水信息'
	};
	state = {
		loading: true
	}
	async componentDidShow() {
		this.setState({
			loading: true
		})
		await this.props.dispatchSetWater()
		this.setState({
			loading: false
		})
	}
	onReportedData() {
		Util.jumpUrl('/pages/mine/report')
	}
	render() {
		const { water } = this.props, { loading } = this.state;
		return (
			<View className="water">
				{loading && <AtActivityIndicator mode='center'></AtActivityIndicator>}
				{!loading && <AtList>
					{water.map((item, index) => <AtListItem key={index} title={item.aname + '-' + item.dnum}
						note={item.date} extraText={item.consume + 'T'} iconInfo={{
							prefixClass: 'sams',
							size: 25,
							color: '#19be6b', value: 'water',
						}} hasBorder={index !== (water.length - 1)} />)}

				</AtList>}
				<View className="water_btn" onClick={this.onReportedData.bind(this)}>
					<AtFab>用水</AtFab>
				</View>
			</View>
		);
	}
}

export default Water