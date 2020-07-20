import moment from 'moment'
const formatters = {}

// 日期过滤
formatters.dateFormatter = (row, column, cellValue, index) => {
    if (cellValue) {
        return moment(Number(cellValue)).format('YYYY-MM-DD HH:mm:ss')
    } else {
        return '--'
    }
}

formatters.dateYmdhmFormatter = (row, column, cellValue, index) => {
    if (cellValue) {
        return moment(Number(cellValue)).format('YYYY-MM-DD HH:mm')
    } else {
        return '--'
    }
}

formatters.dateYmdFormatter = (row, column, cellValue, index) => {
    if (cellValue) {
        return moment(Number(cellValue)).format('YYYY-MM-DD')
    } else {
        return '--'
    }
}

formatters.dateYmFormatter = (row, column, cellValue, index) => {
    if (cellValue) {
        return moment(Number(cellValue)).format('YYYY年MM月')
    } else {
        return '--'
    }
}

formatters.dateWeekFormatter = (row, column, cellValue, index) => {
    if (cellValue) {
        return '周' + '日一二三四五六'.charAt(moment(Number(cellValue)).format('d'))
    } else {
        return '--'
    }
}

// 百分比格式化
formatters.rateFormatter = (row, column, cellValue, index) => {
    if (cellValue === 0) {
        return '0'
    } else {
        return (cellValue * 100).toFixed(2) + '%'
    }
}

// 表格空数据
formatters.emptyFormatter = (row, column, cellValue, index) => {
    if (cellValue || cellValue === 0) {
        return cellValue
    } else {
        return '--'
    }
}

// 金额后面增加两位
formatters.goldFormatter = (row, column, cellValue, index) => {
    if (cellValue) {
        return parseFloat(cellValue).toFixed(2)
    } else {
        return '0.00'
    }
}

// 是否vip
formatters.isVipFormatter = (row, column, cellValue, index) => {
    return cellValue ? '是' : '否'
}

// 性别
formatters.genderFormatter = (row, column, cellValue, index) => {
    // 1 女；0 男
    return cellValue ? '女' : '男'
}

export default formatters
