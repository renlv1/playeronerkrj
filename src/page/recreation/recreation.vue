<template>
  <div class="recreation-wrap">
    <div class="header">
      <h3 class="header-title">
        <img :src="bannerImg" alt="" class="storage-img">
      </h3>
      <p class="header-desc">{{$t('sport.text1')}}</p>
    </div>
    <!-- 1.0 影视-->
    <div class="content">
      <div class="content-icon movie-icon"></div>
      <div class="content-title">
        <div class="line line-left"></div>
        <div class="title-box">{{$t('sport.text2')}}</div>
        <div class="line line-right"></div>
      </div>
      <h5 class="content-big-title">{{$t('sport.text3')}}</h5>
      <div class="content-small-title">{{$t('sport.text4')}}</div>
      <p class="content-desc">{{$t('sport.text5')}}</p>
      <div class="img-box-wraper">
        <ul class="img-uls">
          <li class="img-list">
            <div class="img-box">
              <img class="img" src="../../assets/images/recreation/movie-img-01.png" alt="">
            </div>
            <div class="list-cont">
              <div class="icon icon1"></div>
              <p class="icon-title">{{$t('sport.text6')}}</p>
              <p class="icon-desc">{{$t('sport.text7')}}</p>
            </div>
          </li>
          <li class="img-list">
            <div class="img-box">
              <img class="img" src="../../assets/images/recreation/movie-img-02.png" alt="">
            </div>
            <div class="list-cont">
              <div class="icon icon2"></div>
              <p class="icon-title">{{$t('sport.text8')}}</p>
              <p class="icon-desc">{{$t('sport.text9')}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 体育-->
    <div class="content">
      <div class="content-icon sport-icon"></div>
      <div class="content-title">
        <div class="line line-left"></div>
        <div class="title-box">{{$t('sport.text10')}}</div>
        <div class="line line-right"></div>
      </div>
      <h5 class="content-big-title" v-html="$t('sport.text11')"></h5>
      <div class="content-small-title">{{$t('sport.text12')}}</div>
      <p class="content-desc">{{$t('sport.text13')}}</p>
      <div class="lunbo-w">
        <ul class="lunbo-uls-img">
          <li class="lunbo-list-img"><img  class="lunbo1-img" :src="lunbo1" alt=""></li>
          <li class="lunbo-list-img active-list-img">
            <img class="img" :src="activeLunboImg" alt="">
            <div class="prev-btn swiper-btn" @click="prevBtn()"></div>
            <div class="next-btn swiper-btn" @click="nextBtn()"></div>
          </li>
          <li class="lunbo-list-img"><img class="img" :src="lunbo3" alt=""></li>
        </ul>
        <ul class="lunbo-uls-text">
          <li class="lunbo-list-text">
            <h3 class="title1">{{lunboTitle1}}</h3>
            <p class="desc1">{{lunboText1}}</p>
          </li>
          <li class="lunbo-list-text active-list-text">
            <div class="img-box-current">
              <img src="../../assets/images/recreation/active_lunbo.png" alt="" class="img">
            </div>
            <div class="img-cont">
              <h3 class="title1">{{lunboTitle2}}</h3>
              <p class="desc1">{{lunboText2}}</p>
            </div>
          </li>
          <li class="lunbo-list-text">
            <h3 class="title1">{{lunboTitle3}}</h3>
            <p class="desc1">{{lunboText3}}</p>
          </li>
        </ul>
      </div>
      <div class="sport-desc-w">
        <div class="sport-desc"><img :src="commmImg" alt="" class="storage-img"></div>
      </div>
    </div>
    <!-- 直播-->
    <div class="content">
      <div class="content-icon live-icon"></div>
      <div class="content-title">
        <div class="line line-left"></div>
        <div class="title-box">{{$t('sport.text20')}}</div>
        <div class="line line-right"></div>
      </div>
      <h5 class="content-big-title">{{$t('sport.text21')}}</h5>
      <div class="content-small-title">{{$t('sport.text22')}}</div>
      <p class="content-desc">{{$t('sport.text23')}}</p>
      <div class="zhibo-wrap">
        <div class="left">
          <div class="item-img item1">
            <div class="flex-end">
              <div>
                <div class="desc1">{{$t('sport.text24')}}</div>
                <div class="desc2">{{$t('sport.text25')}}</div>
              </div>
            </div>
          </div>
          <div class="item-img item2">
            <div class="flex-end">
              <div>
                <div class="desc1">{{$t('sport.text26')}}</div>
                <div class="desc2" v-html="$t('sport.text27')"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="flex-end">
            <div>
              <p class="desc1">{{$t('sport.text28')}}</p>
              <div class="desc2" v-html="$t('sport.text29')"></div>
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
      bannerImg: '',
      commmImg: '',
      lunboNo: [
        require('../../assets/images/recreation/lunbo_no_1.png'),
        require('../../assets/images/recreation/lunbo_no_3.png'),
        require('../../assets/images/recreation/lunbo_no_2.png')
      ],
      lunboYes: [
        require('../../assets/images/recreation/lunbo_yes_1.png'),
        require('../../assets/images/recreation/lunbo_yes_3.png'),
        require('../../assets/images/recreation/lunbo_yes_2.png')
      ],
      textArr: [
        {
          title: this.$t('sport.text15'),
          text: this.$t('sport.text18')
        },
        {
          title: this.$t('sport.text14'),
          text: this.$t('sport.text17')
        },
        {
          title: this.$t('sport.text16'),
          text: this.$t('sport.text19')
        }
      ],
      lunbo1: require('../../assets/images/recreation/lunbo_no_1.png'),
      lunboyes1: require('../../assets/images/recreation/lunbo_yes_1.png'),
      lunbo2: require('../../assets/images/recreation/lunbo_no_3.png'),
      lunboyes2: require('../../assets/images/recreation/lunbo_yes_3.png'),
      lunbo3: require('../../assets/images/recreation/lunbo_no_2.png'),
      lunboyes3: require('../../assets/images/recreation/lunbo_yes_2.png'),
      activeLunboImg: require('../../assets/images/recreation/lunbo_yes_3.png'),
      lunboTitle1: this.$t('sport.text15'),
      lunboText1: this.$t('sport.text18'),
      lunboTitle2: this.$t('sport.text14'),
      lunboText2: this.$t('sport.text17'),
      lunboTitle3: this.$t('sport.text16'),
      lunboText3: this.$t('sport.text19')
    }
  },
  created () {
    if (window.localStorage.getItem('lang') === 'EN') {
      this.bannerImg = require('../../assets/images/recreation/banner_text_en.png')
      this.commmImg = require('../../assets/images/recreation/comming_text_en.png')
    } else {
      this.bannerImg = require('../../assets/images/recreation/banner_text_cn.png')
      this.commmImg = require('../../assets/images/recreation/comming_text_cn.png')
    }
  },
  methods: {
    prevBtn () {
      if (this.lunbo1 === this.lunboNo[0]) {
        this.lunbo1 = this.lunboNo[2]
        this.lunboTitle1 = this.textArr[2].title
        this.lunboText1 = this.textArr[2].text
        this.lunboTitle2 = this.textArr[0].title
        this.lunboText2 = this.textArr[0].text
        this.activeLunboImg = this.lunboYes[0]
        this.lunbo3 = this.lunboNo[1]
        this.lunboTitle3 = this.textArr[1].title
        this.lunboText3 = this.textArr[1].text
      } else if (this.lunbo1 === this.lunboNo[1]) {
        this.lunbo1 = this.lunboNo[0]
        this.lunboTitle1 = this.textArr[0].title
        this.lunboText1 = this.textArr[0].text
        this.lunboTitle2 = this.textArr[1].title
        this.lunboText2 = this.textArr[1].text
        this.activeLunboImg = this.lunboYes[1]
        this.lunbo3 = this.lunboNo[2]
        this.lunboTitle3 = this.textArr[2].title
        this.lunboText3 = this.textArr[2].text
      } else if (this.lunbo1 === this.lunboNo[2]) {
        this.lunbo1 = this.lunboNo[1]
        this.lunboTitle1 = this.textArr[1].title
        this.lunboText1 = this.textArr[1].text
        this.lunboTitle2 = this.textArr[2].title
        this.lunboText2 = this.textArr[2].text
        this.activeLunboImg = this.lunboYes[2]
        this.lunbo3 = this.lunboNo[0]
        this.lunboTitle3 = this.textArr[0].title
        this.lunboText3 = this.textArr[0].text
      }
    },
    nextBtn () {
      if (this.lunbo1 === this.lunboNo[0]) {
        this.lunbo1 = this.lunboNo[1]
        this.lunboTitle1 = this.textArr[1].title
        this.lunboText1 = this.textArr[1].text
        this.lunboTitle2 = this.textArr[2].title
        this.lunboText2 = this.textArr[2].text
        this.activeLunboImg = this.lunboYes[2]
        this.lunbo3 = this.lunboNo[0]
        this.lunboTitle3 = this.textArr[0].title
        this.lunboText3 = this.textArr[0].text
      } else if (this.lunbo1 === this.lunboNo[1]) {
        this.lunbo1 = this.lunboNo[2]
        this.lunboTitle1 = this.textArr[2].title
        this.lunboText1 = this.textArr[2].text
        this.lunboTitle2 = this.textArr[0].title
        this.lunboText2 = this.textArr[0].text
        this.activeLunboImg = this.lunboYes[0]
        this.lunbo3 = this.lunboNo[1]
        this.lunboTitle3 = this.textArr[1].title
        this.lunboText3 = this.textArr[1].text
      } else if (this.lunbo1 === this.lunboNo[2]) {
        this.lunbo1 = this.lunboNo[0]
        this.lunboTitle1 = this.textArr[0].title
        this.lunboText1 = this.textArr[0].text
        this.lunboTitle2 = this.textArr[1].title
        this.lunboText2 = this.textArr[1].text
        this.activeLunboImg = this.lunboYes[1]
        this.lunbo3 = this.lunboNo[2]
        this.lunboTitle3 = this.textArr[2].title
        this.lunboText3 = this.textArr[2].text
      }
    }
  }
}
</script>

<style lang="less" scoped>
@937341: #937341;
@c4b998: #c4b998;
.img{
  display: block;
  width: 100%;
  height: 100%;
}
.recreation-wrap{
  font-family: titleChi;
  background-color: #0a0a0c;
  .storage-img{
    @media screen and (max-width: 1200px) {
      padding: 0 20px;
      width: 100%;
    }
  }
  .header{
    width: 100%;
    height: 700px;
    background: url("../../assets/images/recreation/yule_banner.png") no-repeat center / cover;
    text-align: center;
    @media screen and (min-width: 1930px) {
      height: 900px;
    }
    @media screen and (max-width: 1200px) {
      height: 270px;
    }
    .header-title{
      padding: 400px 0 44px;
      @media screen and (max-width: 1200px) {
        padding: 140px 0 12px;
      }
      img{
        max-width: 98%;
        @media screen and (max-width: 1200px) {
          max-width: 95%;
        }
      }
    }
    .header-desc{
      font-size: 20px;
      color: #c4b998;
      padding: 0 40px;
      @media screen and (max-width: 1200px) {
        font-size: 14px;
      }
    }
  }
  .content{
    .content-icon{
      margin: 68px auto 0;
    }
    .movie-icon{
      width: 32px;
      height: 20px;
      background: url("../../assets/images/recreation/movie.png") no-repeat center / cover;
    }
    .sport-icon{
      width: 25px;
      height: 25px;
      background: url("../../assets/images/recreation/sport.png") no-repeat center / cover;
    }
    .live-icon{
      width: 32px;
      height: 35px;
      background: url("../../assets/images/recreation/live.png") no-repeat center / cover;
    }
    .content-title{
      text-align: center;
      padding: 16px 0 146px;
      display: flex;
      align-items: center;
      justify-content: center;
      .line{
        width: 380px;
        height: 12px;
        @media screen and (max-width: 1000px) {
          flex: 1;
          width: auto;
        }
      }
      .line-left{
        background: url("../../assets/images/recreation/title-left.png") no-repeat center / cover;
      }
      .line-right{
        background: url("../../assets/images/recreation/title-right.png") no-repeat center / cover;
      }
      .title-box{
        font-size: 14px;
        color: #937341;
        margin: 0 92px;
        @media screen and (max-width: 1000px) {
          margin: 0 30px;
        }
      }
    }
    .content-big-title{
      text-align: center;
      color: #937341;
      font-size: 28px;
    }
    .content-small-title{
      text-align: center;
      font-size: 18px;
      color: #937341;
      opacity: .4;
      margin: 30px auto 30px;
    }
    .content-desc{
      width: 500px;
      margin: 0 auto 65px;
      font-size: 14px;
      color: #c4b998;
      text-align: center;
      line-height: 2;
      @media screen and (max-width: 600px) {
        width: 100%;
        padding: 0 15px;
      }
    }
    .lunbo-w{
      .lunbo-uls-img{
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        .lunbo-list-img{
          width: 1000px;
          height: 490px;
          margin-top: 110px;
          @media screen and (max-width: 1024px) {
            width: 50%;
            height: 200px;
            padding: 0 80px;
          }
          &.active-list-img{
            width: 1000px;
            height: 600px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 0;
            @media screen and (max-width: 1024px) {
              width: 100%;
              height: 100%;
            }
          }
        }
          .lunbo1-img {
            @media screen and (max-width: 1024px) {
              display: none;
            }
          }
        .swiper-btn{
          position: absolute;
          top: 50%;
          width: 52px;
          height: 52px;
          transform: translateY(-50%);
          cursor: pointer;
          @media screen and (max-width: 1024px) {
            top: 43%;
          }
        }
        .prev-btn{
          left: -26px;
          background: url("../../assets/images/game/swiper_left.png") no-repeat center / cover;
          @media screen and (max-width: 1024px) {
            left: 10px;
          }
        }
        .next-btn{
          right: -26px;
          background: url("../../assets/images/game/swiper_right.png") no-repeat center / cover;
          @media screen and (max-width: 1024px) {
            right: 10px;
          }
        }
      }
      .lunbo-uls-text{
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        @media screen and (max-width: 768px) {
          align-items: stretch;
        }
        .lunbo-list-text{
          width: 30%;
          border-top: 2px solid #282a32;
          background-color: #16171B;
          min-height: 160px;
          padding: 0 10px;
          @media screen and (max-width: 1024px) {
            display: none;
          }
          &.active-list-text{
            background-color:transparent;
            border: none;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 40%;
            height: 326px;
            padding: 0 80px;
            @media screen and (max-width: 1024px) {
              padding: 0 50px;
              display: block;
              width: 100%;
            }
            .img-cont{
              position: relative;
              z-index: 1;
            }
            .img-box-current{
              position: absolute;
              left: 0;
              top: 0px;
              width: 100%;
              height: 100%;
              @media screen and (max-width: 768px) {
                top: -50px;
              }
            }
              /*img {*/
                /**/
              /*}*/
            .title1{
              color: rgb(147,115,65);
              padding: 96px 0 30px;
              white-space : nowrap;
              @media screen and (max-width: 900px) {
                padding: 60px 0 10px;
              }
            }
            .desc1{
              font-weight: bold;
              color: rgb(196,185,152);
            }
          }
          .title1{
            text-align: center;
            font-size: 24px;
            color: rgba(147,115,65,.1);
            padding: 10px 0 30px;
          }
          .desc1{
            text-align: center;
            font-size: 12px;
            line-height: 1.5;
            color: rgba(196,185,152,.1);
            margin-bottom: 30px;
            @media screen and (max-width: 900px) {
              font-size: 6px;
            }
          }
        }
      }
    }
    .sport-desc-w{
      margin: 200px 0 120px;
      @media screen and (max-width: 900px) {
        margin: 400px 0 120px;
      }
    }
    .sport-desc{
      text-align: center;
      font-size: 24px;
      color: #937341;
      line-height: 1.5;
    }
    .img-box-wraper{
      @media screen and (max-width: 600px) {
        padding: 0 15px;
      }
      .img-uls{
        display: flex;
        align-items: center;
        justify-content: center;
        @media screen and (max-width: 1200px) {
          flex-direction: column;
        }
        .img-list{
          width: 585px;
          margin-right: 30px;
          @media screen and (max-width: 1200px) {
            margin-right: 0;
            margin-bottom: 30px;
          }
          @media screen and (max-width: 600px) {
            width: 100%;
          }
          &:nth-child(2) {
            margin-right: 0;
          }
          .img-box{
            width: 585px;
            height: 654px;
            @media screen and (max-width: 600px) {
              width: 100%;
              height: auto;
            }
          }
          .list-cont{
            min-height: 148px;
            border: 2px solid #937341;
            border-top: none;
            background-color: #0a0a0c;
            position: relative;
            .icon{
              position: absolute;
              width: 78px;
              height: 78px;
              left: 50%;
              top: -40px;
              transform: translateX(-50%);
            }
            .icon1{
              background: url("../../assets/images/recreation/movie-icon-01.png") no-repeat center / cover;
            }
            .icon2{
              background: url("../../assets/images/recreation/movie-icon-02.png") no-repeat center / cover;
            }
            .icon-title{
              text-align: center;
              font-size: 14px;
              line-height: 1.5;
              padding: 50px 0 8px;
              color: #937341;
            }
            .icon-desc{
              text-align: center;
              line-height: 1.5;
              padding: 0 40px;
              color: #c4b998;
              font-size: 14px;
            }
          }
        }
      }
    }
    .zhibo-wrap{
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 30px;
      @media screen and (max-width: 1250px) {
        flex-direction: column;
        padding: 0 15px 30px;
      }
      .desc1{
        font-size: 24px;
        color: #937341;
        text-align: center;
      }
      .desc2{
        margin: 30px 0 58px;
        text-align: center;
        font-size: 14px;
        color: #c4b998;
      }
      .left{
        width: 400px;
        margin-right: 10px;
        @media screen and (max-width: 1250px) {
          display: flex;
          align-items: center;
          width: 800px;
          margin: 0;
        }
        @media screen and (max-width: 820px) {
          width: 100%;
          flex-direction: column;
        }
        .item-img{
          width: 400px;
          height: 400px;
          @media screen and (max-width: 1250px) {
            margin-bottom: 10px;
            &.item1{
              margin-right: 10px;
            }
          }
          @media screen and (max-width: 820px) {
            margin-right: 0 !important;
          }
          @media screen and (max-width: 450px) {
            width: 100%;
          }
        }
        .item1{
          background: url("../../assets/images/recreation/zhibo-img1.png") no-repeat center / cover;
          margin-bottom: 10px;
        }
        .item2{
          background: url("../../assets/images/recreation/zhibo-img2.png") no-repeat center / cover;
        }
      }
      .flex-end{
        display: flex;
        justify-content: center;
        align-items: flex-end;
        width: 100%;
        height: 100%;
      }
      .right{
        width:790px;
        height: 810px;
        background: url("../../assets/images/recreation/zhibo-img3.png") no-repeat center / cover;
        @media screen and (max-width: 800px) {
          width:100%;
          height: 400px;
        }
      }
    }
  }
}
</style>
