import React, { Component } from 'react';
import { NavBar, Icon, WhiteSpace, Toast, Accordion, List } from 'antd-mobile';
import echometer from '../../img/echometer.png';
import PropTypes from 'prop-types';

class ReportDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            status: 0
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
                    items: response.data.result,
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
        return (
            this.state.status === 1 ? 
            <div>
                <NavBar icon={<Icon type="left"/>}
                onLeftClick = {this.handleBack }
            >报告详情</NavBar>
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
