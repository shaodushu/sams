import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Text, Image, Block, RichText } from '@tarojs/components';
// import {
//     AtCard,
//     AtActivityIndicator
// } from 'taro-ui';
import IArticle from '../../interfaces/article'
import './detail.scss'

const weRich = require('we-rich');
interface IState {
    article: IArticle;
}
export default class Message extends Component<{}, IState> {
    config: Config = {
        navigationBarTitleText: '公告详情'
    }
    state = {
        article: {
            title: '',
            author: '',
            html: '',
            source: ''
        }
    }
    componentWillMount() {
        const { article } = this.$router.preload;
        this.setState({
            article
        })
    }
    render() {
        const { article } = this.state, { title, date, author }: IArticle = article;
        return <View className="message">
            <View className='at-article'>
                <View className='at-article__h2'>{title}</View>
                <View className='at-article__info'>
                    {date}_{author}
                </View>
                <View className='at-article__content'>
                    <View className='at-article__section'>
                        <View className='at-article__p'>
                            <RichText nodes={weRich.parse(article.html)}></RichText>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    }
}