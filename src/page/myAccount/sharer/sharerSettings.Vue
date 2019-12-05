<template>
  <div class="sharerSettings page">
    <div class="account-tit">{{$t('shareSetting.text1')}}</div>
    <mob-header>{{$t('shareSetting.text1')}}</mob-header>
    <div v-if="load" class="g-loading-wrap">
      <div class="global-loading"></div>
    </div>
    <div v-else class="main">
      <div class="compile-box">
        <div class="tit">{{$t('shareSetting.text2')}}</div>
        <div class="compile" @click="$router.push('/account/sharerSettings/sharerEdit')">{{$t('shareSetting.text3')}}</div>
      </div>
      <div class="hr"></div>
      <div class="form">
        <div class="tit">{{$t('shareSetting.text4')}}</div>
        <div class="input-box" v-for="(value, key) in contact" :key="value">
          <div class="contactWay">{{key}}</div>
          <div class="contactWay-account">
            <div class="account">{{value}}</div>
          </div>
        </div>
        <div class="tit">{{$t('shareSetting.text5')}}</div>
        <div class="input-box top-up-fees">
          <div class="rate">{{applyInfo.depositRate * 100}}%</div>
        </div>
        <div class="tit">{{$t('shareSetting.text6')}}</div>
        <div class="input-box top-up-fees">
          <div class="rate">{{applyInfo.drawRate * 100}}%</div>
        </div>
        <div class="tit">{{$t('shareSetting.text7')}}</div>
        <div class="input-box currency-box">
          <div v-if="bossInfo.supportDeposit === 1">
            <div class="currency">CNY</div>
          </div>
          <div v-else>{{$t('shareSetting.text8')}}</div>
        </div>
        <div class="tit">{{$t('shareSetting.text9')}}</div>
        <div class="input-box currency-box">
          <div v-if="bossInfo.supportDraw === 1">
            <div class="currency">CNY</div>
          </div>
          <div v-else>{{$t('shareSetting.text8')}}</div>
        </div>
        <div class="tit">{{$t('shareSetting.text10')}}</div>
        <div class="account-management">
          <div class="currency-type" @click="showBank = !showBank" :class="{active: showBank}">
            <div class="currency">CNY</div>
            <div class="drop-down">
              <div class="is-binding">{{$t('shareSetting.text11')}} : {{bankList.length}} </div>
              <div class="btn-icon">
                <img src="../../../assets/images/my/sharer-settings/pic12.png" alt="">
              </div>
            </div>
          </div>
          <el-collapse-transition>
            <div class="bank-box" v-show="showBank">
              <div class="bank-mian">
                <div class="bank-list" v-for="item in bankList" :key="item.id">
                  <div class="content">
                    <div class="userName">{{item.realName}}<span class="bank">{{item.bankName}}</span></div>
                    <div class="card">{{item.bankNumber}}</div>
                    <div class="sub-branch">{{item.subBankName}}<span class="site">{{item.bankAddress}}</span></div>
                    <div class="swift breakLine">SWIFT : {{item.swift}}</div>
                    <div class="iban breakLine">IBAN : {{item.iban}}</div>
                  </div>
                  <div v-if="item.isDefault === 1">
                    <div class="default-bank cnShow"><img src="../../../assets/images/my/sharer-settings/pic14.png" alt=""></div>
                    <div class="default-bank enShow"><img src="../../../assets/images/my/sharer-settings/pic14_en.png" alt=""></div>
                  </div>
                </div>
              </div>
            </div>
          </el-collapse-transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showBank: true,
      bossInfo: {},
      contact: {},
      bankList: [],
      applyInfo: {},
      load: true
    }
  },
  methods: {
    // 获取钱老板信息
    getData () {
      this.$fetch.post('/boss/queryBossInfoByAddress').then(res => {
        this.load = false
        this.bossInfo = res.data.data
        if (this.bossInfo.contactWay) {
          this.contact = JSON.parse(this.bossInfo.contactWay)
        }
      })
    },
    // 获取充值提现费率
    getApplyInfo () {
      this.$fetch.post('/boss/getBossApplyBailAndCurrency').then(res => {
        this.applyInfo = res.data.data
      })
    },
    // 获取银行卡列表
    getbankList () {
      this.$fetch.post('/bank/queryBankInfoList', {
        currency: 'CNY',
        pageIndex: 1,
        pageSize: 20
      }).then(res => {
        this.bankList = res.data.data
      })
    }
  },
  mounted () {
    this.getData()
    this.getApplyInfo()
    this.getbankList()
  }
}
</script>

<style lang="less" scoped>
  @import (reference) '~@/assets/css/mixin';
  .sharerSettings{
    width: 100%;
    .title{
      font-size: 20px;
      font-weight: bold;
      color: #e7ac50;
      line-height: 1;
      padding: 20px 0 60px;
    }
    .main{
      width: 1000px;
      margin: 0 auto;
      margin-left: 40px;
      height: auto;
      .compile-box{
        width: 100%;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .tit{
          font-size: 20px;
          color: #7693fc;
        }
        .compile{
          width: 180px;
          height: 100%;
          line-height: 48px;
          text-align: center;
          background-color: #7693fc;
          font-size: 16px;
          color: #fff;
          border-radius: 4px;
          cursor: pointer;
        }
      }
      .hr{
        width: 100%;
        height: 1px;
        background-color: rgba(232, 172, 81, .3);
        margin: 40px auto;
      }
      .form{
        width: 100%;
        padding-bottom: 70px;
        .tit{
          font-size: 18px;
          color: #7693fc;
          padding-bottom: 20px;
        }
        .input-box{
          width: 100%;
          height: 48px;
          line-height: 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 16px;
          margin-bottom: 40px;
          color: #7693fc;
          .contactWay {
            width: 120px;
            height: 100%;
            text-align: center;
            border-radius: 4px;
            border: 1px solid rgba(232, 172, 81, .3);
          }
          .contactWay-account{
            width: 860px;
            height: 100%;
            border-radius: 4px;
            border: 1px solid rgba(232, 172, 81, .3);
            input {
              padding-left: 20px;
              font-size: 16px;
              color: #7693fc;
              &::-webkit-input-placeholder {
                color: #7693fc;
              }
              &:-moz-placeholder {
                color: #7693fc;
              }
              &:-ms-input-placeholder {
                color: #7693fc;
              }
            }
            .account{
              width: 100%;
              padding-left: 20px;
              font-size: 16px;
              color: #7693fc;
            }
          }
        }
        .top-up-fees{
          display: block;
          .rate{
            width: 100%;
            height: 48px;
            line-height: 48px;
            padding-left: 20px;
            border-radius: 4px;
            color: #7693fc;
            border: 1px solid rgba(232, 172, 81, .3);
          }
        }
        .currency-box{
          padding-left: 20px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          border-radius: 4px;
          border: 1px solid rgba(232, 172, 81, .3);
          .currency{
            margin: 0 114px 0 20px;
            font-size: 16px;
            color: #7693fc;
            position: relative;
            &:after{
              display: block;
              content: '';
              width: 8px;
              height: 8px;
              background-color: #7693fc;
              border-radius: 100%;
              position: absolute;
              top: 50%;
              left: -18px;
              transform: translateY(-50%);
            }
          }
        }
        .account-management{
          width: 100%;
          height: auto;
          border: 1px solid rgba(232, 172, 81, .3);
          border-radius: 4px;
          .currency-type{
            width: 100%;
            padding: 0 20px;
            height: 48px;
            line-height: 48px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            &.active{
              .btn-icon{
                transform: rotate(180deg);
                transform-origin: 60% center;
              }
            }
            .currency{
              font-size: 16px;
              color: #e7ac50;
            }
            .drop-down{
              display: flex;
              align-items: center;
              justify-content: space-between;
              cursor: pointer;
              .is-binding{
                font-size: 16px;
                color: #e7ac50;
              }
              .btn-icon{
               padding: 0 10px 0 20px;
               img{
                 vertical-align: middle;
               }
              }
            }
          }
          .bank-box{
            width: 100%;
            max-height: 450px;
            box-sizing: content-box;
            overflow-y: auto;
            border-top: 1px solid rgba(232, 172, 81, .3);
            /* 隐藏滚动条，当IE下溢出，仍然可以滚动 */
            /*-ms-overflow-style:none;*/
            /*火狐下隐显示动条*/
            overflow:-moz-scrollbars-vertical;
            /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
            &::-webkit-scrollbar {
              width: 6px;
              background-color: #242754;
            }
            /*定义滚动条轨道 内阴影+圆角*/
            &::-webkit-scrollbar-track {
              -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
              border-radius: 6px;
              background-color: #101229;
            }
            /*定义滑块 内阴影+圆角*/
            &::-webkit-scrollbar-thumb {
              border-radius: 6px;
              -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
              background-color: #242754;
            }
            .bank-mian{
              padding: 0 30px;
              .bank-list{
                width: 100%;
                padding: 0 30px 0 30px;
                margin-bottom: 30px;
                margin-top: 30px;
                border: 1px solid rgba(232, 172, 81, .3);
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                position: relative;
                .content{
                  width: auto;
                  color: rgba(232, 172, 81, .8);
                  padding-top: 20px;
                  div{
                    padding-bottom: 18px;
                  }
                  .userName{
                    .bank{
                      padding-left: 30px;
                    }
                  }
                  .sub-branch{
                    .site{
                      padding-left: 10px;
                    }
                  }
                }
                .edit-out{
                  width: auto;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  color: #386cea;
                  font-size: 16px;
                  div{
                    padding-left: 40px;
                    display: flex;
                    align-items: center;
                  }
                }
                .default-bank{
                  width: 40px;
                  height: 40px;
                  position: absolute;
                  right: 0;
                  top: 0;
                  img{
                    width: 100%;
                  }
                }
              }
            }
          }
        }
      }
    }
    @media @mob{
      .main{
        width: auto;
        margin: 20px 4%;
        .compile-box .tit,.form .tit{
          font-size: 16px;
        }
        .compile-box .compile{
          width: 40%;
          line-height: 40px;
          height: 40px;
        }
        .hr{
          margin: 20px 0;
        }
        .form .account-management .bank-box .bank-mian .bank-list{
          display: block;
        }
        .form .account-management .bank-box .bank-mian .bank-list .edit-out{
          width: auto;
          display: flex;
          align-items: center;
          color: #386cea;
          font-size: 16px;
          padding: 10px 0;
          border-top: 1px solid rgba(232, 172, 81, 0.3);
          margin: 0 -4%;
          div{
            display: block;
            padding-left: 0;
            text-align: center;
            flex: 1;
          }
        }
      }

      .bank-mian,.bank-list,.currency-type{
        padding: 0 4% !important;
      }
      .contactWay-account{
        flex: 1;
        margin-left: 20px;
        width: auto !important;
      }
    }
  }
</style>
