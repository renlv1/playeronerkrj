<template>
  <div class="page">
    <div class="order-detail">
      <div class="account-tit">
        <a href="javascript:;" @click="$router.go(-1)">{{$t('shareDesc.text39')}}</a>
        <span class="el-icon-arrow-right"></span>
        <span>{{$t('shareDesc.text38')}}</span>
      </div>
      <mob-header>{{$t('shareDesc.text38')}}</mob-header>
      <div v-if="load" class="g-loading-wrap">
        <div class="global-loading"></div>
      </div>
      <div v-else class="order-detail-list">
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('shareDesc.text32')}}</span>
            <span>{{detail.realName}}</span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('shareDesc.text34')}}</span>
            <span>{{detail.location}}</span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('shareDesc.text20')}}</span>
            <span>({{detail.mobileCode}}) {{detail.mobile}}</span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('shareDesc.text22')}}</span>
            <span>{{detail.sponsorName}}</span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('shareDesc.text26')}}</span>
            <span v-for="(value, item) in contact" :key="value">{{item}} {{value}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      detail: {},
      contact: {},
      load: true
    }
  },
  methods: {
    getData () {
      this.$fetch.post('/boss/queryBossInfoByAddress').then(res => {
        this.load = false
        this.detail = res.data.data
        if (this.detail.contactWay) {
          this.contact = JSON.parse(this.detail.contactWay)
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
</style>
