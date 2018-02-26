import React, {Component} from 'react';
import { NavBar, List, Icon, Toast, InputItem, Radio, Button, DatePicker } from 'antd-mobile';
import PropTypes from 'prop-types';
import { createForm } from 'rc-form';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
let submitURL = window.USERURL + 'user/updUser';
class PersonalInfoForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            radioData: [
                { value: 'M', label: '男' },
                { value: 'F', label: '女' },
            ],
            status: 0,
            patSex: 'M',
            dpValue: now,
            disId: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){
        const form = this.props.form;
        const self = this;
        this.context.axios({
            url: window.USERURL + 'user/getPatientInfo',
            data: {
                username: sessionStorage.getItem('username')
            }
          }).then( response => {
            if (response.data.resultCode == 0) {
                response.data.result.patBirth = new Date(response.data.result.patBirth);
                // rc-form设置多余的数据会静默失败。。。
                delete response.data.result.createPerson, delete response.data.result.createTime;
                delete response.data.result.modifyPerson, delete response.data.result.modifyTime;
                delete response.data.result.username;
                form.setFieldsValue(response.data.result);
                this.setState({
                    patSex: response.data.result.patSex,
                    status: 1,
                    disId: true
                })
            } else if (response.data.resultCode == 1){
                this.setState({
                    status: 1
                })
                submitURL = window.USERURL + 'user/bindPatientInfo';
            } else {
                Toast.info('请求失败！请与系统管理员联系', 2)
            }
        }).catch(function(){
            Toast.info('服务器异常！请与系统管理员联系!', 2)
        })
    }
    onSubmit = () => {
        const self = this;
        let username = window.sessionStorage.getItem('username');
        this.props.form.validateFields({ force: true }, (error) => {
            const params = this.props.form.getFieldsValue();
            params.patBirth = params.patBirth.getFullYear() + '-' + (params.patBirth.getMonth()+1) + '-' + params.patBirth.getDate();
            params.patSex = this.state.patSex;
            params.username = username;
            if (!error) {
                Toast.info('保存中...', 7)
                self.context.axios({
                    data: params,
                    url: submitURL
                  }).then( response => {
                    Toast.hide();
                    if (response.data.resultCode == 0) {
                        Toast.info('保存成功', 1, () => {
                            this.context.history.push('/index')
                        })
                    } else if (response.data.resultCode == 2){
                        Toast.info(response.data.resultDesc, 2)
                    }else {
                        Toast.info('保存失败！请与系统管理员联系', 2)
                    }
                })
            } else {
                Toast.info('请按要求填写表单')
            }
        });
    }
    validatePatName = (rule, name, callback) => {
        if (name && name.length > 1) {
          callback();
        } else {
          callback(new Error('姓名必须两个及以上字符'));
        }
    }
    hanleSexChange(sex) {
        this.setState({
            patSex: sex
        })
    }
    render(){
        const { getFieldProps, getFieldsError, getFieldError } = this.props.form;
        return <div style={{height: '100%'}}><form style={{
            paddingTop: '1em',
            backgroundColor: '#fff'
        }}>
            <List
                renderFooter={() => {
                    let errors = getFieldsError(['patName', 'patIdCard', 'patMobile', 'patAddress', 'companyName', 'job']);
                    let ret = '';
                    for (let fields in errors) {
                        if (errors[fields]) {
                            ret += errors[fields].join(',') + '；'
                        }
                    }
                    return <div style={{color: '#ef6241'}}>{ret}</div>;
                }}
            >
                {/***
                **************
                 真实姓名输入框 
                **************
                 ***/}
                <InputItem {...getFieldProps('patName', {
                    rules: [
                        { required: true, message: '姓名不能为空' },
                        { validator: this.validatePatName }
                    ]
                })}
                clear
                error={!!getFieldError('patName')}
                onErrorClick={() => {
                    Toast.info(getFieldError('patName').join('、'), 1);
                }}
                placeholder="请输入真实姓名" type="text">
                    姓名
                </InputItem>

                {/***
                **************
                性别单选
                **************
                 ***/}
                {this.state.radioData.map(i => (
                    <Radio.RadioItem 
                    key={i.value}
                    checked={this.state.patSex === i.value} 
                    onChange={() => this.hanleSexChange(i.value)}
                    >
                        {i.label}
                    </Radio.RadioItem>
                ))}

                {/***
                **************
                出生日期
                **************
                 ***/}
                <DatePicker
                    mode = "date"
                    minDate = {new Date(1900, 1, 1)}
                    maxDate = { now }
                    {...getFieldProps('patBirth', {
                        initialValue: this.state.dpValue
                    })}
                >
                    <List.Item arrow="horizontal">出生日期</List.Item>
                </DatePicker>
                
                {/***
                **************
                 身份证输入框 
                **************
                 ***/}
                <InputItem disabled={this.state.disId} {...getFieldProps('patIdCard',{
                    rules: [
                        { required: true, message: '身份证号码不能为空' },
                        { pattern:  /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/, message: '请输入正确的身份证号' }
                    ]
                })} 
                clear
                error={!!getFieldError('patIdCard')}
                onErrorClick={() => {
                    Toast.info(getFieldError('patIdCard').join('、'), 1);
                }}
                placeholder="请输入身份证号码" type="number">
                    身份证
                </InputItem>

                {/* id */}
                <InputItem {...getFieldProps('id')} type="hidden"/>
                
                {/***
                **************
                 手机号码
                **************
                 ***/}
                <InputItem {...getFieldProps('patMobile',{
                    rules: [
                        { required: true, message: '电话号码不能为空' },
                        { pattern:  /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/, message: '请输入正确的电话号码' }
                    ]
                })} 
                clear
                error={!!getFieldError('patMobile')}
                onErrorClick={() => {
                    Toast.info(getFieldError('patMobile').join('、'), 1);
                }}
                placeholder="请输入电话号码" type="number">
                    电话
                </InputItem>

                {/***
                **************
                 居住地址
                **************
                 ***/}
                <InputItem {...getFieldProps('patAddress',{
                    rules: [
                        { required: true, message: '家庭住址不能为空' },
                        { max: 100, message: '居住地址最多100个字符' }
                    ]
                })} 
                clear
                error={!!getFieldError('patAddress')}
                onErrorClick={() => {
                    Toast.info(getFieldError('patAddress').join('、'), 1);
                }}
                placeholder="请输入居住地址" type="text">
                    住址
                </InputItem>

                {/***
                **************
                 公司名称
                **************
                 ***/}
                <InputItem {...getFieldProps('companyName',{
                    rules: [
                        { max: 30, message: '公司名称最多30个字符' }
                    ]
                })} 
                clear
                error={!!getFieldError('companyName')}
                onErrorClick={() => {
                    Toast.info(getFieldError('companyName').join('、'), 1);
                }}
                placeholder="请输入公司名称" type="text">
                    公司
                </InputItem>

                {/***
                **************
                 职位名称
                **************
                 ***/}
                <InputItem {...getFieldProps('job',{
                    rules: [
                        { max: 20, message: '职位最多20个字符' }
                    ]
                })} 
                clear
                error={!!getFieldError('job')}
                onErrorClick={() => {
                    Toast.info(getFieldError('job').join('、'), 1);
                }}
                placeholder="请输入职位名称" type="text">
                    职位
                </InputItem>
                
                <List.Item>
                    <Button type="primary" onClick={this.onSubmit}>保存</Button>
                </List.Item>
            </List>
        </form> { !this.state.status && this.context.loading }</div>
    }
}

PersonalInfoForm.contextTypes = {
    history: PropTypes.object,
    axios: PropTypes.func,
    loading: PropTypes.object
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