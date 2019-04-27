import { MAINTAIN_LIST } from '../constants/maintain'
const INITIAL_STATE = {
    list: [],//维修列表
};
const FILTER_ICONINFO = (status) => {
    let iconInfo = {
        prefixClass: 'sams',
        size: 25,
        color: '', value: '',
    }
    switch (status) {
        case '1':
            iconInfo.color = '#19be6b'
            iconInfo.value = 'check-circle-fill'
            break
        case '-1':
            iconInfo.color = '#ff4645'
            iconInfo.value = 'close-circle-fill'
            break
        default:
            iconInfo.color = '#2db7f5'
            iconInfo.value = 'time-circle-fill'
            break
    }
    return iconInfo
}
export default function maintain(state = INITIAL_STATE, action) {
    switch (action.type) {
        case MAINTAIN_LIST: {
            let { list } = action.payload

            return {
                ...state,
                list: list.map(item => {
                    return {
                        ...item,
                        iconInfo: FILTER_ICONINFO(item.status)
                    }
                })
            }
        }
        default:
            return state;
    }
}