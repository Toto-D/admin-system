import React, {Component, Fragment} from 'react';
import './index.scss'
import { Form, Input, Button, Row, Col, } from 'antd';

// 这里是icon组件，用法可以搜索看代码
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import {validate_password} from '../../utils/validate'

// api
import { Login } from '../../api/account'


class LoginFrom extends Component{
    constructor(props) {
        super(props);
        this.state = {}
    }
    onFinish = (value) => {
        Login().then(response=>{
            console.log(response)
        }).catch(error=>{
            console.log(error)
        });
        console.log('onFinish-login'+value)
    };

    registerCounter = ()=>{
        this.props.registerCounter('register')
    };

    render() {
        return (
                <Fragment>
                    <div className='from-header'>
                        <h4 className='column'>登陆</h4>
                        <span onClick={this.registerCounter}>账号注册</span>
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
                                        message: '请输入用户名',
                                    },
                                    {
                                        pattern:validate_password, message:'用户名错误'
                                    }
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email/phone" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码!',
                                    },
                                    {
                                        min:8,
                                        message:'长度最小8位'},
                                    {
                                        max:24,
                                        message:'长度最大24位'
                                    }
                                ]}>

                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>

                            <Form.Item  name="code"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Code!',
                                            },

                                            ({ getFieldValue }) => ({//es6解构语法，将getFieldValue对象全部拆解到花括号中
                                            validator(_, value) {
                                            console.log({ getFieldValue });//查看getFieldValue对象
                                            console.log(getFieldValue('code'));//getFieldVal对象中有input输入的所有值，按照name属性可以进行获取对应值
                                            console.log('value:'+value);//value 就是input中的输入值
                                            if (value.length===6) {
                                            return Promise.resolve();
                                        }else{
                                                return Promise.reject('The two passwords that you entered do not match!');
                                            }


                                        },
                                        }),
                                        ]}>
                                <Row gutter={13}>
                                    <Col span={15}>
                                        <Input
                                            prefix={<LockOutlined className="site-form-item-icon"/>}
                                            placeholder="Code"
                                        />
                                    </Col>
                                    <Col span={9} >
                                        <Button type="primary" danger>获取验证码</Button>
                                    </Col>
                                </Row>
                            </Form.Item>

                            <Form.Item>
                                {/*block：适应父级盒子宽度*/}
                                <Button type="primary" htmlType="submit" className="login-form-button" block>
                                    登陆
                                </Button>

                            </Form.Item>
                        </Form>
                    </div>
                </Fragment>
        )
    }
}

export default LoginFrom