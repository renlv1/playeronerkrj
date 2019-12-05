<template>
  <div class="page">
    <div class="account-tit">{{$t('fbWithdraw.text1')}}</div>
    <mob-header>{{$t('fbWithdraw.text1')}}</mob-header>
    <div class="assets-trade">
      <div class="select input-wrap">
        <p>{{$t('fbWithdraw.text2')}}</p>
        <el-select v-model="collectCurrency">
          <el-option
            v-for="val in currencyRate"
            :key="val.currency"
            :value="val.currency">
          </el-option>
        </el-select>
      </div>
      <div class="input-wrap">
        <p>
          {{$t('fbWithdraw.text3')}} ( {{$t('fbWithdraw.text15')}} ({{currency}}/{{collectCurrency}}):1:{{currencyRate && currencyRate[collectCurrency].rate}})
        </p>
        <div class="rel">
          <input type="text" v-model="amount" class="input" :placeholder="`${$t('fbWithdraw.text4')}${userAccount && userAccount[currency].balance.toFixed(4)}${currency}`">
          <div class="saleMoney">{{$t('fbWithdraw.text8')}} : {{saleMoeny | f4}} {{collectCurrency}}</div>
          <div class="all" @click="amount = userAccount[currency].balance.toFixed(4)">{{$t('fbWithdraw.text5')}}</div>
        </div>
      </div>
      <div class="select input-wrap" v-if="bankList.length">
        <p>{{$t('fbWithdraw.text6')}}</p>
        <el-select v-model="selectedBank" value-key="id">
          <el-option
            v-for="item in bankList"
            :key="item.id"
            :label="`${item.bankName} ${item.bankNumber}`"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="input-wrap account-list">
        <div v-if="load" class="g-loading-wrap">
          <div class="global-loading"></div>
        </div>
        <div v-else>
          <div v-if="!bankList.length">
            <div class="global-empty">{{$t('common.emptyData')}}，<router-link style="color: #6485fd;text-decoration:underline" to="/account/transactionAccount/transactionAccountInfo?money=CNY" class="blue-color">{{$t('fbWithdraw.text16')}}<i class="el-icon-arrow-right"></i></router-link></div>
          </div>
        </div>
        <div class="account-item" v-if="selectedBank.id">
          <div>
            <div class="name">{{selectedBank.realName}}</div>
          </div>
          <div class="number">
            <div>{{selectedBank.bankName}}</div>
            <div>{{selectedBank.bankNumber}}</div>
          </div>
        </div>
      </div>
      <button @click="submit" :loading="loading" :disabled="!parseFloat(amount) || !selectedBank.id || loading" class="btn">{{$t('common.sure')}}</button>
    </div>
    <payDialog @cancel="jump" @paySuccess="paySuccess" ref="payDialog" :params="payParams"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import payDialog from '@/components/payDialog'
export default {
  data () {
    return {
      currency: 'RPO',
      collectCurrency: 'CNY',
      amount: '',
      bankList: [],
      selectedBank: {}, // 选中的银行
      load: true,
      loading: false,
      transactionid: '', // 后台生成的提现订单ID
      payParams: {},
      jumpId: '' // 跳往页面的id
    }
  },
  computed: {
    ...mapGetters([
      'userData',
      'userAccount',
      'currencyRate'
    ]),
    saleMoeny: function () {
      return (this.amount * (this.currencyRate && this.currencyRate[this.collectCurrency].rate))
    }
  },
  components: {
    payDialog
  },
  methods: {
    // 获取交易账户列表
    getbankList () {
      this.load = true
      this.selectedIndex = -1
      this.$fetch.post('/bank/queryBankInfoList', {
        currency: this.collectCurrency,
        pageIndex: 1,
        pageSize: 20
      }).then(res => {
        this.load = false
        this.bankList = res.data.data
      })
    },
    // 检查账号是否设置安全密码和谷歌验证码
    checkAccount () {
      return this.userData.openTradePassword !== 2 || this.userData.openGoogleCode !== 2
    },
    submit () {
      let balance = parseFloat(this.userAccount[this.currency].balance) // 用户余额
      if (!/^\d+(\.\d{0,4})?$/.test(this.amount)) { // 金额格式不正确
        this.$dialog({
          msg: this.$t('fbWithdraw.text9')
        })
      } else if (parseFloat(this.amount) > balance) { // 大于可提现金额
        this.$dialog({
          msg: this.$t('fbWithdraw.text10')
        })
      } else if (this.checkAccount()) { // 没有设置谷歌或安全密码
        this.$dialog({
          type: 'confirm',
          msg: this.$t('fbWithdraw.text11'),
          okText: this.$t('fbWithdraw.text12'),
          okFn: () => {
            this.$router.push('/account/accountInformation')
          }
        })
      } else {
        this.loading = true
        this.$fetch.post('/bossDraw/createOrder', {
          currency: this.collectCurrency, // 币种
          amount: this.amount, // 提现金额
          bankAccountId: this.selectedBank.id // 提现收款地址记录ID
        }).then(res => {
          this.loading = false
          if (res.data.success) {
            // 创建提现订单之后弹出支付框进行转账
            this.payParams = {
              orderid: res.data.data.id,
              type: 1 // 1 提现订单
            }
            this.jumpId = res.data.data.id
            this.$refs.payDialog.show = true
          } else {
            this.$dialog({
              msg: res.data.msg
            })
          }
        })
      }
    },
    jump () {
      this.$router.replace(`/account/withdrawOrder/fbWithdrawOrderDetail?id=${this.jumpId}`)
    },
    paySuccess () {
      this.$dialog({
        msg: this.$t('fbWithdraw.text13'),
        okFn: () => {
          this.$router.replace(`/account/withdrawOrder/fbWithdrawOrderSelectBoss?id=${this.jumpId}`)
        }
      })
    }
  },
  watch: {
    currency: function () {
      this.getbankList()
    }
  },
  mounted () {
    this.getbankList()
  }
}
</script>

<style lang="less" scoped>
  @import (reference) '~@/assets/css/mixin';
  .input-wrap{
    margin-bottom: 30px;
    p{
      padding-bottom: 20px;
    }
  }
  .rel{
    position: relative;
    .all{
      position: absolute;
      right: 4%;
      top: 0;
      color: @yellow;
      line-height: 48px;
      cursor: pointer;
    }
    .input{
      border-radius: 4px 4px 0 0 !important;
    }
    .saleMoney{
      border: 1px solid #514135;
      border-top: none;
      line-height: 38px;
      font-size: 14px;
      color: @yellow;
      border-radius: 0 0 4px 4px;
      padding-left: 15px;
      background: #1c1d34;
    }
    @media @smallMob{
      .all{
        font-size: 12px;
      }
      .input{
        font-size: 13px !important;
      }
    }
  }
  .account-list{
    margin-bottom: 60px;
  }
  .account-item{
    border: 1px solid #514135;
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 30px;
    .justify;
    color: @yellow;
    .number{
      text-align: right;
      div+div{
        padding-top: 14px;
      }
    }
    @media @mob{
      font-size: 14px;
      padding: 14px 20px;
      margin-bottom: 20px;
    }
  }
  @media @mob{
    .assets-trade{
      padding-top: 30px;
    }
  }
.g-loading-wrap{
  position: relative;
  padding: 30px 0;
}
.global-loading{
  position: absolute;
  width: 100%;
  top: 0px;
}
</style>
