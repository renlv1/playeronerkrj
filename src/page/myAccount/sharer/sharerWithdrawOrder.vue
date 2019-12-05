<template>
  <div class="page">
    <div class="order">
      <div class="account-tit">{{$t('shareWithdrawOrder.text1')}}</div>
      <mob-header>{{$t('shareWithdrawOrder.text1')}}</mob-header>
      <div class="web-pc">
        <div class="filter">
          <div class="search">
            <div class="input-wrap">
              <input type="text" class="input" v-model="orderId" :placeholder="$t('fbRechargeOrder.text34')">
              <span class="btn" @click="search">{{$t('fbRechargeOrder.text35')}}</span>
            </div>
          </div>
          <div class="order-menu">
            <div class="order-menu-item" @click="filterOrder(item.value)" :class="{active: status === item.value || (item.value === 9999 && queryType === 2)}" v-for="item in $t('shareWithdrawOrder.menu')" :key="item.label">{{item.label}}</div>
          </div>
        </div>
        <div class="border-bg-table">
          <div class="table click">
            <table class="share-table">
              <thead>
                <tr>
                  <td v-for="item in $t('shareWithdrawOrder.table1')" :key="item">
                    {{item}}
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in list" :key="item.id">
                  <td>{{item.id}}</td>
                  <td>{{item.drawAmount | f4}}{{item.systemCurrency}}</td>
                  <td>{{item.username}}</td>
                  <td>{{status2Text(item, false, true)}}</td>
                  <td>{{$changeDate(item.createAt)}}</td>
                  <td>
                    <span v-if="!item.problemId">
                      <span v-if="item.status === 8">
                        <span class="step-btn" @click="submit(item.id, 1)">{{$t('orderAction.text7')}}</span>
                        <span class="step-btn" @click="submit(item.id, 2)">{{$t('orderAction.text8')}}</span>
                      </span>
                      <span v-if="item.payStatus === 14 && item.status === 11">
                        <span class="step-btn" @click="submit(item.id, 3)">{{$t('orderAction.text10')}}</span>
                      </span>
                      <router-link class="step-btn" v-if="item.payStatus === 15" :to="`/account/appeal?id=${item.id}&type=2&isBoss=1`">{{$t('orderAction.text9')}}</router-link>
                    </span>

                    <router-link class="step-btn" :to="`sharerWithdrawOrder/sharerWithdrawOrderDetail?id=${item.id}`">{{$t('common.detail')}}</router-link>
                  </td>
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
      <div class="web-mob">
        <div class="mob-filter">
          <!-- <div class="search">
            <div class="input-wrap">
              <input type="text" class="input" v-model="orderId" placeholder="输入订单编号进行搜索">
              <span class="btn" @click="search">搜索</span>
            </div>
          </div> -->
          <div class="order-menu">
            <div class="order-menu-item" @click="filterOrder(item.value)" :class="{active: status === item.value || (item.value === 9999 && queryType === 2)}" v-for="item in $t('shareWithdrawOrder.menu')" :key="item.label">{{item.label}}</div>
          </div>
        </div>
        <div class="gap">
          <div class="border-bg-table">
            <div class="mock-table">
              <router-link tag="div" class="tr" :to="`sharerWithdrawOrder/sharerWithdrawOrderDetail?id=${item.id}`"  v-for="item in list" :key="item.id">
                <div class="row">
                  <div class="td">{{item.drawAmount | f4}}{{item.systemCurrency}}</div>
                  <div class="td right-fold">{{status2Text(item, false, true)}}</div>
                </div>
                <div class="row">
                  <div class="td">{{$t('orderAction.text14')}}{{item.id}}</div>
                  <div class="td">{{$changeDate(item.createAt)}}</div>
                </div>
              </router-link>
            </div>
            <div v-if="load" class="global-loading"></div>
            <div v-else>
              <div v-if="!list.length">
                  <div class="global-empty">{{$t('common.emptyData')}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="total" class="el-pagination-wrap">
        <el-pagination
          layout="prev, pager, next"
          @current-change="getData"
          :page-size="this.pageSize"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import status2Text from '@/mixin/status'
export default {
  data () {
    return {
      list: [],
      pageSize: 8,
      total: 0,
      load: true,
      status: 0,
      queryType: 0,
      orderId: ''
    }
  },
  mixins: [status2Text],
  methods: {
    getData (pageIndex = 1) {
      this.$fetch.post('/boss/queryBossOrders', {
        pageIndex: pageIndex,
        pageSize: this.pageSize,
        status: this.status,
        queryType: this.queryType,
        type: 2
      }).then(res => {
        this.load = false
        this.list = res.data.data
        this.total = res.data.mapData.totalRecord
      })
    },
    filterOrder (value) {
      if (value === 9999) {
        // 9999为已完成状态
        this.status = -1
        this.queryType = 2
      } else {
        this.queryType = -1
        this.status = value
      }
      this.getData()
    },
    search () {
      if (!this.orderId) {
        this.$dialog({
          msg: this.$t('orderAction.text11')
        })
      } else {
        this.$fetch.post('/boss/queryBossOrders', {
          type: 2,
          orderId: this.orderId
        }).then(res => {
          this.load = false
          this.list = res.data.data
          this.total = res.data.mapData.totalRecord
        })
      }
    },
    submit (id, type) {
      // type 1：接单 2：拒绝 3：我已转账
      let text = ''
      if (type === 1) {
        text = this.$t('orderAction.text12')
      } else if (type === 2) {
        text = this.$t('orderAction.text5')
      } else if (type === 3) {
        text = this.$t('orderAction.text13')
      }
      this.$dialog({
        type: 'confirm',
        msg: text,
        okFn: () => {
          this.$fetch.post('/bossDraw/confirmByStep', {
            orderId: id,
            confirmState: type
          }).then(res => {
            if (res.data.success) {
              this.getData()
              this.$dialog({
                msg: this.$t('common.doSuccess')
              })
            } else {
              this.$dialog({
                msg: res.data.msg
              })
            }
          })
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
  .filter {
    .search{
      width: 1000px;
      font-size: 0;
      margin-bottom: 40px;
      border-bottom: 1px solid #514134;
      padding-bottom: 40px;
      .input{
        width: 85%;
      }
      .btn{
        width: 15%;
      }
    }
    .order-menu{
      margin-bottom: 40px;
      display: flex;
      &-item{
        width: 160px;
        margin-right: 30px;
        border: 1px solid @blue;
        text-align: center;
        line-height: 46px;
        border-radius: 4px;
        cursor: pointer;
        &.active,&:hover{
          background: @blue;
          color: #fff;
          transition: .3s;
        }
        .en &{
          width: 176px;
          font-size: 15px;
        }
      }
    }
  }
  .share-table{
    table-layout: auto;
    td{
      padding: 0 20px;
    }
  }
  .mob-filter{
    overflow: hidden;
    line-height: 44px;
    box-shadow: 0 0 20px #192774;
    margin-bottom: 20px;
    font-size: 16px;
    font-family: titleChi;
    .order-menu{
      white-space:nowrap;
      overflow-x: scroll;
      -webkit-overflow-scrolling: touch;
      &-item{
        display: inline-block;
        padding: 0 24px;
        border-bottom: 2px solid transparent;
        &.active{
          border-bottom-color: @yellow;
          color: #fff;
        }
      }
    }
  }
</style>
