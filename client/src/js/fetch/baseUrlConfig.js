const config = {
    // 如需使用yapi的mock数据 请打开以下注释
    'localhost': {
        baseUrl: 'http://localhost:3000'
    }
}

const configParams = config[location.hostname]

if (configParams) {
    window.baseUrl = configParams.baseUrl
}

const baseUrl = window.baseUrl

export {
    baseUrl as baseURL
}
