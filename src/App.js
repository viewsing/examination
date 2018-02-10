import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Toast, ActivityIndicator} from 'antd-mobile';

import Index from './components/index';
import PersonalList from './components/personal/PersonalList.js'
import PersonalInfo from './components/personal/PersonalInfo.js'
import ExamReport from './components/appointment/ExamReport.js';
import Appointment from './components/appointment';
import Register from './components/login/register.js';
import Login from './components/login/login.js';
import PersonalOrders from './components/personal/PersonalOrders.js';
import './App.css';
import axios from 'axios';
import createHashHistory from "history/createHashHistory";
import ExamDetail from './components/appointment/ExamDetail.js';
import Appointing from './components/appointment/Appointing.js';
import PayResult from './components/appointment/PayResult.js';
import ReportDetail from './components/appointment/ReportDetail.js';


const axiosInstance = axios.create();
//全局请求头，请求方法配置
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.request.use(function (config) {
    config.method = 'get';
    return config;
});

//全局登录控制，如果resultCode为3则跳转至登录页面
axiosInstance.interceptors.response.use(function (response) {
    if (response.data.resultCode == 3) {
        history.push('/login')
    } else if (response.data.resultCode == 2) {
        Toast.info(response.data.resultDesc);
    }
    return response;
}, function (error) {
    Toast.info('服务器异常！请与系统管理员联系!', 2)
});

const history = createHashHistory()

class App extends Component {
    getChildContext(){
        return {
            history: history,
            axios: axiosInstance,
            loading: <div style={{ position: 'fixed', left: '49%', top: '49%' }}><ActivityIndicator size="large" /></div>
        }
    }
    render() {
        return (
            <Router >
                <div style={{height: '100%'}}>
                    <Redirect from="/" to="/index" /> 
                    {/* <Route path="/" children={({ match, ...rest }) => (
                        <Container>
                            {match && <Something {...rest}/>}
                        </Container>
                    )}/>  */}
                    <Route exact path="/index" component={Index}/>
                    <Route path="/personalList" component={PersonalList}/>
                    <Route path="/personalInfo" component={PersonalInfo}/>
                    <Route path="/examReport" component={ExamReport}/>
                    <Route path="/appointment/:branchCode" component={Appointment}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/orders" component={PersonalOrders}/>
                    <Route path="/examDetail/:branchCode/:examinationCode" component={ExamDetail}/>
                    <Route path="/reportDetail/:branchCode/:reportCode" component={ReportDetail}/>
                    <Route path="/appointing/:branchCode/:examinationCode/:examinationName" component={Appointing}/>
                    <Route path="/payResult" component={PayResult}/>
                </div>
            </Router>
        );
    }
}

App.childContextTypes = {
    history: PropTypes.object,
    axios: PropTypes.func,
    loading: PropTypes.object
}
export default App;
