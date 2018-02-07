import React, {Component} from 'react';
import { NavBar, Icon, Toast  } from 'antd-mobile';
import PropTypes from 'prop-types';

const payStatus = {
    0: {
        name: '未支付',
        color: '#f96268'
    },
    1: {
        name: '已支付',
        color: '#108ee9'
    },
    2: {
        name: '已退费',
        color: '#9790e5'
    }
}
const timeFlag = {
    1: '上午',
    3: '下午',
    4: '晚上'
}
class Order extends Component {
    render (){
        const order = this.props.order;
        return <div key={order.id}>
            <div></div>
            <div style={{
                margin: '1em 0',
                backgroundColor: '#fff',
                padding: '.5em',
                color: '#3a3a3ae6'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 .5em', lineHeight: '1em'}}>
                    <p style={{
                        color: '#2a2b2c',
                        fontSize: '1.2em'
                    }}>{order.branchName}</p>
                    <p style={{
                        color: payStatus[order.status].color,
                        fontSize: '1.2em'
                    }}>{payStatus[order.status].name}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.5em'}}>
                    <div>
                        <span>体检项目: </span>
                        <span>{order.examinationName}</span>
                    </div>
                    <div>
                        <span>￥{order.fee}元</span>
                    </div>
                </div>
                <div style={{marginBottom: '.5em'}}>
                    <span>预约日期: </span>
                    <span>{order.regDate}</span>
                </div>
                <div style={{marginBottom: '.5em'}}>
                    <span>预约时段: </span>
                    <span>{timeFlag[order.timeFlag] + ' ' + order.beginTime + '-' + order.endTime}</span>
                </div>
            </div>
        </div>
    }
}

class PersonalOrders extends Component {
    constructor(props){
        super(props);
        this.handleBack = this.handleBack.bind(this);
        this.state = {
            status: -1,
            orders: []
        }
    }
    componentWillMount() {
        const username = sessionStorage.getItem('username');
        this.context.axios({
            url: window.USERURL + 'examination/orders',
            data: {
                username: username
            }
        }).then( response => {
            if (response.data.resultCode == 0) {
                this.setState({
                    status: 0,
                    orders: response.data.result
                })
            } else if (response.data.resultCode == 1) {
                this.setState({
                    status: 1
                })
            } else {
                Toast.info('请求失败！请与系统管理员联系', 2)
            }
        })
    }
    handleBack() {
        this.context.history.goBack();
    }
    render() {
        let content;
        if (this.state.status == 0) {
            content = this.state.orders.map( order => {
                return <Order order={order} />
            })
        } else if (this.state.status == 1) {
            content = <div>未查询到订单</div>
        } else {
            content = this.context.loading
        }
        return (
            <div>
                <NavBar
                    icon={<Icon type="left"/>}
                    onLeftClick = { this.handleBack }
                >体检订单</NavBar>
                {
                    content
                }
            </div>
        )
    }
}

PersonalOrders.contextTypes = {
    history: PropTypes.object,
    axios: PropTypes.func,
    loading: PropTypes.object
}

export default PersonalOrders;