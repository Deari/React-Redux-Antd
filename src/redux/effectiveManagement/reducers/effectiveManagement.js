import * as actionTypes from '../actionTypes'

const initialState = {};

function indexRedux(state = initialState, {type, payload}) {
    switch (type) {
        case actionTypes.getInitInfo:
            return {...type, ...payload}
        default:
            return state
    }
}


export default indexRedux