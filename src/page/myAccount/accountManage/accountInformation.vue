<template>
  <div class="accountInformation">
    <div class="assets-wrapper">
      <h3 class="assets-title">{{$t('accountBank.text1')}}</h3>
      <div class="assets-c">
        <div class="avatar">
          <div>{{$t('accountBank.text47')}}</div>
          <div class="img-box">
            <img src="~@img/my/avatar_big.png" alt="">
          </div>
        </div>
        <div class="avatar-box">
          <div class="spot-box">
            <div class="spot-img"><img src="../../../assets/images/notInfo/spot.png" ></div>
            <div>{{$t('accountBank.text47')}}</div>
          </div>
          <div class="img-box">
            <img src="~@img/my/avatar_big.png" alt="">
          </div>
        </div>
        <div class="img-line"></div>
        <div class="flex-item cursor" @click="showNick">
          <div class="spot-box">
            <div class="spot-img"><img src="../../../assets/images/notInfo/spot.png" ></div>
            <div>{{$t('accountBank.text48')}}</div>
          </div>
          <div class="right">
            <div>{{userData.nickName}}</div>
            <div class="img-editor"><img src="../../../assets/images/money/editor.png" alt=""></div>
            <div class="img-right"><img src="../../../assets/images/notInfo/right.png" alt=""></div>
          </div>
        </div>
        <div class="img-line"></div>
        <div class="flex-item">
          <div class="spot-box">
            <div class="spot-img"><img src="../../../assets/images/notInfo/spot.png" ></div>
            <div>{{$t('accountBank.text39')}}</div>
          </div>
          <div class="right">{{userData.userName}}</div>
        </div>
        <div class="img-line"></div>
        <div class="item-box">
          <div>{{$t('accountBank.text41')}}</div>
          <div class="right">
            <div id="copyAddress_input3">{{userData.address}}</div>
            <div ref="addressCopy"  data-clipboard-action="copy" data-clipboard-target="#copyAddress_input3" class="img-copy" @click="copyAddress"><img src="../../../assets/images/money/copy.png" alt=""></div>
            <div class="img-qrcode" @click="showQrcode"><img src="../../../assets/images/money/qrcode.png" alt=""></div>
          </div>
        </div>
        <div class="item-address">
          <div class="address-box">
            <div class="spot-box">
              <div class="spot-img"><img src="../../../assets/images/notInfo/spot.png" ></div>
              <div>{{$t('accountBank.text41')}}</div>
            </div>
            <div class="right">
              <div ref="addressCopy2"  data-clipboard-action="copy" data-clipboard-target="#copyAddress_input4" class="img-copy" @click="copyAddress2"><img src="../../../assets/images/notInfo/u26.png" alt=""></div>
              <div class="img-qrcode" @click="showQrcode"><img src="../../../assets/images/notInfo/u24.png" alt=""></div>
            </div>
          </div>
          <div id="copyAddress_input4">{{userData.address}}</div>
        </div>
        <div class="img-line"></div>
        <div class="flex-item">
          <div class="spot-box">
            <div class="spot-img"><img src="../../../assets/images/notInfo/spot.png" ></div>
            <div>{{$t('accountBank.text49')}}</div>
          </div>
          <div class="right" v-if="userData.email">{{userData.email}}</div>
          <div class="right" v-else>-</div>
        </div>
        <div class="img-line"></div>
        <div class="flex-item cursor" @click="$router.push('/account/accountInformation/safePassword')">
          <div class="spot-box">
            <div class="spot-img"><img src="../../../assets/images/notInfo/spot.png" ></div>
            <div>{{$t('accountBank.text51')}}</div>
          </div>
          <div class="right">
            <div>{{openStatus(userData.openTradePassword)}}</div>
            <div class="img-editor"><img src="../../../assets/images/money/editor.png" alt=""></div>
            <div class="img-right"><img src="../../../assets/images/notInfo/right.png" alt=""></div>
          </div>
        </div>
        <div class="img-line"></div>
        <div class="flex-item cursor" @click="gogleInfo(userData.openGoogleCode)">
          <div class="spot-box">
            <div class="spot-img"><img src="../../../assets/images/notInfo/spot.png" ></div>
            <div>{{$t('accountBank.text24')}}</div>
          </div>
          <div class="right">
            <div>{{openStatus(userData.openGoogleCode)}}</div>
            <div class="img-editor"><img src="../../../assets/images/money/editor.png" alt=""></div>
            <div class="img-right"><img src="../../../assets/images/notInfo/right.png" alt=""></div>
          </div>
        </div>
        <div class="img-line"></div>
        <!-- 共享者-->
        <div class="flex-item cursor" @click="gotoShare()">
          <div class="spot-box">
            <div class="spot-img"><img src="../../../assets/images/notInfo/spot.png" ></div>
            <div>{{$t('shareDesc.text40')}}</div>
          </div>
          <div class="right">
            <div v-if="userData.isboss === 2">{{$t('shareDesc.text42')}}</div>
            <div v-else>{{$t('shareDesc.text41')}}</div>
            <div class="img-editor"><img src="../../../assets/images/money/editor.png" alt=""></div>
            <div class="img-right"><img src="../../../assets/images/notInfo/right.png" alt=""></div>
          </div>
        </div>
        <div class="img-line"></div>
      </div>
      <!--二维码-->
      <transition name="dialog">
        <div class="g-dialog" v-show="visible">
          <div class="g-dialog-mask"></div>
          <div class="g-dialog-wrap">
            <div class="dialog-c">
              <i class="g-dialog-close" @click="visible = false"></i>
              <div class="title-wrap">
                <div class="left-line line">
                  <img src="../../../assets/images/money/title-right.png" alt="">
                </div>
                <div class="g-dialog-title">{{$t('accountBank.text41')}}</div>
                <div class="right-line line">
                  <img src="../../../assets/images/money/title-right.png" alt="">
                </div>
              </div>
              <div class="textAlign code-content">
                <div id="qrcode2"></div>
              </div>
              <!--<div class="textAlign code-box">-->
                <!--<div id="qrcode3"></div>-->
              <!--</div>-->
              <div class="g-dialog-btn-wrap">
                <button class="g-dialog-btn g-dialog-ok" @click="visible = false">{{$t('accountBank.text28')}}</button>
              </div>
              <div class="btn"  @click="visible = false">
                <div class="con">{{$t('accountBank.text28')}}</div>
                <div class="cube l-top"></div>
                <div class="cube r-top"></div>
                <div class="cube r-bot"></div>
                <div class="cube l-bot"></div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <!-- 修改昵称 -->
      <transition name="dialog">
        <div class="g-dialog" v-show="visible2">
          <div class="g-dialog-mask"></div>
          <div class="g-dialog-wrap">
            <div class="dialog-c">
              <i class="g-dialog-close" @click="visible2 = false"></i>
              <div class="dialog-min">
                <div class="g-dialog-content textAlign">
                  <div class="input-box"><input class="input" type="text" :placeholder="$t('accountBank.text52')" v-model="modifyNick"></div>
                </div>
                <div class="g-dialog-btn-wrap">
                  <button class="g-dialog-btn g-dialog-ok" @click="comfimNick">{{$t('accountBank.text28')}}</button>
                </div>
                <div class="btn"  @click="comfimNick">
                  <div class="con">{{$t('accountBank.text28')}}</div>
                  <div class="cube l-top"></div>
                  <div class="cube r-top"></div>
                  <div class="cube r-bot"></div>
                  <div class="cube l-bot"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <!--谷歌安全弹窗-->
      <transition name="dialog">
        <div class="g-dialog" v-show="visible3">
          <div class="g-dialog-mask"></div>
          <div class="g-dialog-wrap">
            <div class="dialog-c">
              <i class="g-dialog-close" @click="visible3 = false"></i>
              <div class="dialog-min">
                <div class="g-dialog-content textAlign">
                  <div class="input-box"><input class="input" type="password" :placeholder="$t('accountBank.text4')" v-model="safeword"></div>
                </div>
                <div class="err-tip">{{errTip}}</div>
                <div class="g-dialog-btn-wrap">
                  <button class="g-dialog-btn g-dialog-ok" @click="openGogle">{{$t('accountBank.text28')}}</button>
                </div>
                <div class="btn"  @click="openGogle">
                  <div class="con">{{$t('accountBank.text28')}}</div>
                  <div class="cube l-top"></div>
                  <div class="cube r-top"></div>
                  <div class="cube r-bot"></div>
                  <div class="cube l-bot"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <mob-header>{{$t('navigation.text7')}}</mob-header>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import $ from 'jquery'
import '@/assets/js/jquery.qrcode.min'

export default {
  data () {
    return {
      userAvatar: '',
      errTip: '',
      safeword: '',
      modifyNick: '',
      copyBtn: null,
      copyBtn2: null,
      visible3: false,
      visible2: false,
      visible: false
    }
  },
  created () {
    this.$store.dispatch('getUserBalance')
    setTimeout(() => {
      this.userAvatar = this.userData.imgUrl
    }, 1000)
  },
  mounted () {
    setTimeout(() => {
      this.copyBtn = new this.Clipboard(this.$refs.addressCopy)
      this.copyBtn2 = new this.Clipboard(this.$refs.addressCopy2)
    }, 20)
  },
  methods: {
    gotoShare () {
      if (this.userData.isboss === 2) {
        // 共享者资料
        this.$router.push('/account/accountInformation/shareInfo')
      } else {
        // 成为共享者
        this.$router.push('/account/accountInformation/becomeShare')
      }
    },
    errImg () {
      this.userAvatar = require('../../../assets/images/my/avatar_big.png')
    },
    // 修改昵称
    comfimNick () {
      if (String(this.modifyNick).trim() !== '') {
        if (this.modifyNick === this.userData.nickName) {
          this.visible2 = false
        } else {
          this.$fetch.post(`${this.$api}/user/modifyUserInfo`, {
            nickname: this.modifyNick
          }).then(res => {
            this.visible2 = false
            if (res.data.success === true) {
              this.$store.dispatch('getUserBalance')
              this.$dialog({
                msg: this.$t('accountBank.text45')
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
    gogleInfo (code) {
      if (code === 2) {
        this.$router.push('/account/accountInformation/notBindGogle')
      } else {
        this.safeword = ''
        this.visible3 = true
      }
    },
    showNick () {
      this.visible2 = true
      this.modifyNick = this.userData.nickName
    },
    openGogle () {
      if (this.safeword === '') {
        this.errTip = this.$t('accountBank.text4')
        return false
      }
      if (this.safeword !== '') {
        this.$fetch.post(`${this.$api}/user/googleOpenClose`, {
          type: '1',
          tradePwd: this.safeword
        }).then(res => {
          if (res.data.success === true) {
            this.$router.push({
              path: '/account/accountInformation/openGogle',
              query: {
                qrUrl: res.data.data.qrUrl,
                secret: res.data.data.secret,
                setsafe: res.data.mapData.setsafe
              }
            })
          } else {
            this.visible3 = false
            this.$dialog({
              msg: res.data.msg
            })
          }
        })
      }
    },
    showQrcode (index) {
      $('#qrcode2').empty()
      let downloadUrl = this.$utf16to8(this.userData.address)
      $('#qrcode2').qrcode({
        render: 'canvas', //     table方式
        width: 200, //            宽度
        height: 200, //            高度
        text: downloadUrl //      任意内容
      })
      this.visible = true
    },
    copyAddress () {
      let clipboard = this.copyBtn
      clipboard.on('success', () => {
        this.$dialog({
          msg: this.$t('accountBank.text18')
        })
        clipboard.destroy()
        this.copyBtn = new this.Clipboard(this.$refs.addressCopy) // 复制
      })
    },
    copyAddress2 () {
      let clipboard = this.copyBtn2
      clipboard.on('success', () => {
        this.$dialog({
          msg: this.$t('accountBank.text18')
        })
        clipboard.destroy()
        this.copyBtn2 = new this.Clipboard(this.$refs.addressCopy2) // 复制
      })
    },
    openStatus (status) {
      if (status === 1) {
        return this.$t('accountBank.text53')
      }
      if (status === 2) {
        return this.$t('accountBank.text54')
      }
      if (status === 3) {
        return this.$t('accountBank.text55')
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
.assets-wrapper{
  .avatar{
    color: @7693fc;
    // font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 30px;
    border-bottom: 1px solid @3b3131;
    height: 130px;
    @media screen and (max-width: 1200px) {
      display: none;
    }
    .img-box{
      width: 100px;
      height: 100px;
      background-color: #242C53;
      border-radius: 50%;
      position: relative;
      @media screen and (max-width: 1200px) {
        width: 121px;
        height: 122px;
        background: url("../../../assets/images/notInfo/box.png");
        background-size: 100% 100%;
        background-position: center;
      }
      #upload_file{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
      }
    }
  }
  .avatar-box{
    color: @7693fc;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 30px;
    height: 130px;
    @media screen and (max-width: 1200px) {
      display: flex;
      padding-bottom: 20px;
      height: auto;
    }
    @media screen and (min-width: 1200px) {
      display: none;
    }
    .img-box{
      width: 100px;
      height: 100px;
      background-color: #242C53;
      border-radius: 50%;
      cursor: pointer;
      position: relative;
      @media screen and (max-width: 1200px) {
        padding: 5px 5px;
        border-radius: inherit;
        width: 60px;
        height: 60px;
        background: url("../../../assets/images/notInfo/box.png");
        background-size: 100% 100%;
        background-position: center;
      }
      #upload_file{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
      }
    }
  }
  .flex-item{
    color: @7693fc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid @3b3131;
    height: 80px;
    @media screen and (max-width: 1200px) {
      border-bottom: none;
      font-size: 14px;
    }
    .right{
      display: flex;
      align-items: center;
      font-size: 14px;
      color: @e7ac50;
      .img-editor{
        width: 17px;
        height: 21px;
        margin-left: 20px;
        cursor: pointer;
        @media screen and (max-width: 1200px) {
          display: none;
        }
      }
      .img-right{
        width: 10px;
        height: 17px;
        margin-left: 10px;
        cursor: pointer;
        @media screen and (max-width: 1200px) {
          display: block;
        }
        @media screen and (min-width: 1200px) {
          display: none;
        }
      }
      .img-copy{
        width: 20px;
        height: 22px;
        margin: 0 20px;
        cursor: pointer;
      }
      .img-qrcode{
        width: 22px;
        height: 22px;
        cursor: pointer;
      }
    }
  }
  #qrcode2{
    width: 220px;
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    @media screen and (max-width: 1200px) {
      width: 205px;
      height: 205px;
    }
  }
  @btnColor: #7693fc;
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
      width: 1000px;
      transform: translate(-50%,-50%);
      left: 50%;
      top: 50%;
      padding: 100px 80px;
      text-align: center;
      box-shadow: 0 1px 30px rgba(0,0,0,.3);
      background: #101229;
      @media screen and (max-width:1200px) {
        width: 90%;
        padding: 50px 40px;
      }
      border: 1px solid #f9b72b;
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
        background: url(../../../assets/images/common/border_bg_left.png) no-repeat,
        url(../../../assets/images/common/border_bg_center.png) no-repeat center 0,
        url(../../../assets/images/common/border_bg_right.png) no-repeat right 0;
      }
      & > * {
        position: relative;
        z-index: 2;
      }
    }
    &-close{
      position: absolute;
      right: 24px;
      top: 24px;
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
      font-size: 28px;
      line-height: 1;
      font-weight: bold;
      margin: 0 30px;
      padding: 0;
      letter-spacing: 20px;
      background: -webkit-linear-gradient(90deg, #af8975 , #f0b149);     // 背景色渐变
      -webkit-background-clip: text;         // 规定背景的划分区域
      -webkit-text-fill-color: transparent;
      @media screen and (max-width:1200px) {
        font-size: 12px;
        margin: 0 5px;
        letter-spacing: 0;
      }
    }
    &-content{
      font-size: 24px;
      color: #f75050;
      text-align: center;
      display: flex;
      justify-content: center;
    }
    &-btn-wrap{
      padding-top: 60px;
      text-align: center;
      display: flex;
      justify-content: space-between;
      @media screen and (max-width:1200px) {
        padding-top: 20px;
        display: none;
      }
    }
    &-btn{
      display: inline-block;
      height: 48px;
      border: none;
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
    .input-button{
      position: relative;
      padding: 0;
      margin-top: 100px;
      height: 70px;
      cursor: pointer;
      .button1{
        position: absolute;
        height: 45px;
        width: 100%;
        left: 0;
        top: 14px;
        background-color: #B4802F;
      }
      .button2{
        width: 455px;
        height: 70px;
        position: absolute;
        top: 0;
        left: 14px;
        background-color: #B4802F;
      }
      .button3{
        width: 470px;
        height: 56px;
        position: absolute;
        border: 1px solid #fff;
        top: 7px;
        left: 7px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .input-box{
      width: 484px;
      height: 70px;
      background: url("../../../assets/images/money/input.png") no-repeat;
      @media screen and (max-width:1200px) {
        margin-top: 20px;
        margin-bottom: 20px;
        height: 50px;
      }
      .input{
        color: #fff;
        width: 100%;
        height: 100%;
        border: none;
      }
    }
    .g-dialog-wrap{
      /*position: relative;*/
      padding: 0;
      .dialog-bg{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
      .dialog-c{
        position: relative;
        z-index: 1;
        padding: 100px 80px;
        @media screen and (max-width:1200px) {
          padding: 40px 20px 20px;
        }
      }
      .dialog-min{
        width: 484px;
        margin: 0 auto;
        @media screen and (max-width:1200px) {
          width: 100%;
        }
      }
      .title-wrap{
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 50px;
        @media screen and (max-width:1200px) {
          padding-bottom: 20px;
        }
        .line{
          width: 250px;
          height: 16px;
          @media screen and (max-width:1200px) {
            width: 37%;
          }
        }
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
.mobile-account {
  @media screen and (max-width: 1200px) {
    display: block;
  }
  @media screen and (min-width: 1200px) {
    display: none;
  }
}
.item-box{
  color: @7693fc;
  // font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid @3b3131;
  height: 80px;
  .right{
    display: flex;
    align-items: center;
    font-size: 18px;
    color: @e7ac50;
    .img-editor{
      width: 17px;
      height: 21px;
      margin-left: 20px;
      cursor: pointer;
    }
    .img-copy{
      width: 20px;
      height: 22px;
      margin: 0 20px;
      cursor: pointer;
    }
    .img-qrcode{
      width: 22px;
      height: 22px;
      cursor: pointer;
    }
  }
  @media screen and (max-width: 1200px) {
    display: none;
  }
}
.item-address{
  color: @7693fc;
  font-size: 14px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-bottom: 1px solid @3b3131;
  height: 80px;
  @media screen and (max-width: 1200px) {
    border-bottom: none;
  }
  .address-box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .right{
      display: flex;
      align-items: center;
      font-size: 18px;
      color: @e7ac50;
      .img-editor{
        width: 17px;
        height: 21px;
        margin-left: 20px;
        cursor: pointer;
      }
      .img-copy{
        width: 20px;
        height: 22px;
        margin: 0 20px;
        cursor: pointer;
      }
      .img-qrcode{
        width: 22px;
        height: 22px;
        cursor: pointer;
      }
    }
  }
  @media screen and (max-width: 1200px) {
    display: flex;
  }
  @media screen and (min-width: 1200px) {
    display: none;
  }
}
.img-line{
  width: 100%;
  height: 16px;
  background: url("../../../assets/images/notInfo/bottom-line.png");
  background-size: 100% 100%;
  background-position: center;
  @media screen and (max-width: 1200px) {
    display: flex;
  }
  @media screen and (min-width: 1200px) {
    display: none;
  }
}
.spot-box{
  display: flex;
  align-items: center;
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
.code-content{
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1200px) {
    margin-bottom: 20px;
  }
}
.code-box{
  font-size: 24px;
  color: #f75050;
  text-align: center;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 1200px) {
    display: block;
  }
  @media screen and (min-width: 1200px) {
    display: none;
  }
}
.err-tip{
  margin-bottom: 20px;
  color: #f75050;
}
</style>
