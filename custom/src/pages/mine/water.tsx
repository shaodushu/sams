import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { AtList, AtListItem } from 'taro-ui';

import { dispatchSetWater } from '../../actions/user'

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
	componentDidMount() {
		this.props.dispatchSetWater()
	}
	render() {
		const { water } = this.props;
		return (
			<AtList>
				{water.map((item, index) => <AtListItem key={index} title={item.aname + '-' + item.dnum}
					note={item.date} extraText={item.consume + '吨'} iconInfo={{
						prefixClass: 'sams',
						size: 25,
						color: '#19be6b', value: 'water',
					}} hasBorder={index !== (water.length - 1)} />)}

			</AtList>
		);
	}
}

export default Water