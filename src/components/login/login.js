import React, {Component} from 'react';
import { NavBar, List, Icon } from 'antd-mobile';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
    }
    handleBack(){
        this.context.history.goBack();
    }
    render(){
        return <div>
            <NavBar icon={<Icon type="left"/>}
                onLeftClick = { this.handleBack }
            >登录</NavBar>
        </div>
    }
}

Login.contextTypes = {
    history: PropTypes.object
}

export default Login;