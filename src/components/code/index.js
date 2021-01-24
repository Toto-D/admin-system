import React, { Component } from "react";
import {Button, message} from "antd";
import {GetCode} from "../../api/account";
let timer = null;


class Code extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            code_button_disabled:false,
            button_text:'获取验证码',
            code_button_loading:false,
            module:props.module

        };

    }
    componentWillReceiveProps({username}){
        this.setState({
            username
        })
    };

    //组件销毁前
    componentWillUnmount() {
        clearInterval(timer)
    }

    //验证码倒计时
    countDown = () => {
        let sec = 60;
        this.setState({
            code_button_loading:false,
            code_button_disabled:true,
            button_text:`${sec}S`

        });
        timer = setInterval(()=>{
            sec--;

            if(sec===0){
                this.setState({
                    button_text:'重新获取',
                    code_button_disabled:false
                });
                //清除定时器
                clearInterval(timer);
                return false
            }
            //setState 更新将局部重新渲染dom
            this.setState({
                button_text:`${sec}S`
            })
        },1000)
    };
    //获取验证码
    getCode = ()=>{
        // console.log("state"+this.state.username + "props"+this.props.username);
        //如果没有用户名则拦截点击获取验证码按钮
        if(!this.state.username){
            console.log("message"+this.state.username);
            message.warning('用户名不能为空');
            return false
        }
        this.setState({
            code_button_loading:true,
            code_button_text:'发送中'
        });
        const requestDate = {
            username:this.state.username,
            module:this.state.module
        };
        console.log(requestDate);
        GetCode(requestDate).then(response=>{
            message.success(response.data.message);
            //执行倒计时
            this.countDown();
        }).catch(error=>{
            this.setState({
                code_button_loading:false,
                code_button_text:'重新获取'
            })
        });
    };

    render() {
        const {code_button_loading,button_text,code_button_disabled} = this.state;
        return (
            <Button disabled={code_button_disabled} loading={code_button_loading} onClick={this.getCode} type='primary' danger block > {button_text} </Button>
        )
    }
}

export default Code