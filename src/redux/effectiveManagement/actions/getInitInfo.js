import * as actionTypes from '../actionTypes';
import Fetch from "../../../utils/fetch";
import axios from 'axios'

export default (params, callback) => {
    return dispatch => {
        /*Fetch.getJSON('/calendar/loadcalendar.json', params).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        })*/
        axios.get('/calendar/loadcalendar.json').then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    }
}