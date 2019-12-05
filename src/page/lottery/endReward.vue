<template>
  <div class="page lottery-page">
    <div class="location">
      <div class="h-wrap">
        <a href="javascript:" @click="$router.go(-1)">{{$t('common.luckDay')}}</a>
        <span>></span>
        <span>{{$t('lotteryDetail.text36')}}</span>
      </div>
    </div>
    <mob-header>{{$t('lotteryDetail.text36')}}</mob-header>
    <div class="web-pc">
      <div class="bouns-detail">
        <div class="h-wrap">
          <div class="intro">
            <div class="info">
              <h3>{{$t('lotteryDetail.text37')}}</h3>
              <p>{{detail.rewardPoolAmount | f4}}RPO</p>
            </div>
            <div class="info">
              <h3><img class="icon" src="~@img/lottery/user.png" width="24" alt="">{{$t('lotteryDetail.text38')}} / {{$t('lotteryDetail.text39')}}</h3>
              <p>{{detail.myRewardCount}} / {{detail.myPlayerCount}}</p>
            </div>
            <div class="info">
              <h3><img class="icon" src="~@img/lottery/king.png" width="24" alt="">{{$t('lotteryDetail.text40')}}</h3>
              <p>{{detail.rewardNumber}}</p>
            </div>
          </div>
          <div class="filter">
            <el-radio v-model="queryType" label="1">{{$t('lotteryDetail.text41')}}</el-radio>
            <el-radio v-model="queryType" label="2">{{$t('lotteryDetail.text42')}}</el-radio>
            <el-radio v-model="queryType" label="3">{{$t('lotteryDetail.text43')}}</el-radio>
          </div>
          <div class="border-bg-table diff">
            <div class="table">
              <table>
                <thead>
                  <tr>
                    <td v-for="item in $t('lotteryDetail.table3')" :key="item">
                      {{item}}
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in list" :key="item.id">
                    <td>
                      {{item.playerIndex}}
                      <img class="icon" v-if="item.rewardCount === 1 && queryType !== '2'" src="~@img/lottery/king.png" width="24" alt="">
                      <img class="icon" v-if="item.userAddress === $store.getters.userData.address && queryType !== '3'" src="~@img/lottery/user.png" width="24" alt="">
                    </td>
                    <td>{{item.userName}}</td>
                    <td>{{item.playAmount | f4}}{{item.playCurrency}}</td>
                    <td>{{$changeDate(item.createAt)}}</td>
                    <td>
                      <span v-if="item.rewardCount === 1">{{item.moreRewardSum | f4}}{{item.playCurrency}}</span>
                      <span v-else>{{$t('lotteryDetail.text46')}}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="load" class="global-loading"></div>
            <div v-else>
              <div v-if="!list.length">
                  <div class="global-empty">{{$t('common.emptyData')}}</div>
              </div>
            </div>
          </div>
          <div v-if="total" class="el-pagination-wrap">
            <el-pagination
              layout="prev, pager, next"
              @current-change="getData"
              :page-size="pageSize"
              :current-page.sync="currentPage"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="web-mob">
      <div class="bouns-detail">
        <div class="mob-order-menu">
          <div class="mob-order-menu-item" @click="queryType = '1'" :class="{active: queryType == 1}">{{$t('lotteryDetail.text47')}}</div>
          <div class="mob-order-menu-item" @click="queryType = '2'" :class="{active: queryType == 2}"><img src="~@img/lottery/king.png" width="14" class="icon" />{{$t('lotteryDetail.text48')}}</div>
          <div class="mob-order-menu-item" @click="queryType = '3'" :class="{active: queryType == 3}"><img src="~@img/lottery/user.png" width="14" class="icon" />{{$t('lotteryDetail.text38')}}</div>
        </div>
        <div class="list">
          <div class="border-bg diff" v-for="item in list" :key="item.id">
            <div class="list-item">
              <div class="justify">
                <span>
                  {{$t('lotteryDetail.table3[0]')}} {{item.playerIndex}}
                  <img src="~@img/lottery/king.png" v-if="item.rewardCount === 1 && queryType !== '2'" width="18" class="icon" />
                  <img src="~@img/lottery/user.png" v-if="item.userAddress === $store.getters.userData.address && queryType !== '3'" width="18" class="icon" />
                </span>
                <span>{{item.userName}}</span>
              </div>
              <div class="justify">
                <span>{{$t('lotteryDetail.table3[2]')}}</span>
                <span>{{item.playAmount | f4}}{{item.playCurrency}}</span>
              </div>
              <div class="justify">
                <span>{{$t('lotteryDetail.table3[4]')}}</span>
                <span>
                  <span v-if="item.rewardCount === 1">{{item.moreRewardSum | f4}}{{item.playCurrency}}</span>
                  <span v-else>{{$t('lotteryDetail.text46')}}</span>
                </span>
              </div>
            </div>
          </div>
          <div v-if="load" class="global-loading"></div>
          <div v-else>
            <div v-if="!list.length">
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      total: 0,
      list: [],
      id: this.$route.query.id,
      pageSize: 8,
      load: true,
      queryType: '1',
      detail: {},
      currentPage: 1
    }
  },
  watch: {
    queryType: function () {
      this.getData()
    }
  },
  methods: {
    getData (pageIndex = 1) {
      if (pageIndex === 1) {
        this.currentPage = 1
      }
      this.$fetch.post('/lotto/getEndRewardStatic', {
        roundId: this.id,
        pageIndex: pageIndex,
        pageSize: this.pageSize,
        queryType: this.queryType // 1 全部 2 只看已经中奖用户 3 只看自己
      }).then(res => {
        this.load = false
        this.detail = res.data.data
        this.list = this.detail.rewardPlayerList
        this.total = this.detail.totalRecord
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
  .bouns-detail{
    background: #171d3d;
    .title{
      font-size: 34px;
      text-align: center;
      line-height: 1;
      padding: 60px 0;
    }
    table{
      margin-bottom: 30px;
    }
    .intro{
      display: flex;
      font-size: 16px;
      padding: 50px 0 40px;
      .info + .info{
        margin-left: 150px;
        text-align: center;
      }
      p{
        padding-top: 20px;
        color: @yellow;
        font-size: 26px;
      }
    }
    .filter{
      border-top: 1px solid #101229;
      padding: 40px 0;
    }
    .icon{
      vertical-align: middle;
      margin: -2px 6px 0 0;
    }
    /deep/ .el-radio {
      margin-right: 20px;
      &.is-checked{
        .el-radio__inner{
          background: @yellow;
          border-color: @yellow;
        }
        .el-radio__label{
          color: @yellow !important;
        }
      }
      .el-radio__inner{
        width: 18px;
        height: 18px;
        border-color: #6780dd;
        background: none;
      }
      .el-radio__label{
        font-size: 16px;
        color: #6780dd !important;
      }
    }
    td:first-child{
      padding-left: 90px;
      text-align: left;
      .icon{
        margin-left: 10px;
      }
    }
  }
  @media @mob{
    .list{
      .gap;
    }
    .list-item{
      padding: 2px 3% 10px;
    }
    .border-bg{
      margin-bottom: 14px;
    }
    .justify{
      padding: 2px 0;
      span+span{
        color: @yellow;
      }
    }
  }
  .mob-order-menu{
    margin-top: -30px;
    line-height: 44px;
    box-shadow: 0 0 20px #192774;
    margin-bottom: 20px;
    font-size: 16px;
    font-family: titleChi;
    .justify;
    &-item{
      flex: 1;
      text-align: center;
      padding: 0 2px;
      border-bottom: 2px solid transparent;
      &.active{
        border-bottom-color: @yellow;
        color: #fff;
      }
    }
  }
</style>
