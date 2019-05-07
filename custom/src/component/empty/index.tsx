import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'


import './index.scss'
interface IProps {
    content: String;
}
export default class Segment extends Component<IProps, {}> {
    static defaultProps = {
        content: 'Oops! Nothing here...'
    }

    componentWillMount() {
    }

    render() {
        const { content } = this.props
        return (
            <View className='content'>
                <Image className='img' src={require('../../asset/img/octocat.png')} />
                <Text className='text'>{content}</Text>
            </View>
        )
    }
}
