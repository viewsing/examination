import React, { Component } from 'react';
import { NavBar, Icon, WhiteSpace, WingBlank, Badge, Toast, Accordion, List } from 'antd-mobile';
import echometer from '../../img/echometer.png';
import PropTypes from 'prop-types';
import './ReportDetail.css'

const Abnormal = {
    0: '正常',
    1: '偏高',
    2: '偏低',
    3: '阳性'
}

class ReportDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            status: 0,
            detail: {}
        }
        this.handleBack = this.handleBack.bind(this);
    }
    componentDidMount(){
        this.context.axios({
            url: window.USERURL + 'examination/getReportDetail',
            data: this.props.match.params
        }).then( response => {
            if (response.data.resultCode == 0) {
                this.setState({
                    detail: response.data.result,
                    items: response.data.result.examinationDetail,
                    status: 1,
                })
            } else if (response.data.resultCode == 1) {
                Toast.info('没有查询到相关数据', 2);
            } else if (response.data.resultCode == -1){
                Toast.info('系统错误，请与系统管理员联系', 2);
            }
        })
    }
    handleBack(){
        this.context.history.goBack();
    }
    isFocus(itemName, focus){
        if (focus == 1) {
            return <span style={{
                color: '#e06252'
            }}>{itemName + '(重点关注)'}</span>
        } else {
            return itemName
        }
    }
    render() {
        let detail = this.state.detail;
        return (
            this.state.status === 1 ? 
            <div>
                <NavBar icon={<Icon type="left"/>}
                onLeftClick = {this.handleBack }
            >报告详情</NavBar>
                <div style={{overflow: 'auto'}}>
                    <List>
                        <List.Item key="0" extra={detail.branchName} > 医院名称: </List.Item>
                        <List.Item key="1" extra={detail.orderNo} > 订单号: </List.Item>
                        <List.Item key="2" extra={detail.regDate} > 体检日期: </List.Item>
                        <List.Item key="3" extra={detail.patName} > 患者姓名: </List.Item>
                        <List.Item key="4" extra={detail.patIdCard} > 身份证: </List.Item>
                        <List.Item key="5" extra={detail.examinationName} > 项目名称: </List.Item>
                        <List.Item key="6" extra={detail.itemTotal} > 项目总数: </List.Item>
                        <List.Item key="7" extra={detail.reportTime} > 生成时间: </List.Item>
                        <List.Item key="8" extra={detail.status == '0' ? '未体检' : '已体检'} > 状态: </List.Item>
                    </List>
                    <WhiteSpace/>
                    <WingBlank style={{fontSize: '17px'}}>子项目如下:</WingBlank>
                    <WhiteSpace/>
                    <Accordion>
                        {
                            this.state.items.map( (item, index) => {
                                return <Accordion.Panel header={this.isFocus(item.itemName, item.focus)} key={index}>
                                    <List>
                                        <List.Item key="0" wrap extra={item.doctorName} > 医生名称: </List.Item>
                                        <List.Item key="1" wrap extra={item.range} > 参考范围: </List.Item>
                                        <List.Item key="2" wrap extra={item.finding} > 检查所见: </List.Item>
                                        <List.Item key="3" wrap extra={item.result} > 结果: </List.Item>
                                        <List.Item key="4" wrap extra={Abnormal[item.abnormal]} > 异常提示: </List.Item>
                                        <List.Item key="5" wrap extra={item.advise} > 医生建议: </List.Item>
                                        <List.Item key="6" wrap extra={item.followUp} > 后续医疗: </List.Item>
                                        <List.Item key="7" wrap extra={item.mattersNeedAttention} > 注意事项: </List.Item>
                                    </List>
                                </Accordion.Panel>
                            })
                        }
                    </Accordion>
                </div>
            </div> : this.context.loading
        );
    }
}

ReportDetail.contextTypes = {
    history: PropTypes.object,
    axios: PropTypes.func,
    loading: PropTypes.object
}

export default ReportDetail;
