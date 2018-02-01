import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import { Link } from 'react-router-dom';
import createHashHistory from "history/createHashHistory"

import homePic from '../img/home.svg';
import homePicActive from '../img/home_active.svg';
import personalPic from '../img/personal.svg';
import personalPicActive from '../img/personal_active.svg';

const history = createHashHistory()
class TabBar2 extends Component {
    constructor(props) {
        super(props);
        console.log(window.location);
        this.state = {
            selectedTab: window.location.hash.indexOf('personal') > -1 ? 'personal' : 'index'
        }
    }
    handleRouter(url){
        history.push(url, {
            some: url
        })
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

export default TabBar2;