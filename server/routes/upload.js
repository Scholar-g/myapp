var express = require('express');
var router = express.Router();
var db = require('../db');
var axios = require('axios');

// var app = express();
// const bodyParser = require('body-parser');

// app.use(bodyParser.json());//数据JSON类型
// app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据

/* GET userInfo listing. */
router.use((req, res, next) => {
    console.log(`路由执行成功啦~~~`, Date.now());
    next()
})

router.post('/', (req, res, next) => {
    if (req.url && req.fileName && req.file) {
        let { url, fileName, file } = req
        const instance = axios.create({
            timeout: 30000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: process.env.NODE_ENV === 'production'
        })
        instance.post(url, { fileName }).then(res => {
            if (res.data.code === '2000') {
                let objectName = res.data.data.key
                let OSS = require('ali-oss')
                let client = new OSS({
                    region: res.data.data.regionId,
                    accessKeyId: res.data.data.accessKeyId,
                    accessKeySecret: res.data.data.accessKeySecret,
                    stsToken: res.data.data.securityToken,
                    bucket: res.data.data.bucket
                })
                client.put(objectName, file).then(reslute => {
                    if (reslute.res.statusCode === 200) {
                        res.json({
                            code: 2000,
                            message: 'get success',
                            data: results.url
                        })
                        db.query('INSERT INTO alys VALUES(Date.now()),results.url', function (results, fields) {
                            console.log(results)
                        })
                    } else {
                        res.json({
                            code: 2006,
                            message: '上传阿里云失败',
                            data: ''
                        })
                    }
                })
            }
        }).catch(err => {
            res.json({
                code: 2006,
                message: err,
                data: ''
            })
        })
    } else {
        res.json({
            code: 2006,
            message: '缺少参数',
            data: ''
        })
    }
})

module.exports = router;
