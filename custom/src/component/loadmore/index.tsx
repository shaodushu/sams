import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import { REFRESH_STATUS } from '../../constants/status'

import './index.scss'

interface IProps {
    status: Number;
}
interface IState {

}
export default class LoadMore extends Component<IProps, IState> {
    static defaultProps = {
        status: REFRESH_STATUS.NORMAL
    }

    render() {
        let { status } = this.props, view
        switch (status) {
            case REFRESH_STATUS.NORMAL: {
                view = <View className='normal' />
            }
                break
            case REFRESH_STATUS.REFRESHING: {
                view = (
                    <View className='loading'>
                        <AtActivityIndicator size={20} color='#2d8cf0' content='loading...' />
                    </View>
                )
            }
                break
            case REFRESH_STATUS.NO_MORE_DATA: {
                view = <View className='no-more-data'>-- No More Data --</View>
            }
            case REFRESH_STATUS.ERROR: {
                view = <View className='no-more-data'>-- ERROR --</View>
            }
        }
        return (
            <View className='content'>
                {view}
            </View>
        )
    }

}
