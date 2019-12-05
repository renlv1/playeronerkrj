<template>
  <div>
    <div class="register">
      <div class="form-bg">
        <div class="box">
          <div class="dialog-bg">
            <div class="img-box"></div>
            <!--<img src="../../assets/images/login/zc-form-bg.png" alt="">-->
            <!--<img src="../../assets/images/notInfo/mobileThree.png" alt="">-->
          </div>
          <div class="form-box">
            <div class="title">
              <div class="l-hr"><img src="../../assets/images/login/left.png" alt=""></div>
              <div class="con">{{$t('nofoMation.text3')}}</div>
              <div class="r-hr"><img src="../../assets/images/login/right.png" alt=""></div>
            </div>
            <div class="form">
              <div class="input">
                <input type="text" @blur="checknickName()" v-model.trim="nickName" autocomplete="off" :placeholder="$t('nofoMation.text7')" maxlength="30">
                <div class="hint" v-show="nickNameShow">{{nickNameHint}}</div>
              </div>
              <div class="input">
                <input type="password" v-model.trim="passWord" autocomplete="off" @blur="checkpassWord()" :placeholder="$t('nofoMation.text8')" maxlength="26">
                <div class="hint" v-show="passWordShow">{{passWorddHint}}</div>
              </div>
              <div class="input">
                <input type="password" v-model.trim="passWord2" @blur="checkCmPassWord()" autocomplete="off" :placeholder="$t('nofoMation.text9')" maxlength="26">
                <div class="hint" v-show="passWordShow2">{{passWorddHint2}}</div>
              </div>
              <div class="input">
                <input type="password" v-model.trim="securityCode" @blur="checksecurityCode()" autocomplete="off" :placeholder="$t('nofoMation.text10')" maxlength="26">
                <div class="hint" v-show="securityCodeShow">{{securityCodeHint}}</div>
              </div>
              <div class="input email-input">
                <input type="text" class="email-input-text" v-model.trim="emailCode" autocomplete="off" :placeholder="$t('nofoMation.text11')" @blur="checkEmailVal">
                <div class="hint" v-show="emailCodeShow">{{emailCodeHint}}</div>
                <div class="send" @click="CheckYourEmail" :class="{'disable': sendbtnDisable}">{{btnText}}</div>
              </div>
               <div class="input">
                 <input type="text" v-model.trim="code" :placeholder="$t('nofoMation.text12')" autocomplete="off" maxlength="6" @blur="CheckCode()">
                 <div class="hint" v-show="securityEmailCodeShow">{{emailHint}}</div>
               </div>
              <div class="btn" :class="{'active': goLoginActive}" @click="signInSub()">
                <div class="con">{{$t('nofoMation.text13')}}</div>
                <div class="cube l-top"></div>
                <div class="cube r-top"></div>
                <div class="cube r-bot"></div>
                <div class="cube l-bot"></div>
                <!--login加載-->
                <div class="loding-box">
                  <div v-show="loadingShow" class="spinner">
                    <div class="spinner-container container1">
                      <div class="circle1"></div>
                      <div class="circle2"></div>
                      <div class="circle3"></div>
                      <div class="circle4"></div>
                    </div>
                    <div class="spinner-container container2">
                      <div class="circle1"></div>
                      <div class="circle2"></div>
                      <div class="circle3"></div>
                      <div class="circle4"></div>
                    </div>
                    <div class="spinner-container container3">
                      <div class="circle1"></div>
                      <div class="circle2"></div>
                      <div class="circle3"></div>
                      <div class="circle4"></div>
                    </div>
                  </div>
                </div>
                <div class="errHint" v-show="errHintShow">{{errHintText}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import smscode from '@/components/smscode'
// import dislog from '@/components/dialog/index'
export default {
  data () {
    return {
      securityEmailCodeShow: true,
      nickName: '', // 昵称
      passWord: '', // 密码
      passWord2: '', // 二次
      securityCode: '', // 安全密码
      emailCode: '', // 邮箱
      errHintText: '',
      loadingShow: false, // 注册动画
      errHintShow: false,
      nickNameShow: true,
      passWordShow: true,
      passWordShow2: true,
      goLoginActive: false,
      securityCodeShow: true,
      emailCodeShow: true,
      msgAationCode: '',
      msgAationCodeShow: false,
      internationalCityShow: false, // 城市
      nickNameHint: this.$t('nofoMation.text16'),
      passWorddHint: this.$t('nofoMation.text17'),
      passWorddHint2: this.$t('nofoMation.text17'),
      securityCodeHint: this.$t('nofoMation.text18'),
      emailHint: this.$t('nofoMation.text20'),
      emailCodeHint: this.$t('nofoMation.text21'),
      msgAationCodeHint: this.$t('nofoMation.text22'),
      // determineTheCity: '+86',
      defulatIndex: 0,
      sendBtnTimes: 60,
      sendbtnDisable: false,
      btnText: this.$t('nofoMation.text23'),
      code: '',
      cityDatas: []
    }
  },
  components: {
    smscode // 验证码组件
  },
  computed: {
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    CheckCode () {
      if (this.code !== '') {
        this.securityEmailCodeShow = false
      }
    },
    checknickName () {
      let nickNameTest = /^[\u4e00-\u9fa5_a-zA-Z0-9_]{4,12}$/ // 昵称
      if (nickNameTest.test(this.nickName) && this.nickName !== '') {
        this.nickNameShow = false
        this.nickNameEfaultShow = false
      }
      if (!nickNameTest.test(this.nickName) && this.nickName !== '') {
        this.nickNameShow = true
        this.nickNameHint = this.$t('nofoMation.text16')
      }
    },
    checkpassWord () {
      let passWordTest = /^(?![0-9]+$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?![a-zA-Z]+$)[0-9A-Za-z]{8,26}$/
      if (passWordTest.test(this.passWord) && this.passWord !== '') {
        this.passWordShow = false
        this.passWordEfaultShow = false
      }
      if (!passWordTest.test(this.passWord) && this.passWord !== '') {
        this.passWordShow = true
        this.passWorddHint = this.$t('nofoMation.text17')
      }
    },
    checkCmPassWord () {
      if (this.passWord2 === this.passWord && this.passWord2 !== '') {
        this.passWordShow2 = false
      } else {
        this.passWordShow2 = true
        this.passWorddHint2 = this.$t('nofoMation.text31')
      }
    },
    checksecurityCode () {
      let securityCodeTest = /^(?![0-9]+$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?![a-zA-Z]+$)[0-9A-Za-z]{6,26}$/
      if (securityCodeTest.test(this.securityCode) && this.securityCode !== '') {
        this.securityCodeShow = false
        this.securityCodeEfaultShow = false
      }
      if (!securityCodeTest.test(this.securityCode) && this.securityCode !== '') {
        this.securityCodeShow = true
        this.securityCodeHint = this.$t('nofoMation.text18')
      }
    },
    checkEmailVal () {
      if (this.emailCode) {
        this.emailCodeShow = false
      } else {
        this.emailCodeShow = true
      }
    },
    CheckYourEmail () { // 检查邮箱
      let emailTest = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/ // 邮箱
      if (this.emailCode === '') {
        this.emailCodeShow = true
        this.emailCodeHint = this.$t('nofoMation.text11')
      } else if (!emailTest.test(this.emailCode)) {
        this.emailCodeShow = true
        this.emailCodeHint = this.$t('nofoMation.text24')
      }
      // let emailExist
      if (this.emailCode !== '' && emailTest.test(this.emailCode)) {
        let formData = new FormData()
        formData.append('email', this.emailCode)
        formData.append('type', '1')

        // 邮箱验证码按钮点击之后，发送成功之后才开始倒计时
        if (this.sendbtnDisable) return
        this.sendbtnDisable = true
        this.btnText = this.$t('accountBank.text30')

        this.$http.post(`${this.$api}/register/sendEmailCode`, formData).then((respose) => {
          if (respose.data.success) {
            this.countDown()
            this.$dialog({
              msg: this.$t('accountBank.text31')
            })
          } else {
            this.$dialog({
              msg: respose.data.msg
            })
            this.sendbtnDisable = false
            this.btnText = this.$t('accountBank.text29')
          }
        })
      }
    },
    // 倒计时
    countDown () {
      if (this.sendBtnTimes === 0) {
        this.btnText = this.$t('nofoMation.text23')
        this.sendBtnTimes = 60
        this.sendbtnDisable = false
      } else {
        this.sendBtnTimes--
        this.btnText = this.sendBtnTimes
        this.sendbtnDisable = true
        setTimeout(() => this.countDown(), 1000)
      }
    },
    // 注册
    signInSub () {
      this.goLoginActive = !this.goLoginActive
      let userNameTest = /^[a-zA-Z0-9]{4,12}$/ // 用户名
      let nickNameTest = /^[\u4e00-\u9fa5_a-zA-Z0-9_]{4,12}$/ // 昵称
      let emailTest = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/ // 邮箱
      // let phoneTest = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/ // 手机
      let passWordTest = /^(?![0-9]+$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?![a-zA-Z]+$)[0-9A-Za-z]{8,26}$/ //  登录密码匹配长度为8到26位,字母和数字组成必须包含大写小写
      let securityCodeTest = /^(?![0-9]+$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?![a-zA-Z]+$)[0-9A-Za-z]{6,26}$/ //  安全密码匹配长度为6到26位,字母和数字组成必须包含大写小写
      if (this.userName === '' || !userNameTest.test(this.userName)) {
        this.userNameShow = true
      }
      if (this.nickName === '' || !nickNameTest.test(this.nickName)) {
        this.nickNameShow = true
      }
      if (this.passWord === '' || !passWordTest.test(this.passWord)) {
        this.passWordShow = true
      }
      if (this.passWord2 === '' || !passWordTest.test(this.passWord2)) {
        this.passWordShow2 = true
      }
      if (this.passWord2 !== '' && this.passWord !== '' && this.passWord2 !== this.passWord) {
        this.passWordShow2 = true
      }
      if (this.securityCode === '' || !securityCodeTest.test(this.securityCode)) {
        this.securityCodeShow = true
      }
      if (this.emailCode === '') {
        this.emailCodeShow = true
        this.emailCodeHint = this.$t('nofoMation.text26')
      }
      if (!emailTest.test(this.emailCode) && this.emailCode !== '') {
        this.emailCodeShow = true
        this.emailCodeHint = this.$t('nofoMation.text24')
      }
      if (this.code === '') {
        this.securityEmailCodeShow = true
        this.emailHint = this.$t('nofoMation.text20')
      }
      if (this.code !== '' && this.passWord2 === this.passWord && this.userName !== '' && userNameTest.test(this.userName) && this.nickName !== '' && nickNameTest.test(this.nickName) && this.passWord2 !== '' && passWordTest.test(this.passWord2) && this.passWord !== '' && passWordTest.test(this.passWord) && this.securityCode !== '' && securityCodeTest.test(this.securityCode) && this.emailCode !== '' && emailTest.test(this.emailCode)) {
        this.$fetch.post(`${this.$api}/user/perfectUserInfo`, {
          nickname: this.nickName, // 昵称
          email: this.emailCode, // 邮箱
          password: this.passWord, // 登录密码
          tradePwd: this.securityCode, // 交易密码
          code: this.code // 邮箱验证码
        }).then(res => {
          this.loadingShow = true
          if (res.data.success === true) {
            let ret = res.data.data
            this.$router.push({path: '/infoMationThree', query: {qrUrl: ret.qrUrl, secret: ret.secret}})
            this.loadingShow = false
          } else {
            this.loadingShow = false
            this.$dialog({
              msg: res.data.msg
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @titleFsize: 30px; // 标题
  @titleColor: #1f1f1f;
  @titFsize: 16px; // input的标题
  @titColor: #000; // input的标题
  @inputColor: #969699; // input的文字颜色
  @btn: #0874dc; // input的文字颜色
  @border: #c8c8cc; // input边框
  .register{
    width: 100%;
    height: 1446px;
    background: url("../../assets/images/login/zc-banner.png") no-repeat;
    background-size: cover;
    background-position: center;
    @media screen and (max-width: 1920px) {
      padding: 0 20px;
    }
    @media screen and (max-width: 1024px) {
      height: 100vh;
    }
    @media screen and (max-width: 750px) {
      background: url("../../assets/images/appLogin/banner.png") no-repeat;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      padding-left: 14px;
    }
    .form-bg{
      width: 1320px;
      height: 1113px;
      margin: auto;
      padding-top: 178px;
      @media screen and (max-width: 1500px) {
        width: 100%;
        margin: 0 auto;
      }
      @media screen and (max-width: 1204px) {
        height: 100%;
      }
      @media screen and (max-width: 768px) {
        padding-top: 90px;
      }
      @media screen and (max-width: 750px) {
        padding-top: 70px;
      }
      .box{
        width: 100%;
        height: 1113px;
        background: url("../../assets/images/login/zc-form-bg.png") no-repeat;
        background-size: 100% 100%;
        position: relative;
        @media screen and (max-width: 1500px) {
          width: 90%;
          margin: 0 auto;
        }
        @media screen and (max-width: 768px) {
          height: 830px;
        }
        @media screen and (max-width: 750px) {
          width: 100%;
          height: 494px;
          background: url("../../assets/images/login/zhuce.png") no-repeat;
          background-size: 100% 100%;
        }
        .form-box{
          position: absolute;
          width: 100%;
          height: auto;
          left: 0;
          right: 0;
          bottom: 50px;
          @media screen and (max-width: 1024px) {
            top: 140px;
          }
          @media screen and (max-width: 768px) {
            top: 100px;
          }
          @media screen and (max-width: 750px) {
            height: 100%;
            top: 0;
          }
          .title{
            width: 100%;
            height: 32px;
            margin-bottom: 64px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            @media screen and (max-width: 768px) {
              padding: 0 20px;
              margin-bottom: 30px;
            }
            @media screen and (max-width: 750px) {
              width: 90%;
              margin: 0 auto;
              height: 16px;
              margin-bottom: 16px;
              margin-top: 50px;
            }
            .l-hr,.r-hr{
              width: 250px;
              height: 16px;
              @media screen and (max-width: 750px) {
                display: none;
              }
              img{
                width: 100%;
              }
            }
            .con{
              width: auto;
              margin: auto 40px;
              font-size: 28px;
              height: 32px;
              line-height: 32px;
              font-family: titleChi;
              background: -webkit-linear-gradient(top, #f0b149, #af8975);
              -webkit-background-clip: text; /*必需加前缀 -webkit- 才支持这个text值 */
              -webkit-text-fill-color: transparent; /*text-fill-color会覆盖color所定义的字体颜色： */
              text-transform: uppercase;
              text-shadow: 0 0 10px rgba(250, 181, 42, .2);
              @media screen and (max-width: 750px) {
                font-size: 21px;
                height: 21px;
                line-height: 21px;
                margin: auto 20px;
              }
            }
          }
          .form{
            width: 484px;
            margin: auto;
            @media screen and (max-width: 750px){
              width: 100%;
              padding: 0 24px 0 14px;
            }
            .tit{
              font-size: @titFsize;
              color: @titColor;
              @media screen and (max-width: 750px){
                width: 94%;
                padding: 0 20px;
              }
            }
            .input{
              line-height: 34px;
              position: relative;
              width: 100%;
              height: 70px;
              margin: 0 auto 42px;
              background: url("../../assets/images/login/inpu-bg.png") no-repeat;
              background-size: 100% 100%;
              background-position: center;
              @media screen and (max-width: 768px){
                height: 50px;
              }
              @media screen and (max-width: 750px){
                width: 100%;
                height: 30px;
                margin: 0 auto 28px;
              }
              &.email-input{
                position: relative;
                .email-input-text{
                  padding-right: 80px;
                }
                .send{
                  position: absolute;
                  cursor: pointer;
                  right: 0;
                  top: 0;
                  width: 100px;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: #e7ac50;
                  @media screen and (max-width: 768px){
                    font-size: 14px;
                  }
                }
              }
              input{
                width: 100%;
                height: 100%;
                padding-left: 23px;
                color: rgba(255, 255, 255);
                font-size: 18px;
                transition: all 1s;
                overflow: hidden;
                padding-right: 20px;
                @media screen and (max-width: 750px){
                  font-size: 14px;
                  padding-left: 12px;
                }
              }
            }
            .input{
              /deep/ .sms-container input{
                &:focus{
                  border: 1px solid rgba(9, 125, 219, .4) !important;
                  box-shadow: 0 2px 2px rgba(9, 125, 219, .1) !important;
                }
              }
            }
            .btn{
              width: 100%;
              height: 68px;
              line-height: 68px;
              background: linear-gradient(#f2ac3a, #8c6231);
              color: #fff;
              font-size: 24px;
              text-align: center;
              margin-top: 20px;
              cursor: pointer;
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all .4s;
              @media screen and (max-width: 768px){
                margin-top: 0;
              }
              @media screen and (max-width: 750px){
                width: 100%;
                height: 40px;
                line-height: 40px;
                margin: 0 auto;
                font-size: 16px;
              }
              &.active{
                opacity: .7;
              }
              &:focus{
                opacity: .7;
                color: rgba(255,255,255, .9);
                .con{
                  border: 1px solid rgba(255,255,255, .9);
                }
              }
              &:hover{
                color: rgba(255,255,255, .7);
                background: linear-gradient(#8c6231, #f2ac3a);
                .con{
                  border: 1px solid rgba(255,255,255, .7);
                }
              }
              .con{
                width: 470px;
                height: 56px;
                line-height: 56px;
                border: 1px solid #fff;
                position: absolute;
                z-index: 10;
                @media screen and (max-width: 750px){
                  width: 96%;
                  height: 32px;
                  line-height: 32px;
                }
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
              .loding-box{
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 40%;
                @media screen and (max-width: 750px) {
                  right: 34%;
                }
                .spinner {
                  width: 18px;
                  height: 18px;
                  position: relative;
                  @media screen and (max-width: 750px) {
                    width: 14px;
                    height: 14px;
                  }
                }
                .container1 > div, .container2 > div, .container3 > div {
                  width: 6px;
                  height: 6px;
                  background-color: #fff;
                  border-radius: 100%;
                  position: absolute;
                  -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
                  animation: bouncedelay 1.2s infinite ease-in-out;
                  -webkit-animation-fill-mode: both;
                  animation-fill-mode: both;
                  @media screen and (max-width: 750px) {
                    width: 4px;
                    height: 4px;
                  }
                }
                .spinner .spinner-container {
                  position: absolute;
                  width: 100%;
                  height: 100%;
                }
                .container2 {
                  -webkit-transform: rotateZ(45deg);
                  transform: rotateZ(45deg);
                }
                .container3 {
                  -webkit-transform: rotateZ(90deg);
                  transform: rotateZ(90deg);
                }
                .circle1 { top: 0; left: 0; }
                .circle2 { top: 0; right: 0; }
                .circle3 { right: 0; bottom: 0; }
                .circle4 { left: 0; bottom: 0; }
                .container2 .circle1 {
                  -webkit-animation-delay: -1.1s;
                  animation-delay: -1.1s;
                }
                .container3 .circle1 {
                  -webkit-animation-delay: -1.0s;
                  animation-delay: -1.0s;
                }
                .container1 .circle2 {
                  -webkit-animation-delay: -0.9s;
                  animation-delay: -0.9s;
                }
                .container2 .circle2 {
                  -webkit-animation-delay: -0.8s;
                  animation-delay: -0.8s;
                }
                .container3 .circle2 {
                  -webkit-animation-delay: -0.7s;
                  animation-delay: -0.7s;
                }
                .container1 .circle3 {
                  -webkit-animation-delay: -0.6s;
                  animation-delay: -0.6s;
                }
                .container2 .circle3 {
                  -webkit-animation-delay: -0.5s;
                  animation-delay: -0.5s;
                }
                .container3 .circle3 {
                  -webkit-animation-delay: -0.4s;
                  animation-delay: -0.4s;
                }
                .container1 .circle4 {
                  -webkit-animation-delay: -0.3s;
                  animation-delay: -0.3s;
                }
                .container2 .circle4 {
                  -webkit-animation-delay: -0.2s;
                  animation-delay: -0.2s;
                }
                .container3 .circle4 {
                  -webkit-animation-delay: -0.1s;
                  animation-delay: -0.1s;
                }
                @-webkit-keyframes bouncedelay {
                  0%, 80%, 100% { -webkit-transform: scale(0.0) }
                  40% { -webkit-transform: scale(1.0) }
                }
                @keyframes bouncedelay {
                  0%, 80%, 100% {
                    transform: scale(0.0);
                    -webkit-transform: scale(0.0);
                  } 40% {
                      transform: scale(1.0);
                      -webkit-transform: scale(1.0);
                    }
                }
              }
              .errHint{
                position: absolute;
                left: 0;
                top: -46px;
                font-size: 14px;
                color: #fc534c;
              }
            }
            .hint{
              position: absolute;
              left: 0;
              top: 72px;
              font-size: 14px;
              color: #fc534c;
              @media screen and (max-width: 768px){
                top: 54px;
              }
              @media screen and (max-width: 750px){
                top: 33px;
                font-size: 12px;
                line-height: 12px;
              }
            }
            .ationCodehint{
              font-size: 12px;
              padding-top: 5px;
              color: #fc534c;
            }
          }
          .area-code {
            /deep/ .el-input--suffix .el-input__inner {
              height: 40px;
              line-height: 40px;
              @media screen and (max-width: 750px){
                height: 32px;
                line-height: 32px;
              }
            }
          }
        }
      }
    }
  }
</style>
