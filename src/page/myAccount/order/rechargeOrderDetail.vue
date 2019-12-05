<template>
  <div class="page">
    <div class="order-detail">
      <div class="account-tit">
        <a href="javascript:;" @click="$router.go(-1)">{{$t('rechargeOrder.text1')}}</a>
        <span class="el-icon-arrow-right"></span>
        <span>{{$t('rechargeOrder.text4')}}</span>
      </div>
      <mob-header>{{$t('rechargeOrder.text1')}}</mob-header>

      <div class="order-detail-list">
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('rechargeOrder.text5')}}</span>
            <span>{{item.id}}</span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('rechargeOrder.text6')}}</span>
            <span>{{$changeDate(item.createAt)}}</span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('rechargeOrder.text7')}}</span>
            <span>
              <span v-if="item.status === 1">{{$t('rechargeOrder.text2')}}</span>
              <span v-else>{{$t('rechargeOrder.text3')}}</span>
            </span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('rechargeOrder.text8')}}</span>
            <span>{{item.depositAmount | f4}}{{item.depositCurrency}}</span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('rechargeOrder.text9')}}</span>
            <span>{{item.feeAmount | f4}}{{item.depositCurrency}}</span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('rechargeOrder.text10')}}</span>
            <span class="break-line">{{item.userAddress}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      item: JSON.parse(this.$route.query.item)
    }
  }
}
</script>
<style lang="less" scoped>
  @import (reference) '~@/assets/css/mixin';
</style>
