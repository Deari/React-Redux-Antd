import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import createStore from './redux/createStore';
import {Provider} from 'react-redux';
import 'antd'

import registerServiceWorker from './registerServiceWorker';


const store = createStore();

const routes = require('./routes/index').default();
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();