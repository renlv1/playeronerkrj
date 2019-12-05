<template>
  <div class="page">
    <div class="account-tit">
      <a>我参与的大乐透</a>
      <span class="el-icon-arrow-right"></span>
      <span>大乐透详情</span>
    </div>
    <div class="join-detail">
      <div class="title justify">
        <span>区块链大乐透{{detail.roundName}}期</span>
        <router-link :to="`/lotteryDetail?id=${id}`">查看活动详情</router-link>
      </div>
      <section class="money">
        <div class="money-item">
          <h3>分红池金额</h3>
          <div class="yellow-color">{{detail.dividePool | f4}}{{currency}}</div>
        </div>
        <div class="money-item">
          <h3>奖金池金额</h3>
          <div class="yellow-color">{{detail.rewardPool | f4}}{{currency}}</div>
        </div>
      </section>
      <section>
        <h4>区块链大乐透活动规则</h4>
        <div class="b">最低投注金额 = {{detail.minJoinAmount | f4}}{{currency}}</div>
      </section>
      <section>
        <h4>分红池分红奖励比例</h4>
        <p>根据投注金额按设定的百分比给用户每天发放分红奖励</p>
        <div class="b">每天发放分红金额 = 单笔投注金额 * {{detail.earningsRatio * 100}}%</div>
        <div class="b">发放分红时间间隔 = {{ parseInt(detail.divideInterval / 60) }}小时</div>
      </section>
      <section>
        <h4>奖金池奖励</h4>
        <p>从最后的排位开始倒序发放奖励，根据单笔投注的订单发放奖励，直到奖金池金额发放完为止。</p>
        <div class="b">奖金池奖励金额 = 单笔投注金额 * {{detail.bonusReturnRatio * 100}}%</div>
      </section>
      <section>
        <h4>投注金额分配比例</h4>
        <p>设置用户投注后金额分别进入分红池和奖金池的比例。(系统将会收取发起人抽成金额部分的50%作为运营费用)</p>
        <div class="b">发起人抽成金额 = 用户额外收益 * {{detail.lotteryOwnerFee * 100}}%</div>
      </section>
      <!-- <section>
        <h4>推荐奖励</h4>
        <p>根据用户最后一笔投注金额，推荐用户新增投注金额后，向用户增加发放分红奖励，不满一次不发放奖励。</p>
        <div class="yellow-color" style="margin:-10px 0 30px;">推荐关系：使用Radar推荐关系</div>
        <h4>优惠券折扣设置</h4>
        <p>推荐用户使用优惠券支付可获得折扣优惠，同时加入该用户的树形结构。</p>
        <div class="b">使用优惠券支付金额 = 投注金额 * 95%</div>
      </section> -->
      <section>
        <div class="b">奖励次数 = 小区新增业绩 / 最后单笔投注金额 * 0.5</div>
        <div class="b">推荐奖励金额 = 最后一笔投注金额 * 3%</div>
        <div class="b">奖励间隔次数 = 每分红 1 次发放一次奖励（0次则每次分红都发放）</div>
      </section>
    </div>
  </div>
</template>

<script>
import tab from '@/components/tab'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      detail: {},
      pageSize: 10,
      total: 0,
      load: true,
      id: this.$route.query.id,
      currency: ''
    }
  },
  components: {
    tab
  },
  computed: {
    ...mapGetters([
      'userData'
    ])
  },
  methods: {
    getData (pageIndex = 1) {
      this.$fetch.post('/lotto/lottoRewardDetail', {
        roundId: this.id,
        userAddress: this.userData.address
      }).then(res => {
        this.load = false;
        if (res.data.success) {
          this.detail = res.data.data.rewardRound;
          this.currency = this.detail.rewardCurrency
        }
      })
    },
    changeTab (index) {

    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
  @import (reference) '~@/assets/css/mixin';
  .join-detail{
    margin-left: 40px;
    .title{
      border-bottom: 1px solid #514135;
      line-height: 50px;
      font-size: 18px;
    }
    .money{
      display: flex;
      &-item{
        flex: 1;
      }
      &-item + .money-item{
        padding-left: 100px;
        border-left: 1px solid #312785;
      }
      h3{
        font-size: 18px;
      }
      .yellow-color{
        padding-top: 20px;
        font-size: 24px;
      }
    }
    section{
      line-height: 1.2;
      padding: 46px 0;
      border-bottom: 1px solid #514135;
      font-size: 18px;
      h4{
        margin-bottom: 16px;
      }
      p{
        padding-bottom: 24px;
        font-size: 16px;
      }
      .b{
        color: @yellow;
        font-weight: bold;
        font-size: 18px;
        padding: 14px 0;
        &:last-child{
          padding-bottom: 0;
        }
      }
    }
  }
</style>
