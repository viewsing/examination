import React, {Component} from 'react';
import { NavBar, List, Icon, Toast, InputItem, Radio, Button, DatePicker } from 'antd-mobile';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { createForm } from 'rc-form';
import axios from 'axios';

class PersonalInfoForm extends Component {
    state = {
        value: 1,
        radioData: [
            { value: 'M', label: '男' },
            { value: 'F', label: '女' },
        ],
        patSex: 'M'
    }
    onSubmit = () => {
        this.props.form.validateFields({ force: true }, (error) => {
            const params = this.props.form.getFieldsValue();
            if (!error) {
                Toast.info('注册中...', 7)
                axios.get(window.USERURL + 'user/registry',{
                    params: params
                }).then( response => {
                    Toast.hide();
                    if (response.data.resultCode == 0) {
                        Toast.info('注册成功', 1, () => {
                            this.context.history.push('/personalInfo')
                        })
                    } else {
                        Toast.info('注册失败！请与系统管理员联系')
                    }
                })
            } else {
                Toast.info('请正确输入帐号密码')
            }
        });
    }
    validateAccount = (rule, value, callback) => {
        if (value && value.length >= 4) {
            callback();
        } else {
            callback(new Error('帐号至少四个字符'));
        }
    }
    hanleSexChange(sex) {
        this.setState({
            patSex: sex
        })
    }
    render(){
        const { getFieldProps, getFieldError } = this.props.form;
        return <form style={{
            paddingTop: '1em',
            backgroundColor: '#fff'
        }}>
            <List
                renderFooter={() => getFieldError('account') && getFieldError('account').join(',')}
            >
                {/* <InputItem
                    {...getFieldProps('account', {
                        rules: [
                        { required: true, message: '帐号不能为空' },
                        { validator: this.validateAccount },
                        ],
                    })}
                    clear
                    error={!!getFieldError('account')}
                    onErrorClick={() => {
                        alert(getFieldError('account').join('、'));
                    }}
                    placeholder="请输入帐号"
                >
                    帐号
                </InputItem> */}

                <InputItem {...getFieldProps('patName')} placeholder="请输入真实姓名" type="text">
                    姓名
                </InputItem>

                {this.state.radioData.map(i => (
                    <Radio.RadioItem key={i.value} checked={this.state.patSex === i.value} onChange={() => this.hanleSexChange(i.value)}>
                        {i.label}
                    </Radio.RadioItem>
                ))}

                <DatePicker
                    mode="date"
                    title="出生日期"
                    // value={this.state.date}
                    // onChange={date => this.setState({ date })}
                    >
                    <List.Item arrow="horizontal">出生日期</List.Item>
                </DatePicker>

                <InputItem {...getFieldProps('patIdCard')} placeholder="请输入身份证号码" type="number">
                    身份证号码
                </InputItem>

                <InputItem {...getFieldProps('patMobile')} placeholder="请输入电话号码" type="number">
                    电话
                </InputItem>

                <InputItem {...getFieldProps('patAddress')} placeholder="请输入居住地址" type="text">
                    住址
                </InputItem>

                <InputItem {...getFieldProps('companyName')} placeholder="请输入公司名称" type="text">
                    公司名称
                </InputItem>

                <InputItem {...getFieldProps('job')} placeholder="请输入职位名称" type="text">
                    职位
                </InputItem>
                
                <List.Item>
                    <Button type="primary" onClick={this.onSubmit}>保存</Button>
                </List.Item>
            </List>
        </form>
    }
}

PersonalInfoForm.contextTypes = {
    history: PropTypes.object
}

const PersonalInfoFormWrapper = createForm()(PersonalInfoForm);


class PersonalInfo extends Component {
    constructor(props){
        super(props);
        this.handleBack = this.handleBack.bind(this);
    }
    handleBack() {
        this.context.history.goBack();
    }
    render(){
        return <div>
            <NavBar icon={<Icon type="left"/>}
                onLeftClick = { this.handleBack }
            >个人信息</NavBar>
            <div>
                <PersonalInfoFormWrapper/>
            </div>
        </div>
    }
}

PersonalInfo.contextTypes = {
    history: PropTypes.object
}

export default PersonalInfo;