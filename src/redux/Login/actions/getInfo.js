import {message} from 'antd';
import * as actionTypes from '../actionTypes';
import Fetch from "../../../utils/fetch";

export default (params, callback) => {
    return dispatch => {
        Fetch.getJSON('/api/v1/topics', params).then(data => {
            dispatch({type: actionTypes.GO_LOGIN, payload: {data: {"GO_LOGIN": true}}})
            message.success('success', 3, () => callback && callback(data))
        }).catch(err => {
            console.log(err)
        })
    }
};
