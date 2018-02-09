import React, {Component} from 'react';
import { NavBar, List, Icon, Result } from 'antd-mobile';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

class PayResult extends Component {
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
            >支付结果</NavBar>
            <Result
                img={<Icon type="check-circle" style={{ fill: '#1F90E6', width: '60px', height: '60px' }} />}
                title="支付成功"
                message={<div><Link to="/">回到首页</Link></div>}
            />
        </div>
    }
}

PayResult.contextTypes = {
    history: PropTypes.object
}

export default PayResult;