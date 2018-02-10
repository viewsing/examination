import React, { Component } from 'react';
import { NavBar, Icon, Card, WhiteSpace, Badge, List, Flex, Modal, Toast } from 'antd-mobile';
import echometer from '../../img/echometer.png';
import PropTypes from 'prop-types';

const Item = List.Item;
const sexStatus = {
    'M': {
        name: '男',
        color: '#f96268'
    },
    'F': {
        name: '女',
        color: '#108ee9'
    },
    'A': {
        name: '所有',
        color: '#9790e5'
    }
}

class ExamItem extends Component {
    handleModal(){
        Modal.alert(this.props.itemName, this.props.desc);
    }
    render(){
        return <Item onClick = { () => this.handleModal() }>
            {this.props.ownKey + '. '}
            { this.props.itemName }
            <span style={{margin: '.5em', display: 'inline-block', textAlign: 'center' , width: '1em', height: '1em', fontSize: '.5em',lineHeight: '1em',backgroundColor:'#fff', color:'#30cfd6', border: '1px solid #30cfd6', borderRadius: '1em'}}>i</span>
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
            status: 0,
            suitAge: '',
            suitSex: '',
            fee: 1,
            branchCode: '',
            examinationCode: '',
            examinationName: '',
            desc: '平素健康人群，了解身体健康状况，及早发现潜在疾病'
        }
        this.handleBack = this.handleBack.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
    }
    componentDidMount(){
        this.context.axios({
            url: window.USERURL + 'examination/getExaminationDetail',
            data: this.props.match.params
        }).then( response => {
            if (response.data.resultCode == 0) {
                this.setState({
                    items: response.data.result.examinationDetail,
                    desc: response.data.result.desc,
                    status: 1,
                    suitAge: response.data.result.suitAge,
                    suitSex: response.data.result.suitSex,
                    fee: response.data.result.fee,
                    examinationName: response.data.result.examinationName,
                    branchCode: response.data.result.branchCode,
                    examinationCode: response.data.result.examinationCode,
                })
            } else if (response.data.resultCode == 1) {
                Toast.info('没有查询到相关数据', 2);
            } else if (response.data.resultCode == -1){
                Toast.info('系统错误，请与系统管理员联系', 2);
            }
        })
    }
    handleAppoint(){
        const username = sessionStorage.getItem('username');
        if (username) {
            this.context.history.push('/appointing/' + this.state.branchCode + '/' + this.state.examinationCode + '/' + this.state.examinationName);
        } else {
            this.context.history.push('/login');
        }
    }
    handleBack(){
        this.context.history.goBack();
    }
    renderHeader(){
        return <span>套餐项: <Badge text={this.state.items.length + '项'} hot/></span>
    }
    render() {
        return (
            this.state.status === 1 ? 
            <div>
                <NavBar icon={<Icon type="left"/>}
                onLeftClick = {this.handleBack }
            >套餐详情</NavBar>
                <Card full>
                    <Card.Header
                        title={<div><span>{this.state.examinationName}</span></div>}
                        thumb={echometer}
                        thumbStyle={{width:'4em',height:'4em'}}
                    />
                    <Card.Body>
                        <Badge text={'性别:' + sexStatus[this.state.suitSex].name} style={{ marginLeft: 12, padding: '0 3px', backgroundColor: '#16b4ff', borderRadius: 2 }}/>
                        <Badge text={'年龄:' + this.state.suitAge} style={{ marginLeft: 12, padding: '0 3px', backgroundColor: '#f19736', borderRadius: 2 }}/>
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
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    position: 'fixed',
                    width: '100%',
                    height: '3em',
                    fontSize: '1.5em',
                    lineHeight: '3em',
                    bottom: '0',
                    borderTop: '1px solid #30cfd6'
                }}>
                    <span style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                        <span style={{
                            color: '#ccc',
                            fontSize: '.6em',
                            lineHeight: '1.5em',
                            flexBasis: '5em'
                        }}>
                            {this.state.items.length + '个项目需要您自费'}
                        </span>
                        <span style={{
                            border: '1px solid #ccc',
                            height: '55%'
                        }}>

                        </span>
                        <span style={{
                            color: '#de4134'
                        }}>
                            ￥{this.state.fee}
                        </span>
                    </span>
                    <span 
                    onClick={ ()=> this.handleAppoint()}
                    style={{
                        padding: '0 1em',
                        color: '#fff',
                        backgroundColor: '#30cfd6'
                    }}>
                        立即预约
                    </span>
                </div>
            </div> : this.context.loading
        );
    }
}

ExamDetail.contextTypes = {
    history: PropTypes.object,
    axios: PropTypes.func,
    loading: PropTypes.object
}

export default ExamDetail;
