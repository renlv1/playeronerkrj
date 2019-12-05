<template>
  <div class="page lottery-page">
    <div class="home">
      <div class="banner">
        <img src="~@/assets/images/lottery/banner.png" alt="">
      </div>
      <div class="search">
        <div class="h-wrap">
          <div class="search-tit">搜索大乐透编号</div>
            <div class="justify">
              <div class="search-input-wrap">
                <input type="text" class="search-input" placeholder="查找想要参加的大乐透编号">
                <button class="search-button">
                  <i>搜索</i>
                </button>
              </div>
              <div class="right-btn">
                <router-link to="/createAsk" class="btn">发起大乐透</router-link>
              </div>
            </div>
        </div>
      </div>
      <div class="lottery">
        <div class="h-wrap">
          <ul class="list">
            <li class="item border-bg" v-for="item in list" :key="item.id">
              <div class="item-head">
                <div class="justify">
                  <span class="number">大乐透编号：{{item.id}}</span>
                  <span class="time">{{$changeDate(item.createAt)}}</span>
                </div>
              </div>
              <div class="item-body">
                <div class="justify">
                  <span class="totle">奖金池</span>
                  <span class="hot">热度：<i>50000</i></span>
                </div>
                <div class="money">500000.0000RPO</div>
              </div>
              <div class="item-foot">
                <div class="justify">
                  <div class="person">
                    <img src="~@/assets/images/home/banner.png" alt="">
                    <div class="name">
                      <h3>哈哈哈哈哈</h3>
                      <p>发起人</p>
                    </div>
                  </div>
                  <div class="right-btn">
                    <router-link :to="`/lotteryDetail?id=${item.id}`" class="btn">参加</router-link>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div v-if="list.length" >
            <el-pagination
              layout="prev, pager, next"
              @current-change="getData"
              :total="total">
            </el-pagination>
          </div>
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
      pageSize: 6
    }
  },
  methods: {
    getData (pageIndex = 1) {
      this.$fetch.post('/lotto/lottoRewardRoundList', {
        pageIndex: pageIndex,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data.data.roundList
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
  @import "~@/assets/css/mixin";
  .banner{
    img{
      width: 100%;
    }
  }
  .search{
    font-size: 16px;
    color: @yellow;
    padding-bottom: 20px;
    background: #141d49;
    &-tit{
      line-height: 1;
      padding: 20px 0 20px 20px;
      background: url(~@img/lottery/search_arrow.png) no-repeat left center;
    }
    .search-input-wrap{
      display: flex;
      flex: .7;
    }
    &-input{
      padding-left: 18px;
      font-size: 16px;
      color: #fff;
      border: 1px solid #b37f2f;
      line-height: 38px;
      height: 38px;
      margin-right: 20px;
      flex: .7;
      border-radius: 4px;
    }
    &-button{
      font-size: 16px;
      color: @yellow;
      text-align: center;
      border: 1px solid #b37f2f;
      line-height: 38px;
      height: 38px;
      flex: .2;
      border-radius: 4px;
      cursor: pointer;
      &:hover{
        background: #b37f2f;
        color: #ffffff;
      }
      i{
        background: url(~@img/lottery/search.png) no-repeat left center;
        padding-left: 20px;
      }
    }
    .right-btn{
      flex: .15;
    }
  }
  .title{
    text-align: center;
    line-height: 1;
    color: @blue;
    padding-bottom: 60px;
    h3{
      font-size: 30px;
      color: #1f1f1f;
      padding: 80px 0 20px;
    }
  }
  .btn{
    height: 40px;
    line-height: 40px;
    background: #4352a4;
  }
  .border-bg, .border-bg:before{
    border-radius: 0 0 4px 4px;
  }
  .lottery{
    padding: 80px 0 145px;
    .list{
      display: flex;
      flex-wrap: wrap;
    }
    .item{
      width: 650px;
      padding: 6px 28px;
      font-size: 16px;
      color: @blue;
      @media @pc{
        &:nth-child(even){
          margin-left: 20px;
        }
      }
      margin-bottom: 30px;
      &-head{
        line-height: 42px;
        padding-bottom: 12px;
        background: url(~@img/lottery/lottery_tit.png) no-repeat left bottom;
        .number{color: @yellow;}
      }
      &-body{
        line-height: 1;
        padding-top: 30px;
        .hot{
          i{
            padding-right: 22px;
            background: url(~@img/lottery/hot.png) no-repeat right center;
          }
        }
        .money{
          font-size: 32px;
          color: @yellow;
          padding: 15px 0;
        }
      }
      &-foot{
        padding: 13px 0;
        line-height: 1;
        img{
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 20px;
        }
        .person{
          .justify;
          line-height: 1;
          h3{
            margin-bottom: 6px;
          }
        }
        .right-btn{
          width: 120px;
        }
      }
    }
  }
</style>
