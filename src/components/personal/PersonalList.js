import React, {Component} from 'react';
import { NavBar, List } from 'antd-mobile';
import {Link} from 'react-router-dom';
import TabBar2 from '../TabBar2.js';

class PersonalList extends Component {
    render() {
        return (
            <div>
                <NavBar>个人中心</NavBar>
                <List className="my-list">
                    <Link to="/personalInfo" ><List.Item arrow="horizontal" > 个人信息 </List.Item></Link>
                    <Link to="/examReport" ><List.Item arrow="horizontal" > 体检报告 </List.Item></Link>
                </List>
                <TabBar2/>
            </div>
        )
    }
}

export default PersonalList;