import React, {Component} from 'react';
import { NavBar, List, Icon, Toast, InputItem, Button } from 'antd-mobile';
import PropTypes from 'prop-types';
import { createForm } from 'rc-form';

class RegisterForm extends Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit = () => {
        const self = this;
        this.props.form.validateFields({ force: true }, (error) => {
            const params = this.props.form.getFieldsValue();
            if (!error) {
                Toast.info('注册中...', 7)
                self.context.axios({
                    url: window.USERURL + 'user/registry',
                    data: params
                }).then( response => {
                    if (response.data.resultCode == 0) {
                        Toast.info('注册成功', 1, () => {
                            sessionStorage.setItem('username', params.username);
                            this.context.history.push('/personalInfo')
                        })
                    } else if (response.data.resultCode == -1){
                        Toast.info('注册失败！请与系统管理员联系', 2)
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
                renderFooter={() => getFieldError('username') && (<div style={{color: '#ef6241'}}>{getFieldError('username').join(',')}</div>)}
            >
                <InputItem
                    {...getFieldProps('username', {
                        rules: [
                        { required: true, message: '帐号不能为空' },
                        { validator: this.validateAccount },
                        ],
                    })}
                    clear
                    error={!!getFieldError('username')}
                    onErrorClick={() => {
                        alert(getFieldError('username').join('、'));
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
    history: PropTypes.object,
    axios: PropTypes.func
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