import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Text, Picker } from '@tarojs/components';
import { AtInput, AtRadio, AtButton } from 'taro-ui';
import { Card } from '../../component'
import * as tools from '../../libs/tools'
import * as Util from '../../libs/util';
import Fly from '../../libs/api.request'
import { API_USER_REPORT } from '../../constants/api'
import './report.scss'

interface IProps { }
class Report extends Component<IProps, {}> {
    config: Config = {
        navigationBarTitleText: '数据上报'
    };
    state = {
        dateSel: '',
        startTime: '',
        useType: 'water',
        useAmount: 0
    }
    componentWillMount() {
        this.setState({
            dateSel: tools.formatTime(new Date().getTime()),
            startTime: tools.formatTime(new Date().getTime() - 365 * 1 * 24 * 3600 * 1000)
        })
    }
    onDateChange = e => {
        this.setState({
            dateSel: e.detail.value
        })
    }
    onTypeChange = useType => {
        this.setState({
            useType
        })
    }
    onSetAmount = useAmount => {
        this.setState({
            useAmount
        })
    }
    async onReport() {
        const { dateSel, useType, useAmount } = this.state
        if (useAmount) {
            try {
                Util.showLoading('处理中...')
                await Fly(API_USER_REPORT, 'post',
                    {
                        date: dateSel,
                        useType,
                        consume: useAmount
                    })
                Util.hideLoading()
                Taro.navigateBack()
            } catch (error) {
                Util.hideLoading()
            }
        } else {
            Util.showToast('填写使用量')
        }

    }
    render() {
        const { dateSel, useAmount, useType, startTime } = this.state
        return (
            <View className="report">
                <Card customStyle="padding:10rpx" title="基本信息">
                    <AtRadio
                        options={[
                            { label: '用水', value: 'water' },
                            { label: '用电', value: 'electro' }
                        ]}
                        value={useType}
                        onClick={this.onTypeChange.bind(this)}
                    />
                    <View className='page-section'>
                        <Text>日期选择</Text>
                        <View>
                            <Picker mode='date' onChange={this.onDateChange} value={dateSel} fields="month" start={startTime} end={dateSel}>
                                <View className='picker'>{dateSel}
                                </View>
                            </Picker>
                        </View>
                    </View>
                    <AtInput
                        name="amount"
                        title="使用量"
                        type="digit"
                        placeholder="使用量"
                        value={useAmount}
                        border={false}
                        maxLength={10}
                        onChange={this.onSetAmount.bind(this)}
                    />
                </Card>
                <AtButton type="primary" className="report_btn" onClick={this.onReport}>
                    提交
				</AtButton>
            </View>
        )
    }
}
export default Report