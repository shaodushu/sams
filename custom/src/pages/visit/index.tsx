import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Text, Picker, Image, Block } from '@tarojs/components';
import { AtTextarea, AtForm, AtInput, AtButton, AtActivityIndicator } from 'taro-ui';
import { dispatchApartmentList } from '../../actions/apartment'
import Fly from '../../libs/api.request'
import { Card } from '../../component'
import { API_VISITORS_CREATE, API_VISITORS_QRCODE, API_VISITORS_DELETE } from '../../constants/api'
import * as Util from '../../libs/util'

import './index.scss'

interface IProps {
    dispatchApartmentList;
    list;
}
@connect((state) => state.apartment, {
    dispatchApartmentList
})
class Visit extends Component<IProps, {}> {
    config: Config = {
        navigationBarTitleText: '申请拜访'
    };
    state = {
        selectorChecked: '暂无',
        aid: '',
        name: '',
        idCard: '',
        tel: '',
        reason: '',
        qrCode: '',
        loading: true
    }
    componentDidMount() {
        this.props.dispatchApartmentList()
        this.loadQrCode()
    }
    async loadQrCode() {
        const { imgUrl } = await Fly(API_VISITORS_QRCODE)
        this.setState({
            qrCode: imgUrl,
            loading: false
        })
    }
    handleSetArea = e => {
        let { list } = this.props, { aid, name } = list[e.detail.value];

        this.setState({
            selectorChecked: name,
            aid
        })
    }
    handleSetName(name) {
        this.setState({
            name
        })
    }
    handleSetTel(tel) {
        this.setState({
            tel
        });
    }
    handleSetIdCard(idCard) {
        this.setState({
            idCard
        })
    }
    handleSetReason(event) {
        this.setState({
            reason: event.target.value
        })
    }
    async handleVisit() {
        try {
            const { aid, name, tel, reason, idCard } = this.state;
            Util.showLoading('申请中...')
            const { imgUrl } = await Fly(API_VISITORS_CREATE, 'post',
                { aid, name, tel, reason, idCard })
            Util.hideLoading()
            this.setState({
                qrCode: imgUrl
            })

        } catch (error) {
            Util.hideLoading()
        }
    }
    async handleAgainVisit() {
        try {
            Util.showLoading('解除申请中...')
            await Fly(API_VISITORS_DELETE)
            Util.hideLoading()
            this.setState({
                qrCode: ''
            })
        } catch (error) {
            Util.hideLoading()
        }
    }
    render() {
        let { name, tel, reason, idCard, qrCode, loading } = this.state, { list } = this.props, renderDOM;
        if (loading) {
            renderDOM = <AtActivityIndicator mode='center'></AtActivityIndicator>
        }
        else if (qrCode) {
            renderDOM = <Card title="进入凭证">
                <View className="qrcode">
                    <Image src={qrCode} mode="aspectFill" lazyLoad ></Image>
                </View>
                <View className="visit_btn">
                    <AtButton type="primary" onClick={this.handleAgainVisit}>
                        重新申请
				</AtButton>
                </View>
            </Card>
        } else {
            renderDOM = <Block>
                <Card title="基本信息">
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
                        maxLength="20"
                        placeholder="姓名"
                        value={name}
                        onChange={this.handleSetName.bind(this)}
                    />
                    <AtInput
                        name="idCard"
                        title="身份证"
                        type="idcard"
                        maxLength="18"
                        placeholder="身份证"
                        value={idCard}
                        onChange={this.handleSetIdCard.bind(this)}
                    />
                    <AtInput
                        name="tel"
                        title="手机号"
                        type="phone"
                        maxLength="11"
                        placeholder="手机号"
                        value={tel}
                        border={false}
                        onChange={this.handleSetTel.bind(this)}
                    />
                </Card>
                <Card title="拜访事由">
                    <View style="width:92%;margin:0 auto;padding:10rpx;">
                        <AtTextarea
                            value={reason}
                            onChange={this.handleSetReason.bind(this)}
                            maxLength={200}
                            placeholder='你的事由是...'
                        />
                    </View>
                </Card>
                <View className="visit_btn">
                    <AtButton type="primary" onClick={this.handleVisit}>
                        提交
				</AtButton>
                </View>
            </Block>
        }
        return (
            <View className='visit'>
                {renderDOM}
            </View>
        )
    }
}
export default Visit