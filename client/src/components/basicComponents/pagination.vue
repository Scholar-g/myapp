<template>
    <el-pagination
        background
        style="float:right"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="20"
        layout="total, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
</template>

<script>
// 组件说明：基于element的列表底部分页组件
// 组件使用eg：
// <pagination :currentPageNum.sync="currentPage" :total="total"/>
export default {
    props: {
        currentPageNum: { // 当前页码，必传
            type: Number,
            default: 1
        },
        total: { // 总条数，必传
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            currentPage: 1
        }
    },
    watch: {
        currentPageNum: function (val) {
            this.currentPage = val
        }
    },
    methods: {
        // 页码改变查询
        handleCurrentChange (val) {
            this.$emit('update:currentPageNum', val)
            // 父组件列表处理函数必须为queryList或者在queryList内
            this.$parent.queryList()
        }
    }
}
</script>
