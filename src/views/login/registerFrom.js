import React, {Component, Fragment} from 'react';
import './index.scss'
import { Form, Input, Button, Row, Col, message} from 'antd';

// 这里是icon组件，用法可以搜索看代码
import { UserOutlined, LockOutlined } from '@ant-design/icons';
//getcode
import Code from '../../components/code/index'
import {validate_passwords} from "../../utils/validate";

//加密
import CryptoJs from 'crypto-js'

import {Register} from '../../api/account'

class RegisterFrom extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            code:''
        }
    }
    onFinish = (value) => {
        console.log('register-onfinish');
        const requestDate = {
            username:this.state.username,
            password:CryptoJs.MD5(this.state.password).toString(),
            // password:this.state.password,
            code:this.state.code
        };
        console.log(requestDate);

        Register(requestDate).then(response=>{
            const data = response.data.message;
            message.success(data);
            console.log(response)
        }).catch(error=>{

        })
    };

    logIn=()=>{
        this.props.logIn('login')
    };
    // 获取input内容
    inputChangeUsername = (e)=>{
        this.setState({
            username:e.target.value
        })
    };
    inputChangePassword = (e)=>{
        this.setState({
            password:e.target.value
        })
    };
    inputChangeCode = (e)=>{
        this.setState({
            code:e.target.value
        })
    };
    render() {
        const _this = this;
        return (
            <Fragment>
                <div className='from-header'>
                    <h4 className='column'>注册</h4>
                    <span onClick={this.logIn}>已有账号</span>
                </div>
                <div className='from-content'>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '输入手机号/邮箱注册用户名!',
                                },
                            ]}
                        >
                            <Input onChange={this.inputChangeUsername} value={this.state.username} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请设置用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请设置密码',
                                },
                                //使用自定义方式进行用户名验证
                                ({ getFieldValue }) => ({//es6解构语法，将getFieldValue对象全部拆解到花括号中
                                    validator(_, value) {
                                        const repassword_value = getFieldValue('re-password');

                                        if (!validate_passwords(value)) {
                                            return Promise.reject('密码格式错误')
                                        }
                                        if(repassword_value && value!==repassword_value){
                                            return Promise.reject('两次格式不一致')
                                            }
                                        return Promise.resolve();

                                    }})
                            ]}>

                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="请设置密码"
                                onChange={this.inputChangePassword}
                            />
                        </Form.Item>
                        <Form.Item
                            name="re-password"
                            rules={[
                                {
                                    required: true,
                                    message: '请确认密码!',
                                },
                                //使用自定义方式进行用户名验证
                                ({ getFieldValue }) => ({//es6解构语法，将getFieldValue对象全部拆解到花括号中
                                    validator(_, value) {
                                        if (value===getFieldValue('password')) {
                                            return Promise.resolve()
                                        }else{
                                            return Promise.reject("两次密码不一致");
                                        }
                                    }})

                            ]}>

                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="请确认密码"
                            />
                        </Form.Item>
                        <Form.Item  name="code"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入验证码',
                                        },
                                    ]}>
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon"/>}
                                        placeholder="验证码"
                                        onChange={this.inputChangeCode}
                                    />
                                </Col>
                                <Col span={9} >
                                    <Code username={this.state.username} module={'register'}/>
                                    {/*<Button type="primary" danger>获取验证码</Button>*/}
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item>
                            {/*block：适应父级盒子宽度*/}
                            <Button type="primary" htmlType="submit" className="login-form-button" block>
                                点击注册
                            </Button>

                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        )
    }
}

export default RegisterFrom