<template>
  <div>
    <div class="emailModalBox">
      <div class="main">
        <div class="jh-bg">
          <div class="box">
            <div class="title">
              <div class="l-hr"><img src="../../assets/images/login/left.png" alt=""></div>
              <div class="con">{{$t('emailAicon.text1')}}</div>
              <div class="r-hr"><img src="../../assets/images/login/right.png" alt=""></div>
            </div>
            <div class="modal">
              <div class="con-box">
                <div class="l-hr">
                  <img src="../../assets/images/login/jh-l-border.png" alt="">
                </div>
                <div class="con">
                  <div class="acrive-link">{{$t('emailAicon.text2')}}<span class="skipLink">{{emailCodeLink}}</span>{{$t('emailAicon.text3')}}</div>
                  <div class="hint">{{$t('emailAicon.text4')}}</div>
                  <div class="hint">{{$t('emailAicon.text5')}}</div>
                </div>
                <div class="r-hr">
                  <img src="../../assets/images/login/jh-r-border.png" alt="">
                </div>
              </div>
              <div class="anew-box">
                <button class="anew-btn" ref="sendMsg" @click="emailActivation()">
                  {{$t('emailAicon.text6')}}
                </button>
                <div class="reminder" v-show="anewShow">{{hintEmial}}</div>
              </div>
              <div class="goBack">
                <router-link to="/login" tag="span">{{$t('emailAicon.text7')}}</router-link>
                <i class="con">{{$t('emailAicon.text9')}}</i>
                <router-link to="/register" tag="span">{{$t('emailAicon.text8')}}</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      emailCodeLink: '', // 邮箱激活
      anewShow: false,
      anewbtnActive: true,
      sendBtnTimes: 60,
      hintEmial: ''
    }
  },
  component: {},
  created () {
    this.emailCodeLink = this.$route.query.emailCode
  },
  mounted () {
    this.$nextTick(() => {
      this.emailCodeLink = this.$route.query.emailCode
    })
  },
  methods: {
    // 邮箱重新激活
    emailActivation () {
      let sendCodeMsg
      let formData = new FormData()
      formData.append('email', this.emailCodeLink)
      if (this.emailCodeLink !== '') {
        this.$http.post(`${this.$api}/user/sendActivatedEmail`, formData).then((res) => {
          if (res.data.success) {
            sendCodeMsg = res.data.msg
            this.hintEmial = this.$t('nofoMation.text25')
            this.anewShow = true
          } else {
            sendCodeMsg = res.data.msg
            this.hintEmial = sendCodeMsg
            this.anewShow = true
          }
        }).catch((err) => {
          console.log(err)
        })
        this.countDown()
      }
    },
    countDown () {
      if (this.sendBtnTimes === 0) {
        this.$refs.sendMsg.innerHTML = this.$t('emailAicon.text10')
        this.sendBtnTimes = 60
        this.$refs.sendMsg.style.color = 'rgba(255,255,255,1)'
        this.$refs.sendMsg.disabled = false
        this.anewbtnActive = true
      } else {
        this.sendBtnTimes--
        this.$refs.sendMsg.innerHTML = this.sendBtnTimes
        this.$refs.sendMsg.disabled = true
        this.$refs.sendMsg.style.color = 'rgba(255,255,255,0.8)'
        this.anewbtnActive = true
        setTimeout(() => this.countDown(), 1000)
      }
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @titleFsize: 30px; // 标题
  @titleColor: #1f1f1f;
  @titFsize: 16px; // input的标题
  @titColor: #000; // input的标题
  @inputColor: #969699; // input的文字颜色
  @btn: #0874dc; // input的文字颜色
  @border: #c8c8cc; // input边框
  .emailModalBox {
    width: 100%;
    height: 880px;
    background: url("../../assets/images/login/jh-banner.png") no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 1024px){
      height: 100vh;
    }
    @media screen and (max-width: 750px){
      background: url("../../assets/images/appLogin/app-login-bg.png") no-repeat;
      background-size: 100% 100%;
    }
    .main{
      width: 100%;
      height: 662px;
      padding-top: 68px;
      @media screen and (max-width: 750px){
        height: 470px;
        padding: 20px 0 0 20px;
      }
      .jh-bg{
        width: 1320px;
        height: 662px;
        margin: auto;
        background: url("../../assets/images/login/jh-bg.png") no-repeat;
        background-size: cover;
        position: relative;
        @media screen and (max-width: 1500px){
          background-size: 100% 100%;
          width: 80%;
        }
        @media screen and (max-width: 1024px){
          height: 500px;
        }
        @media screen and (max-width: 750px){
          width: 100%;
          height: 470px;
          background: url("../../assets/images/login/email-bg.png") no-repeat;
          background-size: 100% 100%;
        }
        .box{
          width: 100%;
          height: 544px;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          @media screen and (max-width: 1024px){
            height: 100%;
          }
          @media screen and (max-width: 750px){
          }
          .title{
            width: 100%;
            height: 32px;
            margin: auto;
            margin-bottom: 79px;
            display: flex;
            align-items: center;
            justify-content: center;
            @media screen and(max-width: 1024px){
              margin-top: 90px;
              margin-bottom: 0;
            }
            @media screen and (max-width: 750px){
              width: 80%;
              height: 24px;
              margin-top: 60px;
            }
            .l-hr{
              width: 250px;
              height: 16px;
              @media screen and(max-width: 1024px){
                display: none;
              }
            }
            .con{
              height: 100%;
              margin: auto 40px;
              font-size: 28px;
              font-family: titleChi;
              background: -webkit-linear-gradient(top, #f0b149, #af8975);
              -webkit-background-clip: text; /*必需加前缀 -webkit- 才支持这个text值 */
              -webkit-text-fill-color: transparent; /*text-fill-color会覆盖color所定义的字体颜色： */
              text-transform: uppercase;
              text-shadow: 0 0 10px rgba(250, 181, 42, .2);
              @media screen and (max-width: 750px){
                font-size: 21px;
              }
            }
            .r-hr{
              width: 249px;
              height: 14px;
              @media screen and(max-width: 1024px){
                display: none;
              }
            }
          }
          .modal {
            width: 646px;
            height: auto;
            margin: auto;
            @media screen and (max-width: 1024px){
              margin-top: 120px;
            }
            @media screen and (max-width: 768px){
              width: 100%;
              padding: 0 20px;
              margin-top: 30px;
            }
            @media screen and (max-width: 750px){
              width: 100%;
              padding: 0 20px 0 12px;
              margin-top: 30px;
            }
            .con-box{
              width: 100%;
              height: 250px;
              margin: auto;
              display: flex;
              align-items: center;
              justify-content: space-between;
              @media screen and (max-width: 1024px){
                height: 180px;
              }
              @media screen and (max-width: 750px){
                height: 200px;
              }
              .l-hr{
                width: 14px;
                height: 100%;
                @media screen and (max-width: 750px){
                  width: 8px;
                }
                img{
                  width: 100%;
                  height: 100%;
                }
              }
              .con{
                width: 590px;
                height: 200px;
                margin: auto;
                color: #fff;
                font-size: 18px;
                @media screen and (max-width: 768px){
                  width: 90%;
                }
                @media screen and (max-width: 750px){
                  font-size: 13px;
                }
                .acrive-link{
                  padding-bottom: 56px;
                  @media screen and (max-width: 1024px){
                    padding-bottom: 48px;
                  }
                  @media screen and (max-width: 750px){
                    padding-bottom: 30px;
                  }
                  .skipLink {
                    padding: 0 5px;
                  }
                }
                .hint {
                  padding-bottom: 56px;
                }
              }
              .r-hr{
                width: 12px;
                height: 100%;
                @media screen and (max-width: 750px){
                  width: 8px;
                }
                img{
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .anew-box{
              width: 484px;
              height: 68px;
              margin: 0 auto;
              position: relative;
              @media screen and (max-width: 1024px){
                margin-top: 50px;
              }
              @media screen and (max-width: 768px){
                width: 400px;
                margin-top: 0;
              }
              @media screen and (max-width: 750px){
                width: 220px;
                margin-top: 0;
              }
              .anew-btn{
                width: 484px;
                height: 68px;
                line-height: 68px;
                margin: 36px auto 30px;
                background: url("../../assets/images/login/btn-bg.png.png") no-repeat;
                background-position: center;
                background-size: 100% 100%;
                color: #fff;
                font-size: 24px;
                text-align: center;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 1s;
                @media screen and (max-width: 768px){
                  width: 400px;
                  height: 50px;
                  line-height: 50px;
                  font-size: 20px;
                }
                @media screen and (max-width: 750px){
                  width: 220px;
                  height: 40px;
                  line-height: 40px;
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
                  .con{
                    border: 1px solid rgba(255,255,255, .7);
                  }
                }
              }
              .reminder {
                position: absolute;
                left: 0;
                top: 66px;
                font-size: 14px;
                color: #e93a3a;
                padding: 6px 0;
                z-index: 10;
                @media screen and (max-width: 768px){
                  top: 52px;
                }
                @media screen and (max-width: 750px){
                  top: 34px;
                }
              }
            }
            .goBack {
              width: 100%;
              text-align: center;
              font-size: 18px;
              color: #fff;
              padding-top: 30px;
              @media screen and (max-width: 768px){
                padding-top: 24px;
              }
              @media screen and (max-width: 750px){
                padding-top: 0;
                font-size: 16px;
              }
              span {
                color: #f8b72b;
                cursor: pointer;
              }
              .con{
                padding: 0 6px;
              }
            }
          }
        }
      }
    }
  }
</style>
