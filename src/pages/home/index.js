import React, {Component} from 'react'
import s from './index.scss';
import logo from '../../static/images/logo.svg'
import {Link} from "react-router";
import {Button} from "antd";
import Fetch from "../../utils/fetch";

class Home extends Component {
    constructor(props) {
        super();
        console.log(props)
    }

    getData = () => {
        Fetch.getJSON('/api/v1/topics').then(data => {
            console.log(data)
        }).catch(err => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <div className={s.App}>
                <header className={s['App-header']}>
                    <img src={logo} className={s['App-logo']} alt="logo"/>
                    <h1 className={s['App-title']}><Link to={'login'}>Welcome to React</Link></h1>
                </header>
                <Button>src/pages/home/home.js</Button>
            </div>
        );
    }
}

export default Home