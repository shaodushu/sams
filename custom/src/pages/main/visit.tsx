import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Text, Picker } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';

import './visit.scss'

class Visit extends Component {
    config: Config = {
        navigationBarTitleText: '拜访信息'
    };
    state = {
        selector: ['美国', '中国', '巴西', '日本'],
        selectorChecked: '美国',
        timeSel: '12:01',
        dateSel: '2018-04-22'
    }
    onChange = e => {
        this.setState({
            selectorChecked: this.state.selector[e.detail.value]
        })
    }
    onTimeChange = e => {
        this.setState({
            timeSel: e.detail.value
        })
    }
    onDateChange = e => {
        this.setState({
            dateSel: e.detail.value
        })
    }
    render() {
        return (
            <View className='visit'>
                <View className='panel'>
                    <View className='panel_title'>
                        填写拜访信息
                </View>
                    <View className='panel_content'>
                        <View className='page-section'>
                            <Text>地区选择器</Text>
                            <View>
                                <Picker mode='selector' range={this.state.selector} onChange={this.onChange} value={0}>
                                    <View className='picker'>
                                        当前选择：{this.state.selectorChecked}
                                    </View>
                                </Picker>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
        )
    }
}
export default Visit