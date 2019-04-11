import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Text, Picker } from '@tarojs/components';
import { AtList, AtListItem, AtRadio, AtTextarea, AtForm, AtInput, AtButton } from 'taro-ui';
import { dispatchApartmentList } from '../../actions/apartment'

// import './visit.scss'

interface IProps {
    dispatchApartmentList;
    list;
}
@connect((state) => state.apartment, {
    dispatchApartmentList
})
class Repair extends Component<IProps, {}> {
    config: Config = {
        navigationBarTitleText: '报修信息'
    };
    state = {
        selectorChecked: '暂无',
        name: '',
        tel: '',
        reason: ''
    }
    componentDidMount() {
        this.props.dispatchApartmentList()
    }
    handleSetArea = e => {
        const { list } = this.props;
        this.setState({
            selectorChecked: list[e.detail.value].name
        })
    }
    handleSetTel(tel) {
        this.setState({
            tel
        });
    }
    handleVisit() {

    }
    render() {
        const { name, tel, reason } = this.state, { list } = this.props;
        return (
            <View className='visit'>
                <AtForm>
                    <View className='page-section'>
                        <Text>拜访公寓</Text>
                        <View>
                            <Picker mode='selector' range={list} onChange={this.handleSetArea} value={0} rangeKey='name'>
                                <View className='picker'>{this.state.selectorChecked}
                                </View>
                            </Picker>
                        </View>
                    </View>
                    <AtInput
                        name="name"
                        title="姓名"
                        type="text"
                        placeholder="姓名"
                        value={tel}
                        onChange={this.handleSetTel.bind(this)}
                    />
                    <AtInput
                        name="tel"
                        title="手机号"
                        type="text"
                        placeholder="手机号"
                        value={tel}
                        onChange={this.handleSetTel.bind(this)}
                    />
                    <AtTextarea
                        value={reason}
                        onChange={this.handleSetTel.bind(this)}
                        maxLength={200}
                        placeholder='你的事由是...'
                    />
                </AtForm>
                <AtButton type="primary" className="visit_btn" onClick={this.handleVisit}>
                    提交
				</AtButton>
            </View>
        )
    }
}
export default Repair