<template>
  <div class="recommend">
    <div class="assets-wrapper">
      <h3 class="assets-title">{{$t('nofoMation.text27')}}</h3>
      <div class="assets-c">
        <div class="border-bg-table">
          <ul class="uls">
            <li class="list">{{$t('accountBank.text48')}}</li>
            <li class="list">{{$t('accountBank.text39')}}</li>
            <li class="list">{{$t('nofoMation.text29')}}</li>
          </ul>
          <ul class="uls table-cont" v-for="(item, index) in timeUserArr" :key="index">
            <li class="list">{{item.nickName}}</li>
            <li class="list">{{item.userName}}</li>
            <li class="list">{{item.address}}</li>
          </ul>
          <ul class="mobile-uls">
            <li class="mobile-list" v-for="(item, index) in timeUserArr" :key="index">
              <div class="user-box"><span class="user-name">{{item.nickName}}</span><span>({{item.userName}})</span></div>
              <div class="user-address">{{item.address}}</div>
            </li>
          </ul>
          <div v-if="load" class="global-loading"></div>
          <div v-else>
            <div v-if="!timeUserArr.length">
              <div class="global-empty">{{$t('common.emptyData')}}</div>
            </div>
          </div>
        </div>
        <div v-if="total" class="el-pagination-wrap">
          <el-pagination
            layout="prev, pager, next"
            :page-size="pageSize"
            @current-change="getUserTeam"
            :current-page.sync="currentPage"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <mob-header>{{$t('navigation.text9')}}</mob-header>
  </div>
</template>

<script>
export default {
  data () {
    return {
      total: 1,
      pageSize: 10,
      load: true,
      currentPage: 1,
      timeUserArr: []
    }
  },
  created () {
    this.getUserTeam(1)
  },
  methods: {
    getUserTeam (pageIndex) {
      this.$fetch.post(`${this.$api}/user/getUserTeam`, {
        pageIndex: pageIndex,
        pageSize: this.pageSize
      }).then(res => {
        this.load = false
        if (res.data.success === true) {
          this.timeUserArr = res.data.data.teamUserList
          this.total = res.data.data.totalRecord
        }
      })
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.assets-c{
  .uls{
    display: flex;
    align-items: center;
    width: 100%;
    @media screen and (max-width: 1200px) {
      display: none;
    }
    &:nth-child(odd) {
      background-color: #1d254c;
      color: #5667d4;
    }
    &:nth-child(even) {
      background-color: #2e2d3b;
      color: #dea64f;
    }
    .list{
      height: 68px;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      word-break: break-all;
    }
  }
  .table-cont:hover{
    box-shadow: 0 0 20px rgba(8, 116, 220, 0.4);
    transition: 0.5s;
    transform: translate3d(0, 0, 0);
  }
}
.mobile-account {
  @media screen and (max-width: 1200px) {
    display: block;
  }
  @media screen and (min-width: 1200px) {
    display: none;
  }
}
.mobile-uls{
  @media screen and (max-width: 1200px) {
    display: block;
  }
  @media screen and (min-width: 1200px) {
    display: none;
  }
  .mobile-list{
    padding: 0 10px;
    height: 98px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    &:nth-child(odd) {
      background-color: #171d3d;
    }
    &:nth-child(even) {
      background-color: rgba(250, 181, 42, .1);
      color: #e7ac50;
    }
  }
  .user-box{
    color: #e7ac50;
    font-size: 18px;
    margin-bottom: 17px;
    .user-name{
      margin-right: 10px;
    }
  }
  .user-address{
    color: #5667d4;
    font-size: 14px;
  }
}
</style>
