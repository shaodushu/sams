import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View } from '@tarojs/components';
import { AtList, AtListItem, AtFab, AtActivityIndicator } from 'taro-ui'
import './index.scss'
import * as Util from '../../libs/util';
import * as Tools from '../../libs/tools'
import { dispatchMaintainList } from '../../actions/maintain'
import IUser from '../../interfaces/user'

interface IProps {
    dispatchMaintainList;
    list;
    userinfo: IUser;
}

@connect(({ maintain, user }) => ({
    ...maintain,
    ...user
}), {
        dispatchMaintainList
    })
class Index extends Component<IProps, {}> {
    config: Config = {
        navigationBarTitleText: '报修列表'
    };
    state = {
        loading: true
    }
    async componentDidShow() {
        const { dispatchMaintainList, userinfo } = this.props
        this.setState({
            loading: true
        })
        await dispatchMaintainList(userinfo.role)
        this.setState({
            loading: false
        })
    }
    goMaintain() {
        Util.jumpUrl('/pages/maintain/maintain')
    }
    onClick(item: any) {
        Util.jumpUrl('/pages/maintain/manage?item=' + JSON.stringify(item))
    }
    render() {
        const { list, userinfo } = this.props, { loading } = this.state;
        return (
            <View className="maintain">
                {loading && <AtActivityIndicator mode='center'></AtActivityIndicator>}
                {!loading && <AtList hasBorder={false}>
                    {list.map((item, index) => <AtListItem key={index} title={'寝室-' + item.dnum}
                        note={Tools.formatTime(item.createDate, true)} arrow='right' iconInfo={item.iconInfo} onClick={this.onClick.bind(this, item)} hasBorder={index !== (list.length - 1)} />
                    )}

                </AtList>}
                {userinfo.role === 2 && <View className="maintain_btn" onClick={this.goMaintain.bind(this)}>
                    <AtFab>报修</AtFab>
                </View>}
            </View>
        )
    }
}
export default Index