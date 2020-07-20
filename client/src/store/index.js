import Vue from 'vue'
import Vuex from 'vuex'
import { commonModule } from './modules/common'
import { staffManageModule } from './modules/staffManage'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        [commonModule.name]: commonModule,
        [staffManageModule.name]: staffManageModule
    }
})
