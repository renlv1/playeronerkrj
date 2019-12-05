<template>
  <div class="page">
    <div class="order">
      <div class="account-tit">{{$t('achievement.text1')}}</div>
      <mob-header>{{$t('achievement.text1')}}</mob-header>
      <div class="web-pc">
        <div class="border-bg-table">
          <div class="table click">
            <table>
              <thead>
                <tr>
                  <td v-for="item in $t('achievement.table1')" :key="item">
                    {{item}}
                  </td>
                </tr>
              </thead>
              <tbody>
                <router-link tag="tr" v-for="item in list" :key="item.id" :to="`achievement/achievementDetail?id=${item.groupRoundId}`">
                  <td>{{item.roundName}}</td>
                  <td>{{item.groupTotal | f4}}{{item.totalCurrency}}</td>
                  <td>{{$t('common.detail')}}</td>
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
        <div class="mock-table border-bg-table">
          <router-link tag="div" class="tr" :to="`achievement/achievementDetail?id=${item.groupRoundId}`"  v-for="item in list" :key="item.id">
            <div class="row">
              <div class="td">{{$t('achievement.table1[0]')}}：{{item.roundName}}</div>
            </div>
            <div class="row">
              <div class="td">{{$t('achievement.table1[1]')}}：{{item.groupTotal | f4}}{{item.totalCurrency}}</div>
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
      load: true
    }
  },
  methods: {
    getData (pageIndex = 1) {
      this.$fetch.post('/lotto/getUserPersonTotal', {
        pageIndex: pageIndex,
        pageSize: this.pageSize
      }).then(res => {
        this.load = false
        if (res.data.success) {
          this.list = res.data.data.personTotalList
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
