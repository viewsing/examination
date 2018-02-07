import React, {Component} from 'react';
import { NavBar, List, SegmentedControl, Modal } from 'antd-mobile';
import TabBar2 from '../TabBar2.js';
import PropTypes from 'prop-types';

const timeSement = ['08:00-10:00', '10:00-12:00', '13:00-15:00', '15:00-17:00', '19:00-21:00'];
class PersonalList extends Component {
    constructor(props) {
        super(props);
        this.handleLog = this.handleLog.bind(this);
        this.onTimeFlagChange = this.onTimeFlagChange.bind(this);
        this.state = {
            selectedIndex: 0,
            time: [timeSement[0], timeSement[1]]
        }
    }
    onTimeFlagChange(val) {
        if (val === '上午') {
            this.setState({
                selectedIndex: 0,
                time: [timeSement[0], timeSement[1]]
            })
        } else if (val === '下午'){
            this.setState({
                selectedIndex: 1,
                time: [timeSement[2], timeSement[3]]
            })
        } else {
            this.setState({
                selectedIndex: 2,
                time: [timeSement[4]]
            })
        }
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
                        self.context.history.push('/');
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
                <SegmentedControl
                    selectedIndex = {this.state.selectedIndex}
                    values={['上午', '下午', '晚上']}
                    onValueChange={this.onTimeFlagChange}
                />
                <SegmentedControl
                    style = {{
                        marginTop: '1em'
                    }}
                    values={this.state.time}
                />
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