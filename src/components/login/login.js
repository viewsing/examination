import React, {Component} from 'react';
import { NavBar, List, Icon, InputItem, Button, Toast } from 'antd-mobile';
import PropTypes from 'prop-types';
import { createForm } from 'rc-form';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit = () => {
        const self = this;
        this.props.form.validateFields({ force: true }, (error) => {
            const params = this.props.form.getFieldsValue();
            if (!error) {
                Toast.info('登录中...', 7)
                self.context.axios({
                    url: window.USERURL + 'user/login',
                    data: params
                }).then( response => {
                    Toast.hide();
                    if (response.data.resultCode == 0) {
                        Toast.info('登录成功', 1, () => {
                            sessionStorage.setItem('username', params.account);
                            this.context.history.push('/')
                        })
                    } else {
                        Toast.info('登录失败！请与系统管理员联系', 2)
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
                renderFooter={() => getFieldError('account') && (<div style={{color: '#ef6241'}}>{getFieldError('account').join(',')}</div>)}
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
                    <Button type="primary" onClick={this.onSubmit}>登录</Button>
                </List.Item>
            </List>
        </form>
    }
}

LoginForm.contextTypes = {
    history: PropTypes.object,
    axios: PropTypes.func
}

const LoginFormWrapper = createForm()(LoginForm);

class Login extends Component {
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
            >登录</NavBar>
            <div>
                <LoginFormWrapper/>
            </div>
        </div>
    }
}

Login.contextTypes = {
    history: PropTypes.object
}

export default Login;