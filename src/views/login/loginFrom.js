import React, {Component, Fragment} from 'react';
import './index.scss'
import { Form, Input, Button, Row, Col, message} from 'antd';

// 这里是icon组件，用法可以搜索看代码
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import {validate_emails} from '../../utils/validate'

// api
import { Login } from '../../api/account'

//getcode
import Code from '../../components/code/index'


class LoginFrom extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            code:'',
            // code_button_disabled:true,
            code_button_loading:false,
            code_button_text:'获取验证码',
            code_button_disabled:true
        }
    }
    onFinish = (value) => {
        const requestDate = {
            username:this.state.username,
            password:this.state.password,
            code:this.state.code
        };
        Login(requestDate).then(response=>{
            message.success(response.data.message);
            console.log(response)
        }).catch(error=>{
            console.log(error)
        });
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



    //切换注册页面
    registerCounter = ()=>{
        this.props.registerCounter('register')
    };

    render() {
        const _this = this;
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
                                    //使用antd的组件内置验证用户名
                                    // { type :'email',message:'邮箱格式不正确' },

                                    //使用自定义的正则验证用户名
                                    // {
                                    //     pattern:validate_email, message:'用户名错误'
                                    // },

                                    //使用自定义方式进行用户名验证
                                    ({ getFieldValue }) => ({//es6解构语法，将getFieldValue对象全部拆解到花括号中
                                        validator(_, value) {
                                            if (validate_emails(value)) {
                                                _this.setState({
                                                    code_button_disabled:false
                                                });
                                                return Promise.resolve();
                                            } else{
                                                _this.setState({
                                                    code_button_disabled : true
                                                });
                                                return Promise.reject('邮箱格式不正确ya');}
                                            }}),
                                ]}
                            >
                                <Input onChange={this.inputChangeUsername} value={this.state.username} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email/phone" type='email'/>
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码!',
                                    },
                                    {
                                        min:6,
                                        message:'长度最小6位'},

                                ]}>

                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                    onChange={this.inputChangePassword}
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
                                                return Promise.reject('验证码长度不正确');
                                            }


                                        },
                                        }),
                                        ]}>
                                <Row gutter={15}>
                                    <Col span={15}>
                                        <Input
                                            prefix={<LockOutlined className="site-form-item-icon"/>}
                                            placeholder="Code"
                                            onChange={this.inputChangeCode}
                                        />
                                    </Col>
                                    <Col span={9} >
                                        <Code username={this.state.username}  module={'login'}/>
                                        {/*<Button disabled={this.state.code_button_disabled} onClick={this.getCode} type="primary" danger block loading={this.state.code_button_loading}>{this.state.code_button_text}</Button>*/}
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