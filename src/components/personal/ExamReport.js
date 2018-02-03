import React, {Component} from 'react';
import { NavBar, List, Icon } from 'antd-mobile';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class ExamReport extends Component {
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
            >体检报告</NavBar>
        </div>
    }
}

ExamReport.contextTypes = {
    history: PropTypes.object
}

export default ExamReport;