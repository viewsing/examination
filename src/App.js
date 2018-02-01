import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Index from './components/index';
import PersonalList from './components/personal/PersonalList.js'
import PersonalInfo from './components/personal/PersonalInfo.js'
import ExamReport from './components/personal/ExamReport.js';
import Appointment from './components/appointment';
import './App.css';

class App extends Component {
  render() {
    return (
        <Router >
            <div style={{height: '100%'}}>
                <Route exact path="/" component={Index}/>
                <Route path="/personalList" component={PersonalList}/>
                <Route path="/personalInfo" component={PersonalInfo}/>
                <Route path="/examReport" component={ExamReport}/>
                <Route path="/appointment" component={Appointment}/>
            </div>
        </Router>
    );
  }
}

export default App;
