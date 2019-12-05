<template>
  <div class="page">
    <div class="order-detail">
      <div class="account-tit">
        <router-link to="/account/withdrawOrder">{{$t('fbWithdrawOrder.text1')}}</router-link>
        <span class="el-icon-arrow-right"></span>
        <span>{{$t('common.detail')}}</span>
      </div>
      <mob-header to="/account/withdrawOrder">{{$t('fbWithdrawOrder.text1')}}</mob-header>
      <div v-if="load" class="g-loading-wrap">
        <div class="global-loading"></div>
      </div>
      <div v-else class="order-detail-list">
        <div class="order-detail-item">
          <div>{{$t('fbWithdrawOrder.text8')}}</div>
          <div class="yellow-color">{{detail.drawAmount | f4}}{{detail.systemCurrency}}</div>
          <div>{{$t('fbWithdrawOrder.text33')}}：{{detail.receiveAmount | f4}}{{detail.drawCurrency}}</div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('fbWithdrawOrder.text20')}}</span>
            <span>{{detail.id}}</span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('fbWithdrawOrder.text21')}}</span>
            <span>{{$changeDate(detail.createAt)}}</span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('fbWithdrawOrder.text22')}}：{{detail.systemCurrency}}/{{detail.drawCurrency}}</span>
            <span>1:{{detail.drawrate}}</span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('fbWithdrawOrder.text23')}}</span>
            <span>{{status2Text(detail)}}</span>
          </div>
        </div>
        <div class="order-detail-item" v-if="detail.bossNickName">
          <div class="flex">
            <span>{{$t('fbWithdrawOrder.text24')}}</span>
            <span>{{detail.bossNickName}}</span>
          </div>
        </div>
        <div class="order-detail-item" v-if="detail.feeRate">
          <div class="flex">
            <span>{{$t('fbWithdrawOrder.text25')}}</span>
            <span>{{detail.feeRate * 100}}%</span>
          </div>
        </div>
        <!--   老板银行卡信息   -->
        <div class="order-detail-item" v-if="detail.bossDrawBankAccount">
          <div class="flex">
            <div class="account-info" id="copyInfo2">
              <h4>{{$t('fbWithdrawOrder.text26')}}</h4>
              <p>
                {{detail.bossDrawBankAccount.realname}} &#x3000;&#x3000;
                <span>{{detail.bossDrawBankAccount.bankname}}</span>
              </p>
              <p>{{detail.bossDrawBankAccount.number}}</p>
              <p>
                {{detail.bossDrawBankAccount.subbank}}&#x3000;
                <span>{{detail.bossDrawBankAccount.subbankaddress}}</span>
              </p>
              <p>SWIFT : {{detail.bossDrawBankAccount.swift}}</p>
              <p>IBAN : {{detail.bossDrawBankAccount.iban}}</p>
            </div>
            <div class="copy">
              <div class="copy-btn btn" data-clipboard-target="#copyInfo2">{{$t('fbWithdrawOrder.text28')}}</div>
            </div>
          </div>
        </div>
        <!--   我的银行卡信息   -->
        <div class="order-detail-item">
          <div class="flex">
            <div class="account-info" id="copyInfo">
              <h4>{{$t('fbWithdrawOrder.text27')}}</h4>
              <p>
                {{detail.drawBankAccount.realname}} &#x3000;&#x3000;
                <span>{{detail.drawBankAccount.bankname}}</span>
              </p>
              <p>{{detail.drawBankAccount.number}}</p>
              <p>
                {{detail.drawBankAccount.subbank}}&#x3000;
                <span>{{detail.drawBankAccount.subbankaddress}}</span>
              </p>
              <p>SWIFT : {{detail.drawBankAccount.swift}}</p>
              <p>IBAN : {{detail.drawBankAccount.iban}}</p>
            </div>
            <div class="copy">
              <div class="copy-btn btn" data-clipboard-target="#copyInfo">{{$t('fbWithdrawOrder.text28')}}</div>
            </div>
          </div>
        </div>
        <div class="btn-wrap">
          <!--    在申诉状态    -->
          <div v-if="detail.problemStatus !== null">
            <div v-if="detail.problemStatus === 0">
              <router-link v-if="detail.userAddress === (detail.problemUseraddress || detail.problem.userAddress)" class="btn" :to="`/account/appeal?id=${id}&type=2`">{{$t('fbWithdrawOrder.text40')}}</router-link>
              <router-link v-else class="btn" :to="`/account/appeal?id=${id}&type=2`">{{$t('fbWithdrawOrder.text41')}}</router-link>
            </div>
            <router-link v-else class="btn" :to="`/account/appeal?id=${id}&type=2`">{{$t('fbWithdrawOrder.text40')}}</router-link>
          </div>
          <div v-else>
            <!--    等待选择共享者：取消订单,选择共享者    -->
            <div v-if="detail.status === 7 && detail.payStatus === 12">
              <button class="btn warn" @click="submit(1)">{{$t('fbRechargeOrder.text14')}}</button>
              <router-link class="btn" :to="`/account/withdrawOrder/fbWithdrawOrderSelectBoss?id=${id}`">{{$t('orderAction.text15')}}</router-link>
            </div>
            <!--    订单新创建：支付保证金、取消订单    -->
            <div v-if="detail.status === 0 && detail.payStatus === 0">
              <button class="btn warn" @click="submit(1)">{{$t('fbWithdrawOrder.text14')}}</button>
              <button class="btn" @click="submit(4)">{{$t('fbWithdrawOrder.text15')}}</button>
            </div>
            <!--    等待共享者接单：取消订单    -->
            <button class="btn warn" v-if="detail.status === 8" @click="submit(1)">{{$t('fbWithdrawOrder.text14')}}</button>
            <!--    等待您确认收款：申诉、确认收款    -->
            <div v-if="detail.payStatus === 15">
              <button class="btn warn" @click="submit(2)">{{$t('fbWithdrawOrder.text30')}}</button>
              <button class="btn" @click="submit(3)">{{$t('fbWithdrawOrder.text32')}}</button>
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
        drawBankAccount: {}
      },
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
      this.$fetch.post(`/bossDraw/queryMyOrderDetail?id=${this.id}`).then(res => {
        this.detail = res.data.data
        this.detail.drawBankAccount = JSON.parse(res.data.data.drawBankAccount)
        let bossAccount = this.detail.bossDrawBankAccount
        if (bossAccount) {
          this.detail.bossDrawBankAccount = JSON.parse(bossAccount)
        }
        this.payParams = {
          orderid: this.detail.id,
          type: 1
        }
        this.load = false
      })
    },
    submit (type) {
      // type 1 取消订单 2 申诉 3 确认收款 4 支付保证金
      if (type === 1) {
        this.$dialog({
          type: 'confirm',
          msg: this.$t('fbWithdrawOrder.text16'),
          okFn: () => {
            this.$fetch.post(`/bossDraw/cancelOrder?id=${this.id}`).then(res => {
              if (res.data.success) {
                this.$dialog({
                  msg: this.$t('fbWithdrawOrder.text17')
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
        this.$router.push(`/account/appeal?id=${this.id}&type=2`) // 此处的type  1:充值 2：提现
      }
      if (type === 3) {
        this.$dialog({
          type: 'confirm',
          msg: this.$t('fbWithdrawOrder.text38'),
          okFn: () => {
            this.$fetch.post('/bossDraw/confirmByStep', {
              orderId: this.id,
              confirmState: 4
            }).then(res => {
              if (res.data.success) {
                this.$dialog({
                  msg: this.$t('fbWithdrawOrder.text17')
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
      if (type === 4) {
        this.$refs.payDialog.show = true
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
        msg: this.$t('fbWithdrawOrder.text39')
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
