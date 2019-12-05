<template>
  <div class="safePassword">
    <div class="assets-wrapper">
      <div class="assets-title"><span class="cursor" @click="$router.push('/account/accountInformation')">{{$t('accountBank.text1')}}</span> <span class="arrow">></span> <span class="current-title">{{$t('accountBank.text19')}}</span></div>
      <div class="assets-c">
        <div class="form-item">
          <div class="spot-box">
            <div class="spot-img"><img src="../../../../assets/images/notInfo/spot-1.png" ></div>
            <div class="label-form">{{$t('accountBank.text20')}}</div>
          </div>
          <div class="input-box"><input type="password" :placeholder="$t('accountBank.text21')" class="input" v-model.trim="tradePwd"></div>
          <p class="error-msg">{{errorText0}}</p>
        </div>
        <div class="form-item">
          <div class="spot-box">
            <div class="spot-img"><img src="../../../../assets/images/notInfo/spot-1.png" ></div>
            <div class="label-form">{{$t('accountBank.text22')}}</div>
          </div>
          <div class="input-box"><input type="password" :placeholder="$t('nofoMation.text30')" class="input" v-model.trim="tradePwd2"></div>
          <p class="error-msg">{{errorText1}}</p>
        </div>
        <div class="form-item">
          <div class="spot-box">
            <div class="spot-img"><img src="../../../../assets/images/notInfo/spot-1.png" ></div>
            <div class="label-form">{{$t('accountBank.text23')}}</div>
          </div>
          <div class="input-box input-div" v-if="userData.openGoogleCode === 2">{{$t('accountBank.text24')}}</div>
          <div class="input-box input-div" v-if="userData.openGoogleCode !== 2">{{$t('accountBank.text25')}}</div>
        </div>
        <div class="form-item">
          <div class="spot-box">
            <div class="spot-img"><img src="../../../../assets/images/notInfo/spot-1.png" ></div>
            <div class="label-form">{{$t('accountBank.text26')}}</div>
          </div>
          <div class="input-flex">
            <div class="input-box"><input type="number" :placeholder="$t('accountBank.text27')" class="input" v-model.trim="varifiCode"></div>
            <div class="btn-send" :class="{'disable-btn': isDisabled}" ref="sendMsg" v-if="userData.openGoogleCode !== 2" @click="sendEmail">{{sendBtnValue}}</div>
            <button class="sendMsg" :class="{'disable-btn': isDisabled}" ref="sendMsg" v-if="userData.openGoogleCode !== 2" @click="sendEmail">{{sendBtnValue}}</button>
          </div>
          <p class="error-msg">{{errorText2}}</p>
        </div>
        <div class="btn-confirm" @click="confimSafe">{{$t('accountBank.text28')}}</div>
        <div class="btn"  @click="confimSafe">
          <div class="con">{{$t('accountBank.text28')}}</div>
          <div class="cube l-top"></div>
          <div class="cube r-top"></div>
          <div class="cube r-bot"></div>
          <div class="cube l-bot"></div>
        </div>
      </div>
      <transition name="dialog">
        <div class="g-dialog" v-show="visibleDialog">
          <div class="g-dialog-mask"></div>
          <div class="g-dialog-wrap border-bg">
            <i class="g-dialog-close" @click="visibleDialog = false"></i>
            <div class="g-dialog-content textAlign">{{dialogMsg}}</div>
            <div class="g-dialog-btn-wrap">
              <button class="g-dialog-btn g-dialog-ok" @click="visibleDialog = false">{{$t('accountBank.text28')}}</button>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <mob-header>{{$t('accountBank.text19')}}</mob-header>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      visibleDialog: false,
      dialogMsg: '',
      sendBtnValue: this.$t('accountBank.text29'),
      isDisabled: false,
      sendBtnTimes: 60,
      tradePwd: '',
      tradePwd2: '',
      varifiCode: '',
      errorText0: '',
      errorText1: '',
      errorText2: ''
    }
  },
  methods: {
    // 倒计时
    countDown () {
      if (this.sendBtnTimes === 0) {
        this.sendBtnValue = this.$t('accountBank.text29')
        this.sendBtnTimes = 60
        this.isDisabled = false
      } else {
        this.sendBtnTimes--
        this.sendBtnValue = this.sendBtnTimes
        this.isDisabled = true
        setTimeout(() => this.countDown(), 1000)
      }
    },
    // 发送验证码
    sendEmail () {
      if (this.isDisabled) return
      this.isDisabled = true
      this.sendBtnValue = this.$t('accountBank.text30')
      this.$fetch.post(`${this.$api}/register/sendEmailCode`, {
        email: this.userData.email,
        type: '1'
      }).then(res => {
        if (res.data.success === true) {
          this.countDown()
          this.$dialog({
            msg: this.$t('accountBank.text31')
          })
        } else {
          this.sendBtnValue = this.$t('accountBank.text29')
          this.isDisabled = false
          this.dialogMsg = res.data.msg
          this.visibleDialog = true
        }
      })
    },
    confimSafe () {
      if (String(this.tradePwd).trim() === '') {
        this.errorText0 = this.$t('accountBank.text4')
      } else if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,14}$/).test(this.tradePwd)) {
        this.errorText0 = this.$t('accountBank.text63')
      } else {
        this.errorText0 = ''
      }
      if (String(this.tradePwd2).trim() === '') {
        this.errorText1 = this.$t('accountBank.text34')
      } else if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,14}$/).test(this.tradePwd2)) {
        this.errorText0 = this.$t('accountBank.text63')
      } else if (String(this.tradePwd).trim() !== '' && String(this.tradePwd2).trim() !== '' && this.tradePwd !== this.tradePwd2) {
        this.errorText1 = this.$t('accountBank.text35')
      } else {
        this.errorText1 = ''
      }
      if (String(this.varifiCode).trim() === '') {
        this.errorText2 = this.$t('accountBank.text27')
      } else {
        this.errorText2 = ''
      }
      if (String(this.tradePwd).trim() !== '' && String(this.tradePwd2).trim() !== '' && String(this.varifiCode).trim() !== '' && (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,14}$/).test(this.tradePwd) && (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,14}$/).test(this.tradePwd2) && this.tradePwd === this.tradePwd2) {
        let codeType
        if (this.userData.openGoogleCode === 2) {
          codeType = 3
        } else {
          codeType = 1
        }
        this.$fetch.post(`${this.$api}/user/setTractionPwd`, {
          tradePwd: this.tradePwd2,
          verifyCode: this.varifiCode,
          type: codeType
        }).then(res => {
          if (res.data.success === true) {
            this.$dialog({
              msg: this.$t('accountBank.text36'),
              okFn: () => {
                this.$router.push('/account/accountInformation')
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
  computed: {
    ...mapGetters([
      'userData'
    ])
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@e7ac50: #e7ac50;
@3b3131: #3b3131;
@7693fc: #7693fc;
@eb1c4c: #eb1c4c;
.assets-wrapper{
  .assets-c{
    margin-top: 60px;
    @media screen and (max-width: 1200px) {
      margin-top: 0;
    }
    .form-item{
      margin-top: 30px;
      .error-msg{
        margin: 10px 0 0 20px;
        font-size: 16px;
        color: @eb1c4c;
        @media screen and (max-width: 1200px) {
          font-size: 12px;
          margin: 10px 0 20px 20px;
        }
      }
      .label-form{
        font-size: 16px;
        color: @7693fc;
        margin-bottom: 20px;
        @media screen and (max-width: 1200px) {
          margin-bottom: 0;
          color: @e7ac50;
        }
      }
      .input-box{
        .input{
          padding-left: 20px;
          width: 100%;
          height: 49px;
          border: 1px solid @3b3131;
          border-radius: 4px;
          font-size: 16px;
          @media screen and (max-width: 1200px) {
            border: none;
            font-size: 12px;
          }
        }
      }
      .input-div{
        padding-left: 20px;
        width: 100%;
        height: 49px;
        line-height: 49px;
        border: 1px solid @3b3131;
        border-radius: 4px;
        font-size: 16px;
        color: @7693fc;
        @media screen and (max-width: 1200px) {
          border: none;
          background: url("../../../../assets/images/money/box.png") no-repeat;
          background-size: 100% 100%;
          background-position: center;
        }
      }
      .input-flex{
        display: flex;
        align-items: center;
        @media screen and (max-width: 1200px) {
          position: relative;
        }
        .input-box{
          flex: 1;
        }
        .btn-send{
          width: 100px;
          height: 49px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: #fefefe;
          background-color: @7693fc;
          cursor: pointer;
          @media screen and (max-width: 1200px) {
            display: none;
          }
          &.disable-btn{
            pointer-events: none;
            cursor: default;
          }
        }
        .sendMsg{
          position: absolute;
          right: 20px;
          font-size: 12px;
          color: @e7ac50;
          @media screen and (max-width: 1200px) {
            display: block;
          }
          @media screen and (min-width: 1200px) {
            display: none;
          }
          &.disable-btn{
            pointer-events: none;
            cursor: default;
          }
        }
      }
    }
    .btn-confirm{
      width: 100%;
      height: 48px;
      line-height: 48px;
      background-color: @7693fc;
      text-align: center;
      color: #fff;
      font-size: 16px;
      border-radius: 4px;
      margin-top: 60px;
      cursor: pointer;
    }
  }
  @btnColor: #0874dc;
  .full () {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .g-dialog{
    .full();
    position: fixed;
    color: #333333;
    z-index: 999999;
    &-mask{
      .full();
      position: absolute;
      background: rgba(0,0,0,.5)
    }
    &-wrap{
      position: absolute;
      width: 600px;
      transform: translate(-50%,-50%);
      left: 50%;
      top: 50%;
      padding: 100px 80px;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0,0,0,.3);
      @media screen and (max-width:1200px) {
        width: 90%;
        padding: 50px 40px;
      }
    }
    &-close{
      position: absolute;
      right: 20px;
      top: 20px;
      width: 20px;
      height: 20px;
      transform: rotate(-45deg);
      transform-origin: 30% 20%;
      &:before,&:after{
        content: '';
        width: 2px;
        height: 20px;
        position: absolute;
        left: 9px;
        top: 0;
        background: #999;
      }
      &:after{
        transform: rotate(90deg)
      }
      &:hover{
        &:before,&:after{
          background: #dc2f2f;
        }
      }
      cursor: pointer;
    }
    &-title{
      font-size: 32px;
      line-height: 1;
      padding-bottom: 50px;
    }
    &-content{
      font-size: 24px;
      color: #f75050;
    }
    &-btn-wrap{
      padding-top: 60px;
      text-align: center;
      display: flex;
      justify-content: space-between;
    }
    &-btn{
      display: inline-block;
      height: 48px;
      border: 1px solid @btnColor;
      cursor: pointer;
      font-size: 20px;
      color: #fff;
      border-radius: 4px;
    }
    &-ok{
      width: 100%;
      background: @btnColor;
      transition: .4s;
      &:hover{
        background: darken(@btnColor, 10%);
      }
    }
    &-cancel{
      width: 45%;
      color: @btnColor;
      & + button{
        width: 100%;
        width: 45%;
      }
    }
    .input-box{
      .input{
        color: #000;
        width: 100%;
        height: 48px;
      }
    }
  }
  .dialog-enter,.dialog-leave-to{
    opacity: 0;
    .g-dialog-wrap{
      transform: translate(-50%, -55%)
    }
  }
  .dialog-enter-active{
    transition: .3s;
    .g-dialog-wrap{
      transition: .3s
    }
  }
  .dialog-leave-active{
    transition: .1s;
    .g-dialog-wrap{
      transition: .1s
    }
  }
}
.spot-box{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .spot-img{
    width: 20px;
    height: 14px;
    margin-right: 10px;
    @media screen and (max-width: 1200px) {
      display: flex;
    }
    @media screen and (min-width: 1200px) {
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
</style>
