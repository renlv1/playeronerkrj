<template>
  <!--成为共享者-->
  <div class="assets-wrapper page">
    <div class="account-tit">{{$t('shareDesc.text13')}}</div>
    <mob-header>{{$t('shareDesc.text13')}}</mob-header>
    <div class="assets-c">
      <ul>
        <li class="step-list">
          <h5 class="step-title">{{$t('shareDesc.text1')}}</h5>
          <p class="step-desc">{{$t('shareDesc.text2')}}</p>
        </li>
        <li class="step-list">
          <h5 class="step-title">{{$t('shareDesc.text3')}}</h5>
          <p class="step-desc">{{$t('shareDesc.text4')}}<span class="bold">{{detail.bailAmount}}{{detail.bailCurrency}}</span>{{$t('shareDesc.text4_1')}}</p>
        </li>
        <li class="step-list">
          <h5 class="step-title">{{$t('shareDesc.text5')}}</h5>
          <p class="step-desc">{{$t('shareDesc.text6')}}</p>
          <p class="step-desc">{{$t('shareDesc.text7')}}</p>
        </li>
      </ul>
      <button class="btn mt60" @click="applyNow">{{$t('shareDesc.text13')}}</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      currrentIndex: 0,
      detail: {}
    }
  },
  computed: {
    ...mapGetters([
      'userAccount'
    ])
  },
  methods: {
    switchOne (index) {
      this.currrentIndex = index
    },
    applyNow () {
      if (parseFloat(this.userAccount[this.detail.bailCurrency].balance) < parseFloat(this.detail.bailAmount)) {
        this.$dialog({
          msg: this.$t('shareDesc.text14')
        })
      } else {
        this.$router.push('/account/accountInformation/shareForm')
      }
    },
    getApplyInfo () {
      this.$fetch.post('/boss/getBossApplyBailAndCurrency').then(res => {
        this.detail = res.data.data
      })
    }
  },
  mounted () {
    this.getApplyInfo()
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import (reference) '~@/assets/css/mixin';
.assets-wrapper{
  width: auto;
  padding-bottom: 30px;
  .assets-c{
    width: 1000px;
  }
  .step-list{
    border-bottom: 1px solid rgba(231,172,80,.3);
    padding: 30px 48px 28px 20px;
    .step-title{
      color: #e7ac50;
    }
    .step-desc{
      color: #7693fc;
    }
    .example{
      font-size: 16px;
      color: #e7ac50;
    }
    .step-title{
      font-size: 18px;
      color: #e7ac50;
      margin-bottom: 20px;
    }
    .step-desc{
      font-size: 16px;
      color: #7693fc;
      line-height: 1.5;
    }
    .example{
      line-height: 1.5;
      font-size: 16px;
      color: #e7ac50;
    }
    .example-one{
      margin-top: 20px;
    }
    .bold{
      font-weight: bold;
      color: #e7ac50;
      margin: 0 5px;
    }
  }
  @media @mob{
    padding: 10px 4% 30px;
    .assets-c{
      width: auto;
      .step-list{
        padding: 20px 0;
      }
    }
  }
}
</style>
