<template>
  <div>
    <div class="about">
      <div class="banner">
        <div class="banner-text">
          <span class="cnShow">COMPANY PROFILE</span>
          <h4>{{$t('about.text1')}}</h4>
        </div>
      </div>
      <section class="company">
        <div class="h-wrap">
          <p>{{$t('about.text2')}}</p>
          <p>{{$t('about.text3')}}</p>
          <p>{{$t('about.text4')}}</p>
        </div>
      </section>
      <section class="team">
        <div class="h-wrap">
          <div class="title">
            <span class="cnShow">TEAM</span>
            <h4>{{$t('about.text5')}}</h4>
          </div>
          <p>{{$t('about.text6')}}</p>
          <p>{{$t('about.text7')}}</p>
        </div>
      </section>
      <div class="return justify">
        <div class="return-top">
          <a href="/#"><span>{{$t('about.text8')}}</span></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/mixin';
  a{
    color: inherit
  }
  .justify{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .about{
    background: #0a0a0c;
    font-size: 18px;
    color: #c4b998;
    font-family: titleChi;
    font-size: 18px;
    line-height: 2;
    .h-wrap{
      width: 900px;
      margin: 0 auto;
    }
    .banner{
      height: 700px;
      padding-top: 430px;
      background: url(~@img/about/banner.png) no-repeat center 0;
      &-text{
        text-align: center;
        font-family: 'Microsoft yahei';
        h4{
          font-size: 100px;
          line-height: 1;
          padding-top: 20px;
          background: -webkit-linear-gradient(top, #6a4a21, #b49553);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 30px;
          .en &{
            line-height: 1.3;
            font-size: 80px;
            letter-spacing: 0;
          }
        }
      }
    }
    .company{
      padding: 40px 0 130px;
      p{
        padding: 20px 0;
      }
    }
    .team{
      height: 680px;
      border-top: 1px solid #937341;
      border-bottom: 1px solid #937341;
      background: url(~@img/about/img1.png);
      .title{
        padding: 100px 0 10px;
        text-align: center;
        span{
          font-size: 16px;
          font-family: Arial;
        }
        h4{
          font-size: 48px;
          color: #937341;
        }
      }
      p{
        padding: 15px 0;
      }
    }
    .return{
      height: 410px;
      background: url(~@img/about/bottom.png);
      &-top{
        background: url(~@img/about/return_bg.png);
        width: 310px;
        line-height: 70px;
        text-align: center;
        color: #937341;
      }
      a{
        display: block;
        height: 100%;
        span{
          background: url(~@img/about/return_top_arrow.png) right center no-repeat;
          padding-right: 20px;
          display: inline-block;
        }
      }
    }
  }
  @media screen and (max-width:1200px) {
    .about{
      background: #0a0a0c;
      color: #c4b998;
      font-family: titleChi;
      font-size: 16px;
      line-height: 2;
      .h-wrap{
        width: 92%;
        margin: 0 auto;
      }
      .banner{
        height: 300px;
        padding-top: 150px;
        background-size: cover;
        &-text{
          text-align: center;
          font-family: 'Microsoft yahei';
          h4{
            font-size: 30px;
            line-height: 1;
            padding-top: 20px;
            background: -webkit-linear-gradient(top, #6a4a21, #b49553);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: 0;
            .en &{
              line-height: 1.3;
              font-size: 30px;
              letter-spacing: 0;
            }
          }
        }
      }
      .company{
        padding: 40px 0 60px;
        p{
          padding: 20px 0;
        }
      }
      .team{
        height: auto;
        border-top: 1px solid #937341;
        border-bottom: 1px solid #937341;
        background: url(~@img/about/img1.png);
        padding-bottom: 40px;
        .title{
          padding: 60px 0 10px;
          text-align: center;
          span{
            font-size: 16px;
            font-family: Arial;
          }
          h4{
            font-size: 48px;
            color: #937341;
          }
        }
        p{
          padding: 15px 0;
        }
      }
      .return{
        height: 210px;
        background: url(~@img/about/bottom.png);
        &-top{
          background: url(~@img/about/return_bg.png) no-repeat;
          width: 90%;
          background-size: 100% 100%;
          line-height: 70px;
          text-align: center;
          color: #937341;
        }
        a{
          display: block;
          height: 100%;
          span{
            background: url(~@img/about/return_top_arrow.png) right center no-repeat;
            padding-right: 20px;
            display: inline-block;
          }
        }
      }
    }
  }

</style>
