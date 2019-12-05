<template>
  <transition name="dialog">
    <div class="g-dialog" v-if="visible">
      <div class="g-dialog-mask"></div>
        <div class="g-dialog-wrap border-bg">
          <i class="g-dialog-close" @click="cancelCallback"></i>
          <div class="g-dialog-title" v-show="title" v-html="title"></div>
          <div class="g-dialog-content" :style="{textAlign: align}" v-html="msg"></div>
          <div class="g-dialog-btn-wrap">
            <button v-if="type !== 'alert'" class="g-dialog-btn g-dialog-cancel" @click="cancelCallback">{{cancelText}}</button>
            <button class="g-dialog-btn g-dialog-ok" @click="okCallback">{{okText}}</button>
          </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  props: {
    type: String,
    title: String,
    msg: String,
    okFn: Function,
    okText: String,
    cancelFn: Function,
    cancelText: String,
    align: String
  },
  methods: {
    okCallback () {
      this.visible = false
      this.okFn && this.okFn()
    },
    cancelCallback () {
      this.visible = false
      this.cancelFn && this.cancelFn()
    }
  }
}
</script>

<style lang="less">
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
    display: flex;
    justify-content: center;
    align-items: center;
    &-mask{
      .full();
      position: absolute;
      background: rgba(0,0,0,.7);
    }
    .g-dialog-wrap{
      position: relative;
      width: 600px;
      padding: 100px 80px;
      text-align: center;
      box-shadow: 0 1px 30px rgba(0,0,0,.3);
      background: #101229;
      @media screen and (max-width:1200px) {
        width: 90%;
        padding: 50px 40px;
      }
    }
    .g-dialog-close{
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
      font-size: 32px;
      line-height: 1;
      padding-bottom: 50px;
      color: #7693fc;
    }
    &-content{
      font-size: 24px;
      color: #f9b72b;
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
    @media screen and (max-width:1200px) {
      &-ok{
        background: url(~@img/common/btn_bg.png) no-repeat !important;
        background-size: 100% 100% !important;
        border: none !important;
      }
      &-cancel{
        background: url(~@img/common/btn_bg_red.png) no-repeat !important;
        background-size: 100% 100% !important;
        border: none !important;
        color: #fff;
      }
    }
  }
  .dialog-enter,.dialog-leave-to{
    opacity: 0;
    .g-dialog-wrap{
      transform: translate(0, -5%)
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
</style>
