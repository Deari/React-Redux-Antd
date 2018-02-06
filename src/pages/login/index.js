import React, {Component} from 'react'
import s from './index.scss'
import {Link} from "react-router";
import * as actions from '../../redux/Login/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Login extends Component {
    constructor(props) {
        super();
    }

    componentDidMount() {
        const {actions} = this.props;
        actions.getInfo()
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <span className={s.login}>Login</span>
                <Link to={'/'}>主页</Link>
            </div>
        )
    }
}

const mapStateToProps = ({login}) => ({...login});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        ...actions,
    }, dispatch),
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
