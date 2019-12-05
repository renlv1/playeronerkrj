<template>
  <div class="assets-wrapper">
    <!--币种账户信息-->
    <div class="pc-w">
      <div class="assets-title">{{$t('bankInfo.text1')}}</div>
      <div class="assets-c">
        <div class="money-w">
          <div class="money">{{orderType}}{{$t('bankInfo.text2')}}（{{bankList.length}}）</div>
          <div class="add-btn" @click="$router.push({path: '/account/transactionAccount/transactionAccountInfo', query: {money: orderType}})">{{$t('bankInfo.text3')}}</div>
        </div>
        <ul class="account-uls">
          <li class="account-list" v-for="(item, index) in bankList" :key="index">
            <div class="account-left">
              <div class="desc">
                <span>{{item.realName}}</span>
                <span class="margin">{{item.bankName}}</span>
              </div>
              <div class="desc">{{item.bankNumber}}</div>
              <div class="desc">
                <span>{{item.subBankName}}</span>
                <span class="margin2">{{item.bankAddress}}</span>
              </div>
              <div class="desc" v-if="orderType !== 'RPO'">
                SWIFT:
                <span v-if="item.swift">{{item.swift}}</span>
                <span v-else>-</span>
              </div>
              <div class="desc" v-if="orderType !== 'RPO'">
                IBAN:
                <span v-if="item.iban">{{item.iban}}</span>
                <span v-else>-</span>
              </div>
            </div>
            <div class="btn-right">
              <div class="editor" @click="gotoEditor(item.id)">
                <img src="../../../../assets/images/money/editor.png" alt="">
              </div>
              <div class="delete" @click="confimDete(item.id)">
                <img src="../../../../assets/images/money/delete.png" alt="">
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="mobile-w">
      <div class="bg-top"></div>
      <div class="add-w" @click="$router.push({path: '/account/transactionAccount/transactionAccountInfo', query: {money: orderType}})">
        <div class="add-img">
          <img src="../../../../assets/images/my/account_menu/big-list.png" alt="">
        </div>
        <div class="add-cont">
          <div class="add-icon"><img src="../../../../assets/images/my/bank/bank_add.png" alt=""></div>
          <div>{{$t('bankInfo.text3')}}</div>
        </div>
      </div>
      <ul class="bank-uls">
        <li class="bank-list" v-for="(item, index) in bankList" :key="index">
          <div class="bank">
            <div class="bank-icon"><img src="../../../../assets/images/my/bank/bnak_sopt.png" alt=""></div>
            <span>{{item.realName}}</span>
            <span class="margin">{{item.bankName}}</span>
          </div>
          <div class="bankNumber">{{item.bankNumber}}</div>
          <div class="desc" style="display:block">
            <p>{{item.subBankName}}</p>
            <p>{{item.bankAddress}}</p>
          </div>
          <div class="desc" v-if="orderType !== 'RPO'">
            SWIFT:
            <span v-if="item.swift" class="breakLine">{{item.swift}}</span>
            <span v-else>-</span>
          </div>
          <div class="desc" v-if="orderType !== 'RPO'">
            IBAN:
            <span v-if="item.iban" class="breakLine">{{item.iban}}</span>
            <span v-else>-</span>
          </div>
          <div class="btn-w">
            <div class="editor-w" @click="gotoEditor(item.id)">
              <div class="editor-icon"><img src="../../../../assets/images/my/bank/bank_edit.png" alt=""></div>
              <span>{{$t('bankInfo.text5')}}</span>
            </div>
            <div class="delete-w" @click="confimDete(item.id)">
              <div class="delete-icon"><img src="../../../../assets/images/my/bank/bank_delete.png" alt=""></div>
              <span>{{$t('accountBank.text43')}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <mob-header>{{orderType}}{{$t('bankInfo.text2')}}</mob-header>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      orderType: this.$route.query.currency,
      bankList: []
    }
  },
  created () {
    this.getbankList()
  },
  methods: {
    // 编辑
    gotoEditor (id) {
      this.$router.push({
        path: '/account/transactionAccount/transactionAccountInfo',
        query: {bankid: id, money: this.orderType}
      })
    },
    // 删除银行卡
    confimDete (id) {
      this.$dialog({
        msg: this.$t('bankInfo.text4'),
        okFn: () => {
          this.$fetch.post(`${this.$api}/bank/delBankInfo`, {
            bankInfoId: id
          }).then(res => {
            if (res.data.success === true) {
              this.getbankList()
              this.$dialog({
                msg: this.$t('accountBank.text44')
              })
            } else {
              this.$dialog({
                msg: res.data.msg
              })
            }
          })
        }
      })
    },
    getbankList () {
      this.$fetch.post(`${this.$api}/bank/queryBankInfoList`, {
        currency: this.orderType,
        pageIndex: 1,
        pageSize: 20
      }).then(res => {
        if (res.data.success === true) {
          this.bankList = res.data.data
        }
      })
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
img{
  width: 100%;
  height: 100%;
  display: block;
}
.assets-wrapper{
  @media screen and (max-width: 1200px) {
    padding: 0 10px;
  }
  .money-w{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    padding-bottom: 40px;
    box-sizing: content-box;
    border-bottom: 1px solid rgba(231,172,80,.3);
    .money{
      font-size: 20px;
      color: #7693fc;
      font-weight:bold;
    }
    .add-btn{
      width: 200px;
      height: 100%;
      background-color: #7693fc;
      color: #fff;
      font-size: 16px;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .account-uls{
    margin-top: 40px;
    .account-list{
      min-height: 150px;
      border: 1px solid rgba(231,172,80,.3);
      padding: 20px 50px 20px 30px;
      color: #e7ac50;
      font-size: 16px;
      line-height: 1.5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;
      .account-left{
        .desc{
          display: flex;
        }
        .margin{
          margin-left: 30px;
        }
        .margin2{
          margin-left: 8px;
        }
      }
      .btn-right{
        display: flex;
        align-items: center;
        .editor{
          width: 17px;
          height: 21px;
          margin-right: 40px;
          cursor: pointer;
        }
        .delete{
          width: 20px;
          height: 22px;
          cursor: pointer;
        }
      }
    }
  }
  .pc-w{
    @media screen and (max-width: 1200px) {
      display: none;
    }
    @media screen and (min-width: 1200px) {
      display: block;
    }
  }
  .mobile-w{
    @media screen and (max-width: 1200px) {
      display: block;
    }
    @media screen and (min-width: 1200px) {
      display: none;
    }
    .bg-top{
      width: 100%;
      height: 13px;
      background: url("../../../../assets/images/my/border.png") no-repeat center / cover;
      margin-bottom: 24px;
    }
    .add-w{
      position: relative;
      height: 60px;
      width: 100%;
      .add-img{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
      .add-cont{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: #e7ac50;
        .add-icon{
          width: 14px;
          height: 14px;
          margin-right: 10px;
        }
      }
    }
    .bank-uls{
      margin: 30px 0;
      .bank-list{
        width: 100%;
        background-color: #171D3D;
        padding-top: 20px;
        margin-bottom: 20px;
        .bank{
          display: flex;
          align-items: center;
          font-size: 16px;
          color: #7693fc;
          margin-left: 20px;
          .bank-icon{
            width: 15px;
            margin-right: 10px;
          }
          .margin{
            margin-left: 15px;
          }
        }
        .margin2{
          margin-left: 10px;
        }
        .desc{
          font-size: 16px;
          color: #7693fc;
          line-height: 2;
          display: flex;
          padding-left: 43px;
          word-wrap:break-word;
          width: 100%;
        }
        .block{
          width: 100%;
        }
        .bankNumber{
          font-size: 24px;
          color: #e7ac50;
          margin: 10px 0 10px 43px;
        }
        .btn-w{
          height: 60px;
          display: flex;
          align-items: center;
          background-color: #1B2042;
          margin-top: 10px;
          .editor-w,.delete-w{
            cursor: pointer;
            width: 50%;
            height: 30px;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .editor-w{
            color: #10d1a1;
          }
          .delete-w{
            color: #fc534c;
            border-left: 1px solid #12142e;
          }
          .editor-icon{
            width: 14px;
            margin-right: 12px;
          }
          .delete-icon{
            width: 14px;
            margin-right: 12px;
          }
        }
      }
    }
  }
}
</style>
