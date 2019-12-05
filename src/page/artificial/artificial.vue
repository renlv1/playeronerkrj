<template>
    <div>
        <div class="artificial-wrap">
          <div class="banner">
            <div class="content">
              <div class="title">
                <img :src="bannerImg" alt="">
              </div>
              <div class="con">{{$t('ai.text3')}}</div>
            </div>
          </div>
          <div class="labour-ai">
            <div class="title-padd">
              <div class="title"><img src="../../assets/images/ai/AI.png" alt=""></div>
            </div>
            <div class="tit-ai">
              <div class="img"><img src="../../assets/images/ai/ai-left.png" alt=""></div>
              <div class="tit">{{$t('ai.text1')}}</div>
              <div class="img"><img src="../../assets/images/ai/ai-right.png" alt=""></div>
            </div>
            <div class="list">
              <div class="ai-system">
                <div class="con">
                  <div class="tit">{{$t('ai.text4')}}</div>
                  <div class="text">{{$t('ai.text5')}}</div>
                </div>
              </div>
              <div class="tb">
                <div class="img"></div>
              </div>
              <div class="ai-system ai-study">
                <div class="con">
                  <div class="tit">{{$t('ai.text6')}}</div>
                  <div class="text">{{$t('ai.text7')}}</div>
                </div>
              </div>
            </div>
            <div class="list-con">
              <div class="hr"></div>
            </div>
            <div class="table">
              <div class="hr"><img src="../../assets/images/ai/left.png" alt=""></div>
              <div class="tab">
                <div class="tab-box">
                  <div class="info-li" v-for="(item,index) in tabDatas" :key="index">
                    <div class="content">
                      <div class="tit">{{item.tit}}</div>
                      <div class="con">{{item.con}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="hr"><img src="../../assets/images/ai/right.png" alt=""></div>
            </div>
          </div>
          <div class="open-source">
            <div class="title-padd">
              <div class="title"><img src="../../assets/images/ai/source.png" alt=""></div>
            </div>
            <div class="tit-ai">
              <div class="img"><img src="../../assets/images/ai/ai-left.png" alt=""></div>
              <div class="tit">{{$t('ai.text37')}}</div>
              <div class="img"><img src="../../assets/images/ai/ai-right.png" alt=""></div>
            </div>
            <div class="open-box">
              <div class="open">
                <div class="content">
                  <div class="title">{{$t('ai.text16')}}</div>
                  <div class="tit">{{$t('ai.text17')}}</div>
                  <div class="con-list">
                    <div class="con">{{$t('ai.text18')}}</div>
                    <div class="con">{{$t('ai.text19')}}</div>
                    <div class="con">{{$t('ai.text20')}}</div>
                    <div class="con">{{$t('ai.text21')}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="dispose">
            <div class="dispose-bg">
              <div class="tit-ai">
                <div class="img"><img src="../../assets/images/ai/Rectangle6copy.png" alt=""></div>
                <div class="tit">{{$t('ai.text22')}}</div>
                <div class="img"><img src="../../assets/images/ai/Rectangle6copy.png" alt=""></div>
              </div>
              <div class="con-info">{{$t('ai.text23')}}</div>
              <div class="dispose-list">
                <div class="list-box">
                    <div class="con">
                      <div class="nei-r">
                         <img src="../../assets/images/ai/Rectangle3.png" alt="">
                         <div class="tit">{{$t('ai.text24')}}</div>
                         <div class="text">{{$t('ai.text27')}}</div>
                      </div>
                    </div>
                    <div class="jia">
                      <div class="img"><img src="../../assets/images/ai/jia.png" alt=""></div>
                    </div>
                </div>
                <div class="list-box">
                  <div class="con">
                    <div class="nei-r">
                      <img src="../../assets/images/ai/VectorSmartObject4.png" alt="">
                      <div class="tit">{{$t('ai.text25')}}</div>
                      <div class="text">{{$t('ai.text28')}}</div>
                    </div>
                  </div>
                  <div class="jia">
                    <div class="img"><img src="../../assets/images/ai/jia.png" alt=""></div>
                  </div>
                </div>
                <div class="list-box">
                  <div class="con">
                    <div class="nei-r">
                      <img src="../../assets/images/ai/VectorSmartObject5.png" alt="">
                      <div class="tit">{{$t('ai.text26')}}</div>
                      <div class="text">{{$t('ai.text29')}}</div>
                    </div>
                  </div>
                  <div class="jia">
                    <div class="img"><img src="../../assets/images/ai/jia.png" alt=""></div>
                  </div>
                </div>
                <div class="list-box">
                  <div class="con">
                    <div class="nei-r">
                      <img src="../../assets/images/ai/VectorSmartObject3.png" alt="">
                      <div class="tit">{{$t('ai.text30')}}</div>
                      <div class="text">{{$t('ai.text33')}}</div>
                    </div>
                  </div>
                  <div class="jia">
                    <div class="img"><img src="../../assets/images/ai/jia.png" alt=""></div>
                  </div>
                </div>
                <div class="list-box">
                  <div class="con">
                    <div class="nei-r">
                      <img src="../../assets/images/ai/VectorSmartObject2.png" alt="">
                      <div class="tit">{{$t('ai.text31')}}</div>
                      <div class="text">{{$t('ai.text34')}}</div>
                    </div>
                  </div>
                  <div class="jia">
                    <div class="img"><img src="../../assets/images/ai/jia.png" alt=""></div>
                  </div>
                </div>
                <div class="list-box">
                  <div class="con">
                    <div class="nei-r">
                      <img src="../../assets/images/ai/VectorSmartObject.png" alt="">
                      <div class="tit">{{$t('ai.text32')}}</div>
                      <div class="text">{{$t('ai.text35')}}</div>
                    </div>
                  </div>
                  <div class="jia">
                    <div class="img"><img src="../../assets/images/ai/jia.png" alt=""></div>
                  </div>
                </div>
              </div>
              <div class="bot-tit-ai">
                <div class="img"><img src="../../assets/images/ai/left.png" alt=""></div>
                <div class="tit">{{$t('ai.text16')}}</div>
                <div class="img"><img src="../../assets/images/ai/right.png" alt=""></div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
export default{
  data () {
    return {
      bannerImg: '',
      tabDatas: [
        {
          tit: this.$t('ai.text8'),
          con: this.$t('ai.text12')
        },
        {
          tit: this.$t('ai.text9'),
          con: this.$t('ai.text13')
        },
        {
          tit: this.$t('ai.text10'),
          con: this.$t('ai.text14')
        },
        {
          tit: this.$t('ai.text11'),
          con: this.$t('ai.text15')
        }
      ]
    }
  },
  created () {
    if (window.localStorage.getItem('lang') === 'EN') {
      this.bannerImg = require('../../assets/images/ai/title_en.png')
    } else {
      this.bannerImg = require('../../assets/images/ai/title.png')
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.artificial-wrap{
  width: 100%;
  height: 100%;
  .banner{
    width: 100%;
    height: 700px;
    background: url("../../assets/images/ai/banner.png") no-repeat;
    background-size: cover;
    background-position: center;
    @media screen and (max-width: 1024px) {
      height: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .content{
      width: 100%;
      height: auto;
      padding-top: 408px;
      @media screen and (max-width: 1024px) {
        padding-top: 0;
      }
      .title{
        text-align: center;
        @media screen and (max-width: 1024px) {
          width: 90%;
          margin: 0 auto;
          img{
            width: 100%;
          }
        }
      }
      .con{
        text-align: center;
        font-size: 16px;
        color: #c4b998;
        padding-top: 44px;
      }
    }
  }
  .labour-ai{
    width: 100%;
    height: 1031px;
    background: url("../../assets/images/ai/labour-ai-bg.png") no-repeat;
    background-color: #0a0a0c;
    @media screen and (max-width: 1200px) {
      height: 900px;
      padding: 0 20px;
    }
    @media screen and (max-width: 1024px) {
      height: auto;
    }
    .title-padd{
      padding-top: 68px;
      .title{
        width: 34px;
        height: 34px;
        margin: 0 auto 16px;
      }
    }
    .tit-ai{
      width: auto;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      .img{
        width: 380px;
        @media screen and (max-width: 1024px) {
          flex: 1;
        }
        img{
          width: 100%;
        }
      }
      .tit{
        padding: 0 74px;
        font-size: 14px;
        color: #937341;
        line-height: 20px;
      }
    }
    .list{
      width: auto;
      height: auto;
      margin: 86px auto 0;
      display: flex;
      align-items: center;
      justify-content: center;
      @media screen and (max-width: 1024px) {
        display: block;
      }
      .ai-system{
        width: 720px;
        height: 420px;
        background: url("../../assets/images/ai/img-08.png") no-repeat;
        background-position: center;
        background-size: 100% 100%;
        position: relative;
        @media screen and (max-width: 1600px) {
          width: 42%;
          height: 280px;
          background-position: center;
          background-size: 100% 100%;
        }
        @media screen and (max-width: 1024px) {
          width: 500px;
          height: 250px;
          margin: auto;
        }
        @media screen and (max-width: 600px) {
          width: 80%;
          height: 0;
          padding-bottom: 50%;
          margin: auto;
        }
        .con{
          width: 708px;
          position: absolute;
          bottom: -44%;
          left: 0;
          right: 0;
          @media screen and (max-width: 1600px) {
            width: 100%;
          }
          @media screen and (max-width: 1024px) {
            bottom: -60%;
          }
          @media screen and (max-width: 600px) {
            bottom: -150px;
          }
          .tit{
            font-size: 28px;
            text-align: center;
            color: #937341;
            margin-bottom: 30px;
          }
          .text{
            font-size: 14px;
            text-align: center;
            color: #c4b998;
          }
        }
      }
      .ai-study{
        background: url("../../assets/images/ai/img-09.png") no-repeat;
        background-position: center;
        background-size: 100% 100%;
      }
      .tb{
        width: 78px;
        height: 420px;
        margin: 0 40px;
        @media screen and (max-width: 1024px) {
          height: 80px;
          margin: 180px auto 70px;
        }
        .img{
          width: 100%;
          height: 420px;
          display: flex;
          align-items: center;
          position: relative;
          @media screen and (max-width: 1024px) {
            height: 80px;
          }
          &:after{
            position: absolute;
            display: block;
            content: '';
            width: 78px;
            height: 80px;
            background: url("../../assets/images/ai/piltover_crest_icon.png") no-repeat;
            background-size: 100% 100%;
            background-position: center;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
    .list-con{
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 158px;
      @media screen and (max-width: 1600px) {
        padding: 0 20px;
      }
      .hr{
        width: 78px;
        margin: 0 40px;
      }
    }
    .table{
      width: 100%;
      height: 128px;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 258px;
      @media screen and (max-width: 1600px){
        padding: 0 20px;
      }
      @media screen and (max-width: 750px){
        height: 524px;
        margin-top: 0;
        padding: 80px 0;
      }
      .hr{
        width: 136px;
        margin-bottom: 3px;
        @media screen and (max-width: 1600px){
          flex: 1;
          width: auto;
          img{
            width: auto;
          }
        }
        @media screen and (max-width: 750px){
          display: none;
        }
      }
      .tab{
        width: 1188px;
        height: 100%;
        border: 1px solid #342b20;
        background-color: #0a0a0c;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        @media screen and (max-width: 1600px){
          width: 100%;
          padding: 0 20px;
        }
        @media screen and (max-width: 750px){
          display: block;
        }
        &:after{
          content: '';
          display: block;
          position: absolute;
          width: 100%;
          height: 1px;
          left: 0;
          top: 50%;
          z-index: 1;
          transform: translateY(-50%);
          background-color: #342b20;
        }
        .tab-box{
          width: auto;
          height: 88px;
          background-color: #0a0a0c;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid #c4b998;
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 10;
          transform: translate(-50%, -50%);
          @media screen and (max-width: 1600px){
            width: 96%;
          }
          @media screen and (max-width: 750px){
            height: 96%;
            display: block;
            border: none;
          }
        }
        .info-li{
          width: 288px;
          height: 100%;
          border-right: 1px solid #c4b998;
          display: flex;
          align-items: center;
          @media screen and (max-width: 1600px){
            width: 100%;
          }
          @media screen and (max-width: 750px){
            width: 100%;
            height: 88px;
            border: 1px solid #c4b998;
            margin-top: -1px;
          }
          .content{
            width: 100%;
            height: auto;
            .tit{
              width: 100%;
              text-align: center;
              font-size: 24px;
              padding-bottom: 6px;
              color: #c4b998;
            }
            .con{
              width: 100%;
              text-align: center;
              font-size: 14px;
              color: #c4b998;
            }
          }
        }
      }
    }
  }
  .open-source{
    width: 100%;
    height: auto;
    background-color: #0a0a0c;
    @media screen and (max-width: 1600px) {
      padding: 0 20px;
    }
    .title-padd{
      padding-top: 160px;
      @media screen and (max-width: 750px) {
        padding-top: 0;

      }
      .title{
        width: 34px;
        height: 34px;
        margin: 0 auto 16px;
      }
    }
    .tit-ai{
      width: auto;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      @media screen and (max-width: 1024px) {
        padding: 0 20px;
      }
      .img{
        width: 380px;
        @media screen and (max-width: 1024px) {
          flex: 1;
        }
        @media screen and (max-width: 768px) {
          display: none;
        }
        img{
          width: 100%;
        }
      }
      .tit{
        padding: 0 74px;
        font-size: 14px;
        color: #937341;
        line-height: 20px;
        @media screen and (max-width: 768px) {
          padding: 0 20px;
        }
      }
    }
    .open-box{
      width: 1600px;
      height: 600px;
      background-color: #0a0a0c;
      border: 1px solid #332b24;
      margin: 100px auto 0;
      position: relative;
      @media screen and (max-width: 1600px) {
        width: 100%;
        padding: 0 20px;
      }
      @media screen and (max-width: 1024px) {
        height: auto;
        padding-bottom: 50%;
      }
      @media screen and (max-width: 750px) {
        height: 400px;
      }
      &:after{
        content: '';
        display: block;
        position: absolute;
        width: 2px;
        height: 100%;
        background-color: #332b24;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
      &:before{
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: #332b24;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
      .open{
        width: 1560px;
        height: 560px;
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 10;
        transform: translate(-50%, -50%);
        background: url("../../assets/images/ai/img-011.png") no-repeat;
        background-size: 100% 100%;
        background-position: center;
        display: flex;
        align-items: center;
        justify-content: center;
        @media screen and (max-width: 1600px) {
          width: 96%;
          border-left: 1px solid #937341;
          border-right: 1px solid #937341;
        }
        @media screen and (max-width: 1024px) {
          height: 96%;
        }
        @media screen and (max-width: 1024px) {
          background-size: cover;
        }
        .content{
          width: auto;
          height: auto;
          text-align: center;
          .title{
            font-size: 28px;
            font-family: titleChi;
            background: -webkit-linear-gradient(top, #fbb620, #fecd86);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-transform: uppercase;
            text-shadow: 0 0 10px rgba(250, 181, 42, 0.2);
            @media screen and (max-width: 750px) {
              font-size: 22px;
            }
          }
          .tit{
            font-size: 14px;
            color: #937341;
            padding: 34px 0 80px;
            @media screen and (max-width: 1024px) {
              padding: 30px 0;
            }
            @media screen and (max-width: 750px) {
              padding: 14px 0;
            }
          }
          .con-list{
            width: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            @media screen and (max-width: 1024px) {
              display: block;
            }
            .con{
              font-size: 14px;
              color: #ffcf83;
              padding: 0 50px;
              @media screen and (max-width: 1024px) {
                padding: 10px 0;
              }
              @media screen and (max-width: 750px) {
                padding: 5px 0;
              }
            }
          }
        }
      }
    }
  }
  .dispose{
    width: 100%;
    height: auto;
    padding: 60px 0;
    margin: auto;
    background-color: #0a0a0c;
    @media screen and (max-width: 1024px){
      padding: 60px 20px 0;
    }
    .dispose-bg{
      width: 100%;
      height: 1029px;
      background: url("../../assets/images/ai/dispose-bg.png") no-repeat;
      background-position: center;
      background-size: cover;
      background-color: #0a0a0c;
      @media screen and (max-width: 1024px){
        height: auto;
      }
      .tit-ai{
        width: auto;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        .img{
          width: 28px;
          height: 28px;
          @media screen and (max-width: 1024px){
            width: 20px;
            height: 20px;
          }
          img{
            width: 100%;
          }
        }
        .tit{
          font-size: 60px;
          color: #d3c7aa;
          line-height: 20px;
          padding: 0 30px;
          @media screen and (max-width: 1024px){
            font-size: 20px;
          }
        }
      }
      .con-info{
        text-align: center;
        font-size: 16px;
        color: #937341;
        padding: 20px 0 100px;
      }
      .dispose-list{
        width: 1260px;
        height: auto;
        margin: auto;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        @media screen and (max-width: 1600px) {
          width: 100%;
        }
        .list-box{
          width: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-bottom: 60px;
          @media screen and (max-width: 1024px){
            width: 100%;
          }
          .con{
            width: 340px;
            height: 160px;
            background: url("../../assets/images/ai/Dotted-box.png") no-repeat;
            background-size: 100% 100%;
            background-position: center;
            display: flex;
            align-items: center;
            justify-content: center;
            @media screen and (max-width: 1024px){
              width: 100%;
            }
            .nei-r{
              width: auto;
              height: auto;
              text-align: center;
              img{
                width: 35px;
                height: 35px;
                margin: auto;
                display: block;
              }
              .tit{
                font-size: 18px;
                color: #937341;
                padding: 20px 0 12px;
              }
              .text{
                font-size: 14px;
                color: #5f4d30;
                padding: 0 20px;
              }
            }
          }
          .jia{
            width: 80px;
            height: 160px;
            display: flex;
            align-items: center;
            justify-content: center;
            @media screen and (max-width: 1024px){
              display: none;
            }
            img{
              width: 39px;
              height: 40px;
              margin: auto;
              display: block;
            }
          }
        }
      }
      .bot-tit-ai{
        width: auto;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 180px auto 0;
        @media screen and (max-width: 1024px){
          height: auto;
          margin: 0 auto;
          padding-bottom: 100px;
          display: block;
        }
        .img{
          width: 136px;
          @media screen and (max-width: 1024px){
            margin: auto;
          }
          img{
            width: 100%;
          }
        }
        .tit{
          font-size: 36px;
          color: #937341;
          line-height: 36px;
          padding: 0 30px;
          @media screen and (max-width: 1024px){
            padding: 6px 0;
            font-size: 16px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
