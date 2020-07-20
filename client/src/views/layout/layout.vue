<template>
    <div class="layoutPage">
        <el-tooltip class="g-m-tb-20 g-m-lr-20" effect="dark" content="菜单" placement="bottom">
            <el-button type="primary" round  @click="drawer = true">{{$brandInfo.brandName}}</el-button>
        </el-tooltip>
        <router-view/>
        <el-drawer
            custom-class="lay_drawer"
            title="This is the menu."
            :show-close="false"
            :visible.sync="drawer"
            direction="rtl">
            <div class="card_box" v-for="(item, index) in menus" :key="index"  @click="handleChangeRouter(item.route)">
                <el-card shadow="hover">{{item.charTxt}}</el-card>
            </div>
        </el-drawer>
    </div>
</template>

<script>
export default {
    data () {
        return {
            drawer: false,
            menus: [{
                route: 'welcome',
                charTxt: 'Socket...'
            }, {
                route: 'testEcharts',
                charTxt: '_Echarts'
            }, {
                route: 'welcome',
                charTxt: 'Shows^'
            }, {
                route: 'welcome',
                charTxt: '-Moves-'
            }, {
                route: 'welcome',
                charTxt: 'Others_'
            }]
        }
    },
    methods: {
        // 进入对应demo页面
        handleChangeRouter (route) {
            this.$router.replace(`/${route}`)
            this.drawer = false
        }
    }
}
</script>

<style lang="less">
    .lay_drawer {
        width: 200px !important;
        text-align: center;
        .card_box {
            width: 160px;
            margin-left: 20px;
            margin-bottom: 10px;
        }
    }
</style>
<style lang="less" scoped>
    .layoutPage {
        height: 100%;
    }
</style>
