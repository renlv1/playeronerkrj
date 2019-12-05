<template>
  <div class="page">
    <div class="order">
      <div class="account-tit">{{$t('rechargeOrder.text1')}}</div>
      <mob-header>{{$t('rechargeOrder.text1')}}</mob-header>
      <div class="web-pc">
        <div class="order-filter">
          <div class="search">
            <div class="input-wrap">
              <input type="text" class="input" v-model="orderId" :placeholder="$t('fbRechargeOrder.text34')">
              <span class="btn" @click="search">{{$t('fbRechargeOrder.text35')}}</span>
            </div>
          </div>
          <div class="order-menu">
            <div class="order-menu-item" @click="type = 1" :class="{active: type === 1}">{{$t('fbRechargeOrder.text36')}}</div>
            <div class="order-menu-item" @click="type = 2" :class="{active: type === 2}">{{$t('fbRechargeOrder.text37')}}</div>
          </div>
        </div>
        <div class="border-bg-table" v-if="type === 1">
          <div class="table click">
            <table>
              <thead>
                <tr>
                  <td v-for="item in $t('fbRechargeOrder.table1')" :key="item">
                    {{item}}
                  </td>
                </tr>
              </thead>
              <tbody>
                <router-link tag="tr" v-for="item in shareList" :key="item.id" :to="`rechargeOrder/fbRechargeOrderDetail?id=${item.id}`">
                  <td>{{item.id}}</td>
                  <td>{{item.depositAmount | f4}}{{item.systemCurrency}}</td>
                  <td>{{item.bossNickName || '- -'}}</td>
                  <td>{{status2Text(item, true)}}</td>
                  <td>{{$changeDate(item.createAt)}}</td>
                  <td>{{$t('common.detail')}}</td>
                </router-link>
              </tbody>
            </table>
          </div>
          <div v-if="load" class="global-loading"></div>
          <div v-else>
            <div v-if="!shareTotal">
                <div class="global-empty">{{$t('common.emptyData')}}</div>
            </div>
          </div>
        </div>
        <div class="border-bg-table" v-if="type === 2">
          <div class="table click">
            <table>
              <thead>
                <tr>
                  <td v-for="item in $t('rechargeOrder.table1')" :key="item">
                    {{item}}
                  </td>
                </tr>
              </thead>
              <tbody>
                <router-link tag="tr" :to="`rechargeOrder/rechargeOrderDetail?item=${JSON.stringify(item)}`" v-for="item in list" :key="item.id">
                  <td>{{item.id}}</td>
                  <td>{{item.depositAmount | f4}}{{item.depositCurrency}}</td>
                  <td>{{item.feeAmount | f4}}{{item.depositCurrency}}</td>
                  <td>{{$changeDate(item.createAt)}}</td>
                  <td>
                    <span v-if="item.status === 1">{{$t('rechargeOrder.text2')}}</span>
                    <span v-else>{{$t('rechargeOrder.text3')}}</span>
                  </td>
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
      <div class="web-mob">
        <div class="mob-order-menu">
          <div class="mob-order-menu-item" @click="type = 1" :class="{active: type === 1}">{{$t('fbRechargeOrder.text36')}}</div>
          <div class="mob-order-menu-item" @click="type = 2" :class="{active: type === 2}">{{$t('fbRechargeOrder.text37')}}</div>
        </div>
        <div v-if="type === 1" class="gap">
          <div class="border-bg-table">
            <div class="mock-table">
              <router-link tag="div" class="tr" :to="`rechargeOrder/fbRechargeOrderDetail?id=${item.id}`" v-for="item in shareList" :key="item.id">
                <div class="row">
                  <div class="td">{{item.depositAmount | f4}}{{item.systemCurrency}}</div>
                  <div class="td right-fold">{{status2Text(item, true)}}</div>
                </div>
                <div class="row">
                  <div class="td">{{$t('orderAction.text14')}}{{item.id}}</div>
                  <div class="td no-wrap">{{$changeDate(item.createAt)}}</div>
                </div>
              </router-link>
            </div>
            <div v-if="load" class="global-loading"></div>
            <div v-else>
              <div v-if="!shareList.length">
                  <div class="global-empty">{{$t('common.emptyData')}}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="gap">
          <div class="border-bg-table">
            <div class="mock-table">
              <router-link tag="div" class="tr" :to="`rechargeOrder/rechargeOrderDetail?item=${JSON.stringify(item)}`" v-for="item in list" :key="item.id">
                <div class="row">
                  <div class="td">{{item.depositAmount | f4}}{{item.depositCurrency}}</div>
                  <div class="td">
                    <span v-if="item.status === 1">{{$t('rechargeOrder.text2')}}</span>
                    <span v-else>{{$t('rechargeOrder.text3')}}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="td">
                    {{$t('rechargeOrder.text9')}}：
                    {{item.feeAmount | f4}}{{item.depositCurrency}}
                  </div>
                  <div class="td no-wrap">{{$changeDate(item.createAt)}}</div>
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
      <div v-show="type === 1 && shareTotal" class="el-pagination-wrap">
        <el-pagination
          layout="prev, pager, next"
          @current-change="getShareData"
          :page-size="this.pageSize"
          :total="shareTotal">
        </el-pagination>
      </div>
      <div v-show="type === 2 && total" class="el-pagination-wrap">
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
      shareList: [],
      pageSize: 8,
      total: 0,
      shareTotal: 0,
      load: true,
      type: 1,
      orderId: ''
    }
  },
  mixins: [status2Text],
  methods: {
    getData (pageIndex = 1) {
      this.$fetch.post('/deposit/queryDepositList', {
        pageIndex: pageIndex,
        pageSize: this.pageSize,
        orderId: this.orderId
      }).then(res => {
        this.list = res.data.data
        this.total = res.data.mapData.count
      })
    },
    getShareData (pageIndex = 1) {
      this.$fetch.post('/bossDeposit/handDepositList', {
        pageIndex: pageIndex,
        pageSize: this.pageSize,
        orderId: this.orderId
      }).then(res => {
        this.load = false
        this.shareList = res.data.data
        this.shareTotal = res.data.mapData.count
      })
    },
    search () {
      if (this.type === 1) { // 法币充值
        this.getShareData()
      } else { // 雷达充值
        this.getData()
      }
    }
  },
  mounted () {
    this.getData()
    this.getShareData()
  }
}
</script>
<style lang="less" scoped>
  @import (reference) '~@/assets/css/mixin';
  .mob-order-menu{
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
