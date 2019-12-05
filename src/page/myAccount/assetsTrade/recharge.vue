<template>
  <div class="page">
    <div class="account-tit">{{$t('navigation.text2')}}</div>
    <mob-header>{{$t('navigation.text2')}}</mob-header>
    <div class="assets-trade">
      <!-- <div class="select">
        <p>{{$t('recharge.text1')}}</p>
        <el-select v-model="currency" @change="renderQrcode">
          <el-option
            v-for="val in userAccount"
            :key="val.currency"
            :value="val.currency">
          </el-option>
        </el-select>
      </div> -->
      <div class="address border-bg">
        <div>
          <h3><div class="text">{{$t('recharge.text2')}}</div></h3>
          <div class="tips">
            <p>{{$t('recharge.text3')}}</p>
            <p class="warn">{{$t('recharge.text4')}}</p>
          </div>
          <div class="qr-code">
            <div id="qrCodeBox" class="qr-box"></div>
            <p>（{{$t('recharge.text9')}}）</p>
          </div>
          <div v-if="userAccount[currency]">
            <div class="address-text">{{userAccount[currency].depositAddress}}</div>
            <button class="btn" ref="copy" :data-clipboard-text="userAccount[currency].depositAddress">{{$t('recharge.text5')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import $ from 'jquery'
import '@/assets/js/jquery.qrcode.min'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      currency: 'RPO',
      clipboard: null
    }
  },
  computed: {
    ...mapGetters([
      'userData',
      'userAccount'
    ])
  },
  methods: {
    ...mapActions([
      'getUserBalance'
    ]),
    // 绘制二维码
    renderQrcode () {
      let downloadUrl = this.$utf16to8(`{"company":"SocialWallet","id":"${this.userAccount[this.currency].depositAddress}","type":"3"}`);
      let size = window.innerWidth > 1200 ? 210 : 140;
      $('#qrCodeBox').html('').qrcode({
        render: 'canvas', // table方式
        width: size, // 宽度
        height: size, // 高度
        text: downloadUrl // 任意内容
      })
    },
    init () {
      if (this.userAccount[this.currency]) {
        this.renderQrcode();
        this.initClipboard()
      } else {
        this.$fetch.post('/user/balance').then(res => {
          this.renderQrcode();
          this.initClipboard()
        })
      }
    },
    initClipboard () {
      this.clipboard = new this.Clipboard(this.$refs.copy);
      this.clipboard.on('success', e => {
        this.$dialog({
          msg: this.$t('recharge.text6')
        })
      });
      this.clipboard.on('error', e => {
        this.$dialog({
          msg: this.$t('recharge.text7')
        })
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  destroyed () {
    this.clipboard.destroy()
  }
}
</script>

<style lang="less" scoped>
  @import (reference) '~@/assets/css/mixin';
  .address{
    margin-top: 40px;
    text-align: center;
    padding-bottom: 50px;
    width: 800px;
    h3{
      font-size: 24px;
      padding: 40px 0 26px;
      color: @yellow;
      @media @mob{
        .page .mob-title;
      }
    }
    .warn{
      padding-top: 12px;
      color: #eb1c4c;
    }
    .qr-code{
      padding: 40px 0;
      p{
        padding-top: 10px;
      }
    }
    &-text{
      font-size: 20px;
      font-weight: bold;
      color: @yellow;
      word-wrap: break-word;
      word-break: break-all;
    }
    @media @mob{
      width: 100%;
      padding: 0 3% 50px;
      border: none;
      line-height: 1.5;
      font-size: 14px;
      &:before,&:after{
        display: none;
      }
      h3{
        padding: 0;
      }
      #qrCodeBox{
        border-width: 4px;
      }
      .qr-code{
        padding: 25px 0;
      }
      .qr-box{
        font-size: 0;
      }
      &-text{
        font-size: 16px;
        font-weight: normal;
      }
      // .btn{
      //   position: fixed;
      //   bottom: 0;
      //   width: 100%;
      //   border-radius: 0;
      //   left: 0;
      //   margin-top: 0;
      //   height: 48px;
      // }
    }
  }
  .select{
    p{
      padding-bottom: 20px;
    }
  }
  .qr-box{
    display: inline-block;
    border: 20px solid #fff;
    box-shadow: 0 0 20px rgba(8,16,220,.15)
  }
  .page .btn{
    margin-top: 30px;
    width: 160px;
    border-radius: 20px;
    height: 40px;
    line-height: 40px;
    @media @mob{
      border-radius: 0;
    }
  }
</style>
