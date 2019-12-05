<template>
  <div class="page">
    <div class="order-detail">
      <div class="account-tit">
        <router-link to="/account/rechargeOrder">{{$t('fbRechargeOrder.text1')}}</router-link>
        <span class="el-icon-arrow-right"></span>
        <span>{{$t('common.detail')}}</span>
      </div>
      <mob-header to="/account/rechargeOrder">{{$t('fbRechargeOrder.text1')}}</mob-header>
      <div v-if="load" class="g-loading-wrap">
        <div class="global-loading"></div>
      </div>
      <div v-else class="order-detail-list">
        <div class="order-detail-item">
          <div>{{$t('fbRechargeOrder.text8')}}</div>
          <div class="yellow-color">{{detail.depositAmount | f4}}{{detail.systemCurrency}}</div>
          <div v-if="detail.receiveAmount">{{$t('fbRechargeOrder.text33')}}：{{detail.receiveAmount | f4}}{{detail.depositCurrency}}</div>
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
        <div class="order-detail-item" v-if="detail.depositrate">
          <div class="flex">
            <span>{{$t('fbRechargeOrder.text22')}}：{{detail.systemCurrency}}/{{detail.depositCurrency}}</span>
            <span>1:{{detail.depositrate}}</span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('fbRechargeOrder.text23')}}</span>
            <span>{{status2Text(detail, true)}}</span>
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
        <!--   老板银行卡信息   -->
        <div class="order-detail-item" v-if="detail.bossBankAccount && detail.bossBankAccount.realname">
          <div class="flex">
            <div class="account-info" id="copyInfo2">
              <h4>{{$t('fbRechargeOrder.text44')}}</h4>
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
        <!--   我的银行卡信息   -->
        <div class="order-detail-item" v-if="detail.giveBankAccount">
          <div class="flex">
            <div class="account-info" id="copyInfo">
              <h4>{{$t('fbRechargeOrder.text27')}}</h4>
              <p>
                {{detail.giveBankAccount.giveRealName}} &#x3000;&#x3000;
                <span>{{detail.giveBankAccount.giveBankName}}</span>
              </p>
              <p>{{detail.giveBankAccount.giveAccount}}</p>
              <p>
                {{detail.giveBankAccount.subbank}}&#x3000;
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
        <div class="btn-wrap">
          <!--    在申诉状态    -->
          <div v-if="detail.problemStatus !== null">
            <div v-if="detail.problemStatus === 0">
              <router-link v-if="detail.userAddress === (detail.problemUseraddress || detail.problem.userAddress)" class="btn" :to="`/account/appeal?id=${id}`">{{$t('fbWithdrawOrder.text40')}}</router-link>
              <router-link v-else class="btn" :to="`/account/appeal?id=${id}`">{{$t('fbWithdrawOrder.text41')}}</router-link>
            </div>
            <router-link v-else class="btn" :to="`/account/appeal?id=${id}`">{{$t('fbWithdrawOrder.text40')}}</router-link>
          </div>
          <div v-else>
            <!--    等待选择共享者：取消订单,选择共享者    -->
            <div v-if="detail.status === 0 && detail.payStatus === 0">
              <button class="btn warn" @click="submit(1)">{{$t('fbRechargeOrder.text14')}}</button>
              <router-link class="btn" :to="`/account/rechargeOrder/fbRechargeOrderSelectBoss/?id=${id}`">{{$t('orderAction.text15')}}</router-link>
            </div>
            <!--    等待共享者接单：取消订单    -->
            <button class="btn warn" v-if="detail.status === 0 && detail.payStatus === 11" @click="submit(1)">{{$t('fbRechargeOrder.text14')}}</button>
            <!--    等待您向共享者转账：我已转账    -->
            <div v-if="detail.payStatus === 12">
              <button class="btn" @click="submit(3)">{{$t('fbRechargeOrder.text32')}}</button>
            </div>
            <!--    等待共享者确认收款：申诉    -->
            <div v-if="detail.payStatus === 13">
              <button class="btn warn" @click="submit(2)">{{$t('fbRechargeOrder.text30')}}</button>
            </div>
          </div>

        </div>
      </div>
    </div>
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
      // type 1 取消订单 2 申诉 3 我已转账
      if (type === 1) {
        this.$dialog({
          type: 'confirm',
          msg: this.$t('fbRechargeOrder.text16'),
          okFn: () => {
            this.$fetch.post(`/bossDeposit/cancleDeposit?depositId=${this.id}`).then(res => {
              if (res.data.success) {
                this.$dialog({
                  msg: this.$t('common.doSuccess')
                })
                this.getData()
              } else {
                this.$dialog({
                  msg: res.data.msg
                })
              }
            })
          }
        })
      }
      if (type === 2) {
        this.$router.push(`/account/appeal?id=${this.id}`)
      }
      if (type === 3) {
        this.$dialog({
          type: 'confirm',
          msg: this.$t('fbRechargeOrder.text38'),
          okFn: () => {
            this.$fetch.post('/bossDeposit/depositConfirm', {
              depositId: this.id,
              confirmState: 3
            }).then(res => {
              if (res.data.success) {
                this.$dialog({
                  msg: this.$t('fbRechargeOrder.text17')
                })
                this.getData()
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
        msg: this.$t('fbRechargeOrder.text39')
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
