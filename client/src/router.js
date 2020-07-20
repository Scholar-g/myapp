import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: 'welcome'
        },
        {
            path: '*',
            name: '404',
            component: resolve => require(['@/views/404'], resolve)
        },
        {
            path: '/layout',
            name: 'layout',
            component: resolve => require(['@/views/layout'], resolve),
            children: [{
                path: '/welcome',
                name: 'welcome',
                component: resolve => require(['@/views/welcome'], resolve)
            }, {
                path: '/testEcharts',
                name: 'testEcharts',
                component: resolve => require(['@/views/testEcharts'], resolve),
                meta: {
                    preTitle: '测试demo',
                    title: 'echartsTest'
                }
            }]
        }
    ]
})
