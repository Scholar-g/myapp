<template>
    <div class="cell g-flex g-ai-c g-border-e5e5e5 g-bg-f9" :class="classes">
        <div class=" g-fs-0 name">{{theName || '/'}}</div>
        <div class="value g-bg-white">{{theValue || '/'}}</div>
        <el-tooltip v-if="more.length > 1" effect="dark" placement="top-start">
            <div v-show="index !== 0" v-for="(item, index) in more" :key="index" slot="content">{{item | timestampToDay}}<br/></div>
            <span class="more">更多</span>
        </el-tooltip>
    </div>
</template>

<script>
/**
 * 组件说明：ui小组件，左右文字显示的cell
 * 组件使用eg：<cell theName="姓名" theValue="张三"/>
 */
export default {
    props: {
        classes: {
            type: String,
            default: ''
        },
        theName: {
            type: [String, Number],
            default: ''
        },
        theValue: {
            type: [String, Number],
            default: ''
        },
        more: {
            type: Array,
            default: function () {
                return []
            }
        }
    }
}
</script>

<style lang="less" scoped>
.cell {
    margin-right: 15px;
    margin-bottom: 15px;
    width: 390px;
    font-size: 12px;
    .name, .value {
        color: #363636;
        padding: 10px 15px;
    }
    .name {
        width: 120px;
    }
    .value {
        min-width: 150px;
    }
    .more{
        color: #409EFF;
        padding: 10px 15px;
    }
}
</style>
