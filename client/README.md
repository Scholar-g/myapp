## 用于调研实验项目
> 技术调研实验

## 功能简述
1. 主界面包含: 首页wellcome
2. 主功能包含: 本地mysql数据、eslint、vue全家桶、elementUI、echarts等

## 安装预览

```bash
# 安装依赖
npm i || yarn || cnpm

# 启动本地调试
npm run dev || npm start

# 打包压缩
npm run build

# eslint格式校验
npm run lint
```


## 项目结构

```
.
├── README.md  ------------------------ 说明文件
├── package.json  --------------------- 项目配置
├── vue.config.js  -------------------- webpack配置入口
├── public  --------------------------- 入口文件
├──   ├── favicon.ico  ---------------- 网页图标
├──   └── index.html  ----------------- 入口页面
└── src  ------------------------------ 源码目录
    ├── apis  ------------------------- 请求的所有接口（分模块）
    ├── assets  ----------------------- 项目资源文件目录（图片、字体等）
    ├──  ├── images  ------------------ 所有图片
    ├──  ├── json  -------------------- 本地json文件（eg：省市区）
    ├──  ├── less  -------------------- 所有样式
    ├──  ├──  ├── index.less  --------- 所有样式引入入口
    ├──  ├──  ├── common/_base -------- 公共基础样式
    ├──  ├──  ├── common/_common ------ 通用公共样式
    ├──  ├──  ├── common/_components -- 公共样式部件
    ├──  ├──  ├── common/_iconfont ---- 公共icon
    ├──  ├──  ├── common/_mixins ------ 公共混入样式
    ├──  ├──  ├── common/_resetElement- 重置elementUI样式
    ├──  ├──  ├── common/_theme ------- 主题色配置
    ├── components  ------------------- 业务模块集合目录（组件）
    ├──  ├── basicComponents  --------- 所有基础通用组件
    ├──  ├── businessComponents  ------ 所有业务组件
    ├──  ├── index  ------------------- 所有组件入口
    ├── js ---------------------------- 全局变量
    ├──  ├── auth  -------------------- 资源权限配置
    ├──  ├── common  ------------------ 挂载在$common上的数据
    ├──  ├── fetch  ------------------- 请求配置 (axios mock配置管理文件)
    ├──  ├── filter  ------------------ 数据过滤展示
    ├──  ├── formatters  -------------- 数据格式化配置
    ├──  ├── utils  ------------------- 工具函数（eg：阿里云上传/文件流下载）
    ├──  └── veeValidate -------------- 表单校验配置
    ├── plugins  ---------------------- 引入的插件自动生成的配置
    ├── store  ------------------------ vuex（分模块）
    ├── views  ------------------------ 页面集合目录
    ├── App.less  --------------------- 主样式
    ├── App.vue  ---------------------- 主组件
    ├── main.js  ---------------------- 项目级入口配置文件
    └── router.js  -------------------- 路由配置
```

## 常见问题说明
1. 如果`vee-validate`在项目运行时报错，请重新安装旧版本，操作如下：
* `npm uninstall vee-validate` 或 `yarn remove vee-validate`
* `npm install vee-validate@2.0.0-rc.25` 或 `yarn add vee-validate@2.0.0-rc.25`

2. 路由模式变更，操作如下：
* router.js -> 路由切换history模式去URL中的#号，`mode: 'history'`
* vue.config.js -> 注释掉`baseUrl: process.env.NODE_ENV === 'production' ? './' : '/'`即可
