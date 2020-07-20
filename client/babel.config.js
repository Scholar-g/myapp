module.exports = {
    presets: [
        '@vue/app'
    ],
    // 将使得 Babylon 尝试根据 ES6 的 import 或者 export 声明来进行推测。具有 ES6 import 和 export 的文件被认为是 "module"，否则被认为是 "script"
    sourceType: 'unambiguous'
}
