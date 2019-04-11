import { APARTMENT_LIST } from '../constants/apartment'

const INITIAL_STATE = {
    list: [],//公寓列表
};
export default function apartment(state = INITIAL_STATE, action) {
    switch (action.type) {
        case APARTMENT_LIST: {
            let { list } = action.payload
            return {
                ...state,
                list: list.map(item => {
                    const { id, name } = item
                    return {
                        aid: id,
                        name
                    }
                })
            }
        }
        default:
            return state;
    }
}