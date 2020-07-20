<template>
    <el-select
        v-model="callBackValue"
        :placeholder="placeholder"
        clearable
        filterable>
        <el-option
            v-for="item in selectList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
        />
    </el-select>
</template>

<script>
// 组件说明：基于element的自定义数据下拉选择
// 组件使用eg：
// <custom-select :selectValue.sync="searchParams.userType" :selectList="$common.accountTypeList" :placeholder="'账号类型'"/>
export default {
    props: {
        selectList: { // 自定义的选项列表数据，必传
            type: Array,
            default: function () {
                return []
            }
        },
        selectValue: { // 当前选中值，选传，此参数-必写
            type: [Number, String],
            default: ''
        },
        placeholder: { // 占位符，选传
            type: String,
            default: '请选择'
        }
    },
    data () {
        return {
            callBackValue: '' // 当前选中值
        }
    },
    watch: {
        selectValue: function (val) { // 监听传入值的变化
            this.callBackValue = val
        },
        callBackValue: function (val) { // 监听选中值的变化，并进行回传
            this.$emit('update:selectValue', val)
        }
    }
}
</script>
