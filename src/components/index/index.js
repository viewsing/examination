import React, {Component} from 'react';
import { NavBar, Picker, List, Icon, ActivityIndicator } from 'antd-mobile';
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
            pickerHospitals: []
        }
        this.showPicker = this.showPicker.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }
    componentWillMount() {
        axios.get(window.USERURL+'hospital/getHospitalInfo').then( response => {
            hospitals = response.data.result;
            var pickerHospitals = hospitals.map( (item, index) => {
                return {
                    label: hospitals[index].branchName,
                    data: hospitals[index].branchCode 
                }
            })
            this.setState({
                init: true,
                title: hospitals[0].branchName,
                pickerHospital: [hospitals[0].branchCode],
                pickerHospitals: pickerHospitals
            })
        })
    }
    showPicker() {
        this.setState({
          pickerVisible: true
        })
    }
    handleOk(val) {
        this.state.pickerHospitals.forEach((hospital, index) => {
            if (hospital.value === val[0]) {
            this.setState({
                pickerVisible: false,
                pickerHospital: [val],
                title: hospital.label
            })
            }
        })
    }
    render(){
        let itemKey = 0;
        return this.state.init ? 
        (<div>
            <NavBar mode="light"><span onClick={this.showPicker}>{this.state.title}</span><Icon type="down"/></NavBar>
            <img src={hospitalImg} alt="医院" width="100%"/>
            <List className="my-list">
                <List.Item extra={'extra content'}> <img src={level}/> 级别:</List.Item>
                <List.Item extra={'extra content'}> <img src={category}/> 类别:</List.Item>
                <List.Item extra={'extra content'}> <img src={telephone}/> 电话:</List.Item>
                <List.Item multipleLine={true} extra={'extra content'}> <img src={desc}/> 介绍:</List.Item>
                <List.Item extra={'extra content'}> <img src={location}/> 地址:</List.Item>
            </List>
            <Picker
            visible = {this.state.pickerVisible}
            title="选择医院"
            extra="请选择(必选)"
            cols={1}
            data={this.state.pickerHospitals}
            value={this.state.pickerHospital}
            onOk={this.handleOk}
            onDismiss={() => this.setState({ pickerVisible: false })}
            ></Picker>
        </div>) :  <div style={{ height: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}><ActivityIndicator size="large" /></div>  ;
    }
}

export default Index;