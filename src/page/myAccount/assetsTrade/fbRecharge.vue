<template>
  <div class="page">
    <div class="account-tit">{{$t('fbRecharge.text1')}}</div>
    <mob-header>{{$t('fbRecharge.text1')}}</mob-header>
    <div class="assets-trade">
      <div class="select input-wrap">
        <p>{{$t('fbRecharge.text2')}}</p>
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
          {{$t('fbRecharge.text3')}} ( {{$t('fbRecharge.text15')}} ({{currency}}/{{collectCurrency}}):1:{{currencyRate && currencyRate[collectCurrency].rate}})
        </p>
        <div class="rel">
          <input type="text" v-model="amount" class="input" :placeholder="`${$t('fbRecharge.text4')}`">
          <div class="saleMoney">{{$t('fbRecharge.text8')}} : {{saleMoeny | f4}} {{collectCurrency}}</div>
          <!-- <div class="all" @click="amount = userAccount[currency].balance.toFixed(4)">{{$t('fbRecharge.text5')}}</div> -->
        </div>
      </div>
      <div class="select input-wrap">
        <p>{{$t('fbRecharge.text6')}}</p>
        <el-select v-model="selectedBank" value-key="id" v-if="bankList.length">
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
            <div class="global-empty">{{$t('common.emptyData')}}，<router-link style="color: #6485fd;text-decoration:underline" to="/account/transactionAccount/transactionAccountInfo?money=CNY" class="blue-color">{{$t('fbRecharge.text16')}}<i class="el-icon-arrow-right"></i></router-link></div>
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
    <!-- <payDialog @cancel="jump" @paySuccess="jump" ref="payDialog" :params="payParams"/> -->
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
      if (!/^\d+(\.\d{0,4})?$/.test(this.amount)) { // 金额格式不正确
        this.$dialog({
          msg: this.$t('fbRecharge.text9')
        })
      } else {
        this.loading = true
        this.$fetch.post('/bossDeposit/createDepositRecord', {
          depositCurrency: this.collectCurrency, // 币种
          depositAmount: this.amount, // 充值金额
          bankInfoId: this.selectedBank.id // 提现收款地址记录ID
        }).then(res => {
          this.loading = false
          if (res.data.success) {
            this.$router.replace(`/account/rechargeOrder/fbRechargeOrderSelectBoss?id=${res.data.data.id}`)
          } else {
            this.$dialog({
              msg: res.data.msg
            })
          }
        })
      }
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
