<template>
  <div class="transactionAccount">
    <div class="assets-wrapper">
      <h3 class="assets-title">{{$t('bankInfo.text1')}}</h3>
      <div class="assets-c">
        <div class="sm-title">{{$t('bankInfo.text25')}}</div>
        <ul class="account-uls">
          <li class="account-list" @click="gotoCurrency(item.currency)" v-for="(item, index) in orderTypeOption" :key="index">
            <div class="curreny">{{item.currency}}</div>
            <div class="right">
              <span>{{$t('bankInfo.text26')}}：{{item.countNum}}</span>
              <div class="select-right">
                <img src="../../../assets/images/my/share/pulldown_icon.png" alt="">
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="mobile-assets">
        <div class="bg-top"></div>
        <ul>
          <li class="big-wrap" @click="gotoCurrency(item.currency)" v-for="(item, index) in orderTypeOption" :key="index">
            <div class="img-box"><img src="../../../assets/images/my/account_menu/big-list.png" alt=""></div>
            <div class="big-con">
              <div class="flex-item checked-icon">
                <div class="money">{{item.currency}}</div>
              </div>
              <div class="right">
                <span>{{item.countNum}}</span>
                <div class="select"><img src="../../../assets/images/lottery/arrow3.png" alt=""></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <mob-header>{{$t('accountBank.text60')}}</mob-header>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectShow: false,
      currentIndex: 0,
      currencyMoney: 'RPO',
      orderType: 'RPO',
      orderTypeOption: [],
      bankInfoList: [],
      rpoLength: 0
    }
  },
  created () {
    this.getuserBank()
  },
  methods: {
    // 跳转到币种
    gotoCurrency (currency) {
      this.$router.push({
        path: '/account/transactionAccount/accountList',
        query: {currency: currency}
      })
    },
    // 获取币种
    getuserBank () {
      this.$fetch.post(`${this.$api}/bank/userBankIndex`).then(res => {
        if (res.data.success === true) {
          this.orderTypeOption = res.data.data
        }
      })
    },
    changeMoney (item, index) {
      this.currentIndex = index
      this.currencyMoney = `${item.currency}(${item.countNum})`
      this.orderType = item.currency
      this.selectShow = false
    },
    gotoInfo (id) {
      this.$router.push({
        path: '/account/transactionAccount/transactionAccountInfo',
        query: {bankid: id}
      })
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@e7ac50: #e7ac50;
@3b3131: #3b3131;
@7693fc: #7693fc;
img{
  width: 100%;
  height: 100%;
  display: block;
}
.assets-wrapper{
  padding: 0 10px;
  .assets-c{
    @media screen and (max-width: 1200px) {
      display: none;
    }
    @media screen and (min-width: 1200px) {
      display: block;
    }
  }
  .mobile-assets{
    @media screen and (max-width: 1200px) {
      display: block;
    }
    @media screen and (min-width: 1200px) {
      display: none;
    }
    .bg-top{
      width: 100%;
      height: 13px;
      background: url("../../../assets/images/my/border.png") no-repeat center / cover;
      margin-bottom: 24px;
    }
    .big-wrap{
      position: relative;
      width: 100%;
      height: 60px;
      font-size: 16px;
      color: #e7ac50;
      margin-bottom: 10px;
      .img-box{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
      .big-con{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 30px;
        .right{
          display: flex;
          align-items: center;
          .select{
            margin-left: 10px;
            width: 20px;
          }
        }
      }
    }
  }
  .mobile-list{
    margin-top: 20px;
  }
  .sm-title{
    font-size: 20px;
    font-weight: bold;
    color: #7693fc;
    margin-bottom: 40px;
  }
  .account-uls{
    .account-list{
      height: 58px;
      padding: 0 30px;
      border: 1px solid rgba(231,172,80,.3);
      color: rgba(231,172,80,.6);
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      border-radius: 4px;
      cursor: pointer;
      .curreny{
        color: #e7ac50;
        font-size: 18px;
      }
      .right{
        display: flex;
        align-items: center;
      }
      .select-right{
        margin-left: 30px;
        width: 15px;
        height: 8px;
        img{
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }
      }
    }
  }
  .money-box{
    height: 48px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 40px;
    box-sizing: content-box;
    border-bottom: 1px solid @3b3131;
    @media screen and (max-width: 1200px) {
      border-bottom: none;
      padding-top: 50px;
    }
    .left{
      width: 480px;
      @media screen and (max-width: 1200px) {
        width: 60%;
      }
      .select-wrap{
        position: relative;
      }
      .select-uls{
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        z-index: 10;
        border: none;
        border-radius: 4px;
        background-color: #131733;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin: 5px 0;
        max-height: 0;
        transition: max-height .3s linear;
        overflow: hidden;
        &.select-height{
          max-height: 500px;
        }
        .select-list{
          font-size: 16px;
          line-height: 42px;
          height: 42px;
          width: 100%;
          padding: 0 20px;
          position: relative;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #425599;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          cursor: pointer;
          &:hover{
            color: #7693fc;
            background-color: #161b3b;
          }
          &.current-list{
            color: #7693fc;
            font-weight: 700;
            background-color: #161b3b;
          }
        }
      }
      .select-current{
        display: flex;
        align-items: center;
        height: 48px;
        @media screen and (max-width: 1200px) {
          background: url("../../../assets/images/login/inpu-bg.png") no-repeat;
          background-size: 100% 100%;
          background-position: center;
        }
        .currencyMoney{
          flex: 1;
          -webkit-appearance: none;
          border-radius: 4px 0 0 4px;
          border: 1px solid @3b3131;
          box-sizing: border-box;
          color: @7693fc;
          display: inline-block;
          font-size: inherit;
          height: 48px;
          line-height: 48px;
          outline: 0;
          padding: 0 15px;
          transition: border-color .2s cubic-bezier(.645,.045,.355,1);
          width: 100%;
          @media screen and (max-width: 1200px) {
            color: #e7ac50;
            border: none;
          }
        }
        .icon-box{
          width: 100px;
          height: 100%;
          background: @7693fc;
          border-radius: 0 4px 4px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          .icon{
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 8px solid #fff;
            transform: rotate(0deg);
            transition: transform .3s linear;
            &.icon-active{
              transform: rotate(-180deg);
            }
          }
        }
      }
    }
    .right{
      cursor: pointer;
      width: 240px;
      height: 100%;
      background-color: @7693fc;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 16px;
      border-radius: 4px;
      @media screen and (max-width: 1200px) {
        display: none;
      }
    }
    .btn{
      width: 40%;
      height: 48px;
      line-height: 48px;
      background: linear-gradient(#f2ac3a, #8c6231);
      color: #fff;
      font-size: 14px;
      text-align: center;
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 1s;
      margin-left: 10px;
      @media screen and (max-width: 1200px) {
        display: flex;
      }
      @media screen and (min-width: 1200px) {
        display: none;
      }
      .con{
        width: 95%;
        height: 36px;
        line-height: 36px;
        border: 1px solid #fff;
        position: absolute;
        z-index: 10;
      }
      .cube{
        position: absolute;
        width: 12px;
        height: 12px;
        background-color: #000;
      }
      .l-top{
        top: 0;
        left: 0;
      }
      .r-top{
        top: 0;
        right: 0;
      }
      .r-bot{
        bottom: 0;
        right: 0;
      }
      .l-bot{
        bottom: 0;
        left: 0;
      }
    }
  }
  .bank-ul{
    margin-top: 40px;
    @media screen and (max-width: 1200px) {
      display: none;
    }
    .no-result{
      text-align: center;
      color: #eb1c4c;
    }
    .bank-list{
      cursor: pointer;
      border: 1px solid @3b3131;
      padding: 30px 40px 30px 30px;
      margin-bottom: 30px;
      .name{
        font-size: 16px;
        color: @7693fc;
        margin-bottom: 20px;
      }
      .flex-item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .string{
          font-size: 20px;
          color: @e7ac50;
        }
        .look{
          font-size: 16px;
          color: @7693fc;
        }
      }
    }
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
.border-bg{
  border: 1px solid #f9b72b;
  position: relative;
  padding: 17px 8px 8px;
  &:before{
    content: '';
    position: absolute;
    left: 7px;
    top: 7px;
    right: 7px;
    bottom: 7px;
    border: 1px solid #1f2684;
    background: #171d3d;
  }
  &:after{
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    height: 20px;
    margin: 0 -1px;
    background: url("../../../assets/images/common/border_bg_left.png") no-repeat,
    url("../../../assets/images/common/border_bg_center.png") no-repeat center 0,
    url("../../../assets/images/common/border_bg_right.png") no-repeat right 0;
  }
  & > *{
    position: relative;
    z-index: 2;
  }
  .global-loading {
    position: absolute;
  }
  &.diff{
    &:after{
      background: url("../../../assets/images/common/border_bg_left2.png") no-repeat,
      url("../../../assets/images/common/border_bg_center2.png") no-repeat center 0,
      url("../../../assets/images/common/border_bg_right2.png") no-repeat right 0;
    }
  }
}
.border-bg-table{
  .border-bg;
  .account &{
    width: 1000px;
    min-height: 100px;
    @media screen and (max-width: 1450px){
      width: 100%;
    }
  }
  .ul-box{
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    .list-box{
      font-size: 16px;
      color: #e7ac50;
      padding: 0 10px;
      height: 50px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      &:nth-child(odd) {
        background-color: rgba(250, 181, 42, .1);
        color: #e7ac50;
      }
      &:nth-child(even) {
        background-color: #171d3d;
      }
    }
  }
}
.mobile-ul{
  @media screen and (max-width: 1200px) {
    display: block;
  }
  @media screen and (min-width: 1200px) {
    display: none;
  }
}
</style>
