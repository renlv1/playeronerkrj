<template>
  <div class="page lottery-page">
    <div class="location">
      <div class="h-wrap">
        <!-- <a href="">{{$t('common.luckDay')}}</a>
        <span>></span> -->
        <a href="javascript:" @click="$router.go(-1)">{{$t('common.luckDay')}}</a>
        <span>></span>
        <span class="blue-color">{{$t('lotteryRule.text1')}}</span>
      </div>
    </div>
    <mob-header>{{$t('lotteryRule.text1')}}</mob-header>
    <div class="rule">
      <div class="h-wrap">
        <div class="title">
          <div class="custom-font">{{$t('lotteryRule.text2')}}</div>
        </div>
        <div class="section">
          <h3>{{$t('common.luckDay')}} {{$t('lotteryRule.text2')}}</h3>
          <span>{{$t('lotteryRule.text3')}}{{detail.rewardCurrency}}</span>
          <p>{{$t('lotteryRule.text4')}} = {{detail.minJoinAmount | f4}}{{detail.rewardCurrency}}</p>
        </div>
        <div class="section">
          <h3>{{$t('lotteryRule.text11')}}</h3>
          <span>{{$t('lotteryRule.text5')}}</span>
          <p>{{$t('lotteryRule.text6')}} = {{$t('lotteryRule.text7')}} * {{detail.earningsRatio * 100}}%</p>
        </div>
        <div class="section">
          <h3>{{$t('lotteryRule.text12')}}</h3>
          <span>{{$t('lotteryRule.text8')}}</span>
          <span style="padding-top:0">{{$t('lotteryRule.text8_1')}}</span>
          <p>{{$t('lotteryRule.text9')}} = {{$t('lotteryRule.text10')}} * {{detail.bonusReturnRatio * 100}}%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      detail: JSON.parse(this.$route.query.detail)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/mixin';
  .rule{
    padding-left: 100px;
    background: #171d3d;
    .title{
      padding-top: 35px;
    }
    @media @mob{
      padding: 0 3%;
      .title{
        padding-top: 0;
      }
    }
  }
  .title{
    font-size: 32px;
    color: @blue;
    line-height: 1;
    padding: 60px 0 30px;
    background: url(~@img/lottery/left2.png) no-repeat 0 bottom;
    color: @yellow;
    margin-bottom: 20px;
  }
  .section{
    line-height: 1.4;
    padding: 16px 0;
    & + .section{
      border-top: 1px solid #413a41
    }
    p{
      color: @yellow;
    }
    > * {
      font-size: 18px;
      padding: 12px 0;
    }
    span{
      font-size: 16px;
      display: block;
      margin-bottom: 6px;
    }
  }
</style>
