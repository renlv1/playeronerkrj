<template>
  <div class="myAccount">
    <div class="assets-wrapper">
      <h3 class="assets-title">{{$t('navigation.text1')}}</h3>
      <div class="assets-c">
        <div class="rpo">
          <div class="img-box"><img src="../../../assets/images/money/usd.png" alt=""></div>
          <span>RPO</span>
        </div>
        <div class="money-w">
          <div class="money">{{proBalance | f4}}</div>
          <div class="right">
            <div class="flex-item" @click="$router.push('/account/recharge')">
              <div class="img-box">
                <img src="../../../assets/images/money/chongzhi.png" alt="">
              </div>
              <div>{{$t('navigation.text2')}}</div>
            </div>
            <div class="flex-item" @click="$router.push('/account/withdraw')">
              <div class="img-box">
                <img src="../../../assets/images/money/tixian.png" alt="">
              </div>
              <div>{{$t('navigation.text3')}}</div>
            </div>
          </div>
        </div>
        <div class="activity-w">
          <p class="activity-desc">{{$t('navigation.text4')}}：</p>
          <div class="flex-item" v-for="(item, index) in myRewardArr" :key="index">
            <div class="left">
              <div class="img-box"><img src="../../../assets/images/money/usd.png" alt=""></div>
              <p>{{$t('joinLottery.text5')}} {{item.roundName}} {{$t('joinLottery.text6')}}</p>
            </div>
            <router-link tag="div" class="right" :to="`/lotteryDetail?id=${item.id}`">{{$t('navigation.text5')}} >></router-link>
          </div>
          <div class="global-empty" v-show="myRewardArr.length === 0">{{$t('common.emptyData')}}</div>
        </div>
      </div>
    </div>
    <div class="mobile-account">
      <mob-header>{{$t('navigation.text1')}}</mob-header>
      <div class="account-box">
        <div class="account-one">
          <div class="img-box">
            <div class="img-left"><div class="left"></div></div>
            <div class="img-title">{{$t('navigation.text1')}}</div>
            <div class="img-right"><div class="right"></div></div>
          </div>
          <div class="rpo-box">
            <div class="img-rpo"><img src="../../../assets/images/money/u668.png" alt=""></div>
            <span>RPO</span>
          </div>
          <div class="money">{{proBalance | f4}}</div>
          <div class="money-box">
            <div class="right-box">
              <div class="flex-item-one" @click="$router.push('/account/recharge')">
                <div class="right-img">
                  <img src="../../../assets/images/money/chongzhi.png" alt="">
                </div>
                <div class="text-c">{{$t('navigation.text2')}}</div>
              </div>
              <div class="flex-item-two" @click="$router.push('/account/withdraw')">
                <div class="right-img">
                  <img src="../../../assets/images/money/tixian.png" alt="">
                </div>
                <div class="text-c">{{$t('navigation.text3')}}</div>
              </div>
            </div>
          </div>
          <div class="activity">
            <div class="activity-img">
              <div class="left"><div class="left-img"></div></div>
              <div class="activity-title">{{$t('navigation.text4')}}</div>
              <div class="right"><div class="right-img"></div></div>
            </div>
            <ul class="ul-c">
              <li v-for="(item, index) in myRewardArr" :key="index" @click="$router.push({path: '/lotteryDetail', query: {id: item.id}})">
                <div class="li-left">
                  <div class="img-l"><img src="../../../assets/images/money/u668.png" alt=""></div>
                  <p>{{$t('joinLottery.text5')}} <span style="color: #e7ac50">{{item.roundName}}</span> {{$t('joinLottery.text6')}}</p>
                </div>
                <div class="li-right"><img src="../../../assets/images/money/right.png" alt=""></div>
              </li>
              <div class="global-empty" v-show="myRewardArr.length === 0">{{$t('common.emptyData')}}</div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      myRewardArr: []
    }
  },
  created () {
    this.getMyReward()
  },
  methods: {
    getMyReward () {
      this.$fetch.post(`${this.$api}/lotto/getMyReward`, {
        roundState: 1, // 0:未开启 1 正常 2 已结束
        pageIndex: '1',
        pageSize: '20'
      }).then(res => {
        if (res.data.success === true) {
          this.myRewardArr = res.data.data.roundList
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'proBalance'
    ])
  }
}
</script>

<style lang="less" scoped>
@e7ac50: #e7ac50;
@3b3131: #3b3131;
@7693fc: #7693fc;
.assets-wrapper{
  @media screen and (max-width:1200px) {
    display: none;
  }
  .rpo{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    color: @7693fc;
    .img-box{
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }
  .money-w{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 30px;
    border-bottom: 1px solid @3b3131;
    .money{
      font-size: 24px;
      color: @e7ac50;
      font-weight: bold;
    }
    .right{
      display: flex;
      align-items: center;
      font-weight: bold;
      .flex-item{
        display: flex;
        align-items: center;
        margin-left: 60px;
        color: @7693fc;
        cursor: pointer;
        .img-box{
          width: 22px;
          height: 20px;
          margin-right: 10px;
        }
      }
    }
  }
  .activity-w{
    .activity-desc{
      margin-top: 60px;
      font-size: 18px;
      color: @7693fc;
    }
    .no-result{
      text-align: center;
      color: #F75050;
      margin-top: 50px;
    }
    .flex-item{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 80px;
      border-bottom: 1px solid @3b3131;
      cursor: pointer;
      .left{
        font-size: 18px;
        color: #fff;
        display: flex;
        align-items: center;
        .img-box{
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
      }
      .right{
        font-size: 18px;
        color: @7693fc;
      }
    }
  }
}
.mobile-account {
  @media screen and (max-width:1200px) {
    display: block;
  }
  @media screen and (min-width: 1200px){
    display: none;
  }
  .account-box{
    padding: 0 10px;
    .account-one{
      display: flex;
      flex-direction: column;
      justify-content: center;
      .img-box{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px 0 20px;
        .img-left{
          width: 110px;
          height: 12px;
          .left{
            background-size: cover;
            display: block;
            width: 100%;
            height: 100%;
            zoom: .7;
            background: url("../../../assets/images/notInfo/left_2.png") no-repeat;
          }
        }
        .img-right{
          width: 110px;
          height: 10px;
          .right{
            background-size:100% 100%;
            display: block;
            width: 100%;
            height: 100%;
            zoom: .7;
            background: url("../../../assets/images/notInfo/right_2.png") no-repeat;
          }
        }
        .img-title{
          color: #e7ac50;
          font-size: 16px;
          padding-right: 10px;
        }
      }
      .rpo-box{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        color: @7693fc;
        .img-rpo{
          width: 20px;
          height: 20px;
          margin-right: 10px;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
      .money{
        text-align: center;
        font-size: 18px;
        color: @e7ac50;
        font-weight: bold;
        padding-bottom: 30px;
      }
      .money-box{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 30px;
        .right-box{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: bold;
          @media screen and (min-width:768px) {
            justify-content: center;
          }
          .flex-item-one{
            font-size: 18px;
            background-size: cover;
            width: 330px;
            height: 100px;
            zoom: .5;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
            color: @7693fc;
            cursor: pointer;
            background: url("../../../assets/images/common/rechargeTwo.png");
            @media screen and (max-width:320px) {
              zoom: .4;
            }
            .right-img{
              width: 36px;
              height: 30px;
              margin-right: 20px;
              img{
                width: 100%;
                height: 100%;
                display: block;
              }
            }
            .text-c{
              font-size: 32px;
            }
          }
          .flex-item-two{
            background-size: cover;
            width: 330px;
            height: 100px;
            zoom: .5;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
            color: @7693fc;
            cursor: pointer;
            background: url("../../../assets/images/common/withdraw.png");
            @media screen and (max-width:320px) {
              zoom: .4;
            }
            .right-img{
              width: 36px;
              height: 30px;
              margin-right: 20px;
              img{
                width: 100%;
                height: 100%;
                display: block;
              }
            }
            .text-c{
              font-size: 32px;
            }
          }
        }
      }
      .activity{
        .activity-img{
          display: flex;
          align-items: center;
          justify-content: center;
          padding-bottom: 30px;
          .left{
            margin-right: 30px;
            width: 21px;
            height: 14px;
            .left-img{
              display: block;
              width: 100%;
              height: 100%;
              background: url("../../../assets/images/money/y10.png");
            }
          }
          .right{
            margin-left: 30px;
            width: 21px;
            height: 14px;
            .right-img{
              display: block;
              width: 100%;
              height: 100%;
              background: url("../../../assets/images/money/y9.png");
            }
          }
          .activity-title{
            font-size: 16px;
            color: @e7ac50;
          }
        }
        .ul-c{
          width: 100%;
          display: flex;
          flex-direction: column;
          @media screen and (min-width: 745px) and (max-width:1200px) {
            align-items: center;
          }
          li{
            padding: 0 20px;
            width: 100%;
            height: 52px;
            line-height: 58px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            background: url("../../../assets/images/money/bg.png") no-repeat;
            background-size: 100%;
            @media screen and (min-width: 745px) and  (max-width:1024px) {
              width: 50%;
              height: 73px;
            }
            @media screen and (min-width: 1024px) and (max-width: 1200px) {
              width: 50%;
              height: 80px;
            }
            @media screen and (min-width: 414px) and (max-width: 468px) {
              height: 65px;
            }
            @media screen and (min-width: 468px) and (max-width: 644px) {
              height: 80px;
            }
            @media screen and (min-width: 644px) and (max-width: 740px) {
              height: 107px;
            }
            @media screen and (max-width:320px) {
              height: 46px;
            }
            @media screen and (min-width: 376px) and (max-width: 414px) {
              height: 58px;
            }
            .li-left{
              color: #7693fc;
              font-size: 16px;
              display: flex;
              align-items: center;
              .img-l{
                margin-right: 10px;
                img{
                  width: 20px;
                  height: 20px;
                  display: block;
                }
              }
            }
            .li-right{
              width: 10px;
              height: 17px;
              img{
                display: block;
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
