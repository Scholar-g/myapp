<template>
    <label @click="submit">
        <slot/>
    </label>
</template>

<script>
// 组件说明：基于element的防抖按钮
// 组件使用eg：
// <debounce-btn :callback="handleAdd"/>
export default {
    props: {
        callback: { // 需要防抖的事件，必传
            type: Function
        }
    },
    data () {
        return {
            debounce: null
        }
    },
    methods: {
        // 点击按钮
        submit () {
            this.handleDebounce(this.callback)
        },
        // 防抖函数
        handleDebounce (fn, wait = 2000) {
            if (typeof fn === 'boolean') {
                this.debounce && clearTimeout(this.debounce)
            } else {
                if (this.debounce === null) {
                    fn()
                    this.debounce = setTimeout(() => {
                        this.debounce = null
                    }, wait)
                }
            }
        }
    }
}
</script>
