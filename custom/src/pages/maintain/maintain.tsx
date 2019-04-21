import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Text, Picker } from '@tarojs/components';
import { AtTextarea, AtInput, AtButton, AtImagePicker } from 'taro-ui';
import { Card } from '../../component'
import { dispatchApartmentList } from '../../actions/apartment'
import Fly from '../../libs/api.request'
import { API_MAINTAIN_CREATE, API_FILE_UPLOAD } from '../../constants/api'
import * as Util from '../../libs/util'
import config from '../../config'

import './maintain.scss'

interface IProps {
    dispatchApartmentList;
    list;
}
@connect((state) => state.apartment, {
    dispatchApartmentList
})
class Maintain extends Component<IProps, {}> {
    config: Config = {
        navigationBarTitleText: '报修填写'
    };
    state = {
        selectorChecked: '暂无',
        aid: '',
        dnum: '',
        stel: '',
        damage: '',
        files: []
    }
    componentDidMount() {
        this.props.dispatchApartmentList()
    }
    handleSetArea = e => {
        let { list } = this.props, { aid, name } = list[e.detail.value];

        this.setState({
            selectorChecked: name,
            aid
        })
    }
    handleSetDNum(dnum) {
        this.setState({
            dnum
        })
    }
    handleSetTel(stel) {
        this.setState({
            stel
        });
    }
    handleSetDamage(event) {
        this.setState({
            damage: event.target.value
        })
    }
    async handleMaintain() {
        try {
            const { aid, dnum, stel, damage, files } = this.state;
            Util.showLoading('提交中...')
            await Fly({ url: API_MAINTAIN_CREATE, method: 'post', data: { aid, dnum, stel, damage, imgList: files.map((item: any) => item.url).join(',') } })
            Util.hideLoading()
            Taro.navigateBack()
        } catch (error) {
            Util.hideLoading()
        }
    }
    async onChange(files: Array<any>, operationType: string, index: number) {
        if (operationType === 'add') {
            try {
                Util.showLoading('上传中...')
                let { data } = await Taro.uploadFile({
                    url: config.host + API_FILE_UPLOAD,
                    filePath: files[files.length - 1].url,
                    name: 'file',
                    header: {
                        'content-type': 'multipart/form-data'
                    },
                })
                files[files.length - 1] = {
                    url: JSON.parse(data).imgUrl
                }
                Util.hideLoading()
            } catch (error) {
                Util.hideLoading()
                Util.showToast('上传失败!')
            }
        }
        this.setState({
            files
        })
    }
    onFail() {

    }
    onImageClick() {

    }
    render() {
        let { dnum, stel, damage, files } = this.state, { list } = this.props;
        return (
            <View className='maintain'>
                <Card>
                    <View className='page-section'>
                        <Text>维修公寓</Text>
                        <View>
                            <Picker mode='selector' range={list} onChange={this.handleSetArea} value={0} rangeKey='name'>
                                <View className='picker'>{this.state.selectorChecked}
                                </View>
                            </Picker>
                        </View>
                    </View>
                    <AtInput
                        name="dnum"
                        title="宿舍号"
                        type="text"
                        maxLength="20"
                        placeholder="宿舍号"
                        value={dnum}
                        onChange={this.handleSetDNum.bind(this)}
                    />
                    <AtInput
                        name="stel"
                        title="联系方式"
                        type="phone"
                        maxLength="11"
                        placeholder="联系方式"
                        value={stel}
                        border={false}
                        onChange={this.handleSetTel.bind(this)}
                    />
                </Card>
                <Card customStyle="padding:10rpx;">
                    <AtTextarea
                        value={damage}
                        onChange={this.handleSetDamage.bind(this)}
                        maxLength={200}
                        placeholder='破损情况...'
                    />
                    <AtImagePicker
                        length={4}
                        count={5}
                        files={files}
                        onChange={this.onChange.bind(this)}
                        onFail={this.onFail.bind(this)}
                        onImageClick={this.onImageClick.bind(this)}
                    />
                </Card>
                <AtButton type="primary" className="maintain_btn" onClick={this.handleMaintain}>
                    提交
				</AtButton>
            </View>
        )
    }
}
export default Maintain