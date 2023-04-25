import axios from "axios";

const request = axios.create({
    baseURL: '/api',
    timeout: 5000
})

// 请求拦截器

// 响应拦截器
request.interceptors.response.use(
    (response) => {
        const { code, msg, data} = response.data
        if(code === 200) {
            return data
        }else {
            console.log("请求未成功");
        }
        return Promise.reject(new Error(msg))
    },function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        console.log("请求失败");
        return Promise.reject(error);
      }
)

export default request