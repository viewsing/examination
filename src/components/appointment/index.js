import React, {Component} from 'react';
import { NavBar, Icon, Toast } from 'antd-mobile';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

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

class Exam extends Component {
    handleDetail(branchCode, examinationCode){
        this.context.history.push('/examDetail/' + branchCode + '/' + examinationCode);
    }
    render (){
        const exam = this.props.exam;
        return <div key={exam.id} onClick={ () => { this.handleDetail(exam.branchCode, exam.examinationCode) }}>
            <div></div>
            <div style={{
                margin: '1em 0',
                backgroundColor: '#fff',
                padding: '0 .5em .5em',
                color: '#ccc'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 .5em', lineHeight: '1em'}}>
                    <p style={{
                        color: '#2a2b2c',
                        fontSize: '1.2em'
                    }}>{exam.examinationName}</p>
                    <p style={{
                        color: '#f96268',
                        fontSize: '1.2em'
                    }}>￥{exam.fee}元</p>
                </div>
                <div style={{ marginBottom: '.5em'}}>
                    <span>适合年龄: </span>
                    <span>{exam.suitAge}</span>
                </div>
                <div style={{ marginBottom: '.5em'}}>
                    <span>性别: </span>
                    <span>{sexStatus[exam.suitSex].name}</span>
                </div>
                <div style={{ marginBottom: '.5em'}}>
                    <span>描述: </span>
                    <span>{exam.desc}</span>
                </div>
            </div>
        </div>
    }
}

Exam.contextTypes = {
    history: PropTypes.object
}

class Appointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: -1,
            exams: []
        }
        this.handleBack = this.handleBack.bind(this);
    }
    componentWillMount() {
        const username = sessionStorage.getItem('username');
        this.context.axios({
            url: window.USERURL + 'examination/getExaminationInfo',
            data: {
                branchCode: this.props.match.params.branchCode
            }
        }).then( response => {
            if (response.data.resultCode == 0) {
                this.setState({
                    status: 0,
                    exams: response.data.result
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
            content = this.state.exams.map( (exam, index) => {
                return <Exam exam={exam} key={index} />
            })
        } else if (this.state.status == 1) {
            content = <div style={{textAlign: 'center'}}>未查询到体检项目</div>
        } else {
            content = this.context.loading
        }
        return <div>
            <NavBar icon={<Icon type="left"/>}
                onLeftClick = {this.handleBack }
            >体检套餐</NavBar>
            {
                content
            }
        </div>
    }
}

Appointment.contextTypes = {
    history: PropTypes.object,
    axios: PropTypes.func,
    loading: PropTypes.object
}

export default Appointment;