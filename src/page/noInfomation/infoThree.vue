<template>
  <div>
    <div class="g-dialog2">
      <div class="g-dialog2-wrap">
        <div class="dialog-bg">
          <div class="img-box"></div>
          <!--<img src="../../assets/images/notInfo/bg.png" alt="">-->
        </div>
        <div class="dialog-c">
          <div class="title-wrap">
            <div class="left-line line">
              <img src="../../assets/images/money/title-left.png" alt="">
            </div>
            <div class="g-dialog2-title">{{$t('nofoMation.text3')}}</div>
            <div class="right-line line">
              <img src="../../assets/images/money/title-right.png" alt="">
            </div>
          </div>
          <div class="item-wrap">
            <div class="line"></div>
            <div class="qrcode3-box">
              <div id="qrcode3"></div>
            </div>
            <p class="string" id="copyAddress_input3">{{$route.query.secret}}</p>
            <div class="copy" ref="addressCopy3" @click="copyAddress"  data-clipboard-action="copy" data-clipboard-target="#copyAddress_input3">{{$t('nofoMation.text5')}}</div>
            <div class="copy-two" ref="addressCopy3" @click="copyAddress"  data-clipboard-action="copy" data-clipboard-target="#copyAddress_input3">{{$t('nofoMation.text5')}}</div>
            <p class="desc">{{$t('accountBank.text14')}}</p>
          </div>
          <div class="item-wrap item-two-w">
            <div class="arrow-box">
              <div class="img-title">{{$t('accountBank.text7')}}</div>
            </div>
            <!--<div class="item-img">-->
              <!--<img src="../../assets/images/notInfo/list-border.png" alt="">-->
            <!--</div>-->
            <div class="step-w">
              <!--问题1 -->
              <div class="form-content">
                <div class="spot-box">
                  <div class="spot-img"><img src="../../assets/images/notInfo/spot-1.png" ></div>
                  <p class="form-desc">{{$t('accountBank.text7')}} 1</p>
                </div>
                <div class="input-item quhao-w">
                  <div class="quhao-item" @click="showQues(0)">
                    <div class="quhao">{{qusetion0}}</div>
                    <div class="quhao-select">
                      <div class="icon-sele" :class="{'rotate-icon': currentSelect === 0}"></div>
                    </div>
                    <div class="icon-arrow"><div class="arrow-img" :class="{'rotate-icon': currentSelect === 0}"></div></div>
                  </div>
                  <ul class="selectMenu" :class="{selectMenuActive: currentSelect === 0}">
                    <li class="code-list" v-for="(item, index) in quesArr0" :key="index" @click="selectOne(item, index, 0)">{{item}}</li>
                  </ul>
                </div>
                <div class="form-item" @click.stop>
                  <input type="text" class="input" :placeholder="$t('accountBank.text8')" v-model.trim="answer0" @input="changeInput(0)" @blur="inputBlur(0)" @focus="inputFocus(0)" :class="{'red-border': currentSelectTwo === 0}">
                </div>
                <p class="error-text">{{errorAnswer0}}</p>
              </div>
              <!--问题2-->
              <div class="form-content">
                <div class="spot-box">
                  <div class="spot-img"><img src="../../assets/images/notInfo/spot-1.png" ></div>
                  <p class="form-desc">{{$t('accountBank.text7')}} 2</p>
                </div>
                <div class="input-item quhao-w">
                  <div class="quhao-item" @click="showQues(1)">
                    <div class="quhao">{{qusetion1}}</div>
                    <div class="quhao-select" >
                      <div class="icon-sele" :class="{'rotate-icon': currentSelect === 1}"></div>
                    </div>
                    <div class="icon-arrow"><div class="arrow-img" :class="{'rotate-icon': currentSelect === 1}"></div></div>
                  </div>
                  <ul class="selectMenu" :class="{selectMenuActive: currentSelect === 1}">
                    <li class="code-list" v-for="(item, index) in quesArr1" :key="index" @click="selectOne(item, index, 1)">{{item}}</li>
                  </ul>
                </div>
                <div class="form-item">
                  <input type="text" class="input" :placeholder="$t('accountBank.text8')" v-model.trim="answer1" @input="changeInput(1)" @blur="inputBlur(1)" @focus="inputFocus(1)" :class="{'red-border': currentSelectTwo === 1}">
                </div>
                <p class="error-text">{{errorAnswer1}}</p>
              </div>
              <!-- 问题3-->
              <div class="form-content">
                <div class="spot-box">
                  <div class="spot-img"><img src="../../assets/images/notInfo/spot-1.png" ></div>
                  <p class="form-desc">{{$t('accountBank.text7')}} 3</p>
                </div>
                <div class="input-item quhao-w">
                  <div class="quhao-item"  @click="showQues(2)">
                    <div class="quhao">{{qusetion2}}</div>
                    <div class="quhao-select">
                      <div class="icon-sele" :class="{'rotate-icon': currentSelect === 2}"></div>
                    </div>
                    <div class="icon-arrow"><div class="arrow-img" :class="{'rotate-icon': currentSelect === 2}"></div></div>
                  </div>
                  <ul class="selectMenu" :class="{selectMenuActive: currentSelect === 2}">
                    <li class="code-list" v-for="(item, index) in quesArr2" :key="index" @click="selectOne(item, index, 2)">{{item}}</li>
                  </ul>
                </div>
                <div class="form-item">
                  <input type="text" class="input" :placeholder="$t('accountBank.text8')" v-model.trim="answer2" @input="changeInput(2)" @blur="inputBlur(2)" @focus="inputFocus(2)">
                </div>
                <p class="error-text">{{errorAnswer2}}</p>
              </div>
            </div>
          </div>
          <div class="item-wrap">
            <div class="step-w">
              <div class="form-item">
                <div class="form-lable">{{$t('accountBank.text5')}}</div>
                <div class="input-box"><input type="number" @input="changeInput(3)" @blur="inputBlur(3)" @focus="inputFocus(3)" v-model.trim="googleCode" class="input" :placeholder="$t('accountBank.text5')"></div>
              </div>
              <p class="error-text">{{errorGoogle}}</p>
              <div class="btn-confirm" @click="finishBind">{{$t('header.text8')}}</div>
              <div class="btn"  @click="finishBind">
                <div class="con">{{$t('header.text8')}}</div>
                <div class="cube l-top"></div>
                <div class="cube r-top"></div>
                <div class="cube r-bot"></div>
                <div class="cube l-bot"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import $ from 'jquery'
import '@/assets/js/jquery.qrcode.min'
export default {
  data () {
    return {
      questionArr: [],
      qusetion0: this.$t('accountBank.text16'),
      qusetion1: this.$t('accountBank.text16'),
      qusetion2: this.$t('accountBank.text16'),
      errorAnswer0: '',
      errorAnswer1: '',
      errorAnswer2: '',
      googleCode: '',
      errorGoogle: '',
      answer0: '',
      answer1: '',
      answer2: '',
      quesArr0: [],
      quesArr1: [],
      quesArr2: [],
      currentSelect: -1,
      currentSelectTwo: -1,
      copyBtn2: null
    }
  },
  created () {
    this.getgogleProblem()
  },
  mounted () {
    setTimeout(() => {
      this.copyBtn2 = new this.Clipboard(this.$refs.addressCopy3)
      $('#qrcode3').empty()
      let downloadUrl = this.$utf16to8(this.$route.query.qrUrl)
      $('#qrcode3').qrcode({
        render: 'canvas', //     table方式
        width: 200, //            宽度
        height: 200, //            高度
        text: downloadUrl //      任意内容
      })
    }, 20)
  },
  methods: {
    // 显示下拉框
    showQues (n) {
      if (this.currentSelect === n) {
        this.currentSelect = -1
      } else {
        this.currentSelect = n
      }
    },
    getgogleProblem () {
      this.$fetch.post(`${this.$api}/user/getThreeSafeProblem`).then(res => {
        if (res.data.success === true) {
          this.questionArr = res.data.data
          this.quesArr0 = this.quesArr0.concat(this.questionArr)
          this.quesArr1 = this.quesArr1.concat(this.questionArr)
          this.quesArr2 = this.quesArr2.concat(this.questionArr)
        }
      })
    },
    copyAddress () {
      let clipboard = this.copyBtn2
      clipboard.on('success', () => {
        this.$dialog({
          msg: this.$t('accountBank.text18')
        })
        clipboard.destroy()
        this.copyBtn2 = new this.Clipboard(this.$refs.addressCopy3) // 复制
      })
    },
    finishBind () {
      if (this.googleCode === '') {
        this.errorGoogle = this.$t('accountBank.text5')
      }
      if (this.answer0 === '') {
        this.errorAnswer0 = this.$t('nofoMation.text6')
      }
      if (this.qusetion0 === this.$t('accountBank.text16')) {
        this.errorAnswer0 = this.$t('accountBank.text16')
      }
      if (this.answer1 === '') {
        this.errorAnswer1 = this.$t('nofoMation.text6')
      }
      if (this.qusetion1 === this.$t('accountBank.text16')) {
        this.errorAnswer1 = this.$t('accountBank.text16')
      }
      if (this.answer2 === '') {
        this.errorAnswer2 = this.$t('nofoMation.text6')
      }
      if (this.qusetion2 === this.$t('accountBank.text16')) {
        this.errorAnswer2 = this.$t('accountBank.text16')
      }
      if (this.qusetion0 !== this.$t('accountBank.text16') && this.qusetion1 !== this.$t('accountBank.text16') && this.qusetion2 !== this.$t('accountBank.text16') && this.answer0 !== '' && this.answer1 !== '' && this.answer2 !== '' && this.googleCode !== '') {
        this.errorAnswer0 = ''
        this.errorAnswer1 = ''
        this.errorAnswer2 = ''
        this.errorGoogle = ''
        this.$fetch.post(`${this.$api}/user/setSafeProblem`, {
          question1: this.qusetion0,
          answer1: this.answer0,
          question2: this.qusetion1,
          answer2: this.answer1,
          question3: this.qusetion2,
          answer3: this.answer2,
          googleCode: this.googleCode
        }).then(res => {
          if (res.data.success === true) {
            this.$router.push('/home')
          } else {
            this.$dialog({
              msg: res.data.msg
            })
          }
        })
      }
    },
    selectOne (item, index, currrent) {
      if (currrent === 0) {
        this.qusetion0 = item
        this.answer0 = ''
      } else if (currrent === 1) {
        this.qusetion1 = item
        this.answer1 = ''
      } else if (currrent === 2) {
        this.qusetion2 = item
        this.answer2 = ''
      }
      this.quesArr0 = []
      this.quesArr1 = []
      this.quesArr2 = []
      this.questionArr.forEach(item => {
        if (item !== this.qusetion0 && item !== this.qusetion1 && item !== this.qusetion2) {
          this.quesArr0.push(item)
          this.quesArr1.push(item)
          this.quesArr2.push(item)
        }
      })
      this.currentSelect = -1
    },
    // 限制输入字数
    changeInput (n) {
      if (n === 0) {
        this.answer0 = this.answer0.replace(/\s+/g, '')
        if (this.answer0.length > 50) {
          this.answer0 = this.answer0.substring(0, 50)
        }
      } else if (n === 1) {
        this.answer1 = this.answer1.replace(/\s+/g, '')
        if (this.answer1.length > 50) {
          this.answer1 = this.answer1.substring(0, 50)
        }
      } else if (n === 2) {
        this.answer2 = this.answer2.replace(/\s+/g, '')
        if (this.answer2.length > 50) {
          this.answer2 = this.answer2.substring(0, 50)
        }
      } else if (n === 3) {
        this.googleCode = this.googleCode.trim()
      }
    },
    inputBlur (n) {
      this.currentSelectTwo = -1
    },
    inputFocus (n) {
      this.currentSelectTwo = n
      if (n === 0) {
        this.errorAnswer0 = ''
      } else if (n === 1) {
        this.errorAnswer1 = ''
      } else if (n === 2) {
        this.errorAnswer2 = ''
      } else if (n === 3) {
        this.errorGoogle = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @btnColor: #7693fc;
  @171D3D:#171D3D;
  @e7ac50: #e7ac50;
  @3b3131: #3b3131;
  @7693fc: #7693fc;
  @eb1c4c: #eb1c4c;
  .btn-confirm{
    width: 100%;
    height: 48px;
    line-height: 48px;
    background-color: #7693fc;
    text-align: center;
    color: #fff;
    font-size: 16px;
    border-radius: 4px;
    margin-top: 60px;
    cursor: pointer;
    @media screen and (max-width:1200px) {
      display: none;
    }
  }
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
  .g-dialog2{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 178px 0 100px;
    width: 100%;
    background: url("../../assets/images/login/zc-banner.png") no-repeat center / cover;
    /*@media screen and (max-width:1200px) {*/
      /*padding: 178px 15px 0 5px;*/
    /*}*/
    &-wrap{
      width: 1320px;
      padding: 100px 80px;
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
      @media screen and (max-width:768px) {
        margin: 0 5px;
        font-size: 18px;
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
      .button1{
        position: absolute;
        height: 45px;
        width: 100%;
        left: 0;
        top: 14px;
        background: linear-gradient(#f2ac3a, #8c6231);
      }
      .button2{
        width: 453px;
        height: 70px;
        position: absolute;
        top: 0;
        left: 14px;
        background: linear-gradient(#f2ac3a, #8c6231);
      }
      .button3{
        font-size: 24px;
        width: 468px;
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
      }
    }
    .g-dialog2-wrap{
      position: relative;
      padding: 0;
      .dialog-bg{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        .img-box {
          background: url("../../assets/images/login/zc-form-bg.png") no-repeat;
          background-size:100% 100%;
          display: block;
          width: 100%;
          height: 100%;
          @media screen and (max-width: 768px) {
            background: url("../../assets/images/notInfo/mobileThree.png") no-repeat;
            background-size:100% 100%;
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
      .dialog-c{
        position: relative;
        z-index: 1;
        padding: 160px 0 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        @media screen and (max-width:1200px) {
          padding: 160px 15px 100px 5px;
        }
        .item-wrap{
          width: 960px;
          height: 470px;
          background: url("../../assets/images/notInfo/list-border.png") no-repeat center / cover;
          margin-bottom: 20px;
          background-size:100% 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          position: relative;
          @media screen and (max-width:1200px) {
            &:nth-child(3){
              background: none;
            }
            &:nth-child(4){
              background: none;
              height: 200px;
            }
            height: 470px;
            width: 90%;
            padding: 0 10px
          }
          &.item-two-w{
            height: auto;
            min-height: 470px;
            /*background: none;*/
            .item-img{
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
            }
          }
          .step-w{
            padding: 80px 0;
            width: 768px;
            @media screen and (max-width:1024px) {
              width: 100%;
              padding: 20px 0;
            }
            .error-text{
              margin: -20px 0 20px 20px;
              font-size: 16px;
              color: @eb1c4c;
            }
            .form-content{
              width: 768px;
              @media screen and (max-width:1024px) {
                width: 100%;
              }
              .form-desc{
                font-size: 16px;
                color: @7693fc;
                @media screen and (max-width:1024px) {
                  color: @e7ac50;
                }
              }
              .input-item {
                position: relative;
                margin: 20px 0 30px;
                .quhao-item {
                  width: 100%;
                  height: 49px;
                  display: flex;
                  align-items: center;
                  position: relative;
                  cursor: pointer;
                  @media screen and (max-width: 1200px) {
                    border: none;
                    background: url("../../assets/images/money/bg0.png") no-repeat;
                    background-size: 100% 100%;
                    background-position: center;
                  }
                  .quhao {
                    height: 100%;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    border: 1px solid @3b3131;
                    padding-left: 20px;
                    color: @7693fc;
                    font-size: 16px;
                    border-radius: 4px;
                  }
                  .icon-arrow{
                    position: absolute;
                    right: 0;
                    height: 100%;
                    width: 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #f9b72b;
                    /*opacity: 0.1;*/
                    background-color: rgba(250, 181, 42, .1);
                    @media screen and (max-width: 1200px) {
                      display: flex;
                    }
                    @media screen and (min-width: 1200px) {
                      display: none;
                    }
                    .arrow-img{
                      height: 10px;
                      width: 17px;
                      background: url("../../assets/images/money/icon-up.png") no-repeat;
                      background-size: 100% 100%;
                      background-position: center;
                      &.rotate-icon {
                        transform: rotate(-180deg);
                      }
                    }
                  }
                  .quhao-select {
                    width: 100px;
                    height: 100%;
                    background: @7693fc;
                    border-radius: 0 4px 4px 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    @media screen and (max-width: 1200px) {
                      display: none;
                    }
                    .icon-sele {
                      width: 0;
                      height: 0;
                      border-left: 6px solid transparent;
                      border-right: 6px solid transparent;
                      border-top: 6px solid #fff;
                      transform: rotate(0deg);
                      transition: transform .3s linear;
                      &.rotate-icon {
                        transform: rotate(-180deg);
                      }
                    }
                  }
                }
                .selectMenu {
                  max-height: 0;
                  width: 100%;
                  position: absolute;
                  top: 100%;
                  left: 0;
                  border-radius: 0 0 4px 4px;
                  transition: all 0.3s linear;
                  overflow: hidden;
                  background-color: #131733;
                  z-index: 100;
                  &.selectMenuActive {
                    max-height: 1000px;
                    &::-webkit-scrollbar {
                      width: 0;
                      height: 0;
                    }
                  }
                  .code-list {
                    padding-left: 20px;
                    display: flex;
                    align-items: center;
                    height: 49px;
                    color: #425599;
                    cursor: pointer;
                    font-size: 16px;
                    &:hover{
                      background-color: #161b3b;
                      color: @7693fc;
                    }
                  }
                }
              }
              .form-item {
                position: relative;
                width: 100%;
                height: 49px;
                margin-bottom: 30px;
                .input {
                  width: 100%;
                  height: 100%;
                  padding-left: 20px;
                  box-sizing: border-box;
                  color: @e7ac50;
                  border: 1px solid @3b3131;
                  border-radius: 4px;
                  font-size: 16px;
                  @media screen and (max-width: 1200px) {
                    padding: 0 10px;
                    border: none;
                    font-size: 12px;
                    background: url("../../assets/images/money/input.png") no-repeat;
                    background-size: 100% 100%;
                    background-position: center;
                  }
                }
              }
              .error-text{
                margin: -20px 0 20px 20px;
                font-size: 16px;
                color: @eb1c4c;
              }
            }
            .form-item{
              width: 100%;
              margin-bottom: 30px;
              .form-lable{
                font-size: 16px;
                color: @7693fc;
                margin-bottom: 20px;
                @media screen and (max-width: 1200px) {
                  color: #e7ac50;
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
                  }
                }
              }
            }
          }
          .line{
            width: 228px;
            height: 20px;
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            background: url("../../assets/images/notInfo/line.png") no-repeat center / cover;
          }
          .qrcode3-box{
            width: 212px;
            height: 212px;
            padding: 5px;
            background-color: #fff;
          }
          .string{
            font-size: 18px;
            color: #fff;
            margin-top: 24px;
          }
          .copy{
            width: 200px;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            background-color: #b9a47e;
            font-size: 16px;
            margin: 30px 0 24px;
            cursor: pointer;
            @media screen and (max-width: 1200px) {
              display: none;
            }
          }
          .copy-two{
            margin-left: 20px;
            width: 72px;
            height: 32px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: @e7ac50;
            font-weight: normal;
            font-size: 16px;
            cursor: pointer;
            background-color: @7693fc;
            @media screen and (max-width: 1200px) {
              display: flex;
              background-color: #0C0D1E;
              border: 1px solid @e7ac50;
              margin-bottom: 20px;
            }
            @media screen and (min-width: 1200px) {
              display: none;
            }
          }
          .desc{
            font-size: 14px;
            color: rgba(255,255,255,.2);
            text-align: center;
          }
        }
      }
      .dialog-min{
        width: 484px;
        margin: 73px auto 0;
        display: flex;
        align-items: center;
      }
      .title-wrap{
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 40px;
        .line{
          width: 250px;
          height: 16px;
          @media screen and (max-width:900px) {
            width: 34%;
          }
        }
      }
    }
  }
.arrow-box {
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1200px) {
    display: none;
  }
  @media screen and (min-width: 1200px) {
    display: none;
  }
  .img-left{
    width: 110px;
    height: 12px;
    .left{
      background-size: cover;
      display: block;
      width: 100%;
      height: 100%;
      zoom: .7;
      background: url("../../assets/images/notInfo/left_2.png") no-repeat;
    }
  }
  .img-right{
    width: 110px;
    height: 10px;
    .right{
      background-size:100% 100%;
      display: block;
      width: 100%;
      height: 100%;
      zoom: .7;
      background: url("../../assets/images/notInfo/right_2.png") no-repeat;
    }
  }
  .img-title{
    padding-top: 20px;
    padding-right: 15px;
    color: #e7ac50;
    font-size: 16px;
    @media screen and (max-width: 1200px) and (min-width: 375px) {
      font-size: 16px;
    }
  }
}
  .btn{
    width: 100%;
    height: 48px;
    line-height: 48px;
    background: linear-gradient(#f2ac3a, #8c6231);
    color: #fff;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 1s;
    margin-top: 50px;
    @media screen and (max-width: 1200px) {
      display: flex;
    }
    @media screen and (min-width: 1200px) {
      display: none;
    }
    .con{
      width: 98%;
      height: 36px;
      line-height: 36px;
      border: 1px solid #fff;
      position: absolute;
      z-index: 10;
    }
    .cube{
      position: absolute;
      width: 12px;
      height: 12px;
      background-color: #000;
    }
    .l-top{
      top: 0;
      left: 0;
    }
    .r-top{
      top: 0;
      right: 0;
    }
    .r-bot{
      bottom: 0;
      right: 0;
    }
    .l-bot{
      bottom: 0;
      left: 0;
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
