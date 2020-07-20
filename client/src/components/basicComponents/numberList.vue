<template>
    <el-table-column
        label="序号"
        type="index"
        :index="cIndexCount"
        width="50"
        fixed>
    </el-table-column>
</template>

<script>
// 组件说明：基于element的列表序号组件
// 组件使用eg：
// <number-list :currentPage="currentPage" :pageSize="pageSize"/>
export default {
    props: {
        currentPage: { // 当前页码，选传
            type: Number,
            default: 1
        },
        pageSize: { // 每页数据条数，选传
            type: Number,
            default: 0
        }
    },
    methods: {
        cIndexCount (index) { // 计算序号
            return (this.currentPage - 1) * this.pageSize + index + 1
        }
    }
}
</script>
