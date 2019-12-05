<template>
  <div class="page">
    <div class="order-detail">
      <div class="account-tit">
        <a href="javascript:;" @click="$router.go(-1)">{{$t('fbRechargeOrder.text42')}}</a>
        <span class="el-icon-arrow-right"></span>
        <span>{{$t('common.detail')}}</span>
      </div>
      <mob-header>{{$t('fbRechargeOrder.text42')}}</mob-header>
      <div v-if="load" class="g-loading-wrap">
        <div class="global-loading"></div>
      </div>
      <div v-else class="order-detail-list">
        <div class="order-detail-item">
          <div>{{$t('fbRechargeOrder.text8')}}</div>
          <div class="yellow-color">{{detail.depositAmount | f4}}{{detail.systemCurrency}}</div>
          <div>{{$t('fbRechargeOrder.text43')}}：{{detail.receiveAmount | f4}}{{detail.depositCurrency}}</div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('fbRechargeOrder.text20')}}</span>
            <span>{{detail.id}}</span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('fbRechargeOrder.text21')}}</span>
            <span>{{$changeDate(detail.createAt)}}</span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('fbRechargeOrder.text22')}}：{{detail.systemCurrency}}/{{detail.depositCurrency}}</span>
            <span>1:{{detail.depositrate}}</span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('fbRechargeOrder.text23')}}</span>
            <span>{{status2Text(detail, true, true)}}</span>
          </div>
        </div>
        <div class="order-detail-item" v-if="detail.bossNickName">
          <div class="flex">
            <span>{{$t('fbRechargeOrder.text24')}}</span>
            <span>{{detail.bossNickName}}</span>
          </div>
        </div>
        <div class="order-detail-item" v-if="detail.feeRate">
          <div class="flex">
            <span>{{$t('fbRechargeOrder.text25')}}</span>
            <span>{{detail.feeRate * 100}}%</span>
          </div>
        </div>
        <!--   用户银行卡信息   -->
        <div class="order-detail-item" v-if="detail.giveBankAccount">
          <div class="flex">
            <div class="account-info" id="copyInfo">
              <h4>{{$t('fbRechargeOrder.text26')}}</h4>
              <p>
                {{detail.giveBankAccount.giveRealName}} &#x3000;&#x3000;
                <span>{{detail.giveBankAccount.giveBankName}}</span>
              </p>
              <p>{{detail.giveBankAccount.giveAccount}}</p>
              <p>
                {{detail.giveBankAccount.subbank}}
                <span>{{detail.giveBankAccount.subbankaddress}}</span>
              </p>
              <p>SWIFT : {{detail.giveBankAccount.swift}}</p>
              <p>IBAN : {{detail.giveBankAccount.iban}}</p>
            </div>
            <div class="copy">
              <div class="copy-btn btn" data-clipboard-target="#copyInfo">{{$t('fbRechargeOrder.text28')}}</div>
            </div>
          </div>
        </div>
        <!--   老板银行卡信息   -->
        <div class="order-detail-item" v-if="detail.bossBankAccount">
          <div class="flex">
            <div class="account-info" id="copyInfo2">
              <h4>{{$t('fbRechargeOrder.text27')}}</h4>
              <p>
                {{detail.bossBankAccount.realname}} &#x3000;&#x3000;
                <span>{{detail.bossBankAccount.bankname}}</span>
              </p>
              <p>{{detail.bossBankAccount.number}}</p>
              <p>
                {{detail.bossBankAccount.subbank}}&#x3000;
                <span>{{detail.bossBankAccount.subbankaddress}}</span>
              </p>
              <p>SWIFT : {{detail.bossBankAccount.swift}}</p>
              <p>IBAN : {{detail.bossBankAccount.iban}}</p>
            </div>
            <div class="copy">
              <div class="copy-btn btn" data-clipboard-target="#copyInfo2">{{$t('fbRechargeOrder.text28')}}</div>
            </div>
          </div>
        </div>

        <div class="btn-wrap">
          <!--    在申诉状态    -->
          <div v-if="detail.problemStatus !== null">
            <div v-if="detail.problemStatus === 0">
              <router-link v-if="detail.bossAddress === (detail.problemUseraddress || detail.problem.userAddress)" class="btn" :to="`/account/appeal?id=${id}&isBoss=1`">{{$t('fbWithdrawOrder.text40')}}</router-link>
              <router-link v-else class="btn" :to="`/account/appeal?id=${id}&isBoss=1`">{{$t('fbWithdrawOrder.text41')}}</router-link>
            </div>
            <router-link v-else class="btn" :to="`/account/appeal?id=${id}&isBoss=1`">{{$t('fbWithdrawOrder.text40')}}</router-link>
          </div>
          <div v-else>
            <!--    待接单： 接单、拒绝    -->
            <div v-if="detail.status === 0 && detail.payStatus === 11">
              <button class="btn warn" @click="submit(2)">{{$t('orderAction.text2')}}</button>
              <button class="btn" @click="submit(1)">{{$t('orderAction.text1')}}</button>
            </div>
            <!--    等待确认收款：申诉，我已收款    -->
            <div v-if="detail.payStatus === 13">
              <router-link class="warn btn" :to="`/account/appeal?id=${id}&isBoss=1`">{{$t('common.appeal')}}</router-link>
              <button class="btn" @click="submit(4)">{{$t('orderAction.text3')}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <payDialog @paySuccess="paySuccess" :params="payParams" ref="payDialog"/>
  </div>
</template>

<script>
import status2Text from '@/mixin/status'
import payDialog from '@/components/payDialog'
export default {
  data () {
    return {
      detail: {
        giveBankAccount: {},
        bossBankAccount: {}
      },
      bossInfo: {},
      id: this.$route.query.id,
      loading: false,
      load: true,
      payParams: {}
    }
  },
  mixins: [status2Text],
  components: {
    payDialog
  },
  methods: {
    getData () {
      this.$fetch.post(`/bossDeposit/handDepositDetail?depositId=${this.id}`).then(res => {
        this.detail = res.data.data
        this.detail.giveBankAccount = JSON.parse(res.data.data.giveBankAccount)
        let bossBankAccount = this.detail.bossBankAccount
        if (bossBankAccount) {
          this.detail.bossBankAccount = JSON.parse(bossBankAccount)
        }
        this.load = false
      })
    },
    submit (type) {
      // type 1：接单 2：拒绝 4：我已收款
      let text = ''
      if (type === 1) {
        text = this.$t('orderAction.text4')
      } else if (type === 2) {
        text = this.$t('orderAction.text5')
      } else if (type === 4) {
        text = this.$t('orderAction.text6')
      }
      if (type === 1) {
        this.$dialog({
          type: 'confirm',
          msg: text,
          okFn: () => {
            this.$fetch.post('/bossDeposit/payDepositOrderId', {
              orderid: this.id,
              type: 1,
              tradePwd: 'takingorder',
              code: 'takingorder'
            }).then(res => {
              if (res.data.success) {
                this.getData()
                this.$dialog({
                  msg: this.$t('common.doSuccess')
                })
              } else {
                if (res.data.msg === 'need_code') {
                  this.payParams = {
                    url: '/bossDeposit/payDepositOrderId',
                    orderid: this.id,
                    type: 1
                  }
                  this.$refs.payDialog.show = true
                } else {
                  this.$dialog({
                    msg: res.data.msg
                  })
                }
              }
            })
          }
        })
      } else {
        this.$dialog({
          type: 'confirm',
          msg: text,
          okFn: () => {
            this.$fetch.post('/bossDeposit/depositConfirm', {
              depositId: this.id,
              confirmState: type
            }).then(res => {
              if (res.data.success) {
                this.getData()
                this.$dialog({
                  msg: this.$t('common.doSuccess')
                })
              } else {
                this.$dialog({
                  msg: res.data.msg
                })
              }
            })
          }
        })
      }
    },
    initClipboard () {
      this.clipboard = new this.Clipboard('.copy-btn')
      this.clipboard.on('success', e => {
        this.$dialog({
          msg: this.$t('recharge.text6')
        })
      })
      this.clipboard.on('error', e => {
        this.$dialog({
          msg: this.$t('recharge.text7')
        })
      })
    },
    paySuccess () {
      this.getData()
      this.$dialog({
        msg: this.$t('common.doSuccess')
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getData()
      this.initClipboard()
    })
  },
  destroyed () {
    this.clipboard.destroy()
  }
}
</script>

<style lang="less" scoped>
  @import (reference) '~@/assets/css/mixin';
  .page{
    .btn-wrap{
      padding-top: 60px;
      text-align: center;
      padding-bottom: 40px;
    }
    .btn-wrap{
      .btn{
        width: 44%;
        margin: 0 1.5%;
      }
    }
    .copy{
      .btn{
        line-height: 32px;
        height: 32px;
        width: auto;
        padding: 0 16px;
        background: #555eb7;
        font-size: 16px;
      }
    }
    .yellow-color{
      padding: 15px 0;
      font-weight: bold;
      font-size: 20px;
    }
    .warn{
      background: #ee5a4e;
      &:hover{
        background: #e43333;
      }
      @media @mob{
        background-image: url(~@img/common/btn_bg_red.png) !important;
      }
    }
  }
</style>
