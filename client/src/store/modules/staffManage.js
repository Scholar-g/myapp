import apis from '@/apis'
const defaultState = {
    staffInfo: {}
}
export const STAFFMANAGE_STAFFINFO = 'STAFFMANAGE_STAFFINFO'
export const staffManageModule = {
    namespaced: true,
    name: 'staffManage',
    state: defaultState,
    getters: {
        staffInfo: state => state.staffInfo
    },
    actions: {
        [STAFFMANAGE_STAFFINFO] ({ state, commit }, data) {
            apis.getStaffDetail({
                staffId: data
            }).then(res => {
                if (res.code === '2000' && res.data) {
                    commit(STAFFMANAGE_STAFFINFO, res.data)
                }
            }).catch(err => {
                console.log(err)
            })
        }
    },
    mutations: {
        [STAFFMANAGE_STAFFINFO] (state, data) {
            state.staffInfo = data
        }
    }
}
