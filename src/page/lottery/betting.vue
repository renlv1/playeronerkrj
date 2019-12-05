<template>
  <div class="page lottery-page">
    <div class="location">
      <div class="h-wrap">
        <a href="javascript:" @click="$router.go(-1)">{{$t('common.luckDay')}}</a>
        <span>></span>
        <span class="blue-color">{{$t('lotteryBetting.text1')}}</span>
      </div>
    </div>
    <mob-header>{{$t('lotteryBetting.text1')}}</mob-header>
    <div class="betting">
      <div class="h-wrap">

        <div class="web-pc title">
          <div class="design-title">
            <div class="text">{{$t('common.luckDay')}}<span> {{detail.roundName}} </span>{{$t('lotteryBetting.text2')}}</div>
          </div>
        </div>
        <div class="web-mob mob-title">
          <div class="text">{{$t('common.luckDay')}}<span> {{detail.roundName}} </span>{{$t('lotteryBetting.text2')}}</div>
        </div>
        <div class="form">
          <!-- <div class="input-wrap">
            <p>{{$t('lotteryBetting.text3')}}</p>
            <el-select v-model="currency"  placeholder="{{$t('lotteryBetting.text3')}}">
              <el-option
                v-for="item in currencyOption"
                :key="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </div> -->
          <div class="input-wrap">
            <p>{{$t('lotteryBetting.text4')}}<span class="yellow-color">（{{$t('lotteryBetting.text5')}} {{detail.minJoinAmount | f4}}{{this.currency}}）</span></p>
            <input class="input" v-model="amount" type="text" :placeholder="$t('lotteryBetting.text6')">
            <div class="balance">{{this.currency}} {{$t('lotteryBetting.text7')}} <span class="yellow-color">{{userAccount[this.currency] && userAccount[this.currency].balance | f4}}{{this.currency}}</span></div>
          </div>
          <!-- <div class="input-wrap">
            <p>{{$t('lotteryBetting.text8')}}</p>
            <div class="sale-tips">{{$t('lotteryBetting.text9')}}95{{$t('lotteryBetting.text10')}}{{$t('lotteryBetting.text11')}}</div>
            <input class="input" v-model="couponCode" type="text" :placeholder="$t('lotteryBetting.text12')">
          </div> -->
          <button class="btn" :loading="loading" :disabled="!amount" @click="submit">{{$t('lotteryBetting.text13')}}</button>
          <pay-dialog @paySuccess="paySuccess" :params="payParams" ref="payDialog" />
        </div>
      </div>
    </div>
    <div v-if="load" class="global-loading fixed"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import payDialog from '@/components/payDialog'
export default {
  data () {
    return {
      currency: 'RPO',
      currencyOption: [{ // 支付币种
        value: 'RPO'
      }],
      detail: {},
      amount: '',
      roundId: this.$route.query.id,
      couponCode: '',
      loading: false,
      load: true,
      payParams: {}
    }
  },
  computed: {
    ...mapGetters([
      'userData',
      'userAccount',
      'loginFlag'
    ])
  },
  components: {
    payDialog
  },
  methods: {
    getData () {
      this.$fetch.post(`/lotto/lottoRewardDetail?roundId=${this.roundId}`).then(res => {
        this.load = false
        this.detail = res.data.data.rewardRound
      })
    },
    submit () {
      let balance = parseFloat(this.userAccount[this.currency].balance)
      let minJoinAmount = parseFloat(this.detail.minJoinAmount)
      if (!this.loginFlag) {
        this.$dialog({
          type: 'confirm',
          msg: this.$t('lotteryBetting.text14'),
          okText: this.$t('lotteryBetting.text15'),
          okFn: () => {
            this.$router.push('/login')
          }
        })
      } else if (!/^\d+(\.\d{0,4})?$/.test(this.amount)) { // 金额格式不正确
        this.$dialog({
          msg: this.$t('lotteryBetting.text16')
        })
      } else if (parseFloat(this.amount) < minJoinAmount) { // 小于最低投注金额
        this.$dialog({
          msg: `${this.$t('lotteryBetting.text17')}${minJoinAmount.toFixed(4)}${this.currency}`
        })
      } else if (parseFloat(this.amount) > balance) { // 大于余额
        this.$dialog({
          msg: this.$t('lotteryBetting.text18')
        })
      } else if (this.userData.openTradePassword !== 2 || this.userData.openGoogleCode !== 2) { // 没有设置谷歌或安全密码
        this.$dialog({
          type: 'confirm',
          msg: this.$t('lotteryBetting.text19'),
          okText: this.$t('lotteryBetting.text20'),
          okFn: () => {
            this.$router.push('/account/accountInformation')
          }
        })
      } else {
        this.loading = true
        this.$fetch.post('/lotto/createLottoOrder', {
          amount: this.amount,
          roundId: this.roundId,
          paymentCurrency: this.currency,
          couponCode: this.couponCode
        }).then(res => {
          this.loading = false
          if (res.data.success) {
            // 创建提现订单之后弹出支付框进行转账
            this.payParams.id = res.data.data.transactionId
            this.$refs.payDialog.show = true
          } else {
            this.$dialog({
              msg: res.data.msg
            })
          }
        })
      }
    },
    paySuccess () {
      this.$dialog({
        msg: this.$t('lotteryBetting.text21'),
        okFn: () => {
          this.$router.go(-1)
        }
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/mixin';
  .betting{
    line-height: 1.4;
    .h-wrap{
      width: 800px;
    }
    .title{
      font-size: 32px;
      padding: 60px 0 40px;
      text-align: center;
      &-bg{
        display: inline-block;
        color: @yellow;
        padding: 0 165px;
        background: url(~@img/lottery/betting_left.png) left center no-repeat,
                    url(~@img/lottery/betting_right.png) right center no-repeat;
      }
    }
    .input-wrap{
      margin-bottom: 30px;
    }
    p{
      margin-bottom: 20px;
    }
    .balance{
      padding: 20px 0 30px;
      // border-bottom: 1px solid #413a41;
    }
    .sale-tips{
      color: @yellow;
      padding: 0 0 30px;
    }
    .btn{
      // margin-top: 60px;
    }
  }
</style>
