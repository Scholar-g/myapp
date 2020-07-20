// 基础组件
import numberList from './basicComponents/numberList.vue'
import pagination from './basicComponents/pagination.vue'
import debounceBtn from './basicComponents/debounceBtn.vue'
import customSelect from './basicComponents/customSelect.vue'
import cell from './basicComponents/cell.vue'
// 业务组件
import emptyTime from './businessComponents/emptyTime.vue'
import staffSelect from './businessComponents/staffSelect.vue'

const BaseComponent = {
    install: function (Vue) {
        Vue.component('numberList', numberList)
        Vue.component('pagination', pagination)
        Vue.component('debounceBtn', debounceBtn)
        Vue.component('customSelect', customSelect)
        Vue.component('cell', cell)
        Vue.component('emptyTime', emptyTime)
        Vue.component('staffSelect', staffSelect)
    }
}
export default BaseComponent
