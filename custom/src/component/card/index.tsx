import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss'

interface IProps {
    children?;
    customStyle?;
    title?: String;
}
class Card extends Component<IProps, {}> {
    render() {
        const { customStyle, title } = this.props
        return (
            <View className='card shadow' style={customStyle}>
                {title && <View className="title">{title}</View>}

                <View className="content">
                    {this.props.children}
                </View>
            </View>
        )
    }
}
export default Card