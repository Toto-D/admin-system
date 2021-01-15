import service from "../utils/request";

export function Login(data){
    return service.request({
        url:'/login/',
        method:'get',
        data //请求类型为post，es6写法相当于：data=data
        // params: data, //请求类型为get时
    })
}
