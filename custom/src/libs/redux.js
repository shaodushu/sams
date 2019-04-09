/**
 * 适当封装 Redux，简化调用
 */
/* eslint-disable import/prefer-default-export */
import fly from './api.request'

export function createApiAction(type, url, method = 'GET', data = {}, extra = {}) {
  return async (dispatch) => {
    try {
      const payload = await fly({
        url,
        method,
        data
      })
      dispatch({
        type,
        data,
        extra,
        payload
      })
      return payload
    } catch (error) {
      throw (error)
    }
  }
}
export function createAction(type, data = {}, extra = {}) {
  return (dispatch) => {
    dispatch({
      type,
      data,
      extra
    })
  }
}
