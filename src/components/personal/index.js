import React, {Component} from 'react';
import { NavBar, Drawer, List } from 'antd-mobile';

class Personal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.getPersonalInfo = this.getPersonalInfo.bind(this);
        this.getExaminationList = this.getExaminationList.bind(this);
        this.onOpenChange = this.onOpenChange.bind(this);
    }
    getPersonalInfo(){
        this.setState({
            open: true
        })
    }
    getExaminationList(){
        this.setState({
            open: true
        })
    }
    onOpenChange() {
        this.setState({
            open: false
        })
    }
    render() {
        return <div>
            <NavBar mode="light">个人中心</NavBar>
            <List className="my-list">
                <List.Item arrow="horizontal" onClick={this.getPersonalInfo} > 个人信息 </List.Item>
                <List.Item arrow="horizontal" onClick={this.getExaminationList} > 体检报告 </List.Item>
            </List>
            <Drawer
                className="my-drawer"
                style={{ minHeight: document.documentElement.clientHeight }}
                contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                sidebar='asdfasdf'
                open={this.state.open}
                onOpenChange={this.onOpenChange}
            >
            </Drawer>
        </div>
    }
}

export default Personal;