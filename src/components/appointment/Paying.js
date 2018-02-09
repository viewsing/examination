import React, {Component} from 'react';
import { NavBar, List, Icon } from 'antd-mobile';
import PropTypes from 'prop-types';
import zhifubao from '../../img/zhifubao.png';
import weixin from '../../img/weixin.png';
import yinlian from '../../img/yinlian.png';

class Paying extends Component {
    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
        let paying = JSON.parse(sessionStorage.getItem('paying'));
        this.state = paying;
    }
    handleBack(){
        this.context.history.goBack();
    }
    render(){
        let imgSrc;
        if (this.state.tradeMode == 1) {
            imgSrc = yinlian;
        } else if (this.state.tradeMode == 2) {
            imgSrc = weixin;
        } else {
            imgSrc = zhifubao;
        }
        return <div>
            <NavBar icon={<Icon type="left"/>}
                onLeftClick = { this.handleBack }
            >支付</NavBar>
            <img src={imgSrc} alt="支付方式" width="100%"/>
        </div>
    }
}

Paying.contextTypes = {
    history: PropTypes.object
}

export default Paying;