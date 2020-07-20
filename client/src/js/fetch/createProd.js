import axios from 'axios'
import { baseURL } from './baseUrlConfig.js'
// import { Message } from 'element-ui'

window.reqList = [] // 存储请求列表
// 正式环境 -- 请使用真实请求 -- start
const instance = axios.create({
    // 设置超时时间 -30秒
    timeout: 30000,
    // 请求的baseUrl
    baseURL: baseURL,
    // 请求头部信息
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    // 修改请求数据
    transformRequest: [function (data, headers) {
        let ret = ''
        for (let it in data) {
            // 去除空字符串的请求字段
            if (data[it] !== null && data[it] !== undefined) {
                if (ret !== '') ret += '&'
                // 空数组参数处理
                if (data[it] instanceof Array && !data[it][0]) data[it] = '[]'
                // 处理复杂数据{list: [{a:1}, {b:2}]}
                if (data[it] instanceof Array && data[it][0]) {
                    ret += encodeURIComponent(it) + '=' + JSON.stringify(data[it])
                } else if (data[it].constructor === Object) {
                    ret += encodeURIComponent(it) + '=' + JSON.stringify(data[it])
                } else {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it])
                }
            }
        }
        return ret
    }],
    // 跨域请求时允许携带凭证（cookie）
    withCredentials: process.env.NODE_ENV === 'production'
})

// 用户登录状态过期，暂时路由重定向至欢迎界面，当前项目无需登录
instance.interceptors.response.use((res) => {
    if (!res) {
        return Promise.reject(res)
    }
    // if (res.data.code === '2001') {
    //     localStorage.clear()
    //     window.location.href = loginUrl
    //     return Promise.reject(res.data)
    // } else if (res.data.code !== '2000') {
    //     Message.error(res.data.message || '请求错误')
    // }
    removeEndReq(res.config.url)
    return res.data
}, (error) => {
    window.reqList = []
    return Promise.reject(error)
})

// 移除请求列表中已完成请求
function removeEndReq (curl) {
    let cIndex = window.reqList.indexOf(curl)
    if (cIndex > -1) {
        window.reqList.splice(cIndex, 1)
    }
}

// 用于关闭请求
const CancelToken = axios.CancelToken
let cancelList = []
function addCancel (config, $this, cancel) {
    config.cancelToken = new CancelToken(function executor (c) {
        cancelList.push(c)
    })
}

function createProd (url, method, data, $this, cancel) {
    let config = {
        method: method,
        url: url,
        data
    }
    if (window.reqList.indexOf(baseURL + url) !== -1) { // 是否已存在该请求，并且pending
        cancelList.forEach(item => item())
        cancelList = []
    }
    addCancel(config, $this, cancel)
    window.reqList.push(baseURL + url)
    return instance(config)
}
// 正式环境 -- 请使用真实请求 -- end

export default createProd
