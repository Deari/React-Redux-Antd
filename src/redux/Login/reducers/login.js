import * as actionTypes from '../actionTypes'

const initialState = {
    text: 'Hello Redux!!!'
};

function indexRedux(state = initialState, {type, payload}) {
    switch (type) {
        case actionTypes.GO_LOGIN:
            //登录
            return {...initialState, ...payload.data};
        case actionTypes.OUT_LOGIN:
            //退出登录
            return 2;
        default:
            return state
    }
}


export default indexRedux