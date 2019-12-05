<template>
  <div>
    <div class="register">
      <div class="banner">
        <div class="formTable">
          <div class="box">
            <div class="main">
              <div class="title">
                <div class="l-hr"><img src="../../assets/images/login/left.png" alt=""></div>
                <div class="con">
                  <img :src="$t('emailAicon.forgetPwd')" alt="">
                </div>
                <div class="r-hr"><img src="../../assets/images/login/right.png" alt=""></div>
              </div>
              <div class="form">
                <div class="input">
                  <input type="text" v-model.trim="mailBox" @focus="mailBoxShow = false" @blur="emailBlur()" autocomplete="off" :placeholder="$t('nofoMation.text11')">
                  <div class="hint" v-show="mailBoxShow">{{mailHint}}</div>
                </div>
                <div class="input">
                  <input type="password" v-model.trim="newPwd" @focus="newPwdShow = false" autocomplete="off" :placeholder="$t('nofoMation.text8')" maxlength="26">
                  <div class="hint" v-show="newPwdShow">{{newPwdHint}}</div>
                </div>
                <div class="input">
                  <input type="password" v-model.trim="affirmNewPwd" @focus="affirmNewPwdShow = false" autocomplete="off" :placeholder="$t('nofoMation.text9')" maxlength="26">
                  <div class="hint" v-show="affirmNewPwdShow">{{affNewPwdHint}}</div>
                </div>
                <div class="input">
                  <smscode
                    @focus="msgAationCodeShow = false"
                    @click="getmailboxVerification()"
                    v-model="emailCode"
                    ref="smscode"
                    height="40px"
                  ></smscode>
                  <div class="hint" v-show="msgAationCodeShow">{{msgAationCodeHint}}</div>
                </div>
                <div class="btn" :class="{'active': goLoginActive}" @click="submitForgetPwd()">
                  <div class="con">
                    {{$t('accountBank.text28')}}
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
                </div>
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
import Dialog from '@/components/dialog/index'
export default {
  data () {
    return {
      mailBoxShow: false,
      newPwdShow: false,
      affirmNewPwdShow: false,
      msgAationCodeShow: false,
      goLoginActive: false,
      loadingShow: false, // 动画
      determineTheCity: '+86',
      emailCode: '', // 邮箱验证码
      mailHint: this.$t('nofoMation.text26'),
      newPwdHint: this.$t('forget.text2'),
      msgAationCodeHint: this.$t('nofoMation.text22'),
      affNewPwdHint: this.$t('forget.text3'),
      mailBox: '', // 邮箱
      newPwd: '', // 登录新密码
      affirmNewPwd: '', // 确认新密码
      cityDatas: []
    }
  },
  components: {
    smscode // 验证码组件
  },
  mounted () {
    this.$nextTick(() => {
      this.$http.get('../../static/city/local_cn.json').then((res) => {
        this.cityDatas = res.data
      })
    })
  },
  methods: {
    emailBlur () {
      let emailTest = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/ // 邮箱
      if (!emailTest.test(this.mailBox) && this.mailBox !== '') {
        this.mailBoxShow = true
        this.mailHint = this.$t('nofoMation.text24')
      }
    },
    // 提交忘记密码
    submitForgetPwd () {
      this.goLoginActive = !this.goLoginActive
      let emailTest = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/ // 邮箱
      let passWordTest = /^(?![0-9]+$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?![a-zA-Z]+$)[0-9A-Za-z]{8,26}$/ //  登录密码
      if (this.mailBox === '' || !emailTest.test(this.mailBox)) {
        this.mailBoxShow = true
        this.mailHint = this.$t('nofoMation.text26')
      }
      if (this.newPwd === '') {
        this.newPwdShow = true
        this.newPwdHint = this.$t('nofoMation.text17')
      } else if (!passWordTest.test(this.newPwd)) {
        this.newPwdShow = true
        this.newPwdHint = this.$t('nofoMation.text17')
      }
      if (this.affirmNewPwd === '') {
        this.affirmNewPwdShow = true
        this.affNewPwdHint = this.$t('nofoMation.text31')
      }
      if (this.affirmNewPwd !== this.newPwd) {
        this.affirmNewPwdShow = true
        this.affNewPwdHint = this.$t('nofoMation.text31')
      }
      if (this.emailCode === '') {
        this.msgAationCodeShow = true
      }
      let formData = new FormData()
      formData.append('email', this.mailBox)
      formData.append('newpassword', this.newPwd)
      formData.append('code', this.emailCode)
      this.loadingShow = true
      setTimeout(() => {
        this.loadingShow = false
      }, 600)
      if (this.mailBox !== '' && emailTest.test(this.mailBox) !== '' && this.newPwd !== '' && passWordTest.test(this.newPwd) !== '' && this.affirmNewPwd !== '' && (this.affirmNewPwd === this.newPwd) && this.emailCode !== '') {
        this.$http.post(`${this.$api}/user/findPassword`, formData).then((res) => {
          this.loadingShow = true
          if (res.data.success) {
            Dialog({
              msg: this.$t('accountBank.text45'),
              okFn: () => {
                this.$router.push('/login')
              }
            })
            this.loadingShow = false
          } else {
            Dialog({
              msg: res.data.msg
            })
            setTimeout(() => { // 待續...
              this.loadingShow = false
            }, 1000)
          }
        })
      }
    },
    // 邮箱验证
    getmailboxVerification () {
      let sendCodeMsg
      let emailTest = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/ // 邮箱
      if (this.mailBox === '' || !emailTest.test(this.mailBox)) {
        this.phoneCodeShow = true
      } else {
        let formData = new FormData()
        // formData.append('json', JSON.stringify({'type': 'register', 'mobile': this.phoneCode, 'phoneCode': this.determineTheCity}))
        formData.append('email', this.mailBox)
        formData.append('type', 1)
        this.$http.post(`${this.$api}/register/sendEmailCode`, formData).then((res) => {
          this.$refs.smscode.loading = true // 显示loading
          if (res.data.success) {
            sendCodeMsg = this.$t('nofoMation.text25')
            this.msgAationCodeHint = sendCodeMsg
            this.msgAationCodeShow = true
            this.$refs.smscode.loading = false
          } else {
            sendCodeMsg = res.data.msg
            this.msgAationCodeHint = sendCodeMsg
            this.msgAationCodeShow = true
            this.$refs.smscode.loading = false
          }
        }).catch((err) => {
          console.log(err)
        })
        this.getCountDown()
      }
    },
    getCountDown () {
      setTimeout(() => {
        this.$refs.smscode.loading = false // 显示loading
        this.$refs.smscode.start() // 开始倒计时
      }, 1000)
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
    height: 100%;
    @media screen and (max-width: 768px) {
      height: 100vh;
    }
    .banner{
      width: 100%;
      height: 1181px;
      margin: auto;
      background: url("../../assets/images/login/wjmm-banner.png") no-repeat;
      background-position: center;
      background-size: cover;
      @media screen and (max-width: 1920px) {
        padding: 0 20px;
      }
      @media screen and (max-width: 768px) {
        padding: 0;
        padding-left: 20px;
        height: 100vh;
        background: url("../../assets/images/appLogin/app-login-bg.png") no-repeat;
        background-size: 100% 100%;
      }
      .formTable{
        width: 1320px;
        height: 925px;
        padding-top: 178px;
        margin: auto;
        @media screen and (max-width: 1920px) {
          padding: 178px 20px 0;
        }
        @media screen and (max-width: 1340px) {
          width: 90%;
        }
        @media screen and (max-width: 750px) {
          width: 100%;
          height: 100%;
          padding: 80px 0 0;
        }
        .box{
          width: 100%;
          height: 925px;
          background: url("../../assets/images/login/wjmm-bg.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          @media screen and (max-width: 1024px) {
            width: 90%;
            height: 600px;
          }
          @media screen and (max-width: 768px) {
            width: 100%;
          }
          @media screen and (max-width: 750px) {
            width: 100%;
            height: 460px;
            background: url("../../assets/images/login/wjmm.png") no-repeat;
            background-size: 100% 100%;
          }
          .main{
            width: 100%;
            height: 765px;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            @media screen and (max-width: 1024px){
              top: 30px;
            }
            @media screen and (max-width: 768px){
              top: 10px;
              height: 440px;
            }
            .title{
              width: 100%;
              height: 32px;
              margin: auto;
              margin-top: 48px;
              margin-bottom: 66px;
              display: flex;
              align-items: center;
              justify-content: center;
              @media screen and (max-width: 1024px){
                height: auto;
                margin-bottom: 40px;
              }
              @media screen and (max-width: 750px){
                height: auto;
                margin-bottom: 10px;
              }
              .l-hr{
                width: 250px;
                height: 16px;
                @media screen and (max-width: 1024px){
                  display: none;
                }
              }
              .con{
                width: auto;
                height: 100%;
                margin: auto 30px;
                font-size: 28px;
                @media screen and (max-width: 1024px){
                  font-size: 20px;
                }
                @media screen and (max-width: 750px){
                  width: 130px;
                  font-size: 16px;
                }
                img{
                  width: 100%;
                }
              }
              .r-hr{
                width: 249px;
                height: 14px;
                @media screen and (max-width: 1024px){
                  display: none;
                }
              }
            }
            .form{
              width: 484px;
              margin: auto;
              @media screen and (max-width: 1024px){
                width: 56%;
              }
              @media screen and (max-width: 768px){
                width: 80%;
                padding: 0 20px;
              }
              @media screen and (max-width: 750px){
                width: 100%;
                padding: 0 20px 0 12px;
              }
              .tit{
                font-size: @titFsize;
                color: @titColor;
                @media screen and (max-width: 768px){
                  width: 100%;
                  padding: 0 20px;
                }
              }
              .input{
                width: 100%;
                height: 70px;
                margin: 0 auto 42px;
                background: url("../../assets/images/login/inpu-bg.png") no-repeat;
                background-size: 100% 100%;
                background-position: center;
                position: relative;
                @media screen and (max-width: 1024px){
                  height: 44px;
                }
                @media screen and (max-width: 768px){
                  width: 100%;
                  padding: 0 20px;
                }
                @media screen and (max-width: 750px){
                  height: 40px;
                  padding: 0 20px 0 12px;
                  margin: 0 auto 34px;
                  &:nth-child(4){
                    padding: 0 5px;
                  }
                }
                input{
                  width: 100%;
                  height: 70px;
                  color: rgba(255,255,255);
                  font-size: 18px;
                  padding: 0 23px;
                  @media screen and (max-width: 1024px){
                    height: 44px;
                    font-size: 16px;
                  }
                  @media screen and (max-width: 750px){
                    padding: 0;
                    height: 40px;
                    font-size: 14px;
                  }
                }
                .hint{
                  font-size: 14px;
                  color: #fc534c;
                  line-height: 14px;
                  position: absolute;
                  left: 0;
                  top: 84px;
                  @media screen and (max-width: 1024px){
                    top: 60px;
                  }
                  @media screen and (max-width: 768px){
                    top: 50px;
                  }
                  @media screen and (max-width: 750px){
                    font-size: 12px;
                    top: 44px;
                  }
                }
                .phone-area-code{
                  width: 100%;
                  height: 100%;
                  border-radius: 4px;
                  border: 1px solid @border;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  .area-code{
                    flex: 1;
                    position: relative;
                    .code{
                      padding-left: 20px;
                      color: @titColor;
                      font-size: @titFsize;
                    }
                    .select-box{
                      position: absolute;
                      top: 40px;
                      left: -1px;
                      width: 400px;
                      height: 220px;
                      z-index: 10;
                      background-color: #fcfcfc;
                      border-radius: 4px;
                      border-top: none;
                      overflow-y: auto;
                      display: none;
                      /*隐藏滚动条，当IE下溢出，仍然可以滚动*/
                      -ms-overflow-style:none;
                      /*火狐下隐显示动条*/
                      overflow:-moz-scrollbars-vertical;
                      /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
                      &::-webkit-scrollbar
                      {
                        width: 8px;
                        background-color: #F5F5F5;
                      }
                      /*定义滚动条轨道 内阴影+圆角*/
                      &::-webkit-scrollbar-track
                      {
                        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                        border-radius: 10px;
                        background-color: #F5F5F5;
                      }
                      /*定义滑块 内阴影+圆角*/
                      &::-webkit-scrollbar-thumb
                      {
                        border-radius: 10px;
                        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                        background-color: #999;
                      }
                      /*Chrome下隐藏滚动条，溢出可以透明滚动*/
                      &::-webkit-scrollbar{width:0}
                      .list{
                        line-height: 40px;
                        cursor: pointer;
                        padding-left: 20px;
                        &:hover{
                          color: @btn;
                          background-color: #fafafc;
                        }
                      }
                    }
                  }
                  .area-code {
                    /deep/ .el-input--suffix .el-input__inner {
                      height: 40px;
                      line-height: 40px;
                    }
                    /deep/ .el-input--suffix .el-input__suffix{
                      height: 40px;
                      line-height: 40px;
                    }
                  }
                  .hr{
                    width: 1px;
                    height: 16px;
                    background-color: @btn;
                  }
                  .the-arrow{
                    width: 100px;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    @media screen and (max-width: 768px){
                      width: 70px;
                    }
                    .img{
                      width: 16px;
                      height: 11px;
                      background: url("../../assets/images/login/select.png") no-repeat;
                      background-size: cover;
                    }
                  }
                }
                .phone-verification{
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  border: 1px solid @border;
                  border-radius: 4px;
                  input{
                    flex: 1;
                    border: none;
                    &:hover{
                      border: none;
                    }
                  }
                  .hr{
                    width: 1px;
                    height: 16px;
                    background-color: @btn;
                  }
                  .verification{
                    width: 100px;
                    height: 100%;
                    text-align: center;
                    font-size: @titFsize;
                    color: @btn;
                    cursor: pointer;
                    @media screen and (max-width: 768px){
                      width: 70px;
                    }
                  }
                }
              }
              .input{
                /deep/ .sms-container{
                  width: 100% !important;
                  height: 70px !important;
                  line-height: 70px !important;
                  padding-left: 23px !important;
                  border-radius: 0 !important;
                  color: #fff !important;
                  @media screen and (max-width: 1024px){
                    height: 40px !important;
                    line-height: 40px !important;
                    font-size: 16px;
                  }
                  @media screen and (max-width: 750px){
                    padding-left: 0 !important;
                    font-size: 16px;
                    padding-right: 0 !important;
                  }
                }
                /deep/ .sms-container .sms-input{
                  height: 100%;
                  border: none;
                  color: #fff !important;
                  font-size: 18px !important;
                  padding-left: 0 !important;
                  @media screen and (max-width: 750px){
                    padding-left: 8px !important;
                    font-size: 14px !important;
                  }
                }
                /deep/ .sms-container .sms-btn{
                  height: 100%;
                  background: none !important;
                  border: none;
                  color: #f0b149 !important;
                  font-size: 18px !important;
                  @media screen and (max-width: 750px){
                    width: 60px !important;
                    font-size: 14px !important;
                    text-align: center;
                  }
                  &:hover{
                    color: #fff !important;
                  }
                  &:after{
                     content: '' !important;
                     display: inline-block !important;
                     position: absolute !important;
                     width: 1px !important;
                     height: 60% !important;
                     left: 0;
                     top: 50%;
                     transform: translateY(-50%); // 垂直居中
                     background-color: #f0b149 !important;
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
                transition: all 1s;
                @media screen and (max-width: 1024px){
                  height: 40px !important;
                  line-height: 40px !important;
                  font-size: 16px;
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
                  position: absolute;
                  z-index: 10;
                  text-shadow: 0 2px 2px rgba(0,0,0, 1);
                  @media screen and (max-width: 1024px){
                    width: 97%;
                    height: 32px !important;
                    line-height: 32px !important;
                    font-size: 16px;
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
                .loding-box{
                  position: absolute;
                  top: 50%;
                  transform: translateY(-50%);
                  right: 40%;
                  .spinner {
                    width: 18px;
                    height: 18px;
                    position: relative;
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
            }
          }
        }
      }
    }
  }
</style>
