<template>
    <el-select
        v-model="staffValue"
        filterable
        remote
        placeholder="员工姓名/工号"
        :remote-method="remoteMethod"
        :loading="loading"
        clearable>
        <el-option
            v-for="(item, index) in staffList"
            :key="index"
            :label="item.staffName + ' (' + item.staffNum + ')'"
            :value="item.staffId"
        />
    </el-select>
</template>

<script>
/**
 * 组件说明：员工搜索框，根据员工工号、姓名搜索员工
 * 组件使用eg：<staff-select
                :staffValue.sync="searchParams.staffId"
            />
 */
export default {
    data () {
        return {
            loading: false,
            staffValue: '',
            staffList: []
        }
    },
    props: {
        selectStaff: { // 当前选中值，选传，此参数-必写
            type: String,
            default: ''
        }
    },
    watch: {
        selectStaff: function (val) { // 监听传入值的变化
            this.staffValue = val
        },
        staffValue: function (val) { // 监听选中值的变化，并进行回传
            this.$emit('update:staffValue', val)
        }
    },
    methods: {
        remoteMethod (query) {
            if (query !== '') {
                this.loading = true
                let params = {
                    staffNumOrName: query
                }
                setTimeout(() => {
                    this.$apis.listStaffByNumOrName(params).then(res => {
                        if (res.code === '2000') {
                            this.staffList = res.data
                        }
                    }).catch(err => {
                        console.log(err)
                    }).finally(() => {
                        this.loading = false
                    })
                }, 200)
            } else {
                this.staffList = []
            }
        }
    }
}
</script>
