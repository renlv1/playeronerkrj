<template>
  <div class="page">
    <div class="account-tit">
      <a href="javascrip:;" @click="$router.go(-1)">{{$t('rewardLottery.text1')}}</a>
      <span class="el-icon-arrow-right"></span>
      <span>{{$t('rewardLottery.text2')}}</span>
    </div>
    <mob-header>{{$t('rewardLottery.text1')}}</mob-header>
    <div class="web-pc">
      <div class="reward-detail">
        <div class="table-list">
          <p>{{$t('rewardLottery.text3')}}</p>
          <div class="table">
            <table>
              <tbody>
                <tr>
                  <td v-for="item in $t('rewardLottery.table2')" :key="item">
                    {{item}}
                  </td>
                </tr>
                <tr>
                  <td>{{rewardDetail.roundName}}</td>
                  <td>{{rewardDetail.userJoinSumAmt | f4}}{{rewardDetail.rewardCurrency}}</td>
                  <td>{{rewardDetail.userGetRewardPoolAmt | f4}}{{rewardDetail.rewardCurrency}}</td>
                  <td>{{rewardDetail.userGetDividePoolAmt | f4}}{{rewardDetail.rewardCurrency}}</td>
                  <td>{{rewardDetail.userGetBonusSumAmt | f4}}{{rewardDetail.rewardCurrency}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- <div class="table-list">
          <p>抽成奖励相关</p>
          <div class="table">
            <table>
              <tbody>
                <tr>
                  <td>活动总投注金额</td>
                  <td>抽成奖励</td>
                  <td>运营费用</td>
                  <td>实收金额</td>
                </tr>
                <tr>
                  <td>500000.0000USD</td>
                  <td>500000.0000USD</td>
                  <td>500000.0000USD</td>
                  <td>500000.0000USD</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> -->

        <tab class="tab" :tabMenu="$t('rewardLottery.tabMenu')" @click="changeTab">
          <div slot="slot1">
            <div class="border-bg-table">
              <div class="table">
                <table>
                  <thead>
                    <tr>
                      <td v-for="item in $t('rewardLottery.table3')" :key="item">
                    {{item}}
                  </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in list" :key="item.id">
                      <td>{{item.id}}</td>
                      <td>{{item.playAmount | f4}}{{item.playCurrency}}</td>
                      <td>{{$changeDate(item.updateAt)}}</td>
                      <td>{{item.bonusCount}}</td>
                      <td>{{item.userGetDivideSumAmt | f4}}{{item.playCurrency}}</td>
                    </tr>
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
          <div slot="slot2">
            <div class="border-bg-table">
              <div class="table">
                <table>
                  <thead>
                    <tr>
                      <td v-for="item in $t('rewardLottery.table4')" :key="item">
                        {{item}}
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in list" :key="item.id">
                      <td>{{item.id}}</td>
                      <td>{{item.playAmount | f4}}{{item.playCurrency}}</td>
                      <td>{{$changeDate(item.updateAt)}}</td>
                      <td>{{item.userGetRewardPoolAmt | f4}}{{item.playCurrency}}</td>
                    </tr>
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
          <div slot="slot3">
            <div class="border-bg-table">
              <div class="table">
                <table>
                  <thead>
                    <tr>
                      <td v-for="item in $t('rewardLottery.table5')" :key="item">
                        {{item}}
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in recommendList" :key="item.id">
                      <td>{{item.userName}}</td>
                      <td>{{$changeDate(item.updateAt)}}</td>
                      <td>{{item.usedDay}}/{{item.totalDay}}</td>
                      <td>{{item.usedReward | f4}}{{item.totalCurrency}}/{{item.allReward | f4}}{{item.totalCurrency}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="load" class="global-loading"></div>
              <div v-else>
                <div v-if="!recommendListTotal">
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
          <div slot="slot4">
            <div class="border-bg-table">
              <div class="table">
                <table>
                  <thead>
                    <tr>
                      <td v-for="item in $t('rewardLottery.table6')" :key="item">
                        {{item}}
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in list" :key="item.id">
                      <td>{{item.id}}</td>
                      <td>{{item.playAmount | f4}}{{item.playCurrency}}</td>
                      <td>{{$changeDate(item.updateAt)}}</td>
                      <td>{{item.feeSumAmount | f4}}{{item.playCurrency}}</td>
                    </tr>
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
        </tab>

      </div>
    </div>
    <div class="web-mob">
      <div class="reward-detail">
        <div class="table-list">
          <div class="mob-title">
            <div class="text">{{$t('rewardLottery.text5')}}</div>
          </div>
          <div class="detail-list">
            <div class="item">
              <span>{{$t('rewardLottery.table2[0]')}}</span>
              <span>{{rewardDetail.roundName}}</span>
            </div>
            <div class="item">
              <span>{{$t('rewardLottery.table2[1]')}}</span>
              <span>{{rewardDetail.userJoinSumAmt | f4}}{{rewardDetail.rewardCurrency}}</span>
            </div>
            <div class="item">
              <span>{{$t('rewardLottery.table2[2]')}}</span>
              <span>{{rewardDetail.userGetRewardPoolAmt | f4}}{{rewardDetail.rewardCurrency}}</span>
            </div>
            <div class="item">
              <span>{{$t('rewardLottery.table2[3]')}}</span>
              <span>{{rewardDetail.userGetDividePoolAmt | f4}}{{rewardDetail.rewardCurrency}}</span>
            </div>
            <div class="item">
              <span>{{$t('rewardLottery.table2[4]')}}</span>
              <span>{{rewardDetail.userGetBonusSumAmt | f4}}{{rewardDetail.rewardCurrency}}</span>
            </div>
          </div>
          <div class="mob-title">
            <div class="text">{{$t('rewardLottery.text6')}}</div>
          </div>
          <div class="tab-list">
            <router-link tag="div" class="item" :to="`/account/rewardMore?id=${id}&title=${$t('rewardLottery.tabMenu[0]')}&type=1`">{{$t('rewardLottery.tabMenu[0]')}}</router-link>
            <router-link tag="div" class="item" :to="`/account/rewardMore?id=${id}&title=${$t('rewardLottery.tabMenu[1]')}&type=2`">{{$t('rewardLottery.tabMenu[1]')}}</router-link>
            <router-link tag="div" class="item" :to="`/account/rewardMore?id=${id}&title=${$t('rewardLottery.tabMenu[2]')}&type=3`">{{$t('rewardLottery.tabMenu[2]')}}</router-link>
            <router-link tag="div" class="item" :to="`/account/rewardMore?id=${id}&title=${$t('rewardLottery.tabMenu[3]')}&type=4`">{{$t('rewardLottery.tabMenu[3]')}}</router-link>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import tab from '@/components/tab'
export default {
  data () {
    return {
      detail: {},
      list: [],
      rewardDetail: {}, // 奖励统计
      recommendList: [], // 推荐奖励
      recommendListTotal: 0, // 推荐奖励总数
      load: true,
      id: this.$route.query.id,
      pageSize: 8,
      total: 0,
      currentPage: 1
    }
  },
  components: {
    tab
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
    // 奖励统计
    getRewardData () {
      this.$fetch.post(`/lotto/getActivityRewardDetail?roundId=${this.id}`).then(res => {
        if (res.data.success) {
          this.rewardDetail = res.data.data
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
    },
    changeTab (index) {

    }
  },
  mounted () {
    this.getData()
    this.getRewardData()
    this.getUserGroupData()
  }
}
</script>

<style lang="less" scoped>
  @import (reference) '~@/assets/css/mixin';
  .reward-detail{
    margin-left: 40px;
    width: 1000px;
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
    .tab{
      margin-top: 80px;
    }
    .border-bg-table{
      margin-top: 40px;
    }
    @media @mob{
      width: auto;
      margin-left: 0;
      padding: 30px 3%;
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
      .tab-list{
        .item{
          padding: 0 4%;
          background: url(~@img/lottery/list-menu.png) no-repeat;
          background-size: 100% 100%;
          height: 50px;
          margin-bottom: 12px;
          color: @yellow;
          .justify;
          &:after{
            content: '';
            background: url(~@img/lottery/arrow3.png) no-repeat 0 center;
            display: block;
            width: 16px;
            height: 16px;
            background-size: 100%;
          }
        }
      }
    }
  }
</style>
