<template>
  <div class="page">
    <div class="select-boss">
      <div class="account-tit">
        <router-link :to="`/account/rechargeOrder/fbRechargeOrderDetail?id=${id}`">{{$t('selectBoss.text1')}}</router-link>
        <span class="el-icon-arrow-right"></span>
        <span>{{$t('selectBoss.text3')}}</span>
      </div>
      <mob-header :to="`/account/rechargeOrder/fbRechargeOrderDetail?id=${id}`">{{$t('selectBoss.text3')}}</mob-header>
      <ul class="boss-list fix">
        <li
          v-for="(item, index) in list"
          @click="selectedIndex = index"
          :class="{active: selectedIndex === index}"
          :key="index">
          <div class="border-bg">
            <div class="justify">
              <div class="info">
                <p>
                  {{item.nickName}}
                  <span class="rate">{{$t('selectBoss.text4')}}{{item.feeRate * 100}}%</span>
                </p>
                <p>
                  {{$t('selectBoss.text5')}}{{item.tradeAmount | f4}}{{item.tradeCurrency}}
                </p>
              </div>
              <div class="radio">
                <i class="el-icon-check"></i>
              </div>
            </div>
          </div>
        </li>
        <div v-if="load" class="global-loading"></div>
        <div v-else>
          <div v-if="!list.length">
              <div class="global-empty">{{$t('common.emptyData')}}</div>
          </div>
        </div>
      </ul>
      <button class="btn mt60" v-if="list.length" :loading="loading" @click="submit" :disabled="selectedIndex === -1">{{$t('selectBoss.text6')}}</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      load: true,
      id: this.$route.query.id,
      selectedIndex: -1,
      loading: false
    }
  },
  methods: {
    getData () {
      this.$fetch.post('/bossDeposit/matchListByDeposit', {
        orderid: this.id
      }).then(res => {
        this.load = false
        if (res.data.success) {
          this.list = res.data.data
          this.total = res.data.data.totalRecord
        }
      })
    },
    submit () {
      this.loading = true
      this.$fetch.post('/bossDeposit/chooseBoss', {
        id: this.id,
        bossId: this.list[this.selectedIndex].id
      }).then(res => {
        this.loading = false
        if (res.data.success) {
          this.$dialog({
            msg: this.$t('common.doSuccess'),
            okFn: () => {
              this.$router.replace(`/account/rechargeOrder/fbRechargeOrderDetail?id=${this.id}`)
            }
          })
        } else {
          this.$dialog({
            msg: res.data.msg
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
  .select-boss{
    width: 850px;
    .boss-list{
      padding-top: 20px;
      min-height: 300px;
      .border-bg:after{
        background: url(~@img/common/border_bg_left.png) no-repeat,
                url(~@img/common/border_bg_right.png) no-repeat right 0;
      }
      li{
        width: 400px;
        float: left;
        color: #e7ac50;
        margin: 0 20px 20px 0;
        &.active{
          .el-icon-check{
            display: block;
          }
          .radio{
            border-color: #e7ac50;
          }
        }
        p + p{
          padding-top: 10px;
        }
      }
      .justify{
        padding: 0 20px 10px 20px;
      }
    }
    .rate{
      color: red;
      margin-left: 30px;
    }
    .radio{
      height: 28px;
      width: 28px;
      border: 1px solid #e7ac50;
      border-radius: 4px;
      text-align: center;
    }
    .el-icon-check{
      color: #e7ac50;
      font-size: 18px;
      line-height: 24px;
      display: none;
    }
    @media @mob{
      width: auto;
      .gap;
      .boss-list{
        min-height: 100px;
        li{
          width: 100%;
        }
      }
    }
  }
</style>
