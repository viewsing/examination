import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Index from './components/index';
import PersonalList from './components/personal/PersonalList.js'
import PersonalInfo from './components/personal/PersonalInfo.js'
import ExamReport from './components/appointment/ExamReport.js';
import Appointment from './components/appointment';
import Register from './components/login/register.js';
import Login from './components/login/login.js';
import PersonalOrders from './components/personal/PersonalOrders.js';
import './App.css';

import createHashHistory from "history/createHashHistory"
const history = createHashHistory()

class App extends Component {
    getChildContext(){
        return {
            history: history
        }
    }
    render() {
        return (
            <Router >
                <div style={{height: '100%'}}>
                    <Route exact path="/" component={Index}/>
                    <Route path="/personalList" component={PersonalList}/>
                    <Route path="/personalInfo" component={PersonalInfo}/>
                    <Route path="/examReport" component={ExamReport}/>
                    <Route path="/appointment" component={Appointment}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/orders" component={PersonalOrders}/>
                </div>
            </Router>
        );
    }
}

App.childContextTypes = {
    history: PropTypes.object
}
export default App;
