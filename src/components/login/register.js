import React, {Component} from 'react';
import { NavBar, List, Icon, Toast, InputItem, Button } from 'antd-mobile';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { createForm } from 'rc-form';
import axios from 'axios';

class RegisterForm extends Component {
    state = {
        value: 1,
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
    render(){
        const { getFieldProps, getFieldError } = this.props.form;
        return <form style={{
            paddingTop: '1em',
            backgroundColor: '#fff'
        }}>
            <List
                renderFooter={() => getFieldError('account') && getFieldError('account').join(',')}
            >
                <InputItem
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
                </InputItem>

                <InputItem {...getFieldProps('password')} placeholder="请输入密码" type="password">
                    密码
                </InputItem>
                
                <List.Item>
                    <Button type="primary" onClick={this.onSubmit}>注册</Button>
                </List.Item>
            </List>
        </form>
    }
}

RegisterForm.contextTypes = {
    history: PropTypes.object
}

const RegisterFormWrapper = createForm()(RegisterForm);

class Register extends Component {
    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
    }
    handleBack(){
        this.context.history.goBack();
    }
    render(){
        return <div>
            <NavBar icon={<Icon type="left"/>}
                onLeftClick = { this.handleBack }
            >注册</NavBar>
            <div>
                <RegisterFormWrapper/>
            </div>
        </div>
    }
}

Register.contextTypes = {
    history: PropTypes.object
}

export default Register;