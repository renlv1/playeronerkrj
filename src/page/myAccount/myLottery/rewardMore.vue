<template>
  <div class="page">
    <mob-header>{{title}}</mob-header>
    <!--  分红奖励  -->
    <div v-if="type == 1">
      <div class="list">
        <div class="border-bg" v-for="item in list" :key="item.id">
          <div class="item-wrap">
            <div class="item">
              <p>
                <span>{{$t('rewardLottery.table3[0]')}}：</span>
                {{item.id}}
              </p>
              <p>{{$changeDate(item.updateAt)}}</p>
            </div>
            <div class="item">
              <p>{{$t('rewardLottery.table3[1]')}}</p>
              <p>{{item.playAmount | f4}}{{item.playCurrency}}</p>
            </div>
            <div class="item">
              <p>{{$t('rewardLottery.table3[3]')}}</p>
              <p>{{item.bonusCount}}</p>
            </div>
            <div class="item">
              <p>{{$t('rewardLottery.table3[4]')}}</p>
              <p>{{item.userGetDivideSumAmt | f4}}{{item.playCurrency}}</p>
            </div>
          </div>
        </div>
        <div v-if="load" class="global-loading"></div>
        <div v-else>
          <div v-if="!total">
              <div class="global-empty">{{$t('common.emptyData')}}</div>
          </div>
        </div>
      </div>
      <div v-if="total" class="el-pagination-wrap">
        <el-pagination
          layout="prev, pager, next"
          @current-change="getData"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <!--  奖金池奖励  -->
    <div v-if="type == 2">
      <div class="list">
        <div class="border-bg" v-for="item in list" :key="item.id">
          <div class="item-wrap">
            <div class="item">
              <p>
                <span>{{$t('rewardLottery.table4[0]')}}：</span>
                {{item.id}}
              </p>
              <p>{{$changeDate(item.updateAt)}}</p>
            </div>
            <div class="item">
              <p>{{$t('rewardLottery.table4[1]')}}</p>
              <p>{{item.playAmount | f4}}{{item.playCurrency}}</p>
            </div>
            <div class="item">
              <p>{{$t('rewardLottery.table4[3]')}}</p>
              <p>{{item.userGetRewardPoolAmt | f4}}{{item.playCurrency}}</p>
            </div>
          </div>
        </div>
        <div v-if="load" class="global-loading"></div>
        <div v-else>
          <div v-if="!total">
              <div class="global-empty">{{$t('common.emptyData')}}</div>
          </div>
        </div>
      </div>
      <div v-if="total" class="el-pagination-wrap">
        <el-pagination
          layout="prev, pager, next"
          @current-change="getData"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <!--  推荐奖励  -->
    <div v-if="type == 3">
      <div class="list">
        <div class="border-bg" v-for="item in recommendList" :key="item.id">
          <div class="item-wrap">
            <div class="item">
              <p>{{$t('rewardLottery.table5[1]')}}</p>
              <p>{{$changeDate(item.updateAt)}}</p>
            </div>
            <div class="item">
              <p>{{$t('rewardLottery.table5[0]')}}</p>
              <p>{{item.userName}}</p>
            </div>
            <div class="item">
              <p>{{$t('rewardLottery.table5[2]')}}</p>
              <p>{{item.usedDay}}/{{item.totalDay}}</p>
            </div>
            <div class="item">
              <p>{{$t('rewardLottery.table5[3]')}}({{item.totalCurrency}})</p>
              <p>{{item.usedReward | f4}}/{{item.allReward | f4}}</p>
            </div>
          </div>
        </div>
        <div v-if="load" class="global-loading"></div>
        <div v-else>
          <div v-if="!total">
              <div class="global-empty">{{$t('common.emptyData')}}</div>
          </div>
        </div>
      </div>
      <div v-if="recommendListTotal" class="el-pagination-wrap">
        <el-pagination
          layout="prev, pager, next"
          @current-change="getUserGroupData"
          :page-size="pageSize"
          :total="recommendListTotal">
        </el-pagination>
      </div>
    </div>
    <!--  奖励抽成  -->
    <div v-if="type == 4">
      <div class="list">
        <div class="border-bg" v-for="item in list" :key="item.id">
          <div class="item-wrap">
            <div class="item">
              <p>
                <span>{{$t('rewardLottery.table6[0]')}}：</span>
                {{item.id}}
              </p>
              <p>{{$changeDate(item.updateAt)}}</p>
            </div>
            <div class="item">
              <p>{{$t('rewardLottery.table6[1]')}}</p>
              <p>{{item.playAmount | f4}}{{item.playCurrency}}</p>
            </div>
            <div class="item">
              <p>{{$t('rewardLottery.table6[3]')}}</p>
              <p>{{item.feeSumAmount | f4}}{{item.playCurrency}}</p>
            </div>
          </div>
        </div>
        <div v-if="load" class="global-loading"></div>
        <div v-else>
          <div v-if="!total">
              <div class="global-empty">{{$t('common.emptyData')}}</div>
          </div>
        </div>
      </div>
      <div v-if="total" class="el-pagination-wrap">
        <el-pagination
          layout="prev, pager, next"
          @current-change="getData"
          :current-page.sync="currentPage"
          :page-size="pageSize"
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
      detail: {},
      list: [],
      recommendList: [], // 推荐奖励
      recommendListTotal: 0, // 推荐奖励总数
      load: true,
      id: this.$route.query.id,
      title: this.$route.query.title,
      type: this.$route.query.type, // 1、分红奖励 2、奖金池奖励 3、推荐奖励 4、奖励抽成
      pageSize: 8,
      total: 0,
      currentPage: 1
    }
  },
  methods: {
    getData (pageIndex = 1) {
      this.$fetch.post('/lotto/getMyRewardPlayerList', {
        roundId: this.id,
        pageSize: this.pageSize,
        pageIndex
      }).then(res => {
        this.load = false
        if (res.data.success) {
          this.list = res.data.data.rewardPlayerList
          this.total = res.data.data.totalRecord
        }
      })
    },
    // 推荐奖励明细
    getUserGroupData (pageIndex = 1) {
      this.$fetch.post('/lotto/getUserGroupTotal', {
        roundId: this.id,
        pageIndex: pageIndex,
        pageSize: this.pageSize
      }).then(res => {
        if (res.data.success) {
          this.recommendList = res.data.data.groupTotalList
          this.recommendListTotal = res.data.data.totalRecord
        }
      })
    }
  },
  mounted () {
    this.getData()
    this.getUserGroupData()
  }
}
</script>

<style lang="less" scoped>
  @import (reference) '~@/assets/css/mixin';
  .list{
    padding: 30px 0 0;
    .gap;
    .border-bg{
      margin-bottom: 16px;
    }
  }
  .item-wrap{
    padding: 2px 3% 10px;
    .item {
      .justify;
      padding: 2px 0;
      p + p{
        color: @yellow;
      }
    }

  }
</style>
