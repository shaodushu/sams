import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { AtList, AtListItem } from 'taro-ui';

import { dispatchSetElectricity } from '../../actions/user'

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
	componentDidMount() {
		this.props.dispatchSetElectricity()
	}
	render() {
		const { electricity } = this.props;
		return (
			<AtList>
				{electricity.map((item, index) => <AtListItem key={index} title={item.aname + '-' + item.dnum}
					note={item.date} extraText={item.consume + '度'} iconInfo={{
						prefixClass: 'sams',
						size: 25,
						color: '#2db7f5', value: 'electrical-equipment',
					}} />)}

			</AtList>
		);
	}
}

export default Electricity