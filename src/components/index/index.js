import React, {Component} from 'react';
import { NavBar, Picker, List, Icon, ActivityIndicator, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import { Link } from 'react-router-dom';
import TabBar2 from '../TabBar2.js';
import axios from 'axios';

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
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
        axios.get(window.USERURL+'hospital/getHospitalInfo').then( response => {
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
        })
    }
    showPicker() {
        this.setState({
          pickerVisible: true
        })
    }
    handleChange(val) {
        console.log(val)
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
                <List.Item extra={this.state.others.levle}> <img src={level}/> 级别:</List.Item>
                <List.Item extra={this.state.others.category}> <img src={category}/> 类别:</List.Item>
                <List.Item extra={this.state.others.telephone}> <img src={telephone}/> 电话:</List.Item>
                <List.Item wrap extra={this.state.others.desc}> <img src={desc}/> 介绍:</List.Item>
                <List.Item wrap extra={this.state.others.location}> <img src={location}/> 地址:</List.Item>
            </List>
            <Picker
            visible = {this.state.pickerVisible}
            title="选择医院"
            // onChange={ this.handleChange }
            cols={1}
            data={this.state.pickerHospitals}
            value={this.state.pickerHospital}
            onOk={this.handleOk}
            onDismiss={() => this.setState({ pickerVisible: false })}
            ></Picker>
            <WhiteSpace/>
            <WingBlank>
                <Link to="appointment">
                    <Button type="primary">预约体检</Button>
                </Link>
            </WingBlank>
            <WhiteSpace size='xl'/>
            <WhiteSpace size='xl'/>
            <WhiteSpace size='xl'/>
            <TabBar2/>
        </div>) :  <div style={{ height: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}><ActivityIndicator size="large" /></div>  ;
    }
}

export default Index;