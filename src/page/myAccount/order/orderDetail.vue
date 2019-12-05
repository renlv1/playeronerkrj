<template>
  <div class="page">
    <div class="order-detail">
      <div class="account-tit">
        <a href="javascript:;" @click="$router.go(-1)">{{$t('myOrder.text1')}}</a>
        <span class="el-icon-arrow-right"></span>
        <span>{{$t('myOrder.text2')}}</span>
      </div>
      <mob-header>{{$t('myOrder.text1')}}</mob-header>
      <div v-if="load" class="g-loading-wrap">
        <div class="global-loading"></div>
      </div>
      <div v-else class="order-detail-list">
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('myOrder.text3')}}</span>
            <span>{{detail.id}}</span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('myOrder.text4')}}</span>
            <span>{{$changeDate(detail.createAt)}}</span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('myOrder.text5')}}</span>
            <span
              v-for="item in $t('myOrder.state')"
              v-if="detail.state === item.value"
              :key="item.value">
              {{item.label}}
            </span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('myOrder.text6')}}</span>
            <span>{{detail.amount | f4}}{{detail.currency}}</span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('myOrder.text7')}}</span>
            <span
              v-for="item in $t('myOrder.paymentType')"
              v-if="detail.paymentType === item.value"
              :key="item.value">
              {{item.label}}
            </span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('myOrder.text8')}}</span>
            <span class="break-line" v-if="detail.receiveAddress == userData.address">{{detail.sendAddress}}</span>
            <span class="break-line" v-else>{{detail.receiveAddress}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      detail: {},
      id: this.$route.query.id,
      load: true
    }
  },
  computed: {
    ...mapGetters([
      'userData'
    ])
  },
  methods: {
    getData () {
      this.$fetch.post(`/transaction/transactionDetail?id=${this.id}`).then(res => {
        this.load = false
        this.detail = res.data.data
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
  .g-loading-wrap{
    position: relative;
    height: 400px;
  }
</style>
