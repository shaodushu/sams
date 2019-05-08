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
import { Empty, LoadMore } from '../../component'
import { REFRESH_STATUS } from '../../constants/status'

interface IState {
    page: Number;
    refresh_status: Number;
    list: Array<IArticle>;
    loading: Boolean;
}
export default class Index extends Component<{}, IState> {
    config: Config = {
        enablePullDownRefresh: true,
        navigationBarTitleText: '信息公告'
    }
    state = {
        page: 1,
        refresh_status: REFRESH_STATUS.NORMAL,
        list: [],
        loading: true
    }
    onPullDownRefresh() {
        this.setState({
            page: 1
        }, () => {
            this.getArticleList()
        })
    }
    onReachBottom() {
        const { page, refresh_status } = this.state
        if (refresh_status !== REFRESH_STATUS.NO_MORE_DATA) {
            this.setState({
                page: page + 1
            }, () => {
                this.getArticleList()
            })
        }
    }
    async componentDidMount() {
        await this.getArticleList()
        this.setState({
            loading: false
        })

    }
    async getArticleList() {
        try {
            const { page, list } = this.state;
            if (page !== 1) {
                this.setState({
                    refresh_status: REFRESH_STATUS.REFRESHING
                })
            }
            const result = await fly(API_ARTICLE_LIST, 'post', {
                page
            })
            let status = result.list.length < 12 ? REFRESH_STATUS.NO_MORE_DATA : REFRESH_STATUS.NORMAL
            if (page === 1) {
                this.setState({
                    list: result.list,
                    refresh_status: REFRESH_STATUS.NORMAL
                })
            } else {
                this.setState({
                    list: list.concat(result.list),
                    refresh_status: status
                })
            }
            Util.hideLoading()
            Taro.stopPullDownRefresh()
        } catch (error) {
            this.setState({
                refresh_status: REFRESH_STATUS.ERROR
            })
            Util.hideLoading()
            Taro.stopPullDownRefresh()
        }
    }
    toNewsDetail(item) {
        this.$preload('article', item)
        Util.jumpUrl('/pages/message/detail')
    }
    render() {
        const { list, refresh_status, loading } = this.state;
        const newsList = list.map((item: IArticle, index) => {
            return <AtCard
                className="card shadow"
                key={index}
                note={`来源：${item.source}`}
                extra={item.date}
                title={item.title}
                onClick={this.toNewsDetail.bind(this, item)}
                isFull
            >
                <View className="card-content">{item.text}</View>
            </AtCard>
        })
        return <View className="message">
            {!loading && <Block>
                {list.length > 0 ? newsList : <Empty content="最近没有新的公告~" />}
                <LoadMore status={refresh_status} />
            </Block>}
            {loading && <AtActivityIndicator mode="center" />}
        </View>
    }
}

