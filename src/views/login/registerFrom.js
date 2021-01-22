import React, {Component, Fragment} from 'react';
import './index.scss'
import { Form, Input, Button, Row, Col, } from 'antd';

// 这里是icon组件，用法可以搜索看代码
import { UserOutlined, LockOutlined } from '@ant-design/icons';
//getcode
import Code from '../../components/code/index'

class RegisterFrom extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username:''
        }
    }
    onFinish = (value) => {
        console.log('onFinish-register'+value)
    };

    logIn=()=>{
        this.props.logIn('login')
    };
    render() {
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
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请设置用户名" />
                        </Form.Item>
                        <Form.Item
                            name="passwordOne"
                            rules={[
                                {
                                    required: true,
                                    message: '请设置密码',
                                },
                            ]}>

                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="请设置密码"
                            />
                        </Form.Item>
                        <Form.Item
                            name="passwordTwo"
                            rules={[
                                {
                                    required: true,
                                    message: '请确认密码!',
                                },
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
                                            message: 'Please input your Code!',
                                        },
                                    ]}>
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon"/>}
                                        placeholder="验证码"
                                    />
                                </Col>
                                <Col span={9} >
                                    <Code username={this.state.username}/>
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