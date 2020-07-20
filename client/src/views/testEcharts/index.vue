<template>
    <div class="testEcharts">
        <div class="g-m-l-20">
            <el-tag class="g-pointer gauge_car_dark" @click="handleShowGaugeCarDark">GaugeCarDark</el-tag>
            <div class="g-relative surface_box">
                <div class="surface_tabs">
                    <span :class="['g-pointer surface_tab', activeType === 1 && 'selected_tab']"
                        @click="handleChangeType(1)">按游戏</span>
                    <span :class="['g-pointer g-m-l-20 surface_tab', activeType === 2 && 'selected_tab']"
                        @click="handleChangeType(2)">按部门</span>
                </div>
                <div class="stacking_histogram" id="stackingHistogram"></div>
            </div>
            <div class="g-m-t-30 bar_chart" id="barChart"></div>
            <div class="g-m-t-30 stacked_line_hart" id="stackedLineChart"></div>
        </div>
        <gauge-car-dark :titleName="titleName" :baseInfo="baseInfo" ref="gaugeCarDark" />
    </div>
</template>
<script>
// 展示仪表盘
import GaugeCarDark from './children/GaugeCarDark'
export default {
    components: {
        GaugeCarDark
    },
    data () {
        return {
            activeType: 1, // 表类型
            options: { // 绘制图形参数
                title: {
                    text: '', // 主标题文本
                    subtext: '' // 副标题文本
                },
                tooltip: {
                    trigger: 'axis', // 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    y: '320px', // legend标签的位置
                    data: [{
                        name: '', // 图例的数据名称
                        icon: '', // 设置图形
                        textStyle: { // 设置文本为颜色
                            color: ''
                        }
                    }]
                },
                grid: {
                    left: '3%', // 图表左距离（表外左空距）
                    bottom: '80px', // 为legend标签腾出图标下方位置一部分
                    containLabel: true // grid 区域是否包含坐标轴的刻度标签
                },
                xAxis: {}, // 上下两个 x 轴
                yAxis: {}, // 左右两个 y 轴
                series: [{
                    name: '已撤出区服', // 用于tooltip的显示，legend 的图例筛选
                    type: 'bar', // 图表类型
                    barWidth: 35, // 柱图宽度
                    stack: '广告', // 数据堆叠（同个类目轴上系列配置相同stack值，后一系列值在前一系列值上相加）
                    data: [] // 表数据
                },
                {
                    name: '未撤出区服',
                    type: 'bar',
                    stack: '广告',
                    data: []
                },
                {
                    name: '撤出区服中',
                    type: 'bar',
                    stack: '广告',
                    data: []
                }]
            },
            titleName: '', // 弹出的框子的名字
            baseInfo: {} // 传入弹框的数据
        }
    },
    mounted () {
        this.queryList()
    },
    methods: {
        // 切换查询方式（1-按游戏，2-按部门）
        handleChangeType (type) {
            this.activeType = type
        },
        // 堆叠柱状图数据查询
        queryList () {
            let params = {
                code: 'bjpks'
            }
            this.$apis.usersInfo(params).then(res => {
                if (res.code === '2000' || res.code === 2000) {
                    if (res.data) {
                        this.drawStackingHistogram(res.data) // 绘制堆叠柱状图
                        this.drawStackedLineChart(res.data) // 绘制折线堆叠图
                    }
                }
            }).catch(() => {
                console.log('提示：接口服务未启动，请前往开启本地数据库和本地服务')
            })
            this.$apis.datas().then(res => {
                if (res.code === '2000' || res.code === 2000) {
                    res.data && this.drawBarChart(res.data) // 绘制堆叠条形图
                }
            }).catch(() => {
                console.log('提示：接口服务未启动，请前往开启本地数据库和本地服务')
            })
        },
        // 绘制堆叠柱状图
        drawStackingHistogram (data) {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('stackingHistogram'))
            let options = this.$lodash.cloneDeep(this.options)
            options.title = {
                text: '游戏区服概览',
                subtext: '2019-12-23-2019-12-29 | 过去7天'
            }
            options.legend.data = [{
                name: '已撤出区服', // 图例的数据名称
                icon: 'image://https://gs-saas-dev.oss-cn-shanghai.aliyuncs.com/favicon.ico', // 设置图形
                textStyle: { // 设置文本为颜色
                    color: 'red'
                }
            }, '未撤出区服', '撤出区服中']
            options.xAxis = {
                type: 'category',
                data: data.map(item => item.time).slice(0, 5)
            }
            options.series.forEach((item, index) => {
                item.data = data.map(item => item.num).slice(index + 0, index + 6)
            })
            // 绘制堆叠柱状图
            myChart.setOption(options)
        },
        // 绘制堆叠条形图
        drawBarChart (data) {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('barChart'))
            let options = this.$lodash.cloneDeep(this.options)
            options.title = {
                text: '已分发账号',
                subtext: '2019-12-23-2019-12-29 | 过去7天'
            }
            options.yAxis = {
                type: 'category',
                data: data.map(item => item.name).slice(0, 5)
            }
            options.series[0].barWidth = 30
            options.series.forEach((item, index) => {
                item.data = data.map(item => item.num).slice(index + 0, index + 6)
            })
            // 绘制堆叠条形图
            myChart.setOption(options)
        },
        // 绘制折线堆叠图
        drawStackedLineChart (data) {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('stackedLineChart'))
            let options = this.$lodash.cloneDeep(this.options)
            options.title = {
                text: '折线图堆叠',
                subtext: '2019-12-23-2019-12-29 | 过去1234567890天'
            }
            options.tooltip.axisPointer.type = 'line'
            options.xAxis = {
                type: 'category',
                boundaryGap: false,
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return '降水量  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                        }
                    }
                },
                data: data.map(item => item.time).slice(0, 8)
            }
            options.series.forEach((item, index) => {
                item.type = 'line'
                item.seriesLayoutBy = 'row'
                item.data = data.map(item => item.num).slice(index + 0, index + 8)
                delete item.stack
            })
            // 绘制折线堆叠图
            myChart.setOption(options)
        },
        // 展示仪表盘
        handleShowGaugeCarDark () {
            this.baseInfo = this.$lodash.cloneDeep({})
            this.titleName = '仪表盘'
            this.$refs.gaugeCarDark.isShowDialog = true
        }
    }
}
</script>
<style lang="less" scoped>
    .testEcharts {
        .gauge_car_dark {
            margin-right: 36px;
            float: right;
        }
        .surface_box {
            width: 699px;
            clear: both;
        }
        .surface_tabs {
            float: right;
            right: 0;
        }
        .surface_tab {
            font-size: 14px;
            position: relative;
            z-index: 1;
        }
        .selected_tab {
            color: rgba(0, 121, 254, 0.980392156862745);
        }
        .stacking_histogram, .bar_chart, .stacked_line_hart {
            width: 820px;
            height: 380px;
        }
    }
</style>
