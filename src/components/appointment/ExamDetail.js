import React, { Component } from 'react';
import { NavBar, Icon, Card, WhiteSpace, Badge, List, Flex } from 'antd-mobile';
import echometer from '../../img/echometer.png';
import PropTypes from 'prop-types';

const Item = List.Item;
class ExamDetail extends Component {
    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
    }
    handleBack(){
        this.context.history.goBack();
    }
    render() {
        return (
            <div>
                <NavBar icon={<Icon type="left"/>}
                onLeftClick = {this.handleBack }
            >套餐详情</NavBar>
                <Card full>
                    <Card.Header
                        title={<div><Badge text="男" style={{ marginLeft: 12, padding: '0 3px', backgroundColor: '#16b4ff', borderRadius: 2 }}/><span> 青年套餐</span></div>}
                        thumb={echometer}
                        thumbStyle={{width:'4em',height:'4em'}}
                    />
                    <Card.Body>
                        <Badge text="了解健康" style={{ marginLeft: 12, padding: '0 3px', backgroundColor: '#f19736', borderRadius: 2 }}/>
                        <Badge text="年轻必备" style={{ marginLeft: 12, padding: '0 3px', backgroundColor: '#21b68a', borderRadius: 2 }} />
                    </Card.Body>
                    <Card.Footer content='平素健康人群，了解身体健康状况，及早发现潜在疾病'/>
                </Card>
                <WhiteSpace size='lg'/>
                <List>
                    <Item>1. 身高、体重
                        <span style={{margin: '.5em', display: 'inline-block', textAlign: 'center' , width: '1em', height: '1em', fontSize: '.5em',lineHeight: '1em',backgroundColor:'#fff', color:'rgb(48, 207, 214)', border: '1px solid rgb(48, 207, 214)', borderRadius: '1em'}}>i</span>
                    </Item>
                    <Item>2. 血压
                        <span style={{margin: '.5em', display: 'inline-block', textAlign: 'center' , width: '1em', height: '1em', fontSize: '.5em',lineHeight: '1em',backgroundColor:'#fff', color:'rgb(48, 207, 214)', border: '1px solid rgb(48, 207, 214)', borderRadius: '1em'}}>i</span>
                    </Item>
                    <Item>3. 心电图
                        <span style={{margin: '.5em', display: 'inline-block', textAlign: 'center' , width: '1em', height: '1em', fontSize: '.5em',lineHeight: '1em',backgroundColor:'#fff', color:'rgb(48, 207, 214)', border: '1px solid rgb(48, 207, 214)', borderRadius: '1em'}}>i</span>
                    </Item>
                    <Item>4. 尿常规
                        <span style={{margin: '.5em', display: 'inline-block', textAlign: 'center' , width: '1em', height: '1em', fontSize: '.5em',lineHeight: '1em',backgroundColor:'#fff', color:'rgb(48, 207, 214)', border: '1px solid rgb(48, 207, 214)', borderRadius: '1em'}}>i</span>
                    </Item>
                    <Item>5. 空腹血糖
                        <span style={{margin: '.5em', display: 'inline-block', textAlign: 'center' , width: '1em', height: '1em', fontSize: '.5em',lineHeight: '1em',backgroundColor:'#fff', color:'rgb(48, 207, 214)', border: '1px solid rgb(48, 207, 214)', borderRadius: '1em'}}>i</span>
                    </Item>
                    <Item>6. 糖化血红蛋白
                        <span style={{margin: '.5em', display: 'inline-block', textAlign: 'center' , width: '1em', height: '1em', fontSize: '.5em',lineHeight: '1em',backgroundColor:'#fff', color:'rgb(48, 207, 214)', border: '1px solid rgb(48, 207, 214)', borderRadius: '1em'}}>i</span>
                    </Item>
                    <Item>7.
                    <Badge text='前列腺癌' 
                    style={{backgroundColor: '#fff', color: 'rgb(224,84,70)', border: '1px solid rgb(224,84,70)', borderRadius: '10px', margin: '0 5px'}}/>
                    tPSA <span style={{margin: '.5em', display: 'inline-block', textAlign: 'center' , width: '1em', height: '1em', fontSize: '.5em',lineHeight: '1em',backgroundColor:'#fff', color:'rgb(48, 207, 214)', border: '1px solid rgb(48, 207, 214)', borderRadius: '1em'}}>i</span>
                    </Item>
                </List>
                <div></div>
            </div>
        );
    }
}

ExamDetail.contextTypes = {
    history: PropTypes.object
}

export default ExamDetail;
