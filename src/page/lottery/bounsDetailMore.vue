<template>
  <div class="page lottery-page">
    <mob-header>{{$t('lotteryDetail.text25')}}</mob-header>
    <div class="web-mob">
      <div class="bouns-detail">
        <div class="list">
          <div class="mock-table">
            <div class="list" v-for="item in list" :key="item.id">
              <div class="item justify">
                <p>
                  <span>{{$t('lotteryDetail.table1[0]')}}: </span>
                  <span>{{item.id}}</span>
                </p>
                <p>
                  <span v-if="item.changeType === 1">{{$t('lotteryDetail.text26')}}</span>
                  <span v-else-if="item.changeType === 2">{{$t('lotteryDetail.text27')}}</span>
                </p>
              </div>
              <div class="item justify">
                <p>{{item.userName}}</p>
                <p>{{item.changeAmount | f4}}RPO</p>
              </div>
              <div class="item justify">
                <p></p>
                <p>{{$changeDate(item.createAt)}}</p>
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
      this.$fetch.post('/lotto/getBonusLogList', {
        roundId: this.id,
        pageIndex: pageIndex,
        pageSize: this.pageSize,
        queryType: 0
      }).then(res => {
        this.load = false
        this.list = res.data.data.bonusLogList
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
    .justify{
      padding: 1px 0;
    }
    .mock-table{
      margin-top: -30px;
      .list{
        padding: 15px 4%;
        border-bottom: 1px solid #101229;
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
