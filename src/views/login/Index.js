import React,{ Component } from 'react';
import './index.scss'


import LoginFrom from "./loginFrom";
import RegisterFrom from "./registerFrom";



class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            formType:'login'
        }
    }
    onFinish = (value) => {

    };
    switchFrom = (value)=>{
        this.setState(
            {formType:value}
        )
    };
    render() {
        return (
            <div className='from-wrap'>
                <div>
                    {this.state.formType ==='login' ?
                        <LoginFrom  registerCounter={this.switchFrom} /> :
                        <RegisterFrom logIn = {this.switchFrom}/>}
                </div>
            </div>
        )
    }
}

export default Login