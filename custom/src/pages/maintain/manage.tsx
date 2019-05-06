import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Block, Button } from '@tarojs/components';
import { AtList, AtListItem, AtFab, AtModal, AtModalContent, AtTimeline, AtTextarea, AtButton, AtImagePicker, AtModalAction } from 'taro-ui'
import { Card } from '../../component'
import * as Tools from '../../libs/tools'
import IApartment from '../../interfaces/apartment'
import IRepair from '../../interfaces/repair'
import IUser from '../../interfaces/user'
import Fly from '../../libs/api.request'
import { API_MAINTAIN_UPDATE } from '../../constants/api'
import { dispatchMaintainList } from '../../actions/maintain'
import * as Util from '../../libs/util';
import './manage.scss'

interface Item {
    title: string
    content?: string[]
    icon?: string
    color?: string
}

interface IProps {
    userinfo: IUser
}
interface IState {
    timeLineItem: any[];
    dealItem: {
        apartment: IApartment;
        repair: IRepair;
    },
    dealResult: String;
    isOpened: Boolean;
}
@connect((store) => (store.user), {
    dispatchMaintainList
})
class Manage extends Component<IProps, IState> {
    config: Config = {
        navigationBarTitleText: '报修详情'
    };
    state = {
        timeLineItem: [],
        dealItem: {
            apartment: {
                name: '',
                type: 1
            },
            dnum: '',
            stel: '',
            imgList: '',
            damage: '',
            repair: {
                name: '',
                tel: '',
                avatar: '',
                type: 0
            },
            result: '',
            status: '0'
        },
        isOpened: false,
        dealResult: ''
    }
    componentDidMount() {
        let timeLineItem: Array<Item> = [],
            dealItem = JSON.parse(this.$router.params.item);
        if (dealItem.status === '0') {
            timeLineItem.push({
                title: '维修创建', content: [Tools.formatTime(dealItem.createDate, true)], icon: 'clock'
            })
        } else if (dealItem.status === '1') {
            timeLineItem.push({
                title: '维修创建', content: [Tools.formatTime(dealItem.createDate, true)], icon: 'clock'
            }, {
                    title: '已处理', content: [Tools.formatTime(dealItem.updateDate, true)], icon: 'check-circle'
                })
        } else if (dealItem.status === '-1') {
            timeLineItem.push({
                title: '维修创建', content: [Tools.formatTime(dealItem.createDate, true)], icon: 'clock'
            }, {
                    title: '已驳回', content: [Tools.formatTime(dealItem.updateDate, true)], icon: 'close-circle'
                })
        }
        this.setState({
            timeLineItem,
            dealItem
        })
    }
    onOpenModal() {
        this.setState({
            isOpened: true
        })
    }
    onSetResult(event) {
        this.setState({
            dealResult: event.target.value
        })
    }
    async onDeal(status) {
        try {
            const { dealResult, dealItem }: { dealResult: String, dealItem: any } = this.state;
            if (dealResult) {
                Util.showLoading('处理中...')
                await Fly(API_MAINTAIN_UPDATE, 'post',
                    {
                        result: dealResult,
                        status,
                        id: dealItem.id
                    })
                Util.hideLoading()
                this.setState({
                    isOpened: false
                })
                Taro.navigateBack()
            } else {
                Util.showToast('填写处理结果')
            }

        } catch (error) {
            Util.hideLoading()
        }
    }
    render() {
        const { timeLineItem, dealItem, isOpened, dealResult } = this.state, { apartment, dnum, stel, imgList, damage, repair, result, status } = dealItem, { userinfo } = this.props;
        let files = imgList.split(',').map(item => {
            return {
                url: item
            }
        })
        return (
            <View className="manage">
                <Card customStyle="padding:10rpx" title="处理进度">
                    <AtTimeline
                        items={timeLineItem}
                    >
                    </AtTimeline>
                </Card>
                {result && <Card customStyle="padding:10rpx" title="处理结果">
                    <View className="at-article__p">
                        {result}
                    </View>
                </Card>}
                <Card customStyle="padding:10rpx" title="基本信息">
                    <AtList hasBorder={false}>
                        <AtListItem title="公寓" extraText={apartment.name}></AtListItem>
                        <AtListItem title="类型" extraText={apartment.type === 1 ? '男生公寓' : '女生公寓'}></AtListItem>
                        <AtListItem title="宿舍" extraText={dnum}></AtListItem>
                        <AtListItem title="学生电话" extraText={stel} hasBorder={false}></AtListItem>
                    </AtList>
                </Card>
                <Card customStyle="padding:10rpx" title="破损情况">
                    <View className="at-article__p">
                        {damage}
                    </View>
                </Card>
                <Card customStyle="padding:10rpx" title="报修图片">
                    <AtImagePicker
                        length={4}
                        count={5}
                        files={files}
                        showAddBtn={false}
                    />
                </Card>
                <Card customStyle="padding:10rpx" title="维修人员">
                    <AtList hasBorder={false}>
                        <AtListItem title={repair.name} extraText={repair.tel}
                            thumb={repair.avatar} note={repair.type === 0 ? '无任务' : '工作中'} hasBorder={false}></AtListItem>
                    </AtList>
                </Card>
                {userinfo.role === 3 && status === '0' && <Block>
                    <View className="manage_btn" onClick={this.onOpenModal.bind(this)}>
                        <AtFab>处理</AtFab>
                    </View>
                    <AtModal isOpened={isOpened}>
                        <AtModalContent>
                            <AtTextarea
                                value={dealResult}
                                onChange={this.onSetResult.bind(this)}
                                maxLength={200}
                            // placeholder='处理结果/驳回原因...'
                            />
                        </AtModalContent>
                        <AtModalAction>
                            <Button onClick={this.onDeal.bind(this, -1)}>驳回</Button>
                            <Button onClick={this.onDeal.bind(this, 1)}>已处理</Button>
                        </AtModalAction>
                    </AtModal>
                </Block>}
            </View>
        )
    }
}

export default Manage
