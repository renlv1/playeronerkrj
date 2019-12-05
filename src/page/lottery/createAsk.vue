<template>
  <div class="page lottery-page">
    <div class="location">
      <div class="h-wrap">
        <a href="">区块链大乐透</a>
        <span>></span>
        <a href="">大乐透详情</a>
        <span>></span>
        <span class="blue-color">发起大乐透</span>
      </div>
    </div>
    <div class="create-lottery">
      <div class="h-wrap">
        <div class="notice">
          <div class="title">《活动发起须知》</div>
          <div class="section">
            <p>为了维护区块链大乐透平台的健康发展，了维护区块链大乐透平台的健康发展了维护区块链大乐透平台的健康发</p>
            <p>为了维护区块链大乐透平台的健康发展，了维护区块链大乐透平台的健康发展了维护区块链大乐透平台的健透平台的健康发展了维护区块链大乐透平康发</p>
            <p>为了维护区块链大乐透平台的健康发展，了维护区块链大乐透平台的健康发展了维护区块链大乐透平台的健康发</p>
          </div>
          <div class="money">保证金：<span class="blue-color">10000.0000RPO</span></div>
          <router-link to="/createLottery" class="btn">同意并发起活动</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/mixin';
  .create-lottery{
    line-height: 1.2;
    .h-wrap{
      width: 1000px;
    }
    .title{
      font-size: 32px;
      padding: 60px 0 10px;
      color: @blue;
    }
    .notice{
      .title{
        text-align: center;
      }
      .section{
        padding: 30px 0;
        p{
          line-height: 2;
          padding: 10px 0;
        }
      }
      .money{
        font-size: 20px;
        padding-top: 40px;
        border-top: 1px solid #ccc;
      }
      .btn{
        margin-top: 60px;
      }
    }
  }
</style>
