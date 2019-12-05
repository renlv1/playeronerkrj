<template>
  <div>
    <transition name="dialog">
      <div class="g-dialog" v-show="visible">
        <div class="g-dialog-mask"></div>
        <div class="g-dialog-wrap border-bg">
          <!-- <div class="dialog-bg">
            <img src="../../assets/images/money/dialog.png" alt="">
          </div> -->
          <div class="dialog-c">
            <i class="g-dialog-close"></i>
            <div class="title-wrap">
              <div class="left-line line">
                <img src="../../assets/images/money/title-right.png" alt="">
              </div>
              <div class="g-dialog-title">{{$t('nofoMation.text1')}}</div>
              <div class="right-line line">
                <img src="../../assets/images/money/title-right.png" alt="">
              </div>
            </div>
            <div class="dialog-min">
              <div class="g-dialog-btn-wrap input-button" @click="setting()">
                <div class="button1"></div>
                <div class="button2"></div>
                <div class="button3">{{$t('nofoMation.text2')}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      visible: false
    }
  },
  methods: {
    show () {
      this.visible = true
    },
    setting () {
      this.$router.push('/infoMation')
    }
  }
}
</script>

<style lang="less" scoped>
  @btnColor: #7693fc;
  img{
    display: block;
    width: 100%;
    height: 100%;
  }
  .full () {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .g-dialog{
    .full();
    font-family: titleChi;
    position: fixed;
    color: #333333;
    z-index: 999999;
    &-mask{
      .full();
      position: absolute;
      background: rgba(0,0,0,.5);
    }
    div.g-dialog-wrap{
      position: absolute;
      width: 1320px;
      transform: translate(-50%,-50%);
      left: 50%;
      top: 50%;
      padding: 100px 80px;
      text-align: center;
      background-color: transparent;
      @media screen and (max-width:1200px) {
        width: 90%;
        padding: 50px 40px;
      }
    }
    &-close{
      position: absolute;
      right: 100px;
      top: 0;
      width: 100px;
      height: 100px;
      &:before,&:after{
        display: none;
      }
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
      height: 70px;
      cursor: pointer;
      width: 100%;
      margin-right: 19px;
      @media screen and (max-width: 750px){
        height: 50px;
      }
      &:last-child{
        margin-right: 0;
      }
      .button1{
        position: absolute;
        height: 45px;
        width: 100%;
        left: 0;
        top: 14px;
        background: linear-gradient(#f2ac3a, #8c6231);
        @media screen and (max-width: 750px){
          width: 100%;
          height: 35px;
          top: 10px;
        }
      }
      .button2{
        width: 449px;
        height: 70px;
        position: absolute;
        top: 0;
        left: 14px;
        background: linear-gradient(#f2ac3a, #8c6231);
        @media screen and (max-width: 750px){
          width: 87%;
          height: 56px;
          left: 12px;
        }
      }
      .button3{
        font-size: 24px;
        width: 466px;
        height: 56px;
        position: absolute;
        border: 1px solid #fff;
        top: 7px;
        left: 7px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: titleChi;
        @media screen and (max-width: 750px){
          width: 94%;
          height: 46px;
          top: 5px;
          left: 5px;
          font-size: 21px;
        }
      }
    }
    .g-dialog-wrap{
      position: relative;
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
        padding: 180px 0;
        @media screen and (max-width: 1024px){
          padding: 100px 0;
        }
        @media screen and (max-width: 750px){
          padding: 20px 0;
        }
        .g-dialog-title{
          @media screen and (max-width: 1024px){
            width: 100%;
            margin:  0 auto;
            font-size: 22px;
          }
        }
      }
      .dialog-min{
        width: 484px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        @media screen and (max-width: 750px){
          width: 206px;
        }
      }
      .title-wrap{
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 154px;
        @media screen and (max-width: 1024px){
          display: block;
        }
        @media screen and (max-width: 750px){
          padding-bottom: 80px;
        }
        .line{
          width: 250px;
          height: 16px;
          @media screen and (max-width: 1024px){
            margin: auto;
          }
          @media screen and (max-width: 750px){
            width: 100%;
          }
        }
        .g-dialog-title{
          padding: 50px 0;
          @media screen and (max-width: 750px){
            padding: 20px 0;
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
</style>
