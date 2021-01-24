import service from "../utils/request";

//登陆接口
export function Login(data){
    return service.request({
        url:'/login/',
        method:'post',
        data //请求类型为post，es6写法相当于：data=data
        // params: data, //请求类型为get时
    })
}

//获取验证码接口
export function GetCode(data){
    console.log("1111"+data);
    return service.request({
        url:'/getSms/',
        method:'post',
        data //请求类型为post，es6写法相当于：data=data
        // params: data, //请求类型为get时
    })
}

//注册接口
export function Register(data) {
    return service.request({
        url: '/register/',
        method: 'post',
        data //请求类型为post，es6写法相当于：data=data
        // params: data, //请求类型为get时
    })
}