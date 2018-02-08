import React, { Component } from 'react';
import { NavBar, Icon, Card, WhiteSpace, Badge, List, Flex, Modal } from 'antd-mobile';
import echometer from '../../img/echometer.png';
import PropTypes from 'prop-types';

const Item = List.Item;

class ExamItem extends Component {
    handleModal(){
        Modal.alert(this.props.itemName, this.props.desc);
    }
    render(){
        return <Item onClick = { () => this.handleModal() }>
            {this.props.ownKey + '. '}
            { this.props.itemName }
            <span style={{margin: '.5em', display: 'inline-block', textAlign: 'center' , width: '1em', height: '1em', fontSize: '.5em',lineHeight: '1em',backgroundColor:'#fff', color:'rgb(48, 207, 214)', border: '1px solid rgb(48, 207, 214)', borderRadius: '1em'}}>i</span>
        </Item>
    }
}

class ExamDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            items: [
                { itemName:'血压', desc: '通过视、触、叩、听检查心、肺、肝、脾等重要脏器的基本状况，询问相关病史、家族史，发现常见疾病的相关征兆，或初步排除常见疾病。'},
                { itemName:'心电图', desc: '通过视、触、叩、听检查心、肺、肝、脾等重要脏器的基本状况，询问相关病史、家族史，发现常见疾病的相关征兆，或初步排除常见疾病。'},
                { itemName:'尿常规', desc: '通过视、触、叩、听检查心、肺、肝、脾等重要脏器的基本状况，询问相关病史、家族史，发现常见疾病的相关征兆，或初步排除常见疾病。'},
                { itemName:'空腹血糖', desc: '通过视、触、叩、听检查心、肺、肝、脾等重要脏器的基本状况，询问相关病史、家族史，发现常见疾病的相关征兆，或初步排除常见疾病。'}
            ],
            desc: '平素健康人群，了解身体健康状况，及早发现潜在疾病'
        }
        this.handleBack = this.handleBack.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
    }
    handleBack(){
        this.context.history.goBack();
    }
    renderHeader(){
        return <span>套餐项: <Badge text={this.state.items.length + '项'} hot/></span>
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
                    <Card.Footer content={this.state.desc} />
                </Card>
                <WhiteSpace size='lg'/>
                <List renderHeader={this.renderHeader}>
                    {
                        this.state.items.map( (item,index) => {
                            return <ExamItem key={index} ownKey={index+1} itemName={item.itemName} desc={item.desc} />
                        })
                    }
                </List>
                <div>

                </div>
            </div>
        );
    }
}

ExamDetail.contextTypes = {
    history: PropTypes.object
}

export default ExamDetail;
