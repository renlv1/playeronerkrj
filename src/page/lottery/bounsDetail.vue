<template>
  <div class="page lottery-page">
    <div class="location">
      <div class="h-wrap">
        <a href="javascript:" @click="$router.go(-1)">{{$t('common.luckDay')}}</a>
        <span>></span>
        <span>{{$t('lotteryBouns.text1')}}</span>
      </div>
    </div>
    <mob-header>{{$t('lotteryBouns.text2')}}</mob-header>
    <div class="web-pc">
      <div class="bouns-detail">
        <div class="h-wrap">
          <div class="title">
            <div class="design-title">
              <div class="text">{{$t('lotteryBouns.text2')}}</div>
            </div>
          </div>
          <div class="border-bg-table diff">
            <div class="table">
              <table>
                <thead>
                  <tr>
                    <td v-for="item in $t('lotteryBouns.table1')" :key="item">
                      {{item}}
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in list" :key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{item.playAmount | f4}}{{item.playCurrency}}</td>
                    <td>{{$changeDate(item.payAt)}}</td>
                    <td>{{item.bonusCount}}</td>
                    <td>{{item.userGetDivideSumAmt | f4}}{{item.playCurrency}}</td>
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
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="web-mob">
      <div class="bouns-detail">
        <div class="list">
          <div class="border-bg diff" v-for="item in list" :key="item.id">
            <div class="list-item">
              <div class="justify">
                <span>{{$t('lotteryBouns.table1[0]')}}: {{item.id}}</span>
                <span>{{$changeDate(item.payAt)}}</span>
              </div>
              <div class="justify">
                <span>{{$t('lotteryBouns.table1[1]')}}</span>
                <span>{{item.playAmount | f4}}{{item.playCurrency}}</span>
              </div>
              <div class="justify">
                <span>{{$t('lotteryBouns.table1[4]')}}</span>
                <span>{{item.userGetDivideSumAmt | f4}}{{item.playCurrency}}</span>
              </div>
              <div class="justify">
                <span>{{$t('lotteryBouns.table1[3]')}}</span>
                <span>{{item.bonusCount}}</span>
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
      load: true
    }
  },
  methods: {
    getData (pageIndex = 1) {
      this.$fetch.post('/lotto/getMyRewardPlayerList', {
        roundId: this.id,
        pageIndex: pageIndex,
        pageSize: this.pageSize
      }).then(res => {
        this.load = false
        this.list = res.data.data.rewardPlayerList
        this.total = res.data.data.totalRecord
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/mixin';
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
</style>
