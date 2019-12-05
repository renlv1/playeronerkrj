<template>
  <div class="transactionAccountInfo">
    <div class="bg-top"></div>
    <div class="assets-wrapper">
      <div class="assets-title">
        <span class="cursor" @click="$router.push('/account/transactionAccount')">{{$t('accountBank.text60')}}</span>
        <span class="arrow">></span>
        <span class="current-title" v-if="bankId > 0">{{$t('bankInfo.text5')}}{{orderType}}{{$t('bankInfo.text2')}}</span>
        <span class="current-title" v-else>{{$t('bankInfo.text6')}}{{orderType}}{{$t('bankInfo.text2')}}</span>
      </div>
      <div class="assets-c">
        <div v-if="orderType === 'RPO'">
          <div class="form-item">
            <div class="form-label">{{$t('accountBank.text39')}}</div>
            <div class="input-box">
              <input type="text" :placeholder="$t('accountBank.text40')" v-model.trim="realName" class="input">
            </div>
            <p class="error-msg">{{errorText3}}</p>
          </div>
          <div class="form-item">
            <div class="form-label">{{$t('accountBank.text41')}}</div>
            <div class="input-box">
              <input type="text" :placeholder="$t('accountBank.text42')" v-model.trim="bankNumber" class="input">
            </div>
            <p class="error-msg">{{errorText2}}</p>
          </div>
        </div>
        <div v-else>
          <div class="form-item">
            <div class="form-label"><div class="label_icon"><img src="../../../../assets/images/my/bank/label_icon.png" alt=""></div>{{$t('bankInfo.text7')}}</div>
            <div class="input-box">
              <input type="text" :placeholder="$t('bankInfo.text8')" v-model.trim="bankName" class="input">
            </div>
            <p class="error-msg">{{errorText1}}</p>
          </div>
          <div class="form-item">
            <div class="form-label"><div class="label_icon"><img src="../../../../assets/images/my/bank/label_icon.png" alt=""></div>{{$t('bankInfo.text9')}}</div>
            <div class="input-box">
              <input type="text" :placeholder="$t('bankInfo.text10')" v-model.trim="bankNumber" class="input">
            </div>
            <p class="error-msg">{{errorText2}}</p>
          </div>
          <div class="form-item">
            <div class="form-label"><div class="label_icon"><img src="../../../../assets/images/my/bank/label_icon.png" alt=""></div>{{$t('bankInfo.text11')}}</div>
            <div class="input-box">
              <input type="text" :placeholder="$t('bankInfo.text12')" v-model.trim="realName" class="input">
            </div>
            <p class="error-msg">{{errorText3}}</p>
          </div>
          <div class="form-item">
            <div class="form-label"><div class="label_icon"><img src="../../../../assets/images/my/bank/label_icon.png" alt=""></div>{{$t('bankInfo.text13')}}<span class="optiona">（{{$t('bankInfo.text17')}}）</span></div>
            <div class="input-box">
              <input type="text" :placeholder="$t('bankInfo.text14')" v-model.trim="subBankName" class="input">
            </div>
          </div>
          <div class="form-item">
            <div class="form-label"><div class="label_icon"><img src="../../../../assets/images/my/bank/label_icon.png" alt=""></div>{{$t('bankInfo.text15')}}<span class="optiona">（{{$t('bankInfo.text17')}}）</span></div>
            <div class="input-box">
              <input type="text" :placeholder="$t('bankInfo.text16')" v-model.trim="bankAddress" class="input">
            </div>
          </div>
          <div class="form-item">
            <div class="form-label"><div class="label_icon"><img src="../../../../assets/images/my/bank/label_icon.png" alt=""></div>SWIFT<span class="optiona">（{{$t('bankInfo.text17')}}）</span></div>
            <div class="input-box">
              <input type="text" :placeholder="$t('bankInfo.text18')" v-model.trim="swift" class="input">
            </div>
          </div>
          <div class="form-item">
            <div class="form-label"><div class="label_icon"><img src="../../../../assets/images/my/bank/label_icon.png" alt=""></div>IBAN <span class="optiona">（{{$t('bankInfo.text17')}}）</span></div>
            <div class="input-box">
              <input type="text" :placeholder="$t('bankInfo.text19')" v-model.trim="iban" class="input">
            </div>
          </div>
        </div>
        <div class="btn-confirm" @click="confimMoney">{{$t('bankInfo.text20')}}</div>
        <div class="btn"  @click="confimMoney">
          <div class="con">{{$t('bankInfo.text20')}}</div>
          <div class="cube l-top"></div>
          <div class="cube r-top"></div>
          <div class="cube r-bot"></div>
          <div class="cube l-bot"></div>
        </div>
      </div>
    </div>
    <mob-header>{{$t('accountBank.text37')}}</mob-header>
  </div>
</template>

<script>
export default {
  data () {
    return {
      errorText1: '',
      errorText2: '',
      errorText3: '',
      username: '',
      address: '',
      bankName: '',
      bankNumber: '',
      realName: '',
      subBankName: '',
      bankAddress: '',
      swift: '',
      iban: '',
      orderType: this.$route.query.money,
      bankId: this.$route.query.bankid
    }
  },
  created () {
    if (this.bankId) {
      this.getBankDetails()
    }
  },
  methods: {
    confimMoney () {
      if (this.bankName === '') {
        this.errorText1 = this.$t('bankInfo.text21')
      }
      if (this.orderType === 'RPO') {
        if (this.bankNumber === '') {
          this.errorText2 = this.$t('accountBank.text42')
        }
        if (this.realName === '') {
          this.errorText3 = this.$t('accountBank.text40')
        }
      } else {
        if (this.bankNumber === '') {
          this.errorText2 = this.$t('bankInfo.text22')
        }
        if (this.realName === '') {
          this.errorText3 = this.$t('bankInfo.text23')
        }
      }
      let formFlag = false
      if (this.orderType === 'RPO' && this.realName !== '' && this.bankNumber !== '') {
        formFlag = true
      } else if (this.realName !== '' && this.bankNumber !== '' && this.bankName !== '') {
        formFlag = true
      }
      if (formFlag === true) {
        this.errorText1 = ''
        this.errorText2 = ''
        this.errorText3 = ''
        // 编辑银行卡
        if (this.bankId) {
          let editObj = {
            id: this.bankId,
            currency: this.orderType,
            realName: this.realName,
            bankNumber: this.bankNumber
          }
          if (this.orderType !== 'RPO') {
            editObj.bankName = this.bankName
          }
          if (String(this.subBankName).trim() !== '') {
            editObj.subBankName = this.subBankName
          }
          if (String(this.bankAddress).trim() !== '') {
            editObj.bankAddress = this.bankAddress
          }
          if (String(this.swift).trim() !== '') {
            editObj.swift = this.swift
          }
          if (String(this.iban).trim() !== '') {
            editObj.iban = this.iban
          }
          this.$fetch.post(`${this.$api}/bank/editBankInfo`, editObj).then(res => {
            if (res.data.success === true) {
              this.$dialog({
                msg: this.$t('bankInfo.text24'),
                okFn: () => {
                  this.$router.go(-1)
                }
              })
            } else {
              this.$dialog({
                msg: res.data.msg
              })
            }
          })
        } else {
          // 添加
          let addObj = {
            currency: this.orderType,
            realName: this.realName,
            bankNumber: this.bankNumber
          }
          if (this.orderType !== 'RPO') {
            addObj.bankName = this.bankName
            addObj.bankType = 1
          } else {
            addObj.bankType = 2
          }
          if (String(this.subBankName).trim() !== '') {
            addObj.subBankName = this.subBankName
          }
          if (String(this.bankAddress).trim() !== '') {
            addObj.bankAddress = this.bankAddress
          }
          if (String(this.swift).trim() !== '') {
            addObj.swift = this.swift
          }
          if (String(this.iban).trim() !== '') {
            addObj.iban = this.iban
          }
          this.$fetch.post(`${this.$api}/bank/addBankInfo`, addObj).then(res => {
            if (res.data.success === true) {
              let _this = this
              this.$dialog({
                msg: this.$t('accountBank.text46'),
                okFn () {
                  _this.$router.go(-1)
                }
              })
            } else {
              this.$dialog({
                msg: res.data.msg
              })
            }
          })
        }
      }
    },
    // 查询银行卡信息
    getBankDetails () {
      this.$fetch.post(`${this.$api}/bank/bankInfoDetail`, {
        bankInfoId: this.bankId
      }).then(res => {
        if (res.data.success === true) {
          let bankInfo = res.data.data
          this.bankName = bankInfo.bankName ? bankInfo.bankName : ' '
          this.bankNumber = bankInfo.bankNumber ? bankInfo.bankNumber : ' '
          this.realName = bankInfo.realName ? bankInfo.realName : ' '
          this.subBankName = bankInfo.subBankName ? bankInfo.subBankName : ' '
          this.bankAddress = bankInfo.bankAddress ? bankInfo.bankAddress : ' '
          this.swift = bankInfo.swift ? bankInfo.swift : ' '
          this.iban = bankInfo.iban ? bankInfo.iban : ' '
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@e7ac50: #e7ac50;
@3b3131: #3b3131;
@7693fc: #7693fc;
@eb1c4c: #eb1c4c;
.bg-top{
  @media screen and (max-width: 1200px) {
    width: 100%;
    height: 13px;
    background: url("../../../../assets/images/my/border.png") no-repeat center / cover;
  }
}
.assets-wrapper{
  padding-bottom: 100px;
  .form-item{
    margin-bottom: 30px;
    .select-wrap{
      width: 100%;
      border-radius: 4px 0 0 4px;
      border: 1px solid #3b3131;
      box-sizing: border-box;
      color: #7693fc;
      display: inline-block;
      font-size: inherit;
      height: 48px;
      line-height: 48px;
      outline: 0;
      padding: 0 15px;
      @media screen and (max-width: 1200px) {
        border: none;
        background: url("../../../../assets/images/money/box.png") no-repeat;
        background-size: 100% 100%;
        background-position: center;
      }
    }
    .input{
      color: #e7ac50;
      &::-webkit-input-placeholder{
        color: rgba(231,172,80,.6);
      }
      &:-moz-placeholder{
        color: rgba(231,172,80,.6);
      }
      &::-moz-placeholder{
        color: rgba(231,172,80,.6);
      }
      &:-ms-input-placeholder{
        color: rgba(231,172,80,.6);
      }
    }
    .error-msg{
      margin: 10px 0 0 20px;
      font-size: 16px;
      color: @eb1c4c;
    }
    .form-label{
      font-size: 16px;
      color: @7693fc;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      font-weight: bold;
      @media screen and (max-width: 1200px) {
        color: #e7ac50;
      }
      .optiona{
        @media screen and (max-width: 1200px) {
          color: #7693fc;
        }
      }
      .label_icon{
        @media screen and (max-width: 1200px) {
          display: block;
          width: 20px;
          margin-right: 10px;
        }
        @media screen and (min-width: 1200px) {
          display: none;
        }
      }
    }
  }
  .btn-delet{
    background-color: @eb1c4c;
    @media screen and (max-width: 1200px) {
      display: none;
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
.btn{
  width: 100%;
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
  margin-bottom: 30px;
  @media screen and (max-width: 1200px) {
    display: flex;
  }
  @media screen and (min-width: 1200px) {
    display: none;
  }
  .con{
    width: 98%;
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
</style>
