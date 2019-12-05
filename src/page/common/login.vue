<template>
  <div>
    <div class="login-wrap">
      <div class="banner">
        <div class="formTable">
          <div class="box">
            <div class="bor-bot">
              <div class="top-bg"></div>
              <div class="main">
                <input type="text" style="display: none">
                <input type="password" style="display: none">
                <div class="title">
                  <div class="l-hr"><img src="../../assets/images/login/left.png" alt=""></div>
                  <div class="con"><img :src="$t('emailAicon.login')" alt=""></div>
                  <div class="r-hr"><img src="../../assets/images/login/right.png" alt=""></div>
                </div>
                <div class="form">
                  <div class="info-box">
                    <div class="input">
                      <input type="text" v-model.trim="userName" maxlength="26" autocomplete="off" @focus="hintShow = false" :placeholder="$t('accountBank.text40')">
                    </div>
                    <div class="input passWord">
                      <input type="password" v-model.trim="passWord" maxlength="26" autocomplete="off" @focus="hintShow = false" :placeholder="$t('nofoMation.text8')">
                      <div class="hint" v-show="hintShow">{{promptMessage}}</div>
                    </div>
                    <div class="ldLink">
                      <div class="radarlogin" @click="radarGoLogin()">{{$t('forget.text4')}}<span class="radar-account">{{$t('forget.text5')}}</span>{{$t('emailAicon.text7')}}</div>
                    </div>
                    <div class="btn" :class="{'active': goLoginActive}" @click="goLongin()">
                      <div class="con">
                        {{$t('emailAicon.text7')}}
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
                    <div class="link">
                      <router-link to="/forgetPassword" tag="div" class="forget-the-password">{{$t('forget.text1')}}？</router-link>
                      <router-link to="/register" tag="div" class="signin">{{$t('emailAicon.text8')}}</router-link>
                    </div>
                  </div>
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
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      userName: '',
      passWord: '',
      promptMessage: '',
      noNullMes: this.$t('forget.text7'),
      hintShow: false,
      loadingShow: false, // 登錄加載show
      goLoginActive: false
    }
  },
  created () {
    if (this.$route.path === '/login') {
      document.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
          this.goLongin()
        }
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.loginFlag === true) {
        this.$http.get(`${this.$api}/user/balance`).then((res) => { // 用戶是否登錄過,登錄過進入首頁
          if (res.data.success === true) {
            this.$router.push('/home')
          } else {
            this.$router.replace('/login')
          }
        })
      }
    })
  },
  computed: {
    ...mapGetters([
      'loginFlag'
    ])
  },
  methods: {
    goLongin () {
      this.goLoginActive = !this.goLoginActive
      let formData = new FormData()
      formData.append('username', this.userName)
      formData.append('password', this.passWord)
      if (this.userName === '' || this.passWord === '') {
        this.promptMessage = this.noNullMes
        this.hintShow = true
      }
      this.loadingShow = true
      setTimeout(() => {
        this.loadingShow = false
      }, 600)
      if (this.userName !== '' && this.passWord !== '') {
        this.$http.post(`${this.$api}/user/userlogin`, formData).then((res) => {
          this.userName = ''
          this.passWord = '' // BUG退出账号回车直接登录,回车清空
          this.loadingShow = true
          if (res.data.success) {
            this.$store.dispatch('getUserBalance')
            this.loadingShow = false
            if (res.data.data.user.openTradePassword !== 2) { // 是否开启交易密码（1：未设置  2:开启  3:关闭）
              this.$router.push('/infoMation')
            } else {
              this.$router.push('/home')
            }
            this.hintShow = false
            this.loadingShow = false
          } else {
            setTimeout(() => {
              this.$router.replace('/login')
              if (res.data.msg === this.$t('forget.text8')) {
                this.promptMessage = this.$t('forget.text9')
              } else {
                this.promptMessage = res.data.msg
              }
              this.hintShow = true
              this.loadingShow = false
            }, 1000)
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    radarGoLogin () {
      let jumplink
      this.$http.post(`${this.$api}/user/getRadarLoginUrl`).then((res) => {
        if (res.data.success) {
          jumplink = res.data.data
          // console.log(res.data.data)
          window.location.href = jumplink
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-wrap{
  width: 100%;
  height: 100%;
  @media screen and (max-width: 768px){
    height: 100vh;
  }
  .banner{
    width: 100%;
    min-height: calc(100vh - 225px);
    margin: auto;
    background: url("../../assets/images/login/bannner.png") no-repeat;
    background-position: center;
    background-size: cover;
    padding-bottom: 30px;
    @media screen and (max-width: 1024px){
      height: 100vh;
    }
    @media screen and (max-width: 768px){
      background: url("../../assets/images/appLogin/app-login-bg.png") no-repeat;
      background-size: 100% 100%;
      height: 100vh;
      padding-bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .formTable{
      width: 1320px;
      height: auto;
      padding-top: 148px;
      margin: auto;
      @media screen and (max-width: 1320px){
        width: 100%;
        padding: 148px 20px 0;
      }
      @media screen and (max-width: 768px){
        width: 100%;
        padding: 0;
      }
      .box{
        width: 1320px;
        height: 662px;
        background: url("../../assets/images/login/PC-bg.svg") no-repeat;
        background-size: 100% 100%;
        background-position: center;
        position: relative;
        @media screen and (max-width: 1500px) {
          width: 100%;
        }
        @media screen and (max-width: 1024px) {
          width: 94%;
          margin: 0 auto;
        }
        @media screen and (max-width: 768px) {
          height: 100vh;
          background: url("../../assets/images/Login/app-login-bg.svg") no-repeat;
          background-size: 100% 100%;
          background-position: center;
        }
        .bor-bot{
          display: flex;
          align-items: center;
          justify-content: center;
          @media screen and (max-width: 768px) {
            width: 500px;
            height: 100%;
            margin: auto;
            border-bottom: 1px solid #AB852E;
          }
          @media screen and (max-width: 750px) {
            width: 100%;
            border-bottom: none;
          }
          .main{
            width: auto;
            height: auto;
            @media screen and (max-width: 1250px){
              margin-top: 50px;
            }
            @media screen and (max-width: 768px){
              width: 450px;
              height: auto;
            }
            @media screen and (max-width: 520px){
              width: 80%;
            }
            .title{
              width: 100%;
              height: 32px;
              line-height: 32px;
              margin: auto;
              margin-top: 120px;
              display: flex;
              align-items: center;
              justify-content: center;
              @media screen and (max-width: 1320px){
                margin-top: 130px;
              }
              @media screen and (max-width: 1024px){
                height: 20px;
                line-height: 20px;
                margin-top: 21%;
                margin-bottom: 40px;
              }
              @media screen and (max-width: 800px){
                margin-top: 24%;
              }
              @media screen and (max-width: 768px){
                margin-top: 0px;
                height: 22px;
                line-height: 22px;
                margin-bottom: 40px;
              }
              @media screen and (max-width: 750px){
                margin-top: 12px;
                margin-bottom: 0;
              }
              .l-hr{
                width: 250px;
                @media screen and (max-width: 768px){
                  display: none;
                  img{
                    width: 100%;
                  }
                }
              }
              .con{
                width: auto;
                height: 100%;
                margin: auto 40px;
                font-size: 28px;
                text-align: center;
                font-family: titleChi;
                background: -webkit-linear-gradient(top, #f0b149, #af8975);
                background: -moz-linear-gradient(top, #f0b149, #af8975);
                background: -ms-linear-gradient(top, #f0b149, #af8975);
                background: linear-gradient(top, #f0b149, #af8975);
                -webkit-background-clip: text; /*必需加前缀 -webkit- 才支持这个text值 */
                -webkit-text-fill-color: transparent; /*text-fill-color会覆盖color所定义的字体颜色： */
                text-transform: uppercase;
                text-shadow: 0 0 10px rgba(250, 181, 42, .2);
                @media screen and (max-width: 1124px){
                  font-size: 26px;
                  width: auto;
                }
                @media screen and (max-width: 1024px){
                  font-size: 20px;
                }
                @media screen and (max-width: 768px){
                  width: 60px;
                  margin: auto 16px;
                  font-size: 18px;
                }
                img{
                  width: 100%;
                }
              }
              .r-hr{
                width: 249px;
                @media screen and (max-width: 768px){
                  display: none;
                  img{
                    width: 100%;
                  }
                }
              }
            }
            .form{
              width: 484px;
              height: auto;
              margin: 80px auto 0;
              @media screen and (max-width: 1320px) {
                margin-top: 40px;
                height: auto;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              @media screen and (max-width: 1024px) {
                width: 80%;
                padding-bottom: 10%;
                margin-top: 20px;
              }
              @media screen and (max-width: 768px) {
                width: 92%;
                padding-bottom: 0;
              }
              .info-box{
                width: 100%;
                height: 100%;
                .input{
                  width: 100%;
                  height: 70px;
                  margin: 0 auto 42px;
                  background: url("../../assets/images/login/inpu-bg.png") no-repeat;
                  background-size: 100% 100%;
                  @media screen and (max-width: 1320px) {
                    height: 50px;
                    line-height: 50px;
                  }
                  @media screen and (max-width: 1024px) {
                    width: 100%;
                    height: 42px;
                    line-height: 42px;
                    margin: 0 auto 40px;
                  }
                  @media screen and (max-width: 768px) {
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    margin: 0 auto 40px;
                  }
                  @media screen and (max-width: 750px){
                    margin: 0 auto 30px;
                    height: 40px;
                    line-height: 40px;
                  }
                  input{
                    color: rgba(255,255,255,1);
                    font-size: 18px;
                    width: 100%;
                    height: 100%;
                    line-height: 70px;
                    padding-left: 23px;
                    border-radius: 4px;
                    @media screen and (max-width: 1024px) {
                      font-size: 16px;
                    }
                    @media screen and (max-width: 768px) {
                      padding-left: 20px;
                      font-size: 14px;
                      line-height: 40px;
                    }
                  }
                }
                .passWord{
                  position: relative;
                  margin-bottom: 24px;
                  .hint{
                    line-height: 20px;
                    font-size: 14px;
                    color: #e93a3a;
                    position: absolute;
                    left: 0;
                    top: -28px;
                    @media screen and (max-width: 750px) {
                      top: -24px;
                      font-size: 12px;
                    }
                  }
                }
                .ldLink{
                  font-size: 16px;
                  color: #fff;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  padding-bottom: 26px;
                  @media screen and (max-width: 1024px) {
                    padding-bottom: 20px;
                  }
                  @media screen and (max-width: 768px) {
                    padding-bottom: 30px;
                  }
                  .radarlogin{
                    cursor: pointer;
                    &:hover{
                      color: #f8b72b;
                      .radar-account{
                        color: #fff;
                      }
                    }
                    .radar-account{
                      color: #f8b72b;
                      padding: 0 6px;
                    }
                  }
                }
                .btn{
                  width: 100%;
                  height: 68px;
                  line-height: 68px;
                  background: -webkit-linear-gradient(#f2ac3a, #8c6231);
                  background: -moz-linear-gradient(#f2ac3a, #8c6231);
                  background: -ms-linear-gradient(#f2ac3a, #8c6231);
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
                    margin-bottom: 20px;
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
                .link{
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding-top: 30px;
                  padding-bottom: 30px;
                  font-size: 18px;
                  color: #fff;
                  @media screen and (max-width: 1024px){
                    padding-top: 20px;
                    font-size: 16px;
                  }
                  @media screen and (max-width: 768px){
                    padding-top: 20px;
                  }
                  @media screen and (max-width: 750px){
                    padding-top: 0;
                  }
                  .signin{
                    cursor: pointer;
                    &:hover{
                      color: #f8b72b;
                    }
                  }
                  .forget-the-password{
                    cursor: pointer;
                    &:hover{
                      color: #f8b72b;
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
}
</style>
