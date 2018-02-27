import React, {Component} from 'react';
import { NavBar, List, Icon, Toast } from 'antd-mobile';
import PropTypes from 'prop-types';

class Report extends Component {
    handleDetail(branchCode, reportCode){
        this.context.history.push('/reportDetail/' + branchCode + '/' + reportCode);
    }
    render (){
        const report = this.props.report;
        return <div onClick={ () => { this.handleDetail(report.branchCode, report.reportCode) }}>
            <div style={{
                margin: '1em 0',
                backgroundColor: '#fff',
                padding: '.5em',
                color: '#ccc'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 .5em', lineHeight: '1em'}}>
                    <p style={{
                        color: '#2a2b2c',
                        fontSize: '1.2em'
                    }}>{report.examinationName}</p>
                    <p>{report.branchName}</p>
                </div>
                <div style={{ margin: '0 .5em .5em'}}>
                    <span>姓名: </span>
                    <span>{report.patName}</span>
                </div>
                <div style={{ margin: '0 .5em .5em'}}>
                    <span>日期: </span>
                    <span>{report.regDate}</span>
                </div>
                <div style={{ margin: '0 .5em .5em'}}>
                    <span>子项目: </span>
                    <span>共{report.itemTotal}项</span>
                </div>
            </div>
        </div>
    }
}

Report.contextTypes = {
    history: PropTypes.object
}


class ExamReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: -1,
            reports: []
        }
        this.handleBack = this.handleBack.bind(this);
    }
    componentWillMount() {
        const username = sessionStorage.getItem('username');
        this.context.axios({
            url: window.USERURL + 'examination/getReportInfo',
            data: {
                branchCode: this.props.match.params.branchCode,
                username: username
            }
        }).then( response => {
            if (response.data.resultCode == 0) {
                this.setState({
                    status: 0,
                    reports: response.data.result
                })
            } else if (response.data.resultCode == 1) {
                this.setState({
                    status: 1
                })
            } else if (response.data.resultCode == -1){
                Toast.info('请求失败！请与系统管理员联系', 2)
            }
        })
    }
    handleBack(){
        this.context.history.goBack();
    }
    render(){
        let content;
        if (this.state.status == 0) {
            content = this.state.reports.map( (report, index) => {
                return <Report report={report} key={index} />
            })
        } else if (this.state.status == 1) {
            content = <div style={{textAlign: 'center'}}>未查询到体检报告</div>
        } else {
            content = this.context.loading
        }
        return <div>
            <NavBar icon={<Icon type="left"/>}
                onLeftClick = { this.handleBack }
            >体检报告</NavBar>
            {
                content
            }
        </div>
    }
}

ExamReport.contextTypes = {
    history: PropTypes.object,
    axios: PropTypes.func,
    loading: PropTypes.object
}

export default ExamReport;