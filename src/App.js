import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
// import { HashRouter as Router, Route, Link } from 'react-router-dom';

//tabbar图标
import homePic from './img/home.svg';
import homePicActive from './img/home_active.svg';
import personalPic from './img/personal.svg';
import personalPicActive from './img/personal_active.svg';

import Personal from './components/personal';
import Index from './components/index';
import './App.css';

class App extends Component {
  constructor(props){
      super(props);
      this.state = {
          selectedTab: 'index'
      }
  }
  renderContent(page) {
      if (page === 'index') {
          return <Index/>
      } else {
          return <Personal/>
      }
  }
  render() {
    return (
        <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
            <TabBar>
                
                <TabBar.Item
                title="首页"
                key="Life"
                icon={
                    <div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url('+ homePic +') center center /  21px 21px no-repeat' }}
                    />
                }
                selectedIcon={
                    <div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url('+ homePicActive +') center center /  21px 21px no-repeat' }}
                    />
                }
                selected={this.state.selectedTab === 'index'}
                onPress={ () => this.setState({selectedTab: 'index'}) }
                data-seed="logId"
                >
                    {this.renderContent('index')}
                </TabBar.Item>

                <TabBar.Item
                title="我"
                key="Life"
                icon={
                    <div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url('+ personalPic +') center center /  21px 21px no-repeat' }}
                    />
                }
                selectedIcon={
                    <div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url('+ personalPicActive +') center center /  21px 21px no-repeat' }}
                    />
                }
                selected={this.state.selectedTab === 'personal'}
                onPress={ () => this.setState({selectedTab: 'personal'}) }
                data-seed="logId">
                    {this.renderContent('personal')}
                </TabBar.Item>

            </TabBar>
        </div>
    );
  }
}

export default App;
