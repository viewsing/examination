import React, {Component} from 'react';
import { NavBar, List, SegmentedControl, Modal } from 'antd-mobile';
import TabBar2 from '../TabBar2.js';
import PropTypes from 'prop-types';

class PersonalList extends Component {
    constructor(props) {
        super(props);
        this.handleLog = this.handleLog.bind(this);
    }
    handleLog(url) {
        const username = sessionStorage.getItem('username');
        if (url === '/personalInfo' || url === '/orders') {
            if (!username) {
                this.context.history.push('/login');
                return;
            }
        }
        this.context.history.push(url)
    }
    handleLogout() {
        const self = this;
        Modal.alert('注销', '确定退出当前帐号?', [
            { text: '取消', style: 'default' },
            { text: '确定', onPress: () => {
                self.context.axios({
                    url: window.USERURL + 'user/logout'
                }).then( response => {
                    if ( response.data.resultCode == 0 ) {
                        sessionStorage.clear();
                        self.context.history.push('/index');
                    }
                })
            } },
        ]);
    }
    render() {
        const username = sessionStorage.getItem('username');
        return (
            <div>
                <NavBar
                 leftContent={
                     username ? <span onClick={ ()=>this.handleLogout() }>注销</span> :
                     <span onClick={ ()=>this.handleLog('/register') }>注册</span>
                 }
                 rightContent={ !username && <span onClick={()=>this.handleLog('/login')}>登录</span>}
                >个人中心</NavBar>
                <List className="my-list">
                    <List.Item arrow="horizontal" onClick={ ()=>this.handleLog('/personalInfo') } > 个人信息 </List.Item>
                    <List.Item arrow="horizontal" onClick={ ()=>this.handleLog('/orders') } > 体检订单 </List.Item>
                </List>
                <TabBar2/>
            </div>
        )
    }
}

PersonalList.contextTypes = {
    history: PropTypes.object,
    axios: PropTypes.func
}

export default PersonalList;