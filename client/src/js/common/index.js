/**
 * 公共数据
 */
// 导入权限数据
import { administrators, auditor, commissioner } from '@/js/auth'

const common = {}

// 账号类型accountTypeList，1-管理员，2-审核员，3-普通专员，4-薪酬专员
common.accountTypeList = [
    { value: 1, label: '管理员' },
    { value: 2, label: '审核员' },
    { value: 3, label: '普通专员' },
    { value: 4, label: '薪酬专员' }
]

// 公共列表底部当前每页条数,默认20
common.pageSize = 20

// 权限等级：1-管理员，2-审核员，3-专员（默认）
common.accountType = 3

// 公共权限数据
let authList = [ administrators, auditor, commissioner ]
common.auth = {
    ...authList[common.accountType - 1]
}

export default common
