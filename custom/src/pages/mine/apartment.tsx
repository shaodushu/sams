import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Block } from '@tarojs/components';
import { AtList, AtListItem, AtActivityIndicator } from 'taro-ui';
import { Card } from '../../component'
import { API_APARTMENT } from '../../constants/api'
import Fly from '../../libs/api.request'
import IApartment from '../../interfaces/apartment'


interface IState {
    apartment: IApartment;
    loading: Boolean;
}
class Apartment extends Component<{}, IState> {
    config: Config = {
        navigationBarTitleText: '公寓信息'
    };
    state = {
        apartment: {
            name: '',
            floor: 0,
            roomNum: 0,
            rule: '',
            notice: '',
            type: 1,
            aid: null,
            admin: {
                name: '',
                avatar: '',
                tel: 0
            }
        },
        loading: true
    }
    componentDidMount() {
        this.loadApartment()
    }
    async loadApartment() {
        this.setState({
            loading: true
        })
        const { data } = await Fly(API_APARTMENT)
        this.setState({
            apartment: data,
            loading: false
        })
    }
    render() {
        const { apartment, loading } = this.state, { name, type, floor, roomNum, rule, notice, aid, admin } = apartment;
        return (
            <View className='apartment'>
                {loading && <AtActivityIndicator mode='center'></AtActivityIndicator>}
                {!loading && <Block>
                    <Card customStyle="padding:10rpx">
                        <AtList hasBorder={false} >
                            <AtListItem title={name} extraText={type === 1 ? '男生公寓' : '女生公寓'} />
                            <AtListItem title="楼层" extraText={floor.toString()} />
                            <AtListItem title="每层房间数" extraText={roomNum.toString()} />
                            <AtListItem title="通知" note={notice} />
                            <AtListItem title="规则" note={rule} hasBorder={false} />
                        </AtList>
                    </Card>
                    {aid && <Card customStyle="padding:10rpx">
                        <AtList hasBorder={false} >
                            <AtListItem title={admin.name} note={admin.tel.toString()} thumb={admin.avatar} hasBorder={false} extraText="宿舍管理员" />
                        </AtList>
                    </Card>}
                </Block>}


            </View>
        )
    }
}

export default Apartment