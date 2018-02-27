import React, { Component } from 'react';
import { NavBar, Icon, WhiteSpace, WingBlank, Toast, Accordion, List } from 'antd-mobile';
import echometer from '../../img/echometer.png';
import PropTypes from 'prop-types';
import './ReportDetail.css'

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
                        <List.Item extra={detail.branchName} > 医院名称: </List.Item>
                        <List.Item extra={detail.orderNo} > 订单号: </List.Item>
                        <List.Item extra={detail.regDate} > 体检日期: </List.Item>
                        <List.Item extra={detail.patName} > 患者姓名: </List.Item>
                        <List.Item extra={detail.patIdCard} > 身份证: </List.Item>
                        <List.Item extra={detail.examinationName} > 项目名称: </List.Item>
                        <List.Item extra={detail.itemTotal} > 项目总数: </List.Item>
                        <List.Item extra={detail.reportTime} > 生成时间: </List.Item>
                        <List.Item extra={detail.status} > 状态: </List.Item>
                    </List>
                    <WhiteSpace/>
                    <WingBlank style={{fontSize: '17px'}}>子项目如下:</WingBlank>
                    <WhiteSpace/>
                    <Accordion>
                        {
                            this.state.items.map( (item, index) => {
                                return <Accordion.Panel header={item.itemName}>
                                    <List>
                                        <List.Item extra={item.doctorName} > 医生名称: </List.Item>
                                        <List.Item extra={item.range} > 参考范围: </List.Item>
                                        <List.Item extra={item.result} > 结果: </List.Item>
                                        <List.Item extra={item.abnormal} > 结果异常: </List.Item>
                                        <List.Item extra={item.advise} > 医生建议: </List.Item>
                                        <List.Item extra={item.followUp} > 后续医疗: </List.Item>
                                        <List.Item extra={item.mattersNeedAttention} > 注意事项: </List.Item>
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
