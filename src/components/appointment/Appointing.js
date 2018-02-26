import React, {Component} from 'react';
import { NavBar, List, Icon, Calendar, SegmentedControl, WhiteSpace, WingBlank, Button, Toast, Modal } from 'antd-mobile';
import PropTypes from 'prop-types';
import zhifubao from '../../img/zhifubao.png';
import weixin from '../../img/weixin.png';
import yinlian from '../../img/yinlian.png';

const now = new Date();
const timeSements = ['08:00-10:00', '10:00-12:00', '13:00-15:00', '15:00-17:00', '19:00-21:00'];
const timeFlag = {
    0: 1,
    1: 3,
    2: 4
}
let timeSement = '08:00-10:00';
let orderNo;

function PayType (props) {
    return <div>
        <img src={props.imgSrc} alt="支付方式"/>
        <p style={{
            margin: '.5em',
            color: '#222',
            fontSize: '1.2em'
        }}>￥{props.fee}</p>
    </div>
}

class Appointing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calendarShow: false,
            regDate: now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDate(),
            timeFlagIndex: 0,
            tradeMode: 0,
            examinationName: this.props.match.params.examinationName,
            branchCode: this.props.match.params.branchCode,
            examinationCode: this.props.match.params.examinationCode,
            time: [timeSements[0], timeSements[1]]
        }
        this.handleBack = this.handleBack.bind(this);
        this.handleCalendar = this.handleCalendar.bind(this);
        this.onTimeFlagChange = this.onTimeFlagChange.bind(this);
        this.onTradeModeChange = this.onTradeModeChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handlePay = this.handlePay.bind(this);
    }
    handleBack(){
        this.context.history.goBack();
    }
    handleCalendar(date){
        this.setState({
            calendarShow: false,
            regDate: date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
        })
    }
    onTradeModeChange(val) {
        let ret;
        switch(val) {
            case '银联':
                ret = 0;
            break;
            case '微信':
                ret = 1;
            break;
            case '支付宝':
                ret = 2;
            break;
        }
        this.setState({
            tradeMode: ret
        })
    }
    onTimeFlagChange(val) {
        if (val === '上午') {
            this.setState({
                timeFlagIndex: 0,
                time: [timeSements[0], timeSements[1]]
            })
        } else if (val === '下午'){
            this.setState({
                timeFlagIndex: 1,
                time: [timeSements[2], timeSements[3]]
            })
        } else {
            this.setState({
                timeFlagIndex: 2,
                time: [timeSements[4]]
            })
        }
    }
    handlePay(){
        return  new Promise((resolve) => {
            Toast.info('正在支付...', 7);
            this.context.axios({
                url: window.USERURL + 'examination/preExaminationPay',
                data: {
                    orderNo: orderNo
                }
            }).then( response => {
                if (response.data.resultCode == 0) {
                    Toast.info('支付成功', 1.5, () => {
                        resolve();
                        this.context.history.replace('/payResult')
                    });
                } else {
                    Toast.info('支付失败,请联系系统管理员', 2, () => {
                        resolve();
                    })
                }
            })
        })
    }
    onTimeChange(val) {
        timeSement = val;
    }
    onSubmit(){
        Toast.info('正在提交', 7);
        this.context.axios({
            url: window.USERURL +  'examination/preExamination',
            data: {
                tradeMode: this.state.tradeMode + 1,
                username: sessionStorage.getItem('username'),
                branchCode: this.state.branchCode,
                examinationCode: this.state.examinationCode,
                examinationName: this.state.examinationName,
                regDate: this.state.regDate,
                timeFlag: timeFlag[this.state.timeFlagIndex],
                beginTime: timeSement.split('-')[0],
                endTime: timeSement.split('-')[1]
            }
        }).then( response => {
            if (response.data.resultCode == 0) {
                orderNo = response.data.result.orderNo;
                Toast.info('准备付款...', 1, () => {
                    let imgSrc;
                    if(this.state.tradeMode == 0) {
                        imgSrc = yinlian;
                    } else if (this.state.tradeMode == 1) {
                        imgSrc = weixin;
                    } else {
                        imgSrc = zhifubao;
                    }
                    Modal.alert('付款', <PayType imgSrc={imgSrc} fee={response.data.result.fee} />, [
                        { text: '取消'},
                        { text: '确定', onPress: this.handlePay},
                    ])
                })
            } else if (response.data.resultCode == -1){
                Toast.info('系统错误，请与系统管理员联系', 2)
            }
        })
    }
    render(){
        return <div>
            <NavBar icon={<Icon type="left"/>}
                onLeftClick = { this.handleBack }
            >预约</NavBar>
            <List>
                <WhiteSpace/>
                <WingBlank><div style={{fontSize: '17px', lineHeight: 1.5, padding: '7px 0'}}>支付方式:</div></WingBlank>
                <List.Item key="0">
                    <SegmentedControl
                        tintColor="#f96268"
                        selectedIndex={this.state.tradeMode}
                        values={['银联', '微信', '支付宝']}
                        onValueChange={this.onTradeModeChange}
                    />
                </List.Item>
                <List.Item key="1" extra={this.state.examinationName}>
                    套餐:
                </List.Item>
                <List.Item key="2" arrow="horizontal"
                    extra={this.state.regDate}
                    onClick={() => {
                        document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
                        this.setState({
                            calendarShow: true,
                        });
                    }}
                >
                    选择日期:
                </List.Item>
                <List.Item key="3">
                    <SegmentedControl
                        selectedIndex = {this.state.timeFlagIndex}
                        values={['上午', '下午', '晚上']}
                        onValueChange={this.onTimeFlagChange}
                    />
                </List.Item>
                <List.Item key="4">
                    <SegmentedControl
                        values={this.state.time}
                        onValueChange={this.onTimeChange}
                    />
                </List.Item>
                <WhiteSpace size="lg"/>
                <List.Item key="5">
                    <Button type="primary" onClick={this.onSubmit}>提交</Button>
                </List.Item>
            </List>
            <Calendar
            type="one"
            visible={this.state.calendarShow}
            defaultDate={ new Date(this.state.regDate) }
            minDate={new Date(+now - 5184000000)}
            maxDate={new Date(+now + 31536000000)}
            onConfirm={this.handleCalendar}
            onCancel={()=>this.setState({calendarShow: false})}
            />
        </div>
    }
}

Appointing.contextTypes = {
    history: PropTypes.object,
    axios: PropTypes.func
}

export default Appointing;