<template>
  <div class="sharerSettings page">
    <div class="account-tit">
      <a href="javascript:;" @click="$router.go(-1)">{{$t('shareSetting.text1')}}</a>
      <span class="el-icon-arrow-right"></span>
      <span>{{$t('shareSetting.text3')}}</span>
    </div>
    <mob-header>{{$t('shareSetting.text12')}}</mob-header>
    <div v-if="load" class="g-loading-wrap">
      <div class="global-loading"></div>
    </div>
    <div v-else class="main">
      <div class="form">
        <div class="tit">{{$t('shareSetting.text4')}}</div>
        <div class="select-wrap">
          <div class="flex-form">
            <div class="select-box area-code">
              <el-select v-model="contactSelected">
                <el-option
                  v-for="(item, index) in contactArr"
                  :key="index"
                  :value="item">
                </el-option>
              </el-select>
            </div>
            <input type="text" class="input" v-model="contactText">
          </div>
        </div>
        <!-- <div class="tit">充值费率</div>
        <div class="input-box top-up-fees">
          <div class="rate">{{applyInfo.depositRate * 100}}%</div>
        </div>
        <div class="tit">提现费率</div>
        <div class="input-box top-up-fees">
          <div class="rate">{{applyInfo.drawRate * 100}}%</div>
        </div> -->
        <div class="tit">{{$t('shareSetting.text7')}}</div>
        <div class="input-box currency-box">
          <el-checkbox v-model="supportDeposit">CNY</el-checkbox>
        </div>
        <div class="tit">{{$t('shareSetting.text9')}}</div>
        <div class="input-box currency-box">
          <el-checkbox v-model="supportDraw">CNY</el-checkbox>
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
                <router-link to="/account/transactionAccount/transactionAccountInfo?money=CNY" class="add-bank">+ {{$t('shareSetting.text15')}}</router-link>
                <div class="bank-list" v-for="item in bankList" :key="item.id">
                  <div class="content">
                    <div class="userName">{{item.realName}}<span class="bank">{{item.bankName}}</span></div>
                    <div class="card">{{item.bankNumber}}</div>
                    <div class="sub-branch">{{item.subBankName}}<span class="site">{{item.bankAddress}}</span></div>
                    <div class="swift breakLine">SWIFT : {{item.swift}}</div>
                    <div class="iban breakLine">IBAN : {{item.iban}}</div>
                  </div>
                  <div class="edit-out">
                    <div class="compile" @click="$router.push(`/account/transactionAccount/transactionAccountInfo?bankid=${item.id}&money=CNY`)"><img src="~@img/my/sharer-settings/u751.png" alt=""></div>
                    <div class="del" @click="deleteBank(item.id)"><img src="~@img/my/sharer-settings/delete.png" alt=""></div>
                    <div class="set-default" v-if="item.isDefault !== 1" @click="setDefault(item.id)">{{$t('shareSetting.text16')}}</div>
                    <div v-else class="default">
                      <div class="default-bank cnShow"><img src="../../../assets/images/my/sharer-settings/pic14.png" alt=""></div>
                      <div class="default-bank enShow"><img src="../../../assets/images/my/sharer-settings/pic14_en.png" alt=""></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </el-collapse-transition>
        </div>
      </div>
      <button class="btn" @click="submit">{{$t('shareSetting.text13')}}</button>
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
      load: true,
      contactSelected: '',
      contactText: '',
      contactArr: this.$t('shareSetting.contactType'),
      supportDeposit: false,
      supportDraw: false
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
          for (let item in this.contact) {
            this.contactSelected = item
            this.contactText = this.contact[item]
          }
        }
        this.supportDeposit = !!this.bossInfo.supportDeposit
        this.supportDraw = !!this.bossInfo.supportDraw
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
    },
    submit () {
      let bankInfoIds = []
      let currency = 'CNY'
      // 将所有的银行卡id存到一个数组传给后台，搞不懂为啥要这样
      this.bankList.forEach(item => {
        bankInfoIds.push(item.id)
      })
      bankInfoIds = bankInfoIds.join()

      let depositeSet = JSON.stringify([{
        currency,
        supportDeposit: this.supportDeposit ? '1' : '0',
        depositRate: this.applyInfo.depositRate,
        bankInfoIds
      }])
      let drawSet = JSON.stringify([{
        currency,
        supportDraw: this.supportDraw ? '1' : '0',
        drawRate: this.applyInfo.drawRate,
        bankInfoIds
      }])
      this.$fetch.post('/boss/editBossInfo', {
        depositeSet,
        drawSet,
        contactWay: `{"${this.contactSelected}": "${this.contactText}"}`
      }).then(res => {
        if (res.data.success) {
          this.$dialog({
            msg: this.$t('common.doSuccess'),
            okFn: () => {
              this.$router.back()
            }
          })
        } else {
          this.$dialog({
            msg: res.data.msg
          })
        }
      })
    },
    deleteBank (id) {
      this.$dialog({
        type: 'confirm',
        msg: this.$t('shareSetting.text14'),
        okFn: () => {
          this.$fetch.post('/bank/delBankInfo', {
            bankInfoId: id
          }).then(res => {
            if (res.data.success) {
              this.$dialog({
                msg: this.$t('common.doSuccess')
              })
            } else {
              this.$dialog({
                msg: res.data.msg
              })
            }
            this.getbankList()
          })
        }
      })
    },
    setDefault (id) {
      this.$fetch.post('/bank/setBankInfoDefault', {
        bankId: id
      }).then(res => {
        if (res.data.success) {
          this.$dialog({
            msg: this.$t('common.doSuccess')
          })
        } else {
          this.$dialog({
            msg: res.data.msg
          })
        }
        this.getbankList()
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
    padding-bottom: 50px;
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
            margin-right: 114px;
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
            max-height: 500px;
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
                  > div{
                    padding-left: 40px;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
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
    .default{
      flex: 0 !important;
      padding-left: 0 !important;
    }
    .select-wrap{
      margin-bottom: 40px;
      .flex-form{
        display: flex;
        align-items: center;
        position: relative;
        .select-box{
          width: 120px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #e7ac50;
          font-size: 16px;
          border: 1px solid rgba(232, 172, 81, 0.3);
          margin-right: 20px;
          cursor: pointer;
          .icon-select{
            margin-left: 8px;
            width: 15px;
            height: 8px;
          }
        }
        .input{
          border: 1px solid rgba(232, 172, 81, 0.3);
          flex: 1;
          height: 48px;
          line-height: 48px;
          padding-left: 20px;
          border-radius: 4px;
          color: #e7ac50 !important;
        }
      }
    }
    .add-bank{
      border: 1px dotted #e7ac50;
      color: #e7ac50;
      cursor: pointer;
      display: block;
      text-align: center;
      line-height: 42px;
      text-align: center;
      font-size: 18px;
      margin: 20px 0 10px;
      border-radius: 4px;
    }
    @media @mob{
      .main{
        width: auto;
        margin: 20px 4%;
        .input-box,.select-wrap{
          margin-bottom: 26px !important;
        }
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
<style lang="less">
  .area-code {
    .el-input__suffix{
      background: none;
    }
    .el-input__suffix{
      width: 50px;
    }
    .el-input--suffix .el-input__inner{
      padding-left: 0;
      padding-right: 10px;
      text-align: center;
    }
    .el-select .el-input .el-select__caret,.el-input__inner{
      color: #e7ac50 !important;
    }
    .el-icon-arrow-up:before{
      content: '\E605'
    }
  }
  .sharerSettings{
    .el-checkbox__input{}
    .el-checkbox__inner{
      background: none;
      border: 1px solid #e7ac50 !important;
      width: 16px;
      height: 16px;
      &:after{
        left: 5px;
        top: 2px;
      }
    }
    .el-checkbox__input.is-checked .el-checkbox__inner{
      background: #e7ac50;
    }
    .el-checkbox__label{
      font-size: 16px;
      color: #e7ac50 !important;
    }
    @media screen and (max-width: 320px) {
      .el-select .el-input__inner{
        font-size: 12px !important;
      }
      .select-box{
        margin-right: 10px !important;
      }
      .el-input__suffix{
        width: 40px;
      }
    }
  }

</style>
