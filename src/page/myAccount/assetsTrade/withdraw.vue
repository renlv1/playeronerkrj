<template>
  <div class="page">
    <div class="account-tit">{{$t('navigation.text3')}}</div>
    <mob-header>{{$t('navigation.text3')}}</mob-header>
    <div class="assets-trade">
      <!-- <div class="select input-wrap">
        <p>{{$t('withdraw.text2')}}</p>
        <el-select v-model="currency">
          <el-option
            v-for="val in userAccount"
            :key="val.currency"
            :value="val.currency">
          </el-option>
        </el-select>
      </div> -->
      <div class="input-wrap">
        <p>
          {{$t('withdraw.text3')}} ( {{$t('withdraw.text4')}}
          <span class="blue-color">
            {{userAccount && userAccount[currency].balance | f4}}{{currency}}
          </span>)
        </p>
        <input type="text" v-model="amount" class="input" :placeholder="$t('withdraw.text5')">
      </div>
      <div class="input-wrap account-list">
        <p>{{$t('withdraw.text6')}}</p>
        <div v-if="load" class="g-loading-wrap">
          <div class="global-loading"></div>
        </div>
        <div v-else>
          <div v-if="!bankList.length">
            <div class="global-empty">{{$t('common.emptyData')}}，<router-link style="color: #6485fd;text-decoration:underline" to="/account/transactionAccount/transactionAccountInfo?money=RPO" class="blue-color">{{$t('withdraw.text7')}}<i class="el-icon-arrow-right"></i></router-link></div>
          </div>
        </div>
        <div
          v-for="(item, index) in bankList"
          :key="index"
          @click="selectedIndex = index"
          class="account-item"
          :class="{active: selectedIndex === index}"
        >
          <div class="flex">
            <div class="name">{{item.realName}}</div>
            <div class="radio">
              <i class="el-icon-check"></i>
            </div>
          </div>
          <div class="flex">
            <div class="number">{{item.bankNumber}}</div>
            <router-link @click.native.stop :to="`/account/transactionAccount/transactionAccountInfo?bankid=${item.id}&money=RPO`" class="blue-color">{{$t('withdraw.text8')}}</router-link>
          </div>
        </div>
      </div>
      <button @click="submit" :loading="loading" :disabled="!parseFloat(amount) || selectedIndex === -1 || loading" class="btn">{{$t('common.sure')}}</button>
    </div>
    <payDialog @cancel="jump" @paySuccess="jump" ref="payDialog" :params="payParams"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import payDialog from '@/components/payDialog'
export default {
  data () {
    return {
      currency: 'RPO',
      bankList: [],
      amount: '',
      selectedIndex: -1,
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
      'userAccount'
    ])
  },
  components: {
    payDialog
  },
  methods: {
    ...mapActions([
      'getUserBalance'
    ]),
    // 获取交易账户列表
    getbankList () {
      this.load = true
      this.selectedIndex = -1
      this.$fetch.post('/bank/queryBankInfoList', {
        currency: this.currency,
        pageIndex: 1,
        pageSize: 20
      }).then(res => {
        this.load = false
        if (res.data.success) {
          this.bankList = res.data.data
          if (this.bankList.length) {
            this.selectedIndex = 0
          }
        }
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
          msg: this.$t('withdraw.text9')
        })
      } else if (parseFloat(this.amount) > balance) { // 大于可提现金额
        this.$dialog({
          msg: this.$t('withdraw.text10')
        })
      } else if (this.checkAccount()) { // 没有设置谷歌或安全密码
        this.$dialog({
          type: 'confirm',
          msg: this.$t('withdraw.text11'),
          okText: this.$t('withdraw.text12'),
          okFn: () => {
            this.$router.push('/account/accountInformation')
          }
        })
      } else {
        this.loading = true
        this.$fetch.post('/draw/createDrawRecord', {
          drawCurrency: this.currency, // 币种
          drawAmount: this.amount, // 提现金额
          bankInfoId: this.bankList[this.selectedIndex].id // 提现收款地址记录ID
        }).then(res => {
          this.loading = false
          if (res.data.success) {
            // 创建提现订单之后弹出支付框进行转账
            this.payParams.id = res.data.data.userPayTransactionId
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
      this.$router.push(`/account/withdrawOrder/withdrawOrderDetail?id=${this.jumpId}`)
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
  .account-list{
    margin-bottom: 60px;
  }
  .account-item{
    border: 1px solid #514135;
    border-radius: 4px;
    padding: 30px;
    margin-bottom: 30px;
    cursor: pointer;
    &.active{
      border-color: #e7ac50;
      .el-icon-check{
        display: block;
      }
      .radio{
        border-color: #e7ac50;
      }
    }
    .flex{
      .justify;
      & + .flex{
        padding-top: 20px;
      }
    }
    .number{
      font-size: 20px;
      color: @yellow;
    }
    .radio{
      height: 28px;
      width: 28px;
      border: 1px solid #514135;
      border-radius: 4px;
      text-align: center;
    }
    .el-icon-check{
      color: #e7ac50;
      font-size: 18px;
      line-height: 24px;
      display: none;
    }
    .btn{
      margin-top: 60px;
    }
    @media @mob{
      font-size: 14px;
      padding: 14px 20px;
      margin-bottom: 20px;
      .number{
        font-size: 16px;
      }
      .flex{
        .justify;
        & + .flex{
          padding-top: 10px;
        }
      }
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
