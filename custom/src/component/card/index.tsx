import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss'

interface IProps {
    children;
    customStyle?;
}
class Card extends Component<IProps, {}> {
    render() {
        const { customStyle, children } = this.props
        return (
            <View className='card' style={customStyle}>
                {children}
            </View>
        )
    }
}
export default Card