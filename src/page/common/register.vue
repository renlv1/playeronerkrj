<template>
  <div>
    <div class="register">
      <div class="form-bg">
        <div class="box">
          <div class="form-box">
            <div class="title">
              <div class="l-hr"><img src="../../assets/images/login/left.png" alt=""></div>
              <div class="con"><img :src="$t('emailAicon.sigin')" alt=""></div>
              <div class="r-hr"><img src="../../assets/images/login/right.png" alt=""></div>
            </div>
            <div class="form">
            <div class="input">
              <input type="text" v-model.trim="userName" @focus="userNameShow = false" @blur="checkUserName()" autocomplete="off" :placeholder="$t('accountBank.text40')" maxlength="30">
              <div class="hint" v-show="userNameShow">{{userHint}}</div>
              <div class="hint" v-show="userNamedEfaultShow">{{$t('forget.text10')}}</div>
            </div>
            <div class="input">
              <input type="text" v-model.trim="nickName" @focus="nickNameShow = false" @blur="checknickName()" autocomplete="off" :placeholder="$t('nofoMation.text7')" maxlength="30">
              <div class="hint" v-show="nickNameShow">{{nickNameHint}}</div>
              <div class="hint" v-show="nickNameEfaultShow">{{$t('forget.text11')}}</div>
            </div>
            <div class="input">
              <input type="password" oncopy="return false" v-model.trim="passWord" @focus="passWordShow = false" @blur="checkpassWord()" autocomplete="off" :placeholder="$t('nofoMation.text8')" maxlength="26">
              <div class="hint" v-show="passWordShow">{{passWorddHint}}</div>
              <div class="hint" v-show="passWordEfaultShow">{{$t('forget.text12')}}</div>
            </div>
              <div class="input">
                <input type="password" onpaste="return false"  v-model.trim="confirmPassword" @focus="confirmPasswordShow = false" @blur="checkCmPassWord()" autocomplete="off" :placeholder="$t('nofoMation.text9')" maxlength="26">
                <div class="hint" v-show="confirmPasswordShow">{{confirmPasswordHint}}</div>
                <div class="hint" v-show="confirmPasswordEfaultShow">{{$t('forget.text13')}}</div>
              </div>
            <div class="input">
              <input type="password" v-model.trim="securityCode" @focus="securityCodeShow = false" @blur="checksecurityCode()" autocomplete="off" :placeholder="$t('nofoMation.text10')" maxlength="26">
              <div class="hint" v-show="securityCodeShow">{{securityCodeHint}}</div>
              <div class="hint" v-show="securityCodeEfaultShow">{{$t('forget.text14')}}</div>
            </div>
            <div class="input">
              <input type="text" v-model.trim="emailCode" @focus="emailCodeShow = false" @blur="CheckYourEmail()" autocomplete="off" :placeholder="$t('nofoMation.text11')">
              <div class="hint" v-show="emailCodeShow">{{emailCodeHint}}</div>
            </div>
           <!-- <div class="tit">邮箱验证码:</div>
            <div class="input">
              <smscode
                @focus="msgAationCodeShow = false"
                @click="getmailboxVerification()"
                v-model="msgAationCode"
                ref="smscode"
                height="40px"
              ></smscode>
              <div class="hint" v-show="msgAationCodeShow">{{msgAationCodeHint}}</div>
            </div>-->

            <div class="btn" :class="{'active': goLoginActive}" @click="signInSub()">
              <div class="con">
                {{$t('emailAicon.text8')}}
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
              </div>
              <div class="cube l-top"></div>
              <div class="cube r-top"></div>
              <div class="cube r-bot"></div>
              <div class="cube l-bot"></div>
              <!-- <div class="errHint" v-show="errHintShow">{{errHintText}}</div> -->
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
      userName: '', // 用户名
      nickName: '', // 昵称
      passWord: '', // 密码
      securityCode: '', // 安全密码
      emailCode: '', // 邮箱
      errHintText: '',
      loadingShow: false, // 动画
      errHintShow: false,
      userNameShow: false,
      userNamedEfaultShow: true,
      nickNameShow: false,
      nickNameEfaultShow: true,
      passWordShow: false,
      passWordEfaultShow: true,
      confirmPassword: '',
      confirmPasswordShow: false,
      confirmPasswordEfaultShow: true,
      goLoginActive: false,
      securityCodeShow: false,
      securityCodeEfaultShow: true,
      emailCodeShow: false,
      msgAationCodeShow: false,
      internationalCityShow: false, // 城市
      userHint: '',
      nickNameHint: '',
      passWorddHint: '',
      confirmPasswordHint: '',
      securityCodeHint: '',
      emailCodeHint: '',
      msgAationCodeHint: '',
      // determineTheCity: '+86',
      defulatIndex: 0,
      sendBtnTimes: 10,
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
      this.checkUserName() // 注册前检查用户名是否存在
      this.CheckYourEmail() // 注册前检查邮箱是否存在
      /* this.$http.get('../../static/city/local_cn.json').then((res) => {
        this.cityDatas = res.data // 手机区号
      }) */
    })
  },
  methods: {
    // 城市下拉
    cityChange () {
      this.internationalCityShow = !this.internationalCityShow
    },
    checkUserName () { // 检查用户名
      let userNameTest = /^[a-zA-Z0-9]{4,12}$/ // 用户名
      if (userNameTest.test(this.userName) && this.userName !== '') {
        this.userNameShow = false
        this.userNamedEfaultShow = false
      }
      if (!userNameTest.test(this.userName) && this.userName !== '') {
        this.userNameShow = true
        this.userHint = this.$t('forget.text10')
      }
      // let userNameExist
      // let formData = new FormData()
      // formData.append('userName', this.userName)
      // if (this.userName !== '' && userNameTest.test(this.userName)) {
      //   this.$http.post(`${this.$api}/user/checkUserName`, formData).then((res) => {
      //     if (res.data.status === 'failed') {
      //       // userNameExist = '用户名已被注册011'
      //       this.userHint = res.data.msg
      //       this.userNameShow = true
      //     }
      //   })
      // }
    },
    CheckYourEmail () { // 检查邮箱
      let emailTest = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/ // 邮箱
      if (!emailTest.test(this.emailCode) && this.emailCode !== '') {
        this.emailCodeShow = true
        this.emailCodeHint = this.$t('nofoMation.text24')
      }
      // let emailExist
      // let formData = new FormData()
      // formData.append('email', this.emailCode)
      // if (this.emailCode !== '' && emailTest.test(this.emailCode)) {
      //   this.$http.post(`${this.$api}/user/checkEmail`, formData).then((res) => {
      //     if (res.data.status === 'failed') {
      //       // emailExist = '该邮箱已被注册'
      //       this.emailCodeHint = res.data.msg
      //       this.emailCodeShow = true
      //     }
      //   })
      // }
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
      if (this.confirmPassword !== this.passWord && this.confirmPassword !== '') {
        this.confirmPasswordShow = false
        this.confirmPasswordEfaultShow = true
      } else {
        this.confirmPasswordShow = false
        this.confirmPasswordEfaultShow = false
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
    // 注册
    signInSub () {
      this.goLoginActive = !this.goLoginActive
      let userNameTest = /^[a-zA-Z0-9]{4,12}$/ // 用户名
      let nickNameTest = /^[\u4e00-\u9fa5_a-zA-Z0-9_]{4,12}$/ // 昵称
      let emailTest = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/ // 邮箱
      // let phoneTest = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/ // 手机
      let passWordTest = /^(?![0-9]+$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?![a-zA-Z]+$)[0-9A-Za-z]{8,26}$/ //  登录密码匹配长度为8到26位,字母和数字组成必须包含大写小写
      let securityCodeTest = /^(?![0-9]+$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?![a-zA-Z]+$)[0-9A-Za-z]{6,26}$/ //  安全密码匹配长度为6到26位,字母和数字组成必须包含大写小写
      if (this.userName === '') {
        this.userNameShow = true
        this.userNamedEfaultShow = false
        this.userHint = this.$t('forget.text15')
      }
      if (!userNameTest.test(this.userName) && this.userName !== '') {
        this.userNameShow = true
        this.userHint = this.$t('forget.text10')
      }
      if (this.nickName === '') {
        this.nickNameShow = true
        this.nickNameEfaultShow = false
        this.nickNameHint = this.$t('forget.text16')
      }
      if (!nickNameTest.test(this.nickName) && this.nickName !== '') {
        this.nickNameShow = true
        this.nickNameHint = this.$t('nofoMation.text16')
      }
      if (this.passWord === '') {
        this.passWordShow = true
        this.passWordEfaultShow = false
        this.passWorddHint = this.$t('forget.text17')
      }
      if (!passWordTest.test(this.passWord) && this.passWord !== '') {
        this.passWordShow = true
        this.passWorddHint = this.$t('nofoMation.text17')
      }
      if (this.confirmPassword === '') {
        this.confirmPasswordShow = true
        this.confirmPasswordEfaultShow = false
        this.confirmPasswordHint = this.$t('forget.text18')
      }
      /* if (this.confirmPassword !== this.passWord && this.confirmPassword !== '') {
        this.confirmPasswordShow = false
        this.confirmPasswordEfaultShow = true
        this.confirmPasswordHint = '确认密码与登录密码必须一致'
      } */
      if (this.securityCode === '' || !securityCodeTest.test(this.securityCode)) {
        this.securityCodeShow = true
        this.securityCodeEfaultShow = false
        this.securityCodeHint = this.$t('forget.text18')
      }
      if (!securityCodeTest.test(this.securityCode) && this.securityCode !== '') {
        this.securityCodeShow = true
        this.securityCodeHint = this.$t('forget.text14')
      }
      if (this.emailCode === '') {
        this.emailCodeShow = true
        this.emailCodeHint = this.$t('nofoMation.text26')
      }
      if (!emailTest.test(this.emailCode) && this.emailCode !== '') {
        this.emailCodeShow = true
        this.emailCodeHint = this.$t('nofoMation.text24')
      }
      let formData = new FormData()
      formData.append('username', this.userName)
      formData.append('nickName', this.nickName) // 昵称
      formData.append('password', this.passWord)
      formData.append('tradePwd', this.securityCode) // 安全密码
      formData.append('email', this.emailCode) // 邮箱
      this.loadingShow = true
      setTimeout(() => {
        this.loadingShow = false
      }, 600)
      if (userNameTest.test(this.userName) && nickNameTest.test(this.nickName) && passWordTest.test(this.passWord) && this.passWord === this.confirmPassword && securityCodeTest.test(this.securityCode) && emailTest.test(this.emailCode)) {
        this.$http.post(`${this.$api}/register/registerUser`, formData).then((res) => {
          this.loadingShow = true
          if (res.data.success === true) {
            this.$router.push({path: '/emailActivation', query: {emailCode: this.emailCode}})
            this.loadingShow = false
          } else {
            setTimeout(() => {
              // this.errHintShow = true
              // this.errHintText = res.data.msg
              this.$dialog({
                msg: res.data.msg
              })
              this.loadingShow = false
            }, 1000)
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
        background-position: center;
      }
      .form-box{
        position: absolute;
        width: 100%;
        height: auto;
        left: 0;
        right: 0;
        bottom: 100px;
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
            height: 28px;
            margin: 0 auto;
            margin-bottom: 6px;
            margin-top: 44px;
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
            padding: 0 5px;
            margin: auto 40px;
            font-size: 28px;
            height: 32px;
            line-height: 32px;
            @media screen and (max-width: 768px){
              width: 70px;
            }
            img{
              width: 100%;
            }
          }
        }
        .form{
          width: 484px;
          margin: auto;
          @media screen and (max-width: 750px){
            width: 94%;
            padding: 0 12px 0 2px;
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
              height: 32px;
              margin: 0 auto 28px;
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
            margin: auto;
            cursor: pointer;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all .4s;
            @media screen and (max-width: 1320px) {
              height: 60px;
            }
            @media screen and (max-width: 1320px) {
              height: 44px;
              line-height: 44px;
            }
            @media screen and (max-width: 1024px) {
              font-size: 16px;
            }
            @media screen and (max-width: 768px) {
              margin-bottom: 0;
            }
            @media screen and (max-width: 750px){
              height: 40px;
              line-height: 40px;
            }
            &.active{
              opacity: .8;
            }
            &:focus{
              opacity: .8;
              color: rgba(255,255,255, .9);
              .con{
                border: 1px solid rgba(255,255,255, .9);
              }
            }
            &:hover{
              color: rgba(255,255,255, .8);
              background: linear-gradient(#8c6231, #f2ac3a);
              .con{
                border: 1px solid rgba(255,255,255, .8);
              }
            }
            .con{
              width: 470px;
              height: 56px;
              line-height: 56px;
              border: 1px solid #fff;
              z-index: 10;
              position: relative;
              text-shadow: 0 2px 2px rgba(0,0,0, 1);
              @media screen and (max-width: 1320px) {
                height: 50px;
                line-height: 50px;
              }
              @media screen and (max-width: 1320px) {
                height: 32px;
                line-height: 32px;
                width: 98%;
              }
              .loding-box{
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 40%;
                @media screen and (max-width: 768px) {
                  right: 34%;
                }
                .spinner {
                  width: 18px;
                  height: 18px;
                  position: relative;
                  @media screen and (max-width: 768px) {
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
                  @media screen and (max-width: 768px) {
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
              top: 35px;
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
