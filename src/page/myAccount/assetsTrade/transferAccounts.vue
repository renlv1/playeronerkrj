<template>
  <div class="page">
    <div class="account-tit">{{$t('transferAccount.text1')}}</div>
    <mob-header>{{$t('transferAccount.text1')}}</mob-header>
    <div class="assets-trade">
      <!-- <div class="select input-wrap">
        <p>{{$t('transferAccount.text2')}}</p>
        <el-select v-model="currency">
          <el-option
            v-for="val in userAccount"
            :key="val.currency"
            :value="val.currency">
          </el-option>
        </el-select>
      </div> -->
      <div class="input-wrap">
        <p>{{$t('transferAccount.text3')}}</p>
        <input type="text" class="input" v-model="amount" :placeholder="$t('transferAccount.text4')">
      </div>
      <div class="input-wrap">
        <p>{{$t('transferAccount.text5')}}</p>
        <input type="text" class="input" v-model="address" :placeholder="$t('transferAccount.text6')">
      </div>
      <div class="fee"></div>
      <button @click="submit" :loading="loading" :disabled="!parseFloat(amount) || !address || loading" class="btn">{{$t('transferAccount.text7')}}</button>
    </div>
    <payDialog :params="payParams" @paySuccess="paySuccessHandle" ref="payDialog"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import payDialog from '@/components/payDialog'
export default {
  data () {
    return {
      currency: 'RPO',
      amount: '',
      address: '',
      loading: false,
      payParams: {}
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
    submit () {
      if (!/^\d+(\.\d{0,4})?$/.test(this.amount)) { // 金额格式不正确
        this.$dialog({
          msg: this.$t('transferAccount.text8')
        })
      } else if (this.userData.openTradePassword !== 2 || this.userData.openGoogleCode !== 2) { // 没有设置谷歌或安全密码
        this.$dialog({
          type: 'confirm',
          msg: this.$t('transferAccount.text9'),
          okText: this.$t('transferAccount.text10'),
          okFn: () => {
            this.$router.push('/account/accountInformation')
          }
        })
      } else {
        this.payParams = {
          desAccount: this.address,
          currency: this.currency,
          amount: this.amount,
          paymentType: 1
        }
        this.$refs.payDialog.show = true
      }
    },
    paySuccessHandle (id) {
      this.$dialog({
        msg: this.$t('transferAccount.text11'),
        okFn: () => {
          this.$router.push(`/account/order/orderDetail?id=${id}`)
        }
      })
    }
  },
  mounted () {
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
  .fee{
    margin-bottom: 60px;
  }
  @media @mob{
    .assets-trade{
      padding-top: 30px;
    }
  }

</style>
