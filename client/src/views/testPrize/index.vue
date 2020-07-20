<template>
    <div class="prize">
        <div class="common_title">
            <img class="common_title_img" :src="giftsImg" alt="">
        </div>
        <div class="remain" v-if="pageInfo.flag > 0">抽奖次数剩余<span class="num">{{pageInfo.flag}}</span>次</div>
        <div class="remain" v-else-if="pageInfo.flag < 0">预约后可抽奖</div>
        <div class="remain" v-else>您已抽奖</div>
        <div class="prize_box">
            <div
                v-for="(item, index) in pageInfo.prizeList"
                :key="index"
                ref="prize"
                :class="['boxBorder', cIndex == index ? 'active' : '']"
                @click="goPrize">
                <img class="imgLi" :src="item.picUrlDesc" v-if="item.picUrlDesc" />
            </div>
        </div>
        <div class="myPrize" @click="myPrize">我的奖品</div>
        <van-dialog
            className="preDialog"
            v-model="dialogShow"
            title="武魂使，请输入手机号来预约吧"
            :show-confirm-button='false'
            :close-on-click-overlay = 'true'>
            <div class="container">
                <div>
                    <value-input
                        v-model="params.phone"
                        :maxlength='11'
                    />
                    <code-input
                        v-model="params.code"
                        :phone='params.phone'
                        :maxlength='4'
                        :rightPhone='params.phone.length === 11'
                        :codeType="1"
                    />
                    <div class="btn" @click="preGame">
                        <span
                            :class="[params.phone.length=== 11 && params.code.length === 4 ? 'canPreGame' : '']">
                            立即预约
                        </span>
                    </div>
                </div>
            </div>
        </van-dialog>
        <van-dialog
            className="prizeDialog"
            v-model="prizeDialog"
            title="恭喜您获得奖品"
            :show-confirm-button='false'
            :close-on-click-overlay = 'true'>
            <div class="prizeContainer">
               <div class="getprize">
                   <span>获得奖励</span>
                   <img class="prizeUrl" src="http://qdtalk.com/wp-content/uploads/2017/09/3-2.png"/>
                   <span>活动结束后我们将根据您的联系方式发送奖励</span>
               </div>
               <div class="concat">
                   <span>预约手机号</span>
                   <span class="phone">1111111</span>
               </div>
               <div class="address">
                   <span>联系地址</span>
                   <div class="address_input">
                        <input
                            class="_input"
                            v-model="params.address"
                            placeholder="请输入地址"
                            type="text"
                        />
                    </div>
               </div>
               <div class="btn" @click="submit">
                    <span
                        :class="[params.address ? 'canPreGame' : '']">
                        确定
                    </span>
                </div>
            </div>
        </van-dialog>
    </div>
</template>
<script>
export default {
    data () {
        return {
            giftsImg: require('@/assets/images/yy_img/gifts.png'), // 抽奖头部图片
            prizeBtn: require('@/assets/images/prize/prizeBtn.png'), // 开始抽奖按钮图
            pageInfo: { // 当前页面数据
                times: 1, // 剩余抽奖次数，=0已抽奖，>0有剩余抽奖次数，<0未预约
                prizeWinnerList: [], // 以往和当前抽中的奖品列表
                cPrizeWinner: { // 当前抽中奖品信息
                    endPosition: 8 // 默认谢谢参与
                },
                prizeList: [],
                prizeInfo: []
            },
            prizeConfig: { // 抽奖配置
                prizeIndexList: [0, 1, 2, 5, 8, 7, 6, 3], // 定义转动的顺序
                times: 0, // 转动跑格子次数
                speed: 2000 // 初始转动速度
            },
            cIndex: 4, // 当前所在图片下标/初始位置在点击开始抽奖位置
            dialogShow: false, // 是否展示预约框
            params: { // 参数
                phone: '', // 预约手机号
                code: '', // 验证码
                // newPrizeWinnerList: [], // 当前抽中的奖品列表
                address: '' // 收获地址
            },
            prizeDialog: false // 是否中奖
        }
    },
    created () {
        this.initPrizeData()
    },
    methods: {
        // 初始化页面数据
        initPrizeData () {
            this.pageInfo.prizeInfo = [{
                level: 0,
                picUrlDesc: 'http://qdtalk.com/wp-content/uploads/2017/09/1-2.png',
                prizeId: '436066c40529401287658bfd67c1d346',
                commodityName: '3福币'
            },
            {
                level: 1,
                picUrlDesc: 'http://qdtalk.com/wp-content/uploads/2017/09/2-2.png',
                prizeId: 'acdcb838bda74ec8b1fd202234f852ec',
                commodityName: '200优惠劵'
            },
            {
                level: 2,
                picUrlDesc: 'http://qdtalk.com/wp-content/uploads/2017/09/3-2.png',
                prizeId: '436066c40529401287658bfd67c1d346',
                commodityName: '3福币'
            }, {
                level: 3,
                picUrlDesc: 'http://qdtalk.com/wp-content/uploads/2017/09/4-2.png',
                prizeId: '436066c40529401287658bfd67c1d346',
                commodityName: '3福币'
            }, {
                level: 4,
                picUrlDesc: 'http://qdtalk.com/wp-content/uploads/2017/09/5-2.png',
                prizeId: '436066c40529401287658bfd67c1d346',
                commodityName: '3福币'
            }, {
                level: 5,
                picUrlDesc: 'http://qdtalk.com/wp-content/uploads/2017/09/6-1.png',
                prizeId: '436066c40529401287658bfd67c1d346',
                commodityName: '3福币'
            }, {
                level: 6,
                picUrlDesc: 'http://qdtalk.com/wp-content/uploads/2017/09/7-1.png',
                prizeId: '436066c40529401287658bfd67c1d346',
                commodityName: '3福币'
            }, {
                level: 7,
                picUrlDesc: 'http://qdtalk.com/wp-content/uploads/2017/09/8-1.png',
                prizeId: '436066c40529401287658bfd67c1d346',
                commodityName: '3福币'
            }]
            this.pageInfo.prizeList[0] = this.pageInfo.prizeInfo[0]
            this.pageInfo.prizeList[1] = this.pageInfo.prizeInfo[1]
            this.pageInfo.prizeList[2] = this.pageInfo.prizeInfo[2]
            this.pageInfo.prizeList[3] = this.pageInfo.prizeInfo[7]
            this.pageInfo.prizeList[4] = {
                level: 8,
                picUrlDesc: this.prizeBtn,
                prizeId: '333333'
            }
            this.pageInfo.prizeList[5] = this.pageInfo.prizeInfo[3]
            this.pageInfo.prizeList[6] = this.pageInfo.prizeInfo[6]
            this.pageInfo.prizeList[7] = this.pageInfo.prizeInfo[5]
            this.pageInfo.prizeList[8] = this.pageInfo.prizeInfo[4]
        },
        // 点击开始抽奖
        goPrize () {
            if (this.cIndex === 4) { // 当前点击位置是否在开始抽奖
                if (this.pageInfo.times < 0) { // 未预约
                    this.$toast('请预约后抽奖')
                    this.dialogShow = true
                    return
                }
                if (this.pageInfo.times > 0) { // 判断剩余抽奖次数
                    let countTimes = Math.floor(Math.random() * (100 - 51)) + 50 // 随机50-100/转动跑格子总次数
                    this.pageInfo.cPrizeWinner.endPosition = (Math.floor(countTimes / 8) - 1) * 8 + 3
                    console.log(countTimes, this.pageInfo.cPrizeWinner.endPosition)
                    setTimeout(this.startMove(countTimes), this.prizeConfig.speed)
                    // this.$apis.randomPrize().then(res => { // 抽中哪个奖品由接口返回
                    //     if (res.code === '2000') {
                    //         this.cPrizeWinner = res.data
                    //         计算结束位置
                    //         this.pageInfo.cPrizeWinner.endPosition = (Math.floor(countTimes / 8) - 1) * 8 + res.data.endPosition
                    //         // setTimeout(() => {
                    //         //     clearInterval(this.timer1)
                    //         //     this.()
                    //         // }, 1200)
                    //     } else {
                    //         this.$toast(res.message)
                    //     }
                    // })
                }
            }
        },
        // 开始转圈圈
        startMove (countTimes) {
            // this.$forceUpdate()
            // 每次转动
            this.cIndex = this.prizeConfig.prizeIndexList[this.prizeConfig.times % 8]
            // console.log(this.cIndex)
            if (this.prizeConfig.times < countTimes) this.prizeConfig.times++
            // console.log(this.prizeConfig.times, countTimes)
            // 是否转动到中奖位置
            if (this.prizeConfig.times >= this.pageInfo.cPrizeWinner.endPosition) { // 转圈圈结束
                this.cIndex = 4 // 初始化当前位置到点击开始抽奖位置
                this.pageInfo.cPrizeWinner.endPosition = 8 // 转动跑格子次数初始化为0，可以开始下次抽奖
                this.$toast('中奖了')
                // this.prizeDialog = true
            } else {
                if (this.prizeConfig.times < this.pageInfo.cPrizeWinner.endPosition / 2) {
                    this.prizeConfig.speed -= 40 // 加快转动速度
                } else {
                    this.prizeConfig.speed += 100 // 抽奖即将结束，放慢转动速度
                }
                setTimeout(this.startMove(countTimes), this.prizeConfig.speed)// 开始转动
            }
        },
        // 预约游戏
        preGame () {
            // let brandId = 15
            // if (location.hostname === 'jszh-pre.tianshigame.com') {
            //     brandId = 7
            // }
            if (this.params.phone.length === 11 && this.params.code.length === 4) {
                this.$apis.saveWebsiteGameReserve({
                    mobile: this.params.phone,
                    vcode: this.params.code
                    // appointmentGameId: '1555603200',
                    // vcodeType: '1',
                    // brandId: brandId
                }).then(res => {
                    if (res.code === '2000') {
                        this.submitSuccessStatus = true
                    } else {
                        this.$toast(res.message)
                    }
                })
            } else {
                console.log(2)
            }
        },
        // 查看奖品
        myPrize () {
            if (this.flag !== 1) {
                this.$toast('请预约后抽奖')
            } else {
                if (this.prizeWinner === {}) {
                    this.$toast('您还未抽奖')
                } else {
                    this.prizeDialog = true
                }
            }
        },
        submit () {

        }
    }
}
</script>
<style lang="less" scoped>
@import '../../../assets/less/common/_mixins.less';
    .prize{
        margin-top: .42rem;
        margin-bottom: .4rem;
    }
    .remain {
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 16px;
        .num {
            color: orange;
        }
    }
    .prize_box {
        border: 1px solid red;
        width: 90%;
        // height: 350px;
        text-align: center;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        .boxBorder {
            border: 1px solid seagreen;
            width: 88px;
            height: 88px;
            margin: 5px 11px;
            .imgLi {
                width: 100%;
                height: 100%;
            }
        }
        .active {
            border-color: red;
            opacity: .5;
        }
    }
    .myPrize {
        width: 25%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 16px;
        color: #fff;
        background-color: orange;
        margin: 5px 157px;
        border-radius: 6px;
    }
    .prizeContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 16px;
        .getprize {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 20px 0;
            .prizeUrl {
                width: 100px;
                height: 100px;
            }
        }
        .concat {
            width: 80%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            .phone {
                margin-left: 10px;
            }
        }
        .address {
            width: 80%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            align-items: center;
            color: #fff;
            .address_input {
                width: 50%;
                height: 40px;
                border: 1px solid #fff;
                color: #fff;
                padding-left: 5px;
                ._input {
                    width: 100%;
                    height: 100%;
                    color: #fff;
                     padding-left: 1em;
                     background: none;
                     outline: none;
                     border: none;
                }
            }
        }
    }
</style>
