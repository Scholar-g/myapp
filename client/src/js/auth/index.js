// 1-管理员
const administrators = {
    'auditTasks': true, // 审核任务
    'editStaffInfo': false // 编辑员工信息
}
// 2-审核员
const auditor = {
    'auditTasks': false, // 审核任务
    'editStaffInfo': false // 编辑员工信息
}
// 3-专员
const commissioner = {
    'auditTasks': false, // 审核任务
    'editStaffInfo': true // 编辑员工信息
}

export {
    administrators,
    auditor,
    commissioner
}
