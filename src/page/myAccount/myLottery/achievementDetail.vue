<template>
  <div class="page">
    <div class="order">
      <div class="account-tit">
        <a href="javascrip:;" @click="$router.go(-1)">{{$t('achievement.text1')}}</a>
        <span class="el-icon-arrow-right"></span>
        <span>{{$t('common.detail')}}</span>
      </div>
      <mob-header>{{$t('achievement.text1')}}</mob-header>
      <div class="web-pc">
        <div class="border-bg-table">
          <div class="table">
            <table>
              <thead>
                <tr>
                  <td v-for="item in $t('achievement.table2')" :key="item">
                    {{item}}
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in list" :key="item.id">
                  <td>{{item.id}}</td>
                  <td>{{item.userName}}</td>
                  <td>{{item.groupTotal | f4}}{{item.totalCurrency}}</td>
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
      </div>
      <div class="web-mob pt30 gap">
        <div class="mock-table border-bg-table">
          <div class="tr" v-for="item in list" :key="item.id">
            <div class="row">
              <div class="td">{{item.userName}}</div>
              <div class="td">{{$t('achievement.table2[0]')}}：{{item.id}}</div>
            </div>
            <div class="row">
              <div class="td">{{$t('achievement.table2[2]')}}：{{item.groupTotal | f4}}{{item.totalCurrency}}</div>
            </div>

          </div>
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
      list: [],
      pageSize: 8,
      total: 0,
      load: true,
      id: this.$route.query.id
    }
  },
  methods: {
    getData (pageIndex = 1) {
      this.$fetch.post('/lotto/getUserGroupTotal', {
        roundId: this.id,
        pageIndex: pageIndex,
        pageSize: this.pageSize
      }).then(res => {
        this.load = false
        if (res.data.success) {
          this.list = res.data.data.groupTotalList
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
  .mock-table .tr{
    background: #2e2d3b;
    &:nth-child(even){
      background: #1d254c;
    }
    .row{
      font-size: 13px;
      color: @blue;
      & + .row{
        font-size: 15px;
        color: @yellow;
      }
    }
  }
</style>
