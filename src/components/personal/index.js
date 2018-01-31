import React, {Component} from 'react';
import { NavBar, List } from 'antd-mobile';
import './index.css';

class Personal extends Component {
    render() {
        return <div>
            <NavBar mode="light">个人中心</NavBar>
            <List className="my-list">
                <List.Item arrow="horizontal" > 个人信息 </List.Item>
                <List.Item arrow="horizontal" > 体检报告 </List.Item>
            </List>
        </div>
    }
}

export default Personal;