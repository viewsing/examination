import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types';

import homePic from '../img/home.svg';
import homePicActive from '../img/home_active.svg';
import personalPic from '../img/personal.svg';
import personalPicActive from '../img/personal_active.svg';

class TabBar2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: window.location.hash.indexOf('personal') > -1 ? 'personal' : 'index'
        },
        this.handleRouter = this.handleRouter.bind(this);
    }
    handleRouter(url){
        this.context.history.push(url)
    }
    render(){
        return <div style={{ position: 'fixed',width: '100%', bottom: 0 }}>
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
                onPress={ ()=>{
                    this.handleRouter('/')
                } }
                data-seed="logId"
                />

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
                onPress={ ()=>{
                    this.handleRouter('/personalList')
                } }
                data-seed="logId"
                />

            </TabBar>
        </div>
    }
}

TabBar2.contextTypes = {
    history: PropTypes.object
}

export default TabBar2;