// 引入库
import axios from 'axios'
import qs from 'qs'



//引入message
import { Message } from "element-ui"
import getlocal from "@/utils/getlocal.js"//引入自定义获取本地存储方法


// 设置默认请求的接口地址
axios.defaults.baseURL = 'http://172.16.11.200:6060'

// 请求拦截器
axios.interceptors.request.use(config => {
    // 在请求发送出去之前 带上一些东西 config是请求的配置对象， 如果直接返回 就等于什么都不带
    let token=getlocal.get("token")
    //let token = window.localStorage.getItem("token")
    config.headers.Authorization = "Bearer " + token//带上token请求
    return config;
}, error => {
    return Promise.reject(error); // 请求错误处理
})

// 响应拦截器
axios.interceptors.response.use(response => {
    // response就是后端响应回来的东西 如果你想做什么统一的处理 可以在这里写
    let { code } = response.data
    if (code === 0) {
        Message({
            type: "success",
            message: "操作成功",
            center: true
        })


    }
    return response;
}, error => {
    return Promise.reject(error); // 响应错误处理
});


// 导出两个方法
export default {
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, { params })
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    post(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(params))
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}
