<template>
    <div class="emptyTime">
        <el-form-item label="是否有空白期">
            <template>
                <el-radio v-model="isEmptyTime" label="1">有</el-radio>
                <el-radio v-model="isEmptyTime" label="0">否</el-radio>
            </template>
        </el-form-item>
        <el-form-item v-if="isEmptyTime === '1'" label="空白期">
            <el-row v-for="(item, index) in emptyTimes" :key="index">
                <el-date-picker
                    class="g-m-b-10"
                    value-format="timestamp"
                    :clearable="false"
                    v-model="emptyTimes[index]"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                />
            </el-row>
            <el-button
                type="success"
                class="g-m-l-15"
                icon="el-icon-plus"
                round
                @click="handleAdd"
            />
            <el-button
                type="warning"
                class="g-m-l-15"
                icon="el-icon-minus"
                round
                @click="handleDel"
            />
        </el-form-item>
    </div>
</template>

<script>
/**
 * 组件说明：ui交互组件，空窗期
 * 组件使用eg：<emptyTime
                :time.sync="staffInfo.emptyWorkTime"
                @toggleChange="(val) => handleChangeTime(val, 'emptyWorkTime')"
            />
 */
export default {
    props: {
        classes: {
            type: String,
            default: ''
        },
        time: {
            type: [Array, String],
            default () {
                return []
            }
        }
    },
    data () {
        return {
            isEmptyTime: '0',
            emptyTimes: []
        }
    },
    watch: {
        time: {
            handler (val) {
                if (val && val.length) {
                    this.isEmptyTime = '1'
                    this.emptyTimes = JSON.parse(val)
                } else {
                    this.isEmptyTime = '0'
                    this.emptyTimes = []
                }
            },
            immediate: true
        },
        emptyTimes: {
            handler (val) {
                val && val.length && this.$emit('toggleChange', val)
            },
            deep: true
        }
    },
    methods: {
        handleAdd () {
            this.emptyTimes.push([])
        },
        handleDel () {
            this.emptyTimes.pop()
        }
    }
}
</script>

<style lang="less" scoped>
    .box /deep/ .el-form-item__content {
        word-break: break-all;
        display: flex;
        flex-direction: column;
    }
</style>
