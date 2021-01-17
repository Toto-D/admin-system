const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/devApi',{
        target:process.env.REACT_APP_BASE_URL,
        // target:'http://www.web-jshtml.cn/api/react',
        changeOrigin:true, //允许跨域
        pathRewrite:{
            [`^${process.env.REACT_APP_API}`]:'',
        }
    }));
    // app.use(proxy('/manage/api',{
    //     target: 'http://admintest.happymmall.com:7000',
    //     changeOrigin: true
    // }))
};