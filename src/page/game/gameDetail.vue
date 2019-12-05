<template>
  <div>
    <div class="game">
      <!-- <div class="banner">
        <h3></h3>
        <p>{{$t('game.text1')}}</p>
      </div> -->
      <div class="swiper-content">
        <div class="swiper">
          <div class="swiper-custom">
            <!--  轮播图  -->
            <swiper :options="swiperOption" ref="swiperOne" @mouseenter.native="stop()"  @mouseleave.native="start()">
              <swiper-slide>
                <div class="bg bg1"></div>
                <div class="swiper-text">
                  <h3>{{$t('game.text2')}}</h3>
                  <p>{{$t('game.text3')}}</p>
                </div>
                <div class="list-menu">
                  <ul>
                    <li>
                      <h3>{{$t('game.text4')}}</h3>
                      <p>{{$t('game.text5')}}</p>
                    </li>
                    <li>
                      <h3>{{$t('game.text6')}}</h3>
                      <p>{{$t('game.text7')}}</p>
                    </li>
                    <li>
                      <h3>{{$t('game.text8')}}</h3>
                      <p>{{$t('game.text9')}}</p>
                    </li>
                  </ul>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="bg bg2"></div>
                <div class="swiper-text">
                  <h3>{{$t('game.text10')}}</h3>
                  <p>{{$t('game.text11')}}</p>
                  <router-link class="link" :to="loginFlag ? '/' : '/login'">{{$t('game.text12')}}</router-link>
                </div>
                <div class="list-menu">
                  <ul>
                    <li>
                      <h3>{{$t('game.text13')}}</h3>
                    </li>
                    <li>
                      <h3>{{$t('game.text14')}}</h3>
                    </li>
                    <li>
                      <h3>{{$t('game.text15')}}</h3>
                    </li>
                    <li>
                      <h3>{{$t('game.text16')}}</h3>
                    </li>
                  </ul>
                </div>
              </swiper-slide>
            </swiper>
          </div>
          <div class="swiper-pagination"></div>
          <div class="swiper-custom-next swiper-btn"></div>
          <div class="swiper-custom-prev swiper-btn"></div>
        </div>
      </div>
      <div class="hot-img">
        <div class="custom-font">{{$t('game.text17')}}</div>
        <p>{{$t('game.text18')}}</p>
        <div class="intro">
          <div class="intro-wrap">
            <h3>{{$t('game.text37')}}</h3>
            <h4>{{$t('game.text38')}}</h4>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="h-wrap">
          <div class="list-item l1">
            <div class="title"></div>
            <ul>
              <li>
                <div class="img">
                  <img src="~@img/game/img-3.png" alt="">
                </div>
                <p>{{$t('game.text19')}}</p>
              </li>
              <li>
                <div class="img">
                  <img src="~@img/game/img-4.png" alt="">
                </div>
                <p>{{$t('game.text20')}}</p>
              </li>
              <li>
                <div class="img">
                  <img src="~@img/game/img-5.png" alt="">
                </div>
                <p>{{$t('game.text21')}}</p>
              </li>
            </ul>
          </div>
          <div class="list-item l2">
            <div class="title">
              <div class="title-text">
                <div class="icon">{{$t('game.text22')}}</div>
              </div>
            </div>
            <div class="img-wrap">
              <h3>{{$t('game.text23')}}</h3>
              <p>{{$t('game.text24')}}</p>
            </div>
          </div>
        </div>
        <div class="list-item l3">
            <div class="title">
              <div class="title-text">
                <div class="icon">{{$t('game.text25')}}</div>
              </div>
            </div>
            <ul>
              <li>
                <div class="img">
                  <img src="~@img/game/img-9.png" alt="">
                </div>
                <div class="tit">{{$t('game.text26')}}</div>
                <div class="content">
                  <div class="text">
                    <h4>{{$t('game.text26')}}</h4>
                    <p>{{$t('game.text27')}}</p>
                  </div>
                </div>
              </li>
              <li>
                <div class="img">
                  <img src="~@img/game/img-10.png" alt="">
                </div>
                <div class="tit">{{$t('game.text28')}}</div>
                <div class="content">
                  <div class="text">
                    <h4>{{$t('game.text28')}}</h4>
                    <p>{{$t('game.text29')}}</p>
                  </div>
                </div>
              </li>
              <li>
                <div class="img">
                  <img src="~@img/game/img-11.png" alt="">
                </div>
                <div class="tit">{{$t('game.text30')}}</div>
                <div class="content">
                  <div class="text">
                    <h4>{{$t('game.text30')}}</h4>
                    <p>{{$t('game.text31')}}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
      </div>
      <div class="end">
        <div class="end-wrap">
          <h3>{{$t('game.text32')}}</h3>
          <p>{{$t('game.text33')}}</p>
          <div class="links">
            <a>{{$t('game.text34')}}</a>
            <a>{{$t('game.text35')}}</a>
            <a>{{$t('game.text36')}}</a>
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
      swiperOption: {
        notNextTick: true,
        autoplay: 0,
        loop: true,
        setWrapperSize: true,
        observeParents: true,
        autoplayDisableOnInteraction: false, // 用户操作swiper之后，是否禁止autoplay
        paginationClickable: true,
        prevButton: '.swiper-custom-prev',
        nextButton: '.swiper-custom-next'
      }
    }
  },
  computed: {
    ...mapGetters([
      'loginFlag'
    ])
  },
  methods: {
    stop () {
      this.$refs.swiperOne.swiper.stopAutoplay()
    },
    start () {
      this.$refs.swiperOne.swiper.startAutoplay()
    }
  }
}
</script>

<style lang="less" scoped>
  .game{
    background: #0a0a0c;
    text-align: center;
    color: #c4b998;
    padding-top: 100px;
    img{
      vertical-align: top;
    }
    .custom-font{
      line-height: 1;
      font-size: 48px;
      margin-bottom: 36px;
    }
    .banner{
      background: url(~@img/game/banner.png) no-repeat center 0;
      height: 700px;
      padding-top: 404px;
      .en &{
        padding-top: 340px;
      }
      h3{
        background: url(~@img/game/banner_text.png) no-repeat center 0;
        height: 72px;
        margin-bottom: 40px;
        .en &{
          background: url(~@img/game/banner_text_en.png) no-repeat center 0;
          height: 163px;
        }
      }
    }
    .swiper-content{
      padding-bottom: 180px;
    }
    .swiper{
      position: relative;
      margin: 0 auto;
      width: 1118px;
      height: 927px;
      padding-top: 220px;
      background: url(~@img/game/swiper_bg.png) no-repeat center 0;
      .swiper-custom{
        width: 1000px;
        margin: 0 auto;
        overflow: hidden;
        height: 624px;
      }
      .bg{
        height: 546px;
        background-size: cover;
      }
      .bg1{
        background:url(~@img/game/swiper1.png) no-repeat;
      }
      .bg2{
        background:url(~@img/game/swiper2.png) no-repeat;
      }
      /deep/ .swiper-slide{
        padding-bottom: 80px;
      }
      &-text{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 80px;
        padding: 200px 140px 0;
        h3{
          font-size: 24px;
          font-family: titleChi;
          margin-bottom: 24px;
          background: -webkit-linear-gradient(top, #fecd86, #fbb620);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-transform: none;
          text-shadow: 0 0 10px rgba(250, 181, 42, 0.2);
        }
        p{
          color: #ffffff;
          font-size: 14px;
          line-height: 2.2;
        }
        .link{
          width: 363px;
          line-height: 46px;
          background: #0a0a0c;
          text-align: center;
          border: 1px solid #957b39;
          font-size: 14px;
          color: #937341;
          margin-top: 60px;
          display: inline-block;
        }
      }
      &-bg{
        height: 546px;
      }
      &-btn{
        position: absolute;
        bottom: 400px;
        width: 52px;
        height: 52px;
        cursor: pointer;
      }
      &-custom-prev{
        left: -23px;
        background: url(~@img/game/swiper_left.png);
      }
      &-custom-next{
        right: -23px;
        background: url(~@img/game/swiper_right.png);
      }
      .list-menu{
        position: absolute;
        width: 900px;
        left: 50%;
        margin-left: -450px;
        bottom: 2px;
        border: 1px solid #342b20;
        background: #0a0a0c;
        padding: 20px;
        z-index: 2;
        &:before{
          content: '';
          position: absolute;
          height: 1px;
          width: 100%;
          background: #342b20;
          top: 50%;
          left: 0;
        }
        ul{
          position: relative;
          display: flex;
          border: 1px solid #c4b998;
          background: #0a0a0c;
        }
        li{
          flex: 1;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          color: #c4b998;
          height: 88px;
          font-family: titleChi;
          & + li{
            border-left: 1px solid #c4b998;
          }
          h3{
            font-size: 24px;
          }
          p{
            margin-top: 10px;
          }
        }
      }
    }
    .hot-img{
      background: url(~@img/game/hot_bg.png) no-repeat center 0;
      height: 580px;
      padding-top: 210px;
      font-size: 14px;
      border-top: 1px solid #937341;
      border-bottom: 1px solid #937341;
      position: relative;
      margin-bottom: 220px;
      .intro{
        position: absolute;
        width: 1320px;
        font-family: titleChi;
        border: 1px solid #937341;
        color: #c4b998;
        padding: 15px 27px;
        background: #0a0a0c;
        left: 50%;
        bottom: -88px;
        margin-left: -660px;
        &:before,&:after{
          content: '';
          position: absolute;
          width: 12px;
          height: 118px;
          top: 50%;
          margin-top: -60px;
          border: 1px solid #c4b998;
        }
        &:before{
          left: 14px;
          border-right-color: #0a0a0c;
        }
        &:after{
          right: 14px;
          border-left-color: #0a0a0c;
        }
        &-wrap{
          border: 1px solid #c4b998;
          text-align: center;
          padding: 30px 220px;
        }
        h3{
          font-size: 34px;
          margin-bottom: 16px;
        }
        h4{
          font-size: 16px;
        }
      }
    }
    .list{
      .h-wrap{
        width: 1200px;
        margin: 0 auto;
      }
      .title{
        margin: 120px 0 88px;
      }
      .title-text{
        display: inline-block;
        padding: 0 455px;
        background: url(~@img/game/tit_left.png) no-repeat left 33px,
                    url(~@img/game/tit_right.png) no-repeat right 33px;
      }
      .l1{
        .title{
          background: url(~@img/game/t1.png) no-repeat center 0;
          height: 50px;
        }
        ul{
          display: flex;
          justify-content: center;
        }
        li{
          width: 300px;
          margin: 0 22px;
        }
        p{
          border: 2px solid #937341;
          border-top: none;
          font-size: 18px;
          height: 64px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .l2{
        .icon{
          background: url(~@img/game/tit1.png) no-repeat center top;
          padding-top: 30px;
          color: #806439;
          font-size: 14px;
        }
        .img-wrap{
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          background: url(~@img/game/img-7.png);
          height: 560px;
          font-size: 14px;
        }
        h3{
          font-size: 28px;
          font-family: titleChi;
          margin-bottom: 30px;
        }
      }
      .l3{
        padding-bottom: 220px;
        .icon{
          background: url(~@img/game/tit2.png) no-repeat center top;
          padding-top: 30px;
          color: #806439;
          font-size: 14px;
        }
        ul{
          display: flex;
          justify-content: center;
        }
        li{
          width: 350px;
          margin: 0 20px;
          position: relative;
          overflow: hidden;
          &:hover{
            .content{
              opacity: 1;
              transform: scale(1);
            }
            .tit{
              display: none;
            }
          }
        }
        .tit{
          font-family: titleChi;
          font-size: 28px;
          color: #ffcf83;
          position: absolute;
          width: 100%;
          bottom: 50px;
          line-height: 1;
        }
        .content{
          background:rgba(0,0,0,.4);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          transform: scale(.3);
          opacity: 0;
          transition: .5s;
        }
        .text{
          position: absolute;
          left: 30px;
          right: 30px;
          top: 30px;
          bottom: 30px;
          border: 2px solid #7b6139;
          padding: 0 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          background: #0d0d0e;
          background:rgba(0,0,0,.4);
          h4{
            margin-bottom: 20px;
            font-size: 28px;
          }
          p{
            font-size: 14px;
            line-height: 1.6;
            max-width: 100%;
          }
        }
      }
    }
    .end{
      background: url(~@img/game/img-12.png) no-repeat center 0;
      height: 680px;
      padding-top: 260px;
      font-size: 14px;
      border-bottom: 1px solid #937341;
      color: #ffffff;
      &-wrap{
        width: 860px;
        margin: 0 auto;
      }
      h3{
        font-size: 24px;
        font-family: titleChi;
        margin-bottom: 30px;
        background: -webkit-linear-gradient(top, #fecd86, #fbb620);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-transform: none;
        text-shadow: 0 0 10px rgba(250, 181, 42, 0.2);
      }
      p{
        line-height: 2;
      }
      .links{
        padding-top: 90px;
        display: flex;
        justify-content: center;

        a{
          width: 300px;
          color: #ffcf83;
        }
      }
    }
    @media screen and (max-width:1200px){
      padding-top: 50px;
      .custom-font{
        line-height: 1;
        font-size: 48px;
        margin-bottom: 36px;
      }
      .banner{
        height: 450px;
        padding-top: 194px;
        background-size: cover;
        h3{
          background-size: 90%;
          height: 23px;
          margin-bottom: 10px;
          .en &{
            background-size: 90%;
            height: 50px;
            margin-bottom: 0;
          }
        }
        p{
          font-size: 11px;
          padding: 0 10px;
        }
        .en &{
          padding-top: 190px;
        }

      }
      .swiper-content{
        padding-bottom: 40px;
      }
      .swiper{
        position: relative;
        margin: 0 auto;
        width: 90%;
        height: 427px;
        padding-top: 30px;
        background: url(~@img/game/swiper_bg.png) no-repeat center 0;
        .swiper-custom{
          width: 100%;
          margin: 0 auto;
          overflow: hidden;
          height: 624px;
          padding: 30px 0;
          img{
            width: 100%;
          }
        }
        .bg{
          height: 260px;
        }
        /deep/ .swiper-slide{
          padding-bottom: 80px;
        }
        &-text{
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          padding: 0 10px;
          width: 100%;
          height: 260px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          h3{
            font-size: 20px;
            font-family: titleChi;
            margin-bottom: 14px;
            background: -webkit-linear-gradient(top, #fecd86, #fbb620);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-transform: none;
            text-shadow: 0 0 10px rgba(250, 181, 42, 0.2);
          }
          p{
            color: #ffffff;
            font-size: 12px;
            line-height: 1.6;
            padding: 0 10px;
          }
          .link{
            width: 80%;
            padding: 10px 6px;
            line-height: 1.2;
            background: #0a0a0c;
            text-align: center;
            border: 1px solid #957b39;
            font-size: 14px;
            color: #937341;
            margin-top: 20px;
            display: inline-block;
          }
        }
        &-bg{
          height: 546px;
        }
        &-btn{
          position: absolute;
          bottom: 210px;
          width: 36px;
          height: 36px;
          cursor: pointer;
          z-index: 33;
          background-size: 100% !important;
        }
        &-custom-prev{
          left: -15px;
          background: url(~@img/game/swiper_left.png);
        }
        &-custom-next{
          right: -15px;
          background: url(~@img/game/swiper_right.png);
        }
        .list-menu{
          position: static;
          width: 100%;
          left: 0;
          margin-left: 0;
          bottom: 2px;
          border: 1px solid #342b20;
          background: #0a0a0c;
          padding: 0;
          z-index: 2;
          margin-top: 20px;
          &:before{
            display: none;
            content: '';
            position: absolute;
            height: 1px;
            width: 100%;
            background: #342b20;
            top: 50%;
            left: 0;
          }
          ul{
            position: relative;
            display: flex;
            border: 1px solid #c4b998;
            background: #0a0a0c;
          }
          li{
            flex: 1;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            color: #c4b998;
            min-height: 76px;
            font-family: titleChi;
            padding: 5px 2px;
            height: auto;
            & + li{
              border-left: 1px solid #c4b998;
            }
            h3{
              font-size: 16px;
            }
            p{
              margin-top: 10px;
              font-size: 13px;
            }
          }
        }
      }
      .hot-img{
        background-size:cover;
        height: 300px;
        padding-top: 80px;
        font-size: 14px;
        border-top: 1px solid #937341;
        border-bottom: 1px solid #937341;
        margin-bottom: 120px;
        .custom-font{
          font-size: 26px;
          margin-bottom: 10px;
          text-transform: none;
        }
        .intro{
          position: absolute;
          width: 94%;
          font-family: titleChi;
          border: 1px solid #937341;
          color: #c4b998;
          padding: 15px 27px;
          background: #0a0a0c;
          left: 0;
          top: 200px;
          bottom: auto;
          margin-left: 3%;
          &:before,&:after{
            content: '';
            position: absolute;
            width: 12px;
            height: 118px;
            top: 50%;
            margin-top: -60px;
            border: 1px solid #c4b998;
          }
          &:before{
            left: 14px;
            border-right-color: #0a0a0c;
          }
          &:after{
            right: 14px;
            border-left-color: #0a0a0c;
          }
          &-wrap{
            border: 1px solid #c4b998;
            text-align: center;
            padding: 15px 10px;
          }
          h3{
            font-size: 24px;
            margin-bottom: 16px;
          }
          h4{
            font-size: 13px;
          }
        }
      }
      .list{
        .h-wrap{
          width: 100%;
          margin: 0 auto;
        }
        .title{
          margin: 80px 0 40px;
        }
        .title-text{
          display: block;
          padding: 0 100px;
          background: url(~@img/game/tit_left.png) no-repeat left 20px,
                      url(~@img/game/tit_right.png) no-repeat right 20px;
          background-size: 40%;
        }
        .l1{
          .title{
            background: url(~@img/game/t1.png) no-repeat center 0;
            background-size: 150%;
            height: 50px;
          }
          ul{
            display: block;
          }
          li{
            width: 100%;
            margin: 0;
            padding: 0 20px;
            margin-bottom: 20px;
          }
          p{
            border: 2px solid #937341;
            border-top: none;
            font-size: 16px;
            height: 44px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .img{
            height: 200px;
            overflow: hidden;
          }
          img{
            width: 100%;
          }
        }
        .l2{
          padding: 0 10px;
          .icon{
            background: url(~@img/game/tit1.png) no-repeat center top;
            padding-top: 30px;
            color: #806439;
            font-size: 14px;
          }
          .img-wrap{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            background: url(~@img/game/img-7.png);
            background-size: cover;
            height: 260px;
            font-size: 14px;
            padding: 0 20px;
          }
          h3{
            font-size: 20px;
            font-family: titleChi;
            margin-bottom: 30px;
          }
        }
        .l3{
          padding-bottom: 60px;
          .icon{
            background: url(~@img/game/tit2.png) no-repeat center top;
            padding-top: 30px;
            color: #806439;
            font-size: 14px;
          }
          ul{
            display: block;
          }
          li{
            width: 94%;
            margin: 0 auto 20px;
            position: relative;
            overflow: hidden;
            border: 2px solid #7b6139;
            &:hover{
              .content{
                opacity: 1;
                transform: scale(1);
              }
              .tit{
                display: none;
              }
            }
          }
          .tit{
            display: none;
          }
          .img{
            height: 200px;
            overflow: hidden;
          }
          img{
            width: 100%;
          }
          .content{
            background:rgba(0,0,0,.4);
            position: static;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            transform: scale(1);
            opacity: 1;
            transition: none;
          }
          .text{
            position: static;
            left: 30px;
            right: 30px;
            top: 30px;
            bottom: 30px;
            border: none;
            border-top: 2px solid #7b6139;
            padding: 14px 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            background: #0d0d0e;
            background:rgba(0,0,0,.4);
            h4{
              margin-bottom: 10px;
              font-size: 18px;
            }
            p{
              font-size: 13px;
              line-height: 1.6;
            }
          }
        }
      }
      .end{
        background: url(~@img/game/img-12.png) no-repeat center 0;
        height: 300px;
        font-size: 14px;
        border-bottom: 1px solid #937341;
        color: #ffffff;
        padding: 0 10px;
        &-wrap{
          height: 100%;
          width: auto;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        h3{
          font-size: 20px;
          font-family: titleChi;
          margin-bottom: 10px;
          background: -webkit-linear-gradient(top, #fecd86, #fbb620);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-transform: none;
          text-shadow: 0 0 10px rgba(250, 181, 42, 0.2);
        }
        p{
          line-height: 1.6;
          font-size: 13px;
        }
        .links{
          padding-top: 20px;
          display: flex;
          justify-content: center;

          a{
            width: auto;
            margin: 0 10px;
            color: #ffcf83;
          }
        }
      }
    }
  }
</style>
