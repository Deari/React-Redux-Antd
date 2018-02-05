import {combineReducers} from 'redux';

//全局reducer

//子reducer
import login from './Login/reducers';

//合并reducer
export default combineReducers({
    login
});