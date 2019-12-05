<template>
  <div class="page">
    <div class="order">
      <div class="account-tit">{{$t('myOrder.text1')}}</div>
      <mob-header>{{$t('myOrder.text1')}}</mob-header>
      <div class="select">
        <div class="flex">
          <div class="select-wrap">
            <el-select v-model="paymentType" @change="change">
              <!--  有两个相同的状态名字， 但状态码不一样，所以隐藏一个   -->
              <el-option
                v-for="item in $t('myOrder.paymentType')"
                v-if="item.value !== 64"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="web-pc">
        <div class="border-bg-table">
          <div class="table click">
            <table>
              <thead>
                <tr>
                  <td v-for="item in $t('myOrder.table1')" :key="item">
                    {{item}}
                  </td>
                </tr>
              </thead>
              <tbody>
                <router-link tag="tr" :to="`order/orderDetail?id=${item.id}`"  v-for="item in list" :key="item.id">
                  <td>{{item.id}}</td>
                  <td>
                    <span
                      v-for="item2 in $t('myOrder.paymentType')"
                      v-if="item.paymentType === item2.value"
                      :key="item2.value">
                      {{item2.label}}
                    </span>
                  </td>
                  <td>{{item.amount | f4}}{{item.currency}}</td>
                  <td>{{$changeDate(item.createAt)}}</td>
                  <td>
                    <span
                      v-for="item2 in $t('myOrder.state')"
                      v-if="item.state === item2.value"
                      :key="item2.value">
                      {{item2.label}}
                    </span>
                  </td>
                  <td>{{$t('common.detail')}}</td>
                </router-link>
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
      </div>
      <div class="web-mob gap">
        <div class="border-bg-table">
          <div class="mock-table">
            <router-link tag="div" class="tr" :to="`order/orderDetail?id=${item.id}`"  v-for="item in list" :key="item.id">
              <div class="row">
                <div class="td">{{item.amount | f4}}{{item.currency}}</div>
                <div class="td">
                  <span
                    v-for="item2 in $t('myOrder.state')"
                    v-if="item.state === item2.value"
                    :key="item2.value">
                    {{item2.label}}
                  </span>
                </div>
              </div>
              <div class="row">
                <div class="td">
                  <span
                    v-for="item2 in $t('myOrder.paymentType')"
                    v-if="item.paymentType === item2.value"
                    :key="item2.value">
                    {{item2.label}}
                  </span>
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
      <div v-if="total" class="el-pagination-wrap">
        <el-pagination
          layout="prev, pager, next"
          :page-size="pageSize"
          @current-change="getData"
          :current-page.sync="currentPage"
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
      paymentType: -1,
      total: 1,
      load: true,
      list: [],
      pageSize: 8,
      currentPage: 1
    }
  },
  methods: {
    getData (pageIndex = 1) {
      this.$fetch.post('/transaction/transactionlist', {
        page: pageIndex,
        pageSize: this.pageSize,
        paymentType: this.paymentType !== -1 ? this.paymentType : ''
      }).then(res => {
        this.load = false
        if (res.data.success) {
          this.list = res.data.data
          this.total = res.data.mapData.totalRecord
        }
      })
    },
    change () {
      this.currentPage = 1
      this.load = true
      this.getData()
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
  @import (reference) '~@/assets/css/mixin';
  .select{
    margin-bottom: 40px;
    &-wrap{
      width: 600px;
    }
    @media @mob{
      .flex{
        display: block;
      }
      margin-bottom: 0;
      &-wrap{
        padding: 30px 3% 14px;
        width: auto;
      }
    }
  }
  .btn{
    margin-left: 30px;
    width: 180px;
  }
</style>
