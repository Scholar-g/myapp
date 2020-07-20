/**
 * echarts管理模块
 */
import createAPI from '@/js/fetch'
const TESTECHARTS = {
    // echarts数据
    usersInfo: (data, $this, cancel) => createAPI('/userInfo', 'get', data, $this, cancel)
}
export default TESTECHARTS
