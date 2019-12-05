<template>
  <div class="page">
    <div class="order">
      <div class="account-tit">{{$t('rewardLottery.text1')}}</div>
      <mob-header>{{$t('rewardLottery.text1')}}</mob-header>
      <div class="web-pc">
      <div class="border-bg-table">
        <div class="table click">
          <table>
            <thead>
              <tr>
                <td v-for="item in $t('rewardLottery.table1')" :key="item">
                  {{item}}
                </td>
              </tr>
            </thead>
            <tbody>
              <router-link tag="tr" v-for="item in list" :key="item.id" :to="`reward/rewardDetail?id=${item.id}`">
                <td>{{item.roundName}}</td>
                <td>{{item.userJoinSumAmt | f4}}{{item.rewardCurrency}}</td>
                <td>{{item.userGetBonusSumAmt | f4}}{{item.rewardCurrency}}</td>
                <td>{{$changeDate(item.createAt)}}</td>
                <td class="blue-color">{{$t('common.detail')}}</td>
              </router-link>
            </tbody>
          </table>
        </div>
        <div v-if="load" class="global-loading"></div>
        <div v-else>
          <div v-if="!total">
            <div class="global-empty">{{$t('common.emptyData')}}</div>
          </div>
        </div>
      </div>
      </div>
      <div class="web-mob pt30 gap">
        <div class="mock-list">
          <router-link tag="div" class="mock-list-item border-bg" :to="`reward/rewardDetail?id=${item.id}`"  v-for="item in list" :key="item.id">
            <div class="mock-list-head">
              <span class="yellow-color">
                <div class="cnShow">{{$t('rewardLottery.text4')}}{{item.roundName}}{{$t('lotteryDetail.text3')}}</div>
                <div class="enShow">{{$t('lotteryDetail.text3')}}{{item.roundName}}</div>
              </span>
              <span>{{$changeDate(item.createAt)}}</span>
            </div>
            <div class="mock-list-body">
              <p>{{$t('rewardLottery.table1[1]')}}：<span class="yellow-color">{{item.userJoinSumAmt | f4}}{{item.rewardCurrency}}</span></p>
              <p>{{$t('rewardLottery.table1[2]')}}：<span class="yellow-color">{{item.userGetBonusSumAmt | f4}}{{item.rewardCurrency}}</span></p>
            </div>
          </router-link>
          <div v-if="load" class="global-loading"></div>
          <div v-else>
            <div v-if="!total">
              <div class="global-empty">{{$t('common.emptyData')}}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="total" class="el-pagination-wrap">
        <el-pagination
          layout="prev, pager, next"
          @current-change="getData"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      pageSize: 10,
      total: 0,
      load: true
    }
  },
  methods: {
    getData (pageIndex = 1) {
      this.$fetch.post('/lotto/getMyReward', {
        pageIndex: pageIndex,
        pageSize: this.pageSize
      }).then(res => {
        this.load = false
        if (res.data.success) {
          this.list = res.data.data.roundList
          this.total = res.data.data.totalRecord
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
