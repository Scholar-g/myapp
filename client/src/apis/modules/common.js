/**
 * 公共使用的接口
 */
import createAPI from '@/js/fetch'
const COMMON = {
    // 阿里云上传工具接口
    // getUploadInfo: (data, $this, cancel) => createAPI('/oms/tools/getUploadInfo', 'post', data, $this, cancel),
    // 公用数据
    datas: (data, $this, cancel) => createAPI('/datas', 'get', data, $this, cancel)
}
export default COMMON
