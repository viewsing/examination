import React, {Component} from 'react';
import { NavBar, List, Icon } from 'antd-mobile';
import PropTypes from 'prop-types';

class PersonalOrders extends Component {
    constructor(props){
        super(props);
        this.handleBack = this.handleBack.bind(this);
    }
    handleBack() {
        this.context.history.goBack();
    }
    render() {
        return (
            <div>
                <NavBar
                    icon={<Icon type="left"/>}
                    onLeftClick = { this.handleBack }
                >体检订单</NavBar>
                <List className="my-list">
                    <List.Item> 订单1 </List.Item>
                    <List.Item> 订单2 </List.Item>
                </List>
            </div>
        )
    }
}

PersonalOrders.contextTypes = {
    history: PropTypes.object
}

export default PersonalOrders;