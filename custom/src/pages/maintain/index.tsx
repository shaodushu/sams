import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Text, Picker, Image, Block } from '@tarojs/components';
import { AtList, AtListItem, AtFab, AtModal, AtModalContent, AtTimeline, AtFloatLayout, AtTextarea, AtButton, } from 'taro-ui'
import './index.scss'
import * as Util from '../../libs/util';
import * as Tools from '../../libs/tools'
import Fly from '../../libs/api.request'
import { API_MAINTAIN_UPDATE } from '../../constants/api'
import { dispatchMaintainList } from '../../actions/maintain'
import IUser from '../../interfaces/user'

interface IProps {
    dispatchMaintainList;
    list;
    userinfo: IUser;
}
interface Item {
    title: string

    content?: string[]

    icon?: string

    color?: string
}
@connect(({ maintain, user }) => ({
    ...maintain,
    ...user
}), {
        dispatchMaintainList
    })
class Index extends Component<IProps, {}> {
    config: Config = {
        navigationBarTitleText: '维修列表'
    };
    state = {
        timeLineItem: [],
        dealItem: {},
        isOpened: false,
        result: ''
    }
    componentDidShow() {
        const { dispatchMaintainList, userinfo } = this.props
        dispatchMaintainList(userinfo.role)
    }
    goMaintain() {
        Util.jumpUrl('/pages/maintain/maintain')
    }
    handleClick(item: any) {
        let timeLineItem: Array<Item> = []
        if (item.status === '0') {
            timeLineItem.push({
                title: '维修创建', content: [Tools.formatTime(item.createDate, true)], icon: 'clock'
            })
        } else if (item.status === '1') {
            timeLineItem.push({
                title: '维修创建', content: [Tools.formatTime(item.createDate, true)], icon: 'clock'
            }, {
                    title: '已处理', content: [Tools.formatTime(item.updateDate, true)], icon: 'check-circle'
                })
        } else if (item.status === '-1') {
            timeLineItem.push({
                title: '维修创建', content: [Tools.formatTime(item.createDate, true)], icon: 'clock'
            }, {
                    title: '已驳回', content: [Tools.formatTime(item.updateDate, true)], icon: 'close-circle'
                })
        }
        this.setState({
            timeLineItem,
            dealItem: item,
            isOpened: item.status === '0'
        })
    }
    handleSetResult(event) {
        this.setState({
            result: event.target.value
        })
    }
    async handleDeal(status) {
        try {
            const { result, dealItem }: { result: String, dealItem: any } = this.state;
            await Fly({
                url: API_MAINTAIN_UPDATE,
                method: 'post',
                data: {
                    result,
                    status,
                    id: dealItem.id
                }
            })
            Util.hideLoading()
            this.setState({
                isOpened: false
            })
            const { dispatchMaintainList, userinfo } = this.props
            dispatchMaintainList(userinfo.role)
        } catch (error) {
            Util.hideLoading()
        }
    }

    render() {
        const { list, userinfo } = this.props, { timeLineItem, isOpened, result } = this.state;
        return (
            <View className="maintain">
                <AtList hasBorder={false}>
                    {list.map((item, index) => <AtListItem key={index} title={'寝室-' + item.dnum}
                        note={Tools.formatTime(item.createDate, true)} arrow='right' iconInfo={item.iconInfo} onClick={this.handleClick.bind(this, item)} hasBorder={index !== (list.lenght - 1)} />
                    )}

                </AtList>
                {userinfo.role === 2 && <Block>
                    <View className="maintain_btn" onClick={this.goMaintain.bind(this)}>
                        <AtFab>报修</AtFab>
                    </View>
                    <AtModal isOpened={isOpened}>
                        <AtModalContent>
                            <AtTimeline
                                pending
                                items={timeLineItem}
                            >
                            </AtTimeline>
                        </AtModalContent>
                    </AtModal>
                </Block>}
                {userinfo.role === 3 && <AtFloatLayout isOpened={isOpened} >
                    <AtTextarea
                        value={result}
                        onChange={this.handleSetResult.bind(this)}
                        maxLength={200}
                        placeholder='处理结果/驳回原因...'
                    />
                    <View className='maintain_layout'>
                        <AtButton type="primary" className="maintain_btn_reject" onClick={this.handleDeal.bind(this, -1)}>
                            驳回
				        </AtButton>
                        <AtButton type="primary" className="maintain_btn_dispose" onClick={this.handleDeal.bind(this, 1)}>
                            处理
				        </AtButton>
                    </View>
                </AtFloatLayout>}
            </View>
        )
    }
}
export default Index