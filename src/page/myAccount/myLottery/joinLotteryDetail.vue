<template>
  <div class="page">
    <div class="account-tit">
      <a href="javascrip:;" @click="$router.go(-1)">{{$t('joinLottery.text1')}}</a>
      <span class="el-icon-arrow-right"></span>
      <span>{{$t('joinLottery.text4')}}</span>
    </div>
    <mob-header>{{$t('joinLottery.text5')}} {{detail.roundName}} {{$t('joinLottery.text6')}}</mob-header>
    <div class="web-pc">
      <div class="join-detail">
        <div class="title justify">
          <span>{{$t('joinLottery.text5')}} {{detail.roundName}} {{$t('joinLottery.text6')}}</span>
          <router-link v-if="detail.roundState === 1" :to="`/lotteryDetail?id=${id}`">{{$t('joinLottery.text7')}}<i class="el-icon-arrow-right"></i></router-link>
        </div>
        <section class="money" v-if="detail.roundState === 1">
          <div class="money-item">
            <h3>{{$t('joinLottery.text8')}}</h3>
            <div class="yellow-color">{{detail.dividePool | f4}}{{currency}}</div>
          </div>
          <div class="money-item">
            <h3>{{$t('joinLottery.text9')}}</h3>
            <div class="yellow-color">{{detail.rewardPool | f4}}{{currency}}</div>
          </div>
        </section>
        <!-- <section>
          <h4>{{$t('joinLottery.text10')}}</h4>
          <p>{{$t('joinLottery.text11')}}</p>
          <div class="copy-wrap">
            <span class="b">GJEGJELGJEWLGWJLWJ</span>
            <div class="btn">{{$t('joinLottery.text12')}}</div>
          </div>
        </section> -->
        <section>
          <div class="table-list">
            <p>{{$t('joinLottery.text13')}}</p>
            <div class="table">
              <table>
                <tbody>
                  <tr>
                    <td v-for="item in $t('joinLottery.table2')" :key="item">
                      {{item}}
                    </td>
                  </tr>
                  <tr>
                    <td>{{detail.roundName}}</td>
                    <td>{{detail.userName}}</td>
                    <td>{{detail.minJoinAmount | f4}}{{currency}}</td>
                    <td>{{detail.earningsRatio * 100}}%/{{$t('common.day')}}</td>
                    <td>{{detail.bonusReturnRatio * 100}}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="table-list">
            <p>{{$t('joinLottery.text14')}}</p>
            <div class="table click">
              <table>
                <tbody>
                  <tr>
                    <td v-for="item in $t('joinLottery.table3')" :key="item">
                      {{item}}
                    </td>
                  </tr>
                  <router-link tag="tr" :to="`/account/reward/rewardDetail?id=${id}`">
                    <td>{{rewardDetail.userJoinSumAmt | f4}}{{rewardDetail.rewardCurrency}}</td>
                    <td>{{rewardDetail.userGetRewardPoolAmt | f4}}{{rewardDetail.rewardCurrency}}</td>
                    <td>{{rewardDetail.userGetDividePoolAmt | f4}}{{rewardDetail.rewardCurrency}}</td>
                    <td>{{rewardDetail.userGetBonusSumAmt | f4}}{{rewardDetail.rewardCurrency}}</td>
                    <td>{{$t('common.detail')}}</td>
                  </router-link>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div class="web-mob">
      <div class="join-detail">
        <!-- <div class="title justify">
          <span>{{$t('joinLottery.text5')}} {{detail.roundName}} {{$t('joinLottery.text6')}}</span>
          <router-link v-if="detail.roundState === 2" :to="`/lotteryDetail?id=${id}`">{{$t('joinLottery.text7')}}<i class="el-icon-arrow-right"></i></router-link>
        </div> -->
        <section class="money" v-if="detail.roundState === 1">
          <div class="money-item">
            <h3>{{$t('joinLottery.text8')}}</h3>
            <div class="yellow-color">{{detail.dividePool | f4}}{{currency}}</div>
          </div>
          <div class="money-item">
            <h3>{{$t('joinLottery.text9')}}</h3>
            <div class="yellow-color">{{detail.rewardPool | f4}}{{currency}}</div>
          </div>
        </section>
        <!-- <section>
          <h4>{{$t('joinLottery.text10')}}</h4>
          <p>{{$t('joinLottery.text11')}}</p>
          <div class="copy-wrap">
            <span class="b">GJEGJELGJEWLGWJLWJ</span>
            <div class="btn">{{$t('joinLottery.text12')}}</div>
          </div>
        </section> -->
        <section>
          <div class="mob-title">
            <div class="text">{{$t('joinLottery.text13')}}</div>
          </div>
          <div class="detail-list">
            <div class="item">
              <span>{{$t('joinLottery.table2[0]')}}</span>
              <span>{{detail.roundName}}</span>
            </div>
            <div class="item">
              <span>{{$t('joinLottery.table2[1]')}}</span>
              <span>{{detail.userName}}</span>
            </div>
            <div class="item">
              <span>{{$t('joinLottery.table2[2]')}}</span>
              <span>{{detail.minJoinAmount | f4}}{{currency}}</span>
            </div>
            <div class="item">
              <span>{{$t('joinLottery.table2[3]')}}</span>
              <span>{{detail.earningsRatio * 100}}%/{{$t('common.day')}}</span>
            </div>
            <div class="item">
              <span>{{$t('joinLottery.table2[4]')}}</span>
              <span>{{detail.bonusReturnRatio * 100}}%</span>
            </div>
          </div>
          <div class="mob-title">
            <div class="text">{{$t('joinLottery.text14')}}</div>
          </div>
          <div class="detail-list">
            <div class="item">
              <span>{{$t('joinLottery.table3[0]')}}</span>
              <span>{{rewardDetail.userJoinSumAmt | f4}}{{rewardDetail.rewardCurrency}}</span>
            </div>
            <div class="item">
              <span>{{$t('joinLottery.table3[1]')}}</span>
              <span>{{rewardDetail.userGetRewardPoolAmt | f4}}{{rewardDetail.rewardCurrency}}</span>
            </div>
            <div class="item">
              <span>{{$t('joinLottery.table3[2]')}}</span>
              <span>{{rewardDetail.userGetDividePoolAmt | f4}}{{rewardDetail.rewardCurrency}}</span>
            </div>
            <div class="item">
              <span>{{$t('joinLottery.table3[3]')}}</span>
              <span>{{rewardDetail.userGetBonusSumAmt | f4}}{{rewardDetail.rewardCurrency}}</span>
            </div>
            <div class="item">
              <span>{{$t('joinLottery.table3[4]')}}</span>
              <router-link tag="span" :to="`/account/reward/rewardDetail?id=${id}`">{{$t('common.detail')}}</router-link>
            </div>
          </div>
        </section>
      </div>
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
      rewardDetail: {},
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
    getData () {
      this.$fetch.post('/lotto/lottoRewardDetail', {
        roundId: this.id,
        userAddress: this.userData.address
      }).then(res => {
        this.load = false
        if (res.data.success) {
          this.detail = res.data.data.rewardRound
          this.currency = this.detail.rewardCurrency
        }
      })
    },
    getRewardData () {
      this.$fetch.post('/lotto/getActivityRewardDetail', {
        roundId: this.id,
        userAddress: this.userData.address
      }).then(res => {
        this.load = false
        if (res.data.success) {
          this.rewardDetail = res.data.data
        }
      })
    },
    changeTab (index) {

    }
  },
  mounted () {
    this.getData()
    this.getRewardData()
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
      padding-bottom: 10px;
    }
    .money{
      display: flex;
      &-item{
        flex: 1;
        text-align: center;
      }
      &-item + .money-item{
        border-left: 1px solid #514135;
      }
      h3{
        font-size: 18px;
      }
      .yellow-color{
        padding-top: 20px;
        font-size: 24px;
      }
    }
    .table-list{
      margin-bottom: 40px;
      p{
        padding-bottom: 26px;
        font-size: 18px;
      }
      td{
        height: 48px;
      }
    }
    section{
      line-height: 1.2;
      padding: 30px 0;

      font-size: 18px;
      & + section{
        border-top: 1px solid #514135;
      }
      h4{
        margin-bottom: 16px;
      }
      p{
        padding-bottom: 24px;
        font-size: 16px;
      }
      .b{
        color: #e7ac50;
        font-weight: bold;
        font-size: 18px;
        padding: 14px 0;
        &:last-child{
          padding-bottom: 0;
        }
      }
    }
    .copy-wrap{
      line-height: 32px;
      .btn{
        margin-left: 20px;
        border-radius: 20px;
        width: 80px;
        height: 32px;
        line-height: 32px;
      }
    }
    @media @mob{
      margin-left: 0;
      .gap;
      .title{
        padding-bottom: 0;
        font-size: 16px;
      }
      .money-item{
        border: none !important;
      }
      .money .yellow-color{
        font-size: 18px;
      }
      section, .table-list p, .money h3{
        font-size: 15px;
      }
      .detail-list{
        .item{
          .justify;
          padding: 3%;
          background: url(~@img/lottery/box_bg.png) no-repeat;
          height: 50px;
          background-size: 100% 100%;
          margin-top: 1px;
          span + span{
            color: @yellow;
          }
        }
        margin-bottom: 30px;
      }
    }
    @media @smallMob{
      .money .yellow-color{
        font-size: 18px;
      }
      section, .table-list p, .money h3{
        font-size: 13px;
      }
      .money{
        padding: 24px 0;
        font-size: 13px;
        &-item + .money-item{
        }
      }
    }
  }
</style>
