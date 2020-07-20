import axios from 'axios'
/**
 * 传入时间戳，得到据今天的年限，保留两位小数
 * @param {Number} timestamp 时间戳
 * @return {Number} 2.11
 * @author hh
 */
const timestampFromNow = (timestamp) => {
    if (!timestamp) return 0
    let minute = 1000 * 60
    let hour = minute * 60
    let day = hour * 24
    let now = new Date().getTime()
    let diffValue = now - timestamp
    let dayC = diffValue / day
    let year = dayC / 365
    return year.toFixed(2)
}

/**
 * 传入时间戳数组[开始时间, 结束时间], 计算时间差，单位：年，保留两位小数
 * @param {Array} arr 时间戳
 * @return {Number} 5
 * @author hh
 */
const diffTime = (arr = []) => {
    if (arr.length === 2 && arr[1] >= arr[0]) {
        let diff = timestampFromNow(arr[0]) - timestampFromNow(arr[1])
        return diff > 0 ? diff : 0
    }
    return 0
}

/**
 * 传入两层数组[[],[开始时间, 结束时间],[]],去除数组中空数组
 * @param {Array} arr 嵌套数组
 * @return {Array} [[开始时间, 结束时间]]
 * @author ss
 */
const removeEmptyArrays = (arr) => {
    let newArr = []
    if (arr && arr.length > 0) {
        newArr = arr.filter(item => {
            return item.length > 0
        })
    }
    return newArr
}

/**
 *  上传阿里云函数
 *  @param {String} fileName 文件名
 *  @param {Object} file 文件
 *  @param {this} _this 获取Vue
 *  @return {String} 阿里云链接
 * @author ss
 */
const uploadAliyun = async (fileName, file, _this) => {
    let vm = _this
    return new Promise(function (resolve, reject) {
        vm.$apis.getUploadInfo({ fileName: fileName }).then(res => {
            if (res.code === '2000') {
                let objectName = res.data.key
                let OSS = require('ali-oss')
                let client = new OSS({
                    region: res.data.regionId,
                    accessKeyId: res.data.accessKeyId,
                    accessKeySecret: res.data.accessKeySecret,
                    stsToken: res.data.securityToken,
                    bucket: res.data.bucket
                })
                client.put(objectName, file).then(reslute => {
                    if (reslute.res.statusCode === 200) {
                        resolve(reslute.url)
                    } else {
                        let errorReason = '上传阿里云失败'
                        reject(errorReason)
                        vm.$message.error('上传阿里云失败')
                    }
                })
            }
        }).catch(err => {
            reject(err)
            vm.$message.error(err)
        })
    })
}

/**
 * 根据数组中某个对象值去重
 * @param {Array} arr 数组
 * @param {String} key 对象中字段名
 * @return {Array} 去重后的数组
 * @author ss
 */
const deDuplicateArray = (arr, key) => {
    let res = new Map()
    return arr.filter(item => !res.has(item[key]) && res.set(item[key], 1))
}

/**
 * 请求导出文件流处理返回的文件流进行下载
 *  @param {this} _this 获取Vue
 * @param {String} downloadUrl 文件导出接口地址
 * @param {Object} params 文件导出接口参数
 * @return {String} fileName 下载文件名
 * @author ss
 */
const dowloadFileStream = (_this, downloadUrl, params, fileName) => {
    let vm = _this
    const instance = axios.create({
        // 设置超时时间 -30秒
        timeout: 30000,
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
    // 下载excel文件，自定义axios请求
    instance.post(downloadUrl, params, { responseType: 'arraybuffer' }).then(res => {
        if (res.data) {
            let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
            let a = document.createElement('a')
            fileName && (a.download = fileName)
            a.href = URL.createObjectURL(blob)
            a.click()
        } else {
            vm.$message.error(res.data.message || '导出失败')
        }
    }).catch(err => {
        vm.$message.error(err || '导出失败')
    })
}

export {
    timestampFromNow,
    diffTime,
    removeEmptyArrays,
    uploadAliyun,
    deDuplicateArray,
    dowloadFileStream
}
