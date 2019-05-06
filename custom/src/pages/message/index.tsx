import Taro, { Component, Config } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import {
    AtCard,
    AtActivityIndicator
} from 'taro-ui';
import { API_ARTICLE_LIST } from '../../constants/api'
import fly from '../../libs/api.request'
import './index.scss';
import * as Util from '../../libs/util'
import IArticle from '../../interfaces/article'

interface IState {
    loading: Boolean;
    list: Array<IArticle>
}
export default class Index extends Component<{}, IState> {
    config: Config = {
        enablePullDownRefresh: true,
        navigationBarTitleText: '信息公告'
    }
    state = {
        loading: true,
        list: []
    }
    async onPullDownRefresh() {
        try {
            await this.getArticle()
            Taro.stopPullDownRefresh()
        } catch (error) {
            Taro.stopPullDownRefresh()
        }
    }
    componentDidMount() {
        this.getArticle()
    }
    async getArticle() {
        try {
            this.setState({
                loading: true
            })
            const list = await fly(API_ARTICLE_LIST, 'post', {
                page: 2
            })
            this.setState({
                list,
                loading: false
            })
        } catch (error) {
            this.setState({
                loading: false
            })
        }
    }
    toNewsDetail(item) {
        this.$preload('article', item)
        Util.jumpUrl('/pages/message/detail')
    }
    render() {
        const { loading, list } = this.state;
        return <View className="message">
            {loading && <AtActivityIndicator mode='center'></AtActivityIndicator>}
            {!loading && <Block>
                {list.map((item: IArticle, index) => <AtCard
                    className="card"
                    key={index}
                    note={`来源：${item.source}`}
                    extra={item.date}
                    title={item.title}
                    onClick={this.toNewsDetail.bind(this, item)}
                    isFull
                >
                    <View className="card-content">{item.text}</View>
                </AtCard>)}
            </Block>}

        </View>
    }
}

