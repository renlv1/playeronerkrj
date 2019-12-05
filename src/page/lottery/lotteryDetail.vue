<template>
  <div class="page lottery-page diff">
    <!-- <div class="location">
      <div class="h-wrap">
        <a href="">{{$t('lotteryDetail.text1')}}</a>
        <span>></span>
        <span class="blue-color">{{$t('common.detail')}}</span>
      </div>
    </div> -->
    <mob-header>{{$t('lotteryDetail.text1')}}</mob-header>
    <div class="web-pc">
      <div class="lottery-detail">
        <div class="phase">
          <div class="design-title">
            <h3 class="text">{{$t('common.luckDay')}}<span> {{detail.roundName}} </span>{{$t('lotteryDetail.text3')}}</h3>
          </div>
          <div v-if="detail.id && detail.roundState !== 2">
            <div class="count-down">
              <!--  待开始  -->
              <span v-if="detail.roundState === 0">{{$t('lotteryDetail.text29')}}</span>
              <!--  已开始  -->
              <span v-if="detail.roundState === 1">{{$t('lotteryDetail.text4')}}</span>
              <span> {{countDown.day}} {{$t('common.day')}}</span>
              <span> {{countDown.hour}} {{$t('common.hour')}}</span>
              <span> {{countDown.min}} {{$t('common.minute')}}</span>
              <span> {{countDown.sec}} {{$t('common.second')}}</span>
            </div>
            <router-link v-if="detail.roundState === 1" :to="loginFlag ? `/lotteryDetail/betting?id=${id}` : '/login'" class="tz-btn"><div class="custom-font">{{$t('lotteryDetail.text5')}}</div></router-link>
          </div>
          <div v-if="detail.roundState === 2">
            <div class="tz-btn end">
              <div class="custom-font">{{$t('lotteryDetail.text6')}}</div>
            </div>
          </div>
        </div>
        <div class="total">
          <div class="h-wrap">
            <div class="link">
              <router-link :to="`/lotteryDetail/rule?detail=${JSON.stringify(detail)}`" class="blue-color">{{$t('lotteryDetail.text7')}}</router-link>
            </div>
            <div class="flex">
              <div class="flex-item">
                <span>{{$t('lotteryDetail.text8')}}</span>
                <p class="yellow-color"><ICountUp :startVal="0" :endVal="detail.dividePool || 0" :decimals="4"/>{{currency}}</p>
              </div>
              <div class="flex-item">
                <span>{{$t('lotteryDetail.text9')}}</span>
                <p class="yellow-color"><ICountUp :startVal="0" :endVal="detail.rewardPool || 0" :decimals="4"/>{{currency}}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="activity-person">
          <img src="" alt="">
          <p>张三丰</p>
          <p>{{$t('lotteryDetail.text10')}}</p>
        </div> -->
        <div class="current-guide">
          <div class="h-wrap">
            <div class="title">
              <div class="title-bg">{{$t('lotteryDetail.text11')}}</div>
            </div>
            <div class="flex">
              <div class="flex-item">
                <span>{{$t('lotteryDetail.text12')}}</span>
                <p class="yellow-color">{{detail.minJoinAmount | f4}}{{currency}}</p>
              </div>
              <div class="flex-item">
                <span>{{$t('lotteryDetail.text13')}}</span>
                <p class="yellow-color">{{detail.earningsRatio * 100}}%/{{$t('common.day')}}</p>
              </div>
              <div class="flex-item">
                <span>{{$t('lotteryDetail.text14')}}</span>
                <p class="yellow-color">{{detail.bonusReturnRatio * 100}}%</p>
              </div>
            </div>
          </div>
        </div>
        <div class="my" v-if="loginFlag">
          <div class="h-wrap">
            <div class="title">
              <div class="title-bg">{{$t('lotteryDetail.text16')}}</div>
            </div>
            <div class="link">
              <router-link :to="`/lotteryDetail/bounsDetail?id=${id}`">{{$t('lotteryDetail.text17')}}</router-link>
            </div>
            <div class="flex">
              <div class="flex-item">
                <span>{{$t('lotteryDetail.text18')}}</span>
                <p class="yellow-color">{{userRewrad.bonusSum | f4}}{{currency}}</p>
              </div>
              <div class="flex-item">
                <span>{{$t('lotteryDetail.text19')}}</span>
                <p class="yellow-color">{{userRewrad.bonusCount}}{{$t('lotteryDetail.text20')}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="rank">
          <div class="h-wrap">
            <div class="title">
              <div class="title-bg">{{$t('lotteryDetail.text21')}}</div>
            </div>
            <div class="rank-list">
              <div class="rank-item" v-if="loginFlag">
                <div class="rank-count">{{userRewrad.myNewIndex}}</div>
                <p>{{$t('lotteryDetail.text22')}}</p>
              </div>
              <div class="rank-item">
                <div class="rank-count">
                  <img src="~@img/my/avatar.png" width="80" height="80" alt="">
                  <!-- <img :src="detail.lastPlayer && detail.lastPlayer.headImage" width="80" height="80" alt=""> -->
                </div>
                <p>{{detail.lastPlayer && detail.lastPlayer.userName}}</p>
                <p class="yellow-color">{{$t('lotteryDetail.text23')}}</p>
              </div>
              <router-link style="cursor: pointer" v-if="detail.roundState === 1" tag="div" :to="loginFlag ? `/lotteryDetail/betting?id=${id}` : '/login'" class="rank-item">
                <div class="rank-count icon"></div>
                <p class="yellow-color">{{$t('lotteryDetail.text24')}}</p>
              </router-link>
            </div>
          </div>
        </div>
        <div class="table reward-table" v-if="loginFlag">
          <div class="h-wrap">
            <div class="title">
              <div class="title-bg">{{$t('lotteryDetail.text36')}}</div>
            </div>
            <div class="border-bg-table">
              <div class="table">
                <table>
                  <thead>
                    <tr>
                      <td v-for="item in $t('lotteryDetail.table2')" :key="item">
                        {{item}}
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in rewardList" :key="item.id" v-if="index < 5">
                      <td>{{item.playerIndex}}</td>
                      <td>
                        <span v-if="item.rewardCount === 1">{{$t('lotteryDetail.text44')}}</span>
                        <span v-else>{{$t('lotteryDetail.text45')}}</span>
                      </td>
                      <td>{{item.playAmount | f4}}{{currency}}</td>
                      <td>{{$changeDate(item.createAt)}}</td>
                      <td>
                        <span v-if="item.rewardCount === 1">{{item.moreRewardSum | f4}}{{currency}}</span>
                        <span v-else>{{$t('lotteryDetail.text46')}}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="!rewardList.length">
                  <div class="global-empty">{{$t('common.emptyData')}}</div>
              </div>
            </div>
            <div class="el-pagination-wrap">
              <div class="el-pagination blue-color">
                <router-link :to="`/lotteryDetail/endReward?id=${id}`">{{$t('common.viewMore')}} <i class="el-icon-arrow-right"></i></router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="table">
          <div class="h-wrap">
            <div class="title">
              <div class="title-bg">{{$t('lotteryDetail.text25')}}</div>
            </div>
            <div class="filter justify">
              <div class="r">
                <el-date-picker
                  v-model="timeVal"
                  type="daterange"
                  range-separator="~"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  popper-class="lottery-date"
                  :start-placeholder="$t('lotteryDetail.text30')"
                  :end-placeholder="$t('lotteryDetail.text31')"
                  @change="timeChange"
                >
                </el-date-picker>
              </div>
              <div class="l">
                <span @click="queryType = 0" :class="{active: queryType === 0}">{{$t('lotteryDetail.text32')}}</span>
                <span @click="queryType = 1" :class="{active: queryType === 1}">{{$t('lotteryDetail.text33')}}</span>
                <span @click="queryType = 2" :class="{active: queryType === 2}">{{$t('lotteryDetail.text34')}}</span>
              </div>
            </div>
            <div class="border-bg-table diff">
              <div class="table">
                <table>
                  <thead>
                    <tr>
                      <td v-for="item in $t('lotteryDetail.table1')" :key="item">
                        {{item}}
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in bonusLogList" :key="item.id">
                      <td>{{item.id}}</td>
                      <td>{{item.userName}}</td>
                      <td>
                        <span v-if="item.changeType === 1">{{$t('lotteryDetail.text26')}}</span>
                        <span v-else-if="item.changeType === 2">{{$t('lotteryDetail.text27')}}</span>
                      </td>
                      <td>{{item.changeAmount | f4}}{{currency}}</td>
                      <td>{{$changeDate(item.createAt)}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="!bonusLogList.length">
                  <div class="global-empty">{{$t('common.emptyData')}}</div>
              </div>
            </div>
            <div v-if="total" class="el-pagination-wrap">
              <el-pagination
                layout="prev, pager, next"
                @current-change="getList"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="web-mob">
      <div class="lottery-detail">
        <div class="phase">
          <div class="mob-title">
            <div class="text">{{$t('common.luckDay')}}<span> {{detail.roundName}} </span>{{$t('lotteryDetail.text3')}}</div>
          </div>
          <div v-if="detail.id && detail.roundState !== 2">
            <div class="count-down">
              <!--  待开始  -->
              <span v-if="detail.roundState === 0">{{$t('lotteryDetail.text29')}}</span>
              <!--  已开始  -->
              <span v-if="detail.roundState === 1">{{$t('lotteryDetail.text4')}}</span>
              <span> {{countDown.day}} {{$t('common.day')}}</span>
              <span> {{countDown.hour}} {{$t('common.hour')}}</span>
              <span> {{countDown.min}} {{$t('common.minute')}}</span>
              <span> {{countDown.sec}} {{$t('common.second')}}</span>
            </div>
            <router-link v-if="detail.roundState === 1" :to="loginFlag ? `/lotteryDetail/betting?id=${id}` : '/login'" class="tz-btn"><div class="custom-font">{{$t('lotteryDetail.text5')}}</div></router-link>
          </div>
          <div v-if="detail.roundState === 2">
            <div class="tz-btn end">
              <div class="custom-font">{{$t('lotteryDetail.text6')}}</div>
            </div>
          </div>
        </div>
        <div class="total">
          <div class="h-wrap">
            <!-- <router-link tag="div" class="link" :to="`/lotteryDetail/rule?detail=${JSON.stringify(detail)}`">
              <span>{{$t('lotteryDetail.text7')}}</span>
              <span><i class="el-icon-arrow-right"></i></span>
            </router-link> -->
            <div class="money-list">
              <div class="money-item">
                <span>{{$t('lotteryDetail.text8')}}</span>
                <div class="yellow-color"><ICountUp :startVal="0" :endVal="detail.dividePool || 0" :decimals="4"/>{{currency}}</div>
              </div>
              <div class="money-item">
                <span>{{$t('lotteryDetail.text9')}}</span>
                <div class="yellow-color"><ICountUp :startVal="0" :endVal="detail.rewardPool || 0" :decimals="4"/>{{currency}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="activity-person">
          <img src="" alt="">
          <p>张三丰</p>
          <p>{{$t('lotteryDetail.text10')}}</p>
        </div> -->
        <div class="current-guide">
          <div class="h-wrap">
            <div class="mob-title">
              <div class="text">{{$t('lotteryDetail.text11')}}</div>
              <router-link class="sub-tit" :to="`/lotteryDetail/rule?detail=${JSON.stringify(detail)}`">{{$t('lotteryDetail.text7')}}<i class="el-icon-arrow-right"></i></router-link>
            </div>
            <div class="flex">
              <div class="flex-item">
                <span>{{$t('lotteryDetail.text12')}}</span>
                <p class="yellow-color">{{detail.minJoinAmount | f4}}{{currency}}</p>
              </div>
              <div class="flex-item">
                <span>{{$t('lotteryDetail.text13')}}</span>
                <p class="yellow-color">{{detail.earningsRatio * 100}}%/{{$t('common.day')}}</p>
              </div>
              <div class="flex-item">
                <span>{{$t('lotteryDetail.text14')}}</span>
                <p class="yellow-color">{{detail.bonusReturnRatio * 100}}%</p>
              </div>
            </div>
          </div>
        </div>
        <div class="my" v-if="loginFlag">
          <div class="h-wrap">
            <div class="mob-title">
              <div class="text">{{$t('lotteryDetail.text16')}}</div>
              <router-link class="sub-tit" :to="`/lotteryDetail/bounsDetail?id=${id}`">{{$t('lotteryDetail.text17')}}<i class="el-icon-arrow-right"></i></router-link>
            </div>
            <!-- <div class="links">
              <router-link :to="`/lotteryDetail/bounsDetail?id=${id}`">{{$t('lotteryDetail.text17')}}</router-link>
            </div> -->
            <!-- <router-link tag="div" class="link" :to="`/lotteryDetail/bounsDetail?id=${id}`">
              <span>{{$t('lotteryDetail.text16')}}</span>
              <span>{{$t('lotteryDetail.text28')}}<i class="el-icon-arrow-right"></i></span>
            </router-link> -->
            <div class="flex">
              <div class="flex-item">
                <span>{{$t('lotteryDetail.text18')}}</span>
                <p class="yellow-color">{{userRewrad.bonusSum | f4}}{{currency}}</p>
              </div>
              <div class="flex-item">
                <span>{{$t('lotteryDetail.text19')}}</span>
                <p class="yellow-color">{{userRewrad.bonusCount}}{{$t('lotteryDetail.text20')}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="rank">
          <div class="h-wrap">
            <div class="mob-title">
              <div class="text">{{$t('lotteryDetail.text21')}}</div>
              <div class="sub-tit" v-if="loginFlag">{{$t('lotteryDetail.text22')}}：{{userRewrad.myNewIndex}}</div>
            </div>

            <div class="rank-list">
              <!-- <div class="rank-item" v-if="loginFlag">
                <div class="rank-count">{{userRewrad.myNewIndex}}</div>
                <p>{{$t('lotteryDetail.text22')}}</p>
              </div> -->
              <div class="rank-item">
                <div class="rank-count">
                  <img src="~@img/my/avatar.png" width="80" height="80" alt="">
                </div>
                <p >{{$t('lotteryDetail.text23')}}: <span class="yellow-color">{{detail.lastPlayer && detail.lastPlayer.userName}}</span></p>
              </div>
              <router-link v-if="detail.roundState === 1" tag="div" :to="loginFlag ? `/lotteryDetail/betting?id=${id}` : '/login'" class="rank-item rank-end">
                <div class="rank-count icon"></div>
                <p class="yellow-color">{{$t('lotteryDetail.text24')}}</p>
              </router-link>
            </div>
          </div>
        </div>
        <div class="table" v-if="loginFlag">
          <div class="h-wrap">
            <div class="mob-title">
              <div class="text">{{$t('lotteryDetail.text36')}}</div>
            </div>
            <div class="mock-table">
              <div class="list" v-for="(item, index) in rewardList" v-if="index < 5" :key="item.id">
                <div class="item justify">
                  <p>
                    <span>{{$t('lotteryDetail.table2[0]')}}</span>
                    <span>{{item.playerIndex}}</span>
                  </p>
                  <p>
                    <span>{{$changeDate(item.createAt)}}</span>
                  </p>
                </div>
                <div class="item justify">
                  <p>{{$t('lotteryDetail.table2[2]')}}</p>
                  <p>{{item.playAmount | f4}}{{currency}}</p>
                </div>
                <div class="item justify">
                  <p>{{$t('lotteryDetail.table2[4]')}}</p>
                  <p>
                    <span v-if="item.rewardCount === 1">{{item.moreRewardSum | f4}}{{currency}}</span>
                    <span v-else>{{$t('lotteryDetail.text46')}}</span>
                  </p>
                </div>
              </div>
            </div>
            <div v-if="!rewardList.length">
              <div class="global-empty">{{$t('common.emptyData')}}</div>
            </div>
            <div class="view-more">
              <router-link :to="`/lotteryDetail/endReward?id=${id}`">{{$t('common.viewMore')}} <i class="el-icon-arrow-right"></i></router-link>
            </div>
          </div>
        </div>
        <div class="table">
          <div class="h-wrap">
            <div class="mob-title">
              <div class="text">{{$t('lotteryDetail.text25')}}</div>
            </div>
            <div class="mock-table">
              <div class="list" v-for="(item, index) in bonusLogList" v-if="index < 3" :key="item.id">
                <div class="item justify">
                  <p>
                    <span>{{$t('lotteryDetail.table1[0]')}}</span>
                    <span>{{item.id}}</span>
                  </p>
                  <p>
                    <span v-if="item.changeType === 1">{{$t('lotteryDetail.text26')}}</span>
                    <span v-else-if="item.changeType === 2">{{$t('lotteryDetail.text27')}}</span>
                  </p>
                </div>
                <div class="item justify">
                  <p>{{item.userName}}</p>
                  <p>{{item.changeAmount | f4}}{{currency}}</p>
                </div>
                <div class="item justify">
                  <p></p>
                  <p>{{$changeDate(item.createAt)}}</p>
                </div>
              </div>
            </div>
            <div v-if="!bonusLogList.length">
              <div class="global-empty">{{$t('common.emptyData')}}</div>
            </div>
            <div v-if="bonusLogList.length > 2" class="view-more">
              <router-link :to="`/lotteryDetail/bounsDetailMore?id=${id}`">{{$t('common.viewMore')}} <i class="el-icon-arrow-right"></i></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="load" class="global-loading fixed"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ICountUp from 'vue-countup-v2'
export default {
  data () {
    return {
      detail: {}, // 大乐透详情
      userAddress: '', // 用户地址
      userRewrad: {}, // 用户奖励
      currency: '',
      id: this.$route.query.id,
      bonusLogList: [], // 分红池收支列表
      total: 1,
      rewardList: [], // 我的奖金列表
      timeVal: '', // 筛选时间
      currentPage: 1,
      queryType: 0,
      countDown: {
        day: '',
        hour: '',
        min: '',
        sec: '',
        timer: null
      },
      load: true,
      pageSize: 8
    }
  },
  components: {
    ICountUp
  },
  watch: {
    queryType: function () {
      this.getList()
    }
  },
  computed: {
    ...mapGetters([
      'loginFlag',
      'userData'
    ])
  },
  mounted () {
    this.$nextTick(() => {
      this.getUser()
      this.getList()
    })
  },
  methods: {
    getData () {
      let params = {
        roundId: this.id
      }
      let address = this.userAddress
      if (address) {
        params.userAddress = address
      }
      this.$fetch.post('/lotto/lottoRewardDetail', params).then(res => {
        setTimeout(() => {
          this.load = false
        }, 100)
        let data = res.data.data
        this.detail = data.rewardRound
        this.currency = this.detail.rewardCurrency
        this.userRewrad = {
          bonusCount: data.bonusCount,
          myNewIndex: data.myNewIndex || '0',
          bonusSum: data.bonusSum
        }

        // 活动未结束开始倒计时
        if (this.detail.roundState !== 2) {
          this.duration()
        }
      })
    },
    getUser () {
      this.$http.post(`${this.$api}/user/balance`).then(res => {
        if (res.data.success) {
          this.userAddress = res.data.data.user.address
          this.getRewardList()
        }
        this.getData()
      }).catch(() => {
        this.getData()
      })
    },
    getList (pageIndex = 1) {
      if (pageIndex === 1) {
        this.currentPage = 1
      }
      let startDate = ''
      let endDate = ''
      let timeVal = this.timeVal
      if (timeVal) {
        startDate = timeVal[0]
        endDate = timeVal[1]
      }
      this.$fetch.post('/lotto/getBonusLogList', {
        roundId: this.id,
        pageIndex: pageIndex,
        pageSize: this.pageSize,
        queryType: this.queryType,
        startDate: startDate,
        endDate: endDate
      }).then(res => {
        this.bonusLogList = res.data.data.bonusLogList
        this.total = res.data.data.totalRecord
      })
    },
    getRewardList (pageIndex = 1) {
      this.$fetch.post('/lotto/getEndRewardStatic', {
        roundId: this.id,
        pageIndex: pageIndex,
        pageSize: this.pageSize,
        queryType: 3 // 1 全部 2 只看已经中奖用户 3 只看自己
      }).then(res => {
        this.rewardList = res.data.data.rewardPlayerList
      })
    },
    checkTime (i) {
      if (i < 10) {
        i = '0' + i
      }
      return i
    },
    duration () {
      let leftTime
      let start = this.detail.startAt // 开始时间
      let now = Date.parse(new Date()) // 当前时间

      if (this.detail.roundState === 0) {
        // 活动未开始，计算剩余开始的毫秒数
        leftTime = (start - now)

        if (leftTime < 1000) {
          // 倒计时完了刷新页面
          this.$loading({
            text: this.$t('common.loading'),
            background: 'rgba(0,0,0,.8)'
          })
          setTimeout(() => {
            window.location.reload(true)
          }, 5000)
          return
        }
      } else {
        // 活动已开始，计算已经开始的毫秒数
        leftTime = (now - start)
      }

      let days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10) // 计算已经开始的天数
      let hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10) // 计算已经开始的小时
      let minutes = parseInt(leftTime / 1000 / 60 % 60, 10) // 计算已经开始的分钟
      let seconds = parseInt(leftTime / 1000 % 60, 10) // 计算已经开始的秒数
      this.countDown.day = this.checkTime(days) // 已经开始的天数
      this.countDown.hour = this.checkTime(hours) // 已经开始的小时
      this.countDown.min = this.checkTime(minutes) // 已经开始的分钟
      this.countDown.sec = this.checkTime(seconds) // 已经开始的秒数
      this.countDown.timer = setTimeout(() => this.duration(), 1000)
    },
    timeChange () {
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
  @import (reference) '~@/assets/css/mixin';
  @media @pc{
    .lottery-detail{
      background: #101229;
      line-height: 1.1;
      text-align: center;
      .flex{
        .justify;
      }
      .title{
        padding: 50px 0 40px;
        font-size: 20px;
        font-weight: bold;
        &-bg{
        display: inline-block;
        color: @yellow;
        padding: 0 83px;
        background: url(~@img/lottery/left1.png) left center no-repeat,
                    url(~@img/lottery/right1.png) right center no-repeat;
        }
      }
      .flex-item{
        flex: 1;
        position: relative;
        p{
          padding-top: 20px;
          font-size: 28px;
        }
        & + .flex-item{
          &:before{
            content: '';
            position: absolute;
            width: 1px;
            height: 40px;
            background: @blue;
            left: 0;
            top: 50%;
            margin-top: -20px;
          }
        }
      }
    }
    .phase{
      padding: 50px 0;
      .design-title{
        margin-bottom: 30px;
      }
      h3{
        font-size: 32px;
      }
      .text span{
        margin: 0 8px;
      }
      .tz-btn{
        padding-top: 10px;
        margin-top: 40px;
        line-height: 40px;
        height: 51px;
        display: inline-block;
        width: 263px;
        background: url(~@img/lottery/btn_bg.png) no-repeat;
        color: @yellow;
        font-size: 20px;
        font-weight: bold;
        &.end{
          cursor: default;
        }
        &.start:hover{
          opacity: .7;
        }
      }
    }
    .total{
      background: #171d3d;
      padding: 50px 0 60px;
      .link{
        padding-bottom: 40px;
      }
    }
    .activity-person{
      padding: 40px 0 35px;
      line-height: 1.6;
      img{
        .circle(100px);
        margin-bottom: 16px;
      }
    }
    .current-guide{
      // background: #171d3d;
      padding-bottom: 60px;
    }
    .my{
      background: #171d3d;
      padding-bottom: 60px;
      .title{
        padding-bottom: 20px;
      }
      .link{
        font-size: 16px;
        padding-bottom: 40px;
        color: @blue;
      }
    }
    .rank{
      padding-bottom: 50px;
      .title{
        padding-bottom: 40px;
      }
      &-list{
        display: flex;
        justify-content: center;
      }
      &-item{
        width: 310px;
      }
      &-count{
        display: inline-block;
        .circle(80px);
        overflow: hidden;
        background: #ff4848;
        line-height: 80px;
        font-size: 26px;
        color: #ffffff;
        margin-bottom: 20px;
        &.icon{
          background: #ff4848 url(~@img/lottery/rank_head.png) no-repeat center;
        }
      }
      p{
        padding-bottom: 10px;
      }
    }
    .table{
      background: #171d3d;
      .filter{
        padding: 20px 0;
      }
      .l{
        .justify;
        border: 1px solid @blue;
        line-height: 32px;
        text-align: center;
        border-radius: 4px;
        font-size: 14px;
        span{
          width: 98px;
          cursor: default;
          &.active{
            background: @blue;
            color: #fff;
          }
          & + span{
            border-left: 1px solid @blue;
          }
        }
      }
    }
    .reward-table{
      padding: 20px 0 60px;
      background: none;
    }
  }

  @media @mob{
    .diff{
      padding-top: 70px;
    }
    .lottery-detail{
      background: #101229;
      line-height: 1.1;
      text-align: center;
      .flex{
        display: block;
      }
      .flex-item{
        .justify;
        &+.flex-item{
          padding-top: 20px;
        }
      }
      .mob-title{
        padding: 35px 0 20px;
        .sub-tit{
          display: block;
          font-size: 14px;
          padding-top: 10px;
          font-weight: normal;
        }
        a.sub-tit{
          padding-left: 10px;
        }
      }
    }
    .link{
      .justify;
      background: url(~@img/lottery/tit_left.png) no-repeat left center;
      padding-left: 26px;
      text-align: left;
      font-size: 18px;
      padding-top: 20px;
      padding-bottom: 20px;
      span + span{
        font-size: 16px;
      }
      i{
        color: @yellow;
      }
      & + .flex{
        padding-left: 25px;
        padding-top: 5px;
      }
    }
    .phase{
      padding: 20px 0 40px;
      .mob-title{
        font-size: 21px;
        font-weight: normal;
        padding-bottom: 10px;
      }
      .tz-btn{
        padding-top: 10px;
        margin-top: 20px;
        line-height: 40px;
        height: 51px;
        display: inline-block;
        width: 263px;
        background: url(~@img/lottery/btn_bg.png) no-repeat;
        color: @yellow;
        font-size: 20px;
        font-weight: bold;
        &.end{
          cursor: default;
        }
        &.start:hover{
          opacity: .7;
        }
      }
    }
    .total{
      background: #171d3d;
      padding-bottom: 50px;
      .money-item{
        padding-top: 60px;
        > span{
          font-size: 18px;
          font-weight: bold;
        }
      }
      .yellow-color{
        padding-top: 20px;
        text-align: center;
        font-size: 26px;
      }
    }
    .activity-person{
      padding: 40px 0 35px;
      line-height: 1.6;
      img{
        .circle(100px);
        margin-bottom: 16px;
      }
    }
    .current-guide{
      // background: #171d3d;
      padding-bottom: 60px;
    }
    .my{
      background: #171d3d;
      padding:10px 0 40px;
      .title{
        padding-bottom: 20px;
      }

    }
    .rank{
      padding-bottom: 50px;
      .owner{
        margin-top: -30px;
        margin-bottom: 30px;
        font-size: 14px;
      }
      &-list{
        // display: flex;
        justify-content: center;
      }
      &-count{
        display: inline-block;
        .circle(80px);
        overflow: hidden;
        background: #ff4848;
        line-height: 80px;
        font-size: 26px;
        color: #ffffff;
        margin-bottom: 20px;
        &.icon{
          background: #ff4848 url(~@img/lottery/rank_head.png) no-repeat center;
        }
      }
      &-end{
        background: url(~@img/lottery/arrow2.png) no-repeat center 20px;
        background-size: auto 90px;
        padding-top: 130px;
      }
      p{
        padding-bottom: 10px;
      }
    }
    .table{
      background: #171d3d;
    }
    .mock-table{
      .list{
        padding: 15px 10px;
        border-top: 1px solid #101229;
        .item+.item{
          padding-top: 10px;
        }
        p+p{
          color: @yellow;
        }
      }
    }
  }

</style>
<style lang="less">
  .lottery-page{
    .lottery-detail{
      .el-input__inner{
        border-color: #5667d4 !important;
        height: 34px;
        line-height: 32px;
        padding: 0 0 0 20px;
        width: 340px;
      }
      .el-range-separator,.el-range-input, input::-webkit-input-placeholder{
        color: #5667d4;
      }
      .el-range-input{
        line-height: 32px;
        height: 32px;
      }
      .el-range__icon{
        color: #5667d4;
        font-size: 20px;
      }
    }
  }
  .lottery-date{
    &.el-picker-panel{
      background: #1f2752;
      color: #7693fc;
      border: none;
      .el-date-table td span{
        border-radius: 2px;
        padding-top: 2px;
        padding-bottom: 2px;
        height: 28px;
        width: 28px;
      }
      .el-date-table td.next-month, .el-date-table td.prev-month{
        color: #35437e;
      }
      .el-date-table td.end-date span, .el-date-table td.start-date span{
        background: #6e89eb;
      }
      .el-date-table th{
        color: #7693fc;
        border: none;
      }
      .el-date-range-picker__content.is-left{
        border-color: #171d41;
      }
      .popper__arrow{
        display: none;
      }
      .el-picker-panel__icon-btn{
        color: #7693fc;
      }
      .el-picker-panel__icon-btn.is-disabled{
        visibility: hidden;
      }
      .el-date-table td div{
        padding-top: 0;
        padding-bottom: 0;
      }
      .el-date-table td.in-range div,.el-date-table td.in-range div:hover{
        padding-top: 0;
        padding-bottom: 0;
        background: #262e63;
      }
      .el-date-table td.in-range.start-date div,.el-date-table td.in-range.end-date div{
        background: none;
      }
      .el-date-range-picker__header div{
        margin-right: 0;
      }
    }
  }
</style>
