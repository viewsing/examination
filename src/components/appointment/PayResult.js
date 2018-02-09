import React, {Component} from 'react';
import { NavBar, List, Icon, Result } from 'antd-mobile';
import PropTypes from 'prop-types';

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
                img={<Icon type="check-circle" className="spe" style={{ fill: '#1F90E6' }} />}
                title="支付成功"
                message={<div>998.00元 <del>1098元</del></div>}
            />
        </div>
    }
}

PayResult.contextTypes = {
    history: PropTypes.object
}

export default PayResult;