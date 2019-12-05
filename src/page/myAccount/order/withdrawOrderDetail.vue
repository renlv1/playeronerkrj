<template>
  <div class="page">
    <div class="order-detail">
      <div class="account-tit">
        <router-link to="/account/withdrawOrder">{{$t('withdrawOrder.text1')}}</router-link>
        <span class="el-icon-arrow-right"></span>
        <span>{{$t('withdrawOrder.text2')}}</span>
      </div>
      <mob-header>{{$t('withdrawOrder.text1')}}</mob-header>
      <div v-if="load" class="g-loading-wrap">
        <div class="global-loading"></div>
      </div>
      <div v-else class="order-detail-list">
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('withdrawOrder.text5')}}</span>
            <span>{{item.id}}</span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('withdrawOrder.text6')}}</span>
            <span>{{$changeDate(item.createAt)}}</span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('withdrawOrder.text7')}}</span>
            <span v-if="item.status === 0 && payStatus === 2">
              {{$t('withdrawOrder.text18')}}
            </span>
            <span v-else-if="item.payStatus === 4">
              {{$t('withdrawOrder.text38')}}
            </span>
            <span v-else>
              <span
                v-for="item2 in $t('withdrawOrder.state')"
                v-if="item.status === item2.value"
                :key="item2.value">
                {{item2.label}}
              </span>
            </span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('withdrawOrder.text8')}}</span>
            <span>{{item.drawAmount | f4}}{{item.drawCurrency}}</span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('withdrawOrder.text9')}}</span>
            <span>{{item.feeAmount | f4}}{{item.drawCurrency}}</span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('withdrawOrder.text10')}}</span>
            <span class="break-line">{{item.userAddress}}</span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <div class="account-info">
              <h4>{{$t('withdrawOrder.text11')}}</h4>
              <p>{{$t('withdrawOrder.text12')}}{{item.drawBankAccount.realName}}</p>
              <p class="break-line" style="max-width:100%">{{$t('withdrawOrder.text13')}}{{item.drawBankAccount.bankNumber}}</p>
            </div>
          </div>
        </div>
        <div class="btn-wrap">
          <div class="">
            <button class="btn cancel" v-if="item.status === 1 || (item.payStatus === 2 && payStatus !== 2)" @click="cancel">{{$t('withdrawOrder.text14')}}</button>
            <button class="btn" v-if="(item.status === 0 && payStatus !== 2) || item.payStatus === 0" @click="submit">{{$t('withdrawOrder.text15')}}</button>
          </div>
        </div>
      </div>
    </div>
    <payDialog @paySuccess="getData" :params="payParams" ref="payDialog"/>
  </div>
</template>

<script>
import payDialog from '@/components/payDialog'
export default {
  data () {
    return {
      item: {
        drawBankAccount: {}
      },
      payStatus: '', // 因为支付回调慢导致状态有问题，后端补加了这个状态，双重判断
      id: this.$route.query.id,
      loading: false,
      load: true,
      payParams: {}
    }
  },
  components: {
    payDialog
  },
  methods: {
    getData () {
      this.$fetch.post(`/draw/drawDetail?drawId=${this.id}`).then(res => {
        this.item = res.data.data
        this.item.drawBankAccount = JSON.parse(res.data.data.drawBankAccount)
        this.payStatus = res.data.mapData && res.data.mapData.payStatus
        this.payParams.id = this.item.userPayTransactionId
        this.load = false
      })
    },
    submit () {
      this.$refs.payDialog.show = true
    },
    cancel () {
      this.$dialog({
        type: 'confirm',
        msg: this.$t('withdrawOrder.text16'),
        okFn: () => {
          this.$fetch.post(`/draw/cancelDraw?drawId=${this.id}`).then(res => {
            if (res.data.success) {
              this.$dialog({
                msg: this.$t('withdrawOrder.text17')
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
  mounted () {
    this.getData()
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
    .btn{
      width: 44%;
      margin: 0 1.5%;
    }
    .cancel{
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
