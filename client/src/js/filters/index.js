import moment from 'moment'
export default function (Vue) {
    // 时间戳格式化字符串，并且只显示年月日
    Vue.filter('timestampToDay', function (timestamp) {
        // if (!timestamp) return ''
        // return moment(timestamp, 'YYYY-MM-DD').format('YYYY-MM-DD')
        if (timestamp) {
            return moment(Number(timestamp)).format('YYYY-MM-DD')
        } else {
            return '/'
        }
    })

    // 金额后面增加两位
    Vue.filter('goldFormatter', function (cellValue) {
        if (cellValue) {
            return parseFloat(cellValue).toFixed(2)
        } else {
            return '0.00'
        }
    })

    // 空数据
    Vue.filter('emptyFormatter', function (cellValue) {
        if (cellValue || cellValue === 0) {
            return cellValue
        } else {
            return '--'
        }
    })
}
