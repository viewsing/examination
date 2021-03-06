import React, {Component} from 'react';
import { NavBar, Picker, List, Icon, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import { Link } from 'react-router-dom';
import TabBar2 from '../TabBar2.js';
import PropTypes from 'prop-types';

import hospitalImg from '../../img/hospital.jpg';
import level from '../../img/level.svg';
import category from '../../img/category.svg';
import telephone from '../../img/telephone.svg';
import desc from '../../img/desc.svg';
import location from '../../img/location.svg';

let hospitals
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickerVisible: false,
            init: false,
            title: '',
            pickerHospital: '',
            pickerHospitals: [],
            others: {}
        }
        this.showPicker = this.showPicker.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }
    componentWillMount() {
        this.context.axios({
            url: window.USERURL+'hospital/getHospitalInfo'
        }).then( response => {
            if (response.data.resultCode == 0) {
                hospitals = response.data.result;
                var pickerHospitals = [];
                hospitals.forEach( (item, index) => {
                    pickerHospitals.push({
                        label: item.branchName,
                        value: item.branchCode,
                        others: item
                    });
                })
                this.setState({
                    init: true,
                    title: hospitals[0].branchName,
                    pickerHospital: [hospitals[0].branchCode],
                    pickerHospitals: pickerHospitals,
                    others: hospitals[0]
                })
            } else if (response.data.resultCode == -1){
                Toast.info('请求失败！请与系统管理员联系', 2)
            }
        })
    }
    showPicker() {
        this.setState({
          pickerVisible: true
        })
    }
    handleGo(path) {
        const username = sessionStorage.getItem('username');
        if (path === '/examReport') {
            if (!username) {
                this.context.history.push('/login');
                return;
            }
        }
        this.context.history.push(path + '/' + this.state.pickerHospital[0]);
    }
    handleOk(val) {
        this.state.pickerHospitals.forEach((hospital, index) => {
            if (hospital.value === val[0]) {
                this.setState({
                    pickerVisible: false,
                    pickerHospital: val,
                    title: hospital.label,
                    others: hospital.others
                })
            }
        })
    }
    render(){
        return this.state.init ? 
        (<div>
            <NavBar><span onClick={this.showPicker}>{this.state.title}</span><Icon type="down"/></NavBar>
            <img src={ window.developing ? hospitalImg : this.state.others.picUrl} alt="医院" height='200px' width="100%"/>
            <List className="my-list">
                <List.Item extra={this.state.others.levle}> <img src={level} alt="level"/> 级别:</List.Item>
                <List.Item extra={this.state.others.category}> <img src={category} alt="category" /> 类别:</List.Item>
                <List.Item extra={this.state.others.telephone}> <img src={telephone} alt="telephone" /> 电话:</List.Item>
                <List.Item wrap extra={this.state.others.desc}> <img src={desc} alt="desc" /> 介绍:</List.Item>
                <List.Item wrap extra={this.state.others.location}> <img src={location} alt="location" /> 地址:</List.Item>
            </List>
            <Picker
            visible = {this.state.pickerVisible}
            title="选择医院"
            cols={1}
            data={this.state.pickerHospitals}
            value={this.state.pickerHospital}
            onOk={this.handleOk}
            onDismiss={() => this.setState({ pickerVisible: false })}
            ></Picker>
            <WhiteSpace/>
            <WingBlank style={{
                display: 'flex',
                justifyContent: 'space-around'
            }}>
                <Button type="primary" inline onClick={ () => {this.handleGo('/appointment')} } >预约体检</Button>
                <Button type="ghost" inline  onClick={ () => {this.handleGo('/examReport')} } >报告查询</Button>
            </WingBlank>
            <WhiteSpace size='xl'/>
            <WhiteSpace size='xl'/>
            <WhiteSpace size='xl'/>
            <TabBar2/>
        </div>) : this.context.loading;
    }
}

Index.contextTypes = {
    history: PropTypes.object,
    axios: PropTypes.func,
    loading: PropTypes.object
}

export default Index;