<template>
  <div>
    <!-- 移动端-->
    <div class="mobile-account">
      <mob-header :hideReturn="true">{{$t('navigation.text20')}}</mob-header>
      <div class="padding">
        <div class="user-box">
          <div class="user-img">
            <!-- <img :src="userData.imgUrl" alt=""> -->
            <img src="~@img/my/avatar.png" width="80" height="80" alt="">
          </div>
          <div>
            <p class="username">{{userData.nickName}}</p>
            <p class="email">{{userData.email}}</p>
          </div>
        </div>
        <ul class="account-big-uls">
          <!--1.0 用户概览-->
          <li class="account-big-list">
            <div class="big-wrap" @click="checkOne(1)">
              <div class="img-box" v-if="selectSamllShow === 1">
                <img src="../../assets/images/my/account_menu/big-list-hover.png" alt="">
              </div>
              <div class="img-box" v-else>
                <img src="../../assets/images/my/account_menu/big-list-normal.png" alt="">
              </div>
              <div class="big-con">
                <div class="flex-item" :class="{'checked-icon': selectSamllShow === 1}">
                  <div class="icon icon1"></div>
                  <span>{{$t('navigation.text6')}}</span>
                </div>
                <div class="select" :class="{'big-select': selectSamllShow === 1}"></div>
              </div>
            </div>
            <ul class="small-uls" :class="{'select-small': selectSamllShow === 1}">
              <!-- 1.1 资产概况-->
              <li class="small-list">
                <div class="poiner"></div>
                <router-link to="/account/myAccount" tag="div" class="right">
                  <div class="img-box">
                    <img src="../../assets/images/my/account_menu/list-menu.png" alt="">
                  </div>
                  <div class="small-con">
                    <span>{{$t('navigation.text1')}}</span>
                    <div class="select"></div>
                  </div>
                </router-link>
              </li>
              <!-- 1.2 账户信息管理-->
              <li class="small-list">
                <div class="poiner"></div>
                <router-link to="/account/accountInformation" tag="div" class="right">
                  <div class="img-box">
                    <img src="../../assets/images/my/account_menu/list-menu.png" alt="">
                  </div>
                  <div class="small-con">
                    <span>{{$t('navigation.text7')}}</span>
                    <div class="select"></div>
                  </div>
                </router-link>
              </li>
              <!-- 1.3 交易账户管理-->
              <li class="small-list">
                <div class="poiner"></div>
                <router-link to="/account/transactionAccount" tag="div" class="right">
                  <div class="img-box">
                    <img src="../../assets/images/my/account_menu/list-menu.png" alt="">
                  </div>
                  <div class="small-con">
                    <span>{{$t('navigation.text8')}}</span>
                    <div class="select"></div>
                  </div>
                </router-link>
              </li>
              <!-- 1.3 推荐-->
              <li class="small-list">
                <div class="poiner"></div>
                <router-link to="/account/recommend" tag="div" class="right">
                  <div class="img-box">
                    <img src="../../assets/images/my/account_menu/list-menu.png" alt="">
                  </div>
                  <div class="small-con">
                    <span>{{$t('navigation.text9')}}</span>
                    <div class="select"></div>
                  </div>
                </router-link>
              </li>
            </ul>
          </li>
          <!-- 2.0 资产交易-->
          <li class="account-big-list">
            <div class="big-wrap"  @click="checkOne(2)">
              <div class="img-box" v-if="selectSamllShow === 2">
                <img src="../../assets/images/my/account_menu/big-list-hover.png" alt="">
              </div>
              <div class="img-box" v-else>
                <img src="../../assets/images/my/account_menu/big-list-normal.png" alt="">
              </div>
              <div class="big-con">
                <div class="flex-item" :class="{'checked-icon': selectSamllShow === 2}">
                  <div class="icon icon2"></div>
                  <span>{{$t('navigation.text10')}}</span>
                </div>
                <div class="select" :class="{'big-select': selectSamllShow === 2}"></div>
              </div>
            </div>
            <ul class="small-uls" :class="{'select-small': selectSamllShow === 2}">
              <!-- 2.1 雷达充值-->
              <li class="small-list">
                <div class="poiner"></div>
                <router-link to="/account/recharge" tag="div" class="right">
                  <div class="img-box">
                    <img src="../../assets/images/my/account_menu/list-menu.png" alt="">
                  </div>
                  <div class="small-con">
                    <span>{{$t('navigation.text2')}}</span>
                    <div class="select" :class="{'big-select': selectSamllShow === 2}"></div>
                  </div>
                </router-link>
              </li>
              <!-- 2.2 雷达提现-->
              <li class="small-list">
                <div class="poiner"></div>
                <router-link to="/account/withdraw" tag="div" class="right">
                  <div class="img-box">
                    <img src="../../assets/images/my/account_menu/list-menu.png" alt="">
                  </div>
                  <div class="small-con">
                    <span>{{$t('navigation.text3')}}</span>
                    <div class="select"></div>
                  </div>
                </router-link>
              </li>
              <!-- 2.3 法币充值-->
              <li class="small-list">
                <div class="poiner"></div>
                <router-link to="/account/fbRecharge" tag="div" class="right">
                  <div class="img-box">
                    <img src="../../assets/images/my/account_menu/list-menu.png" alt="">
                  </div>
                  <div class="small-con">
                    <span>{{$t('navigation.text22')}}</span>
                    <div class="select"></div>
                  </div>
                </router-link>
              </li>
              <!-- 2.4 法币提现-->
              <li class="small-list">
                <div class="poiner"></div>
                <router-link to="/account/fbWithdraw" tag="div" class="right">
                  <div class="img-box">
                    <img src="../../assets/images/my/account_menu/list-menu.png" alt="">
                  </div>
                  <div class="small-con">
                    <span>{{$t('navigation.text23')}}</span>
                    <div class="select"></div>
                  </div>
                </router-link>
              </li>
              <!-- 2.5 内部转账-->
              <li class="small-list">
                <div class="poiner"></div>
                <router-link to="/account/transferAccounts" tag="div" class="right">
                  <div class="img-box">
                    <img src="../../assets/images/my/account_menu/list-menu.png" alt="">
                  </div>
                  <div class="small-con">
                    <span>{{$t('navigation.text11')}}</span>
                    <div class="select"></div>
                  </div>
                </router-link>
              </li>
            </ul>
          </li>
          <!--3.0我的幸运每一天-->
          <li class="account-big-list">
            <div class="big-wrap"  @click="checkOne(3)">
              <div class="img-box" v-if="selectSamllShow === 3">
                <img src="../../assets/images/my/account_menu/big-list-hover.png" alt="">
              </div>
              <div class="img-box" v-else>
                <img src="../../assets/images/my/account_menu/big-list-normal.png" alt="">
              </div>
              <div class="big-con">
                <div class="flex-item" :class="{'checked-icon': selectSamllShow === 3}">
                  <div class="icon icon3"></div>
                  <span>{{$t('navigation.text12')}}</span>
                </div>
                <div class="select" :class="{'big-select': selectSamllShow === 3}"></div>
              </div>
            </div>
            <ul class="small-uls" :class="{'select-small': selectSamllShow === 3}">
              <!-- 3.1 我参与的-->
              <li class="small-list">
                <div class="poiner"></div>
                <router-link to="/account/joinLottery" tag="div" class="right">
                  <div class="img-box">
                    <img src="../../assets/images/my/account_menu/list-menu.png" alt="">
                  </div>
                  <div class="small-con">
                    <span>{{$t('navigation.text13')}}</span>
                    <div class="select"></div>
                  </div>
                </router-link>
              </li>
              <li class="small-list">
                <div class="poiner"></div>
                <router-link to="/account/reward" tag="div" class="right">
                  <div class="img-box">
                    <img src="../../assets/images/my/account_menu/list-menu.png" alt="">
                  </div>
                  <div class="small-con">
                    <span>{{$t('navigation.text14')}}</span>
                    <div class="select"></div>
                  </div>
                </router-link>
              </li>
              <li class="small-list">
                <div class="poiner"></div>
                <router-link to="/account/achievement" tag="div" class="right">
                  <div class="img-box">
                    <img src="../../assets/images/my/account_menu/list-menu.png" alt="">
                  </div>
                  <div class="small-con">
                    <span>{{$t('navigation.text21')}}</span>
                    <div class="select"></div>
                  </div>
                </router-link>
              </li>
            </ul>
          </li>
          <!--4.0 交易订单记录-->
          <li class="account-big-list">
            <div class="big-wrap"  @click="checkOne(4)">
              <div class="img-box" v-if="selectSamllShow === 4">
                <img src="../../assets/images/my/account_menu/big-list-hover.png" alt="">
              </div>
              <div class="img-box" v-else>
                <img src="../../assets/images/my/account_menu/big-list-normal.png" alt="">
              </div>
              <div class="big-con">
                <div class="flex-item" :class="{'checked-icon': selectSamllShow === 4}">
                  <div class="icon icon4"></div>
                  <span>{{$t('navigation.text15')}}</span>
                </div>
                <div class="select" :class="{'big-select': selectSamllShow === 4}"></div>
              </div>
            </div>
            <ul class="small-uls" :class="{'select-small': selectSamllShow === 4}">
              <!-- 4.1 我的账单-->
              <li class="small-list">
                <div class="poiner"></div>
                <router-link to="/account/order" tag="div" class="right">
                  <div class="img-box">
                    <img src="../../assets/images/my/account_menu/list-menu.png" alt="">
                  </div>
                  <div class="small-con">
                    <span>{{$t('navigation.text16')}}</span>
                    <div class="select"></div>
                  </div>
                </router-link>
              </li>
              <!-- 4.2 充值订单-->
              <li class="small-list">
                <div class="poiner"></div>
                <router-link to="/account/rechargeOrder" tag="div" class="right">
                  <div class="img-box">
                    <img src="../../assets/images/my/account_menu/list-menu.png" alt="">
                  </div>
                  <div class="small-con">
                    <span>{{$t('navigation.text17')}}</span>
                    <div class="select"></div>
                  </div>
                </router-link>
              </li>
              <!-- 4.3 提现订单-->
              <li class="small-list">
                <div class="poiner"></div>
                <router-link to="/account/withdrawOrder" tag="div" class="right">
                  <div class="img-box">
                    <img src="../../assets/images/my/account_menu/list-menu.png" alt="">
                  </div>
                  <div class="small-con">
                    <span>{{$t('navigation.text18')}}</span>
                    <div class="select"></div>
                  </div>
                </router-link>
              </li>
            </ul>
          </li>
          <!--5.0 共享者-->
          <li class="account-big-list" v-if="$store.getters.userData.isboss === 2">
            <div class="big-wrap"  @click="checkOne(5)">
              <div class="img-box" v-if="selectSamllShow === 5">
                <img src="../../assets/images/my/account_menu/big-list-hover.png" alt="">
              </div>
              <div class="img-box" v-else>
                <img src="../../assets/images/my/account_menu/big-list-normal.png" alt="">
              </div>
              <div class="big-con">
                <div class="flex-item" :class="{'checked-icon': selectSamllShow === 5}">
                  <div class="icon icon4"></div>
                  <span>{{$t('navigation.text24')}}</span>
                </div>
                <div class="select" :class="{'big-select': selectSamllShow === 5}"></div>
              </div>
            </div>
            <ul class="small-uls" :class="{'select-small': selectSamllShow === 5}">
              <!-- 5.1 共享者充值订单-->
              <li class="small-list">
                <div class="poiner"></div>
                <router-link to="/account/sharerRechargeOrder" tag="div" class="right">
                  <div class="img-box">
                    <img src="../../assets/images/my/account_menu/list-menu.png" alt="">
                  </div>
                  <div class="small-con">
                    <span>{{$t('navigation.text17')}}</span>
                    <div class="select"></div>
                  </div>
                </router-link>
              </li>
              <!-- 5.2 共享者提现订单-->
              <li class="small-list">
                <div class="poiner"></div>
                <router-link to="/account/sharerWithdrawOrder" tag="div" class="right">
                  <div class="img-box">
                    <img src="../../assets/images/my/account_menu/list-menu.png" alt="">
                  </div>
                  <div class="small-con">
                    <span>{{$t('navigation.text18')}}</span>
                    <div class="select"></div>
                  </div>
                </router-link>
              </li>
              <!-- 5.3 共享者设置-->
              <li class="small-list">
                <div class="poiner"></div>
                <router-link to="/account/sharerSettings" tag="div" class="right">
                  <div class="img-box">
                    <img src="../../assets/images/my/account_menu/list-menu.png" alt="">
                  </div>
                  <div class="small-con">
                    <span>{{$t('shareSetting.text2')}}</span>
                    <div class="select"></div>
                  </div>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      inputImg: require('../../assets/images/my/account_menu/big-list-normal.png'),
      selectSamllShow: 1
    }
  },
  mounted () {
    let _this = this
    window.onresize = function () {
      _this.gotoAccount()
    }
  },
  methods: {
    // 移动端 选择菜单
    checkOne (index) {
      if (this.selectSamllShow === index) {
        this.selectSamllShow = -1
      } else {
        this.selectSamllShow = index
      }
      this.inputImg = require('../../assets/images/my/account_menu/big-list.png')
    },
    gotoAccount () {
      if (this.$route.path === '/account/accountMobile' && window.innerWidth > 1200) {
        this.$router.push('/account/myAccount')
      }
    }
  },
  watch: {
    '$route': 'gotoAccount'
  },
  computed: {
    ...mapGetters([
      'userData'
    ])
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  img{
    display: block;
    width: 100%;
    height: 100%;
  }
  .mobile-account{
    width: 100%;
    background-color: #030D1A;
    @media screen and (min-width: 1200px) {
      display: none;
    }
    @media screen and (max-width: 1200px) {
      display: block;
    }
    .padding{
      padding: 24px 4%;
    }
    .bg-top{
      width: 100%;
      height: 13px;
      background: url("../../assets/images/my/border.png") no-repeat center / cover;
    }
    .user-box{
      color: #e7ac50;
      display: flex;
      align-items: center;
      .user-img{
        width: 60px;
        height: 60px;
        margin-right: 10px;
        background: url("../../assets/images/my/avatar_border.png") no-repeat center / cover;
      }
      .username{
        font-size: 20px;
        font-weight: bold;
      }
      .email{
        margin-top: 10px;
        font-size: 16px;
        word-wrap: break-word;
        word-break: break-all;
      }
    }
    .account-big-uls{
      margin-top: 30px;
      width: 100%;
      .account-big-list{
        width: 100%;
        .big-wrap{
          position: relative;
          height: 60px;
          font-size: 16px;
          color: #7693fc;
          margin-bottom: 10px;
          .img-box{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
          }
          .big-con{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 15px;
            .flex-item{
              display: flex;
              align-items: center;
              &.checked-icon{
                color: #e7ac50;
                .icon.icon1{
                  width: 20px;
                  height: 26px;
                  background: url("../../assets/images/my/checked/account.png") no-repeat center / cover;
                }
                .icon.icon2{
                  width: 12px;
                  height: 24px;
                  background: url("../../assets/images/my/checked/money.png") no-repeat center / cover;
                }
                .icon.icon3{
                  width: 20px;
                  height: 20px;
                  background: url("../../assets/images/my/checked/my-star.png") no-repeat center / cover;
                }
                .icon.icon4{
                  width: 20px;
                  height: 20px;
                  background: url("../../assets/images/my/checked/order.png") no-repeat center / cover;
                }
              }
              .icon{
                margin-right: 10px;
                &.icon1{
                  width: 20px;
                  height: 26px;
                  background: url("../../assets/images/my/no-checked/account.png") no-repeat center / cover;
                }
                &.icon2{
                  width: 12px;
                  height: 24px;
                  background: url("../../assets/images/my/no-checked/money.png") no-repeat center / cover;
                }
                &.icon3{
                  width: 20px;
                  height: 20px;
                  background: url("../../assets/images/my/no-checked/my-star.png") no-repeat center / cover;
                }
                &.icon4{
                  width: 20px;
                  height: 20px;
                  background: url("../../assets/images/my/no-checked/order.png") no-repeat center / cover;
                }
              }
            }
            .select{
              width: 17px;
              height: 10px;
              background: url("../../assets/images/my/no-checked/select.png") no-repeat center / cover;
              &.big-select{
                background: url("../../assets/images/my/checked/select.png") no-repeat center / cover;
              }
            }
          }
        }
        .small-uls{
          max-height: 0;
          overflow: hidden;
          transition: max-height .3s linear;
          &.select-small{
            max-height: 500px;
          }
          .small-list{
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            .poiner{
              width: 21px;
              height: 14px;
              margin-right: 10px;
              background: url("../../assets/images/my/account_menu/pointer.png") no-repeat center / cover;
            }
            .right{
              flex: 1;
              position: relative;
              height: 60px;
              font-size: 16px;
              color: #e7ac50;
              .img-box{
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
              }
              .small-con{
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 15px;
                font-size: 16px;
                color: #e7ac50;
                .select{
                  width: 17px;
                  height: 10px;
                  background: url("../../assets/images/my/checked/select.png") no-repeat center / cover;
                  transform: rotate(90deg);
                }
              }
            }
          }
        }
      }
    }
  }
</style>
