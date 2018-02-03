import React, {Component} from 'react';
import { NavBar, List } from 'antd-mobile';
import {Link} from 'react-router-dom';
import TabBar2 from '../TabBar2.js';
import PropTypes from 'prop-types';

class PersonalList extends Component {
    constructor(props) {
        super(props);
        this.handleLog = this.handleLog.bind(this);
    }
    handleLog(url) {
        this.context.history.push(url)
    }
    render() {
        return (
            <div>
                <NavBar
                 leftContent={<span onClick={ ()=>this.handleLog('/register') }>注册</span>}
                 rightContent={<span onClick={ ()=>this.handleLog('/login') }>登录</span>}
                >个人中心</NavBar>
                <List className="my-list">
                    <Link to="/personalInfo" ><List.Item arrow="horizontal" > 个人信息 </List.Item></Link>
                    <Link to="/examReport" ><List.Item arrow="horizontal" > 体检报告 </List.Item></Link>
                </List>
                <TabBar2/>
            </div>
        )
    }
}

PersonalList.contextTypes = {
    history: PropTypes.object
}

export default PersonalList;