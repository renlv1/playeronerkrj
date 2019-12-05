<template>
  <div class="notBindGogle">
    <div class="assets-wrapper">
      <div class="assets-title"><span class="cursor" @click="$router.push('/account/accountInformation')">{{$t('accountBank.text1')}}</span> <span class="arrow">></span> <span class="current-title">{{$t('accountBank.text2')}}</span></div>
      <div class="assets-c">
        <div class="assets-desc">{{$t('accountBank.text3')}}</div>
        <div class="switch-tab">
          <ul class="switch-uls">
            <li class="switch-list" @click="swichOne(index)" v-for="(item, index) in switchArr" :key="index" :class="{'active-list': currentIndex === index}">
              <div class="left-box">
                <div class="img-left" :class="{'active-imgLeft': currentIndex === index}"></div>
              </div>
              {{item}}
              <div class="right-box">
                <div class="img-right" :class="{'active-imgRight': currentIndex === index}"></div>
              </div>
              <div class="bg-line"></div>
            </li>

          </ul>
        </div>
        <!--谷歌验证解绑 -->
        <div class="switch-content-one" v-show="currentIndex === 0">
          <div class="form-item">
            <div class="spot-box">
              <div class="spot-img"><img src="../../../../assets/images/notInfo/spot-1.png" ></div>
              <div class="form-label">{{$t('accountBank.text4')}}</div>
            </div>
            <div class="input-box">
              <input type="password" :placeholder="$t('accountBank.text4')" v-model.trim="safePassword" class="input">
            </div>
            <div class="err-desc">{{errDesc1}}</div>
          </div>
          <div class="form-item">
            <div class="spot-box">
              <div class="spot-img"><img src="../../../../assets/images/notInfo/spot-1.png" ></div>
              <div class="form-label">{{$t('accountBank.text5')}}</div>
            </div>
            <div class="input-box">
              <input type="text" :placeholder="$t('accountBank.text5')" v-model.trim="gogleCode" class="input">
            </div>
            <div class="err-desc">{{errDesc2}}</div>
          </div>
          <div class="btn-confirm" @click="gogleBind">{{$t('accountBank.text6')}}</div>
          <div class="btn"  @click="gogleBind">
            <div class="con">{{$t('accountBank.text6')}}</div>
            <div class="cube l-top"></div>
            <div class="cube r-top"></div>
            <div class="cube r-bot"></div>
            <div class="cube l-bot"></div>
          </div>
        </div>
        <!-- 安全问题解绑-->
        <div v-show="currentIndex === 1" class="switch-content-two">
          <div v-show="questionShow">
            <div class="form-item">
              <div class="spot-box">
                <div class="spot-img"><img src="../../../../assets/images/notInfo/spot-1.png" ></div>
                <div class="label-form">{{$t('accountBank.text7')}} 1</div>
              </div>
              <div class="input-div">{{questionArr[0]}}</div>
              <div class="input-box"><input type="text" v-model="answer0" :placeholder="$t('accountBank.text8')" class="input"></div>
              <div class="err-desc">{{errAnser0}}</div>
            </div>
            <div class="form-item">
              <div class="spot-box">
                <div class="spot-img"><img src="../../../../assets/images/notInfo/spot-1.png" ></div>
                <div class="label-form">{{$t('accountBank.text7')}} 2</div>
              </div>
              <div class="input-div">{{questionArr[1]}}</div>
              <div class="input-box"><input type="text" v-model="answer1" :placeholder="$t('accountBank.text8')" class="input"></div>
              <div class="err-desc">{{errAnser1}}</div>
            </div>
            <div class="form-item">
              <div class="spot-box">
                <div class="spot-img"><img src="../../../../assets/images/notInfo/spot-1.png" ></div>
                <div class="label-form">{{$t('accountBank.text7')}} 3</div>
              </div>
              <div class="input-div">{{questionArr[2]}}</div>
              <div class="input-box"><input type="text" v-model="answer2" :placeholder="$t('accountBank.text8')" class="input"></div>
              <div class="err-desc">{{errAnser2}}</div>
            </div>
            <div class="btn-confirm" @click="questionBind">{{$t('accountBank.text6')}}</div>
            <div class="btn"  @click="questionBind">
              <div class="con">{{$t('accountBank.text6')}}</div>
              <div class="cube l-top"></div>
              <div class="cube r-top"></div>
              <div class="cube r-bot"></div>
              <div class="cube l-bot"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <mob-header>{{$t('accountBank.text2')}}</mob-header>
  </div>
</template>

<script>
export default {
  data () {
    return {
      errDesc1: '',
      errDesc2: '',
      currentIndex: 0,
      questionShow: true,
      safePassword: '',
      mapDataSet: '',
      gogleCode: '',
      answer0: '',
      answer1: '',
      answer2: '',
      errAnser0: '',
      errAnser1: '',
      errAnser2: '',
      questionArr: [],
      switchArr: [
        this.$t('accountBank.text9'),
        this.$t('accountBank.text10')
        // {
        //   leftBgImg: require('../../../../assets/images/money/left1.png'),
        //   activeLeftBgImg: require('../../../../assets/images/money/left.png'),
        //   rightBgImg: require('../../../../assets/images/money/right1.png'),
        //   activeRightBgImg: require('../../../../assets/images/money/right2.png')
        // }
      ],
      imgArr: [
        {
          leftBgImg: require('../../../../assets/images/money/left1.png'),
          activeLeftBgImg: require('../../../../assets/images/money/left.png'),
          rightBgImg: require('../../../../assets/images/money/right1.png'),
          activeRightBgImg: require('../../../../assets/images/money/right2.png')
        }
      ]
    }
  },
  created () {
    this.getQuertion()
  },
  methods: {
    swichOne (index) {
      this.currentIndex = index
      this.answer0 = ''
      this.answer1 = ''
      this.answer2 = ''
      this.errAnser0 = ''
      this.errAnser1 = ''
      this.errAnser2 = ''
      this.errDesc1 = ''
      this.errDesc2 = ''
      this.safePassword = ''
      this.gogleCode = ''
      if (index === 1) {
        if (this.mapDataSet === 2) {
          this.$dialog({
            msg: this.$t('accountBank.text11'),
            okFn: () => {
              this.currentIndex = 0
            }
          })
        }
      }
    },
    // 获取问题
    getQuertion () {
      this.$http.post(`${this.$api}/user/querySafeProblem`).then((res) => {
        if (res.data.success === true) {
          this.mapDataSet = res.data.mapData.setsafe
          if (this.mapDataSet === 1) {
            this.questionArr = res.data.data
          } else if (this.mapDataSet === 2) {
            this.questionShow = false
          }
        }
      })
    },
    // 问题解绑
    questionBind () {
      if (this.answer0 === '') {
        this.errAnser0 = this.$t('accountBank.text8')
      }
      if (this.answer1 === '') {
        this.errAnser1 = this.$t('accountBank.text8')
      }
      if (this.answer2 === '') {
        this.errAnser2 = this.$t('accountBank.text8')
      }
      if (this.answer0 !== '' && this.answer1 !== '' && this.answer2 !== '') {
        this.errAnser0 = ''
        this.errAnser1 = ''
        this.errAnser2 = ''
        this.$fetch.post(`${this.$api}/user/googleOpenClose`, {
          type: '3',
          question1: this.questionArr[0],
          answer1: this.answer0,
          question2: this.questionArr[1],
          answer2: this.answer1,
          question3: this.questionArr[2],
          answer3: this.answer2
        }).then(res => {
          if (res.data.success === true) {
            this.$dialog({
              msg: this.$t('accountBank.text12'),
              okFn: () => {
                this.$router.push('/account/accountInformation')
              }
            })
          } else {
            this.$dialog({
              msg: res.data.msg
            })
          }
        })
      }
    },
    // 谷歌解绑
    gogleBind () {
      if (this.safePassword === '') {
        this.errDesc1 = this.$t('accountBank.text4')
      }
      if (this.gogleCode === '') {
        this.errDesc2 = this.$t('accountBank.text5')
      }
      if (this.safePassword !== '' && this.gogleCode !== '') {
        this.errDesc1 = ''
        this.errDesc2 = ''
        this.$fetch.post(`${this.$api}/user/googleOpenClose`, {
          type: '2',
          tradePwd: this.safePassword,
          googleCode: this.gogleCode
        }).then(res => {
          if (res.data.success === true) {
            this.$dialog({
              msg: this.$t('accountBank.text12'),
              okFn: () => {
                this.$router.push('/account/accountInformation')
              }
            })
          } else {
            this.$dialog({
              msg: res.data.msg
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@171D3D:#171D3D;
@e7ac50: #e7ac50;
@3b3131: #3b3131;
@7693fc: #7693fc;
@eb1c4c: #eb1c4c;
.assets-wrapper{
  .assets-c{
     .assets-desc{
       font-size: 16px;
       color: @7693fc;
       @media screen and (max-width: 1200px) {
         display: none;
       }
     }
    .err-desc{
      margin: 10px 0 0 20px;
      font-size: 16px;
      color: @eb1c4c;
    }
    .switch-tab{
      margin: 40px 0;
      .switch-uls{
        height: 48px;
        display: flex;
        align-items: center;
        border: 1px solid @7693fc;
        border-radius: 4px;
        @media screen and (max-width: 1200px) {
          border: none;
          width: 100%;
          position: relative;
        }
        .switch-list{
          height: 100%;
          cursor: pointer;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: @7693fc;
          font-size: 14px;
          &:first-child{
            margin-right: 10px;
          }
          .bg-line{
            position: absolute;
            top: 46px;
            width: 48.5%;
            border-bottom: 1px solid #7D5F36;
            @media screen and (min-width: 422px) and (max-width: 1200px) {
              width: 49%;
            }
          }
          @media screen and (max-width: 1200px) {
            background: url("../../../../assets/images/money/go-bg.png") no-repeat;
            background-size: 100% 100%;
            background-position: center;
          }
          &.active-list{
            background-color: @7693fc;
            color: #fff;
            @media screen and (max-width: 1200px) {
              background-color: @171D3D;
              color: #e7ac50;
            }
          }
          .left-box{
            width: 16px;
            height: 14px;
            margin-right: 5px;
            @media screen and (max-width: 1200px) {
              display: flex;
            }
            @media screen and (min-width: 1200px) {
              display: none;
            }
            .img-left{
              width: 100%;
              height: 100%;
              background: url("../../../../assets/images/money/left1.png") no-repeat;
              background-size: 100% 100%;
              background-position: center;
              &.active-imgLeft{
                width: 100%;
                height: 100%;
                background: url("../../../../assets/images/money/left.png") no-repeat;
                background-size: 100% 100%;
                background-position: center;
              }
            }
          }
          .right-box{
            width: 16px;
            height: 14px;
            margin-left: 5px;
            @media screen and (max-width: 1200px) {
              display: flex;
            }
            @media screen and (min-width: 1200px) {
              display: none;
            }
            .img-right{
              width: 100%;
              height: 100%;
              background: url("../../../../assets/images/money/right1.png") no-repeat;
              background-size: 100% 100%;
              background-position: center;
              &.active-imgRight{
                width: 100%;
                height: 100%;
                background: url("../../../../assets/images/money/right2.png") no-repeat;
                background-size: 100% 100%;
                background-position: center;
              }
            }
          }
        }
      }
    }
    .switch-content-one{
      .form-item{
        width: 100%;
        margin-bottom: 30px;
        .form-label{
          font-size: 16px;
          color: @7693fc;
          margin-bottom: 20px;
          @media screen and (max-width: 1200px) {
            margin-bottom: 0;
            color: @e7ac50;
          }
        }
        .input-box{
          .input{
            padding-left: 20px;
            width: 100%;
            height: 49px;
            border: 1px solid @3b3131;
            border-radius: 4px;
            font-size: 16px;
            @media screen and (max-width: 1200px) {
              font-size: 12px;
              border: none;
            }
          }
        }
      }
    }
    .switch-content-two{
      .form-item{
        margin-top: 30px;
        @media screen and (max-width: 1200px) {
          margin-bottom: 30px;
      }
        .label-form{
          font-size: 16px;
          color: @7693fc;
          margin-bottom: 20px;
          @media screen and (max-width: 1200px) {
            margin-bottom: 0;
            color: @e7ac50;
          }
        }
        .input-box{
          .input{
            padding-left: 20px;
            width: 100%;
            height: 49px;
            border: 1px solid @3b3131;
            border-radius: 4px;
            font-size: 16px;
            @media screen and (max-width: 1200px) {
              font-size: 12px;
              border: none;
            }
          }
        }
        .input-div{
          padding-left: 20px;
          width: 100%;
          height: 49px;
          line-height: 49px;
          border: 1px solid @3b3131;
          border-radius: 4px;
          font-size: 16px;
          color: @7693fc;
          margin-bottom: 30px;
          @media screen and (max-width: 1200px) {
            border: none;
            background: url("../../../../assets/images/money/bg0.png") no-repeat;
            background-size: 100% 100%;
            background-position: center;
          }
        }
        .input-flex{
          display: flex;
          align-items: center;
          .input-box{
            flex: 1;
          }
          .btn-send{
            width: 100px;
            height: 49px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            color: #fefefe;
            background-color:  @7693fc;
            cursor: pointer;
          }
        }
      }
    }
  }
}
.spot-box{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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
</style>
