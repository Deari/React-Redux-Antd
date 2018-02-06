/**
 * Created by lizhuo on 2017/8/15.
 */

const path = require("path")
let name;
let redux;
let reactUrl = process.cwd() + '/src/pages';
let reduxUrl = process.cwd() + '/src/redux';
try {
    name = JSON.parse(process.env.npm_config_argv).original.slice(2)[0];
    redux = JSON.parse(process.env.npm_config_argv).original.slice(3)[0];
} catch (e) {
    name = process.argv.slice(2)[0];
    redux = process.argv.slice(3)[0];
}

const fs = require("fs")
const reactData = {
    "path": reactUrl + '/' + name,
    "name": name,
    "type": "dir",
    "fileData": [
        {
            "name": "index.scss",
            "type": "file",
            "content": ``
        },
        {
            "name": "index.js",
            "type": "file",
            "content": `
import React from 'react'
import s from './index.scss'
import cx from 'classnames'
${redux ? `
import * as actions from '../../redux/Login/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';` : ''}

class ${name} extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  
  // 组件加载后立即执行
  componentDidMount (props) {
  
  }
  
  // 重新获取props后执行
  componentWillReceiveProps(nextProps) {
    
  }
  
  render () {
    return (
        <div>${name}</div>
    )
  }
}

${!redux ? 'export default ${name};' :
                `
const mapStateToProps = ({${name.toLowerCase()}}) => ({...${name.toLowerCase()}});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
    ...actions,
    }, dispatch),
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(${name});`}
            `
        }
    ]
}

const reduxData = {
    "path": reduxUrl + '/' + name,
    "name": name,
    "type": "dir",
    "fileData": [
        {
            "name": "actions",
            "type": "dir",
            "fileData": [
                {
                    "name": "index.js",
                    "type": "file",
                    "content": ""
                }
            ]
        },
        {
            "name": "reducers",
            "type": "dir",
            "fileData": [
                {
                    "name": "index.js",
                    "type": "file",
                    "content": `
import {combineReducers} from 'redux';

import ${name} from './${name}';

export default combineReducers({
    ${name}
})
                    `
                },
                {
                    "name": `${name}.js`,
                    "type": "file",
                    "content": `
import * as actionTypes from '../actionTypes'

const initialState = {};

function indexRedux(state = initialState, {type, payload}) {
    switch (type) {
        default:
            return state
    }
}


export default indexRedux`
                }
            ]
        },
        {
            "name": "actionTypes.js",
            "type": "file",
            "content": ""
        }
    ]
}

const createComponent = ({path, fileData}) => {
    fs.mkdir(path, () => {
        if (fileData && fileData.forEach) {
            fileData.forEach((f) => {
                f.path = path + "/" + f.name
                f.content = f.content || ""
                switch (f.type) {
                    case  "dir":
                        fs.mkdir(f.path, () => {
                            createComponent(f)
                        })
                        break
                    case "file":
                        fs.writeFileSync(f.path, f.content, "utf-8")
                        break
                    default :
                        break
                }
            })
        }
    });
}

try {
    createComponent(reactData);
    createComponent(reduxData);
} catch (e) {
    console.log(e)
}
