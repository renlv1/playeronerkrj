<template>
  <div class="page share-info-w assets-wrapper">
    <!--成为共享者-->
    <div class="assets-title">{{$t('shareDesc.text15')}}</div>
    <mob-header>{{$t('shareDesc.text15')}}</mob-header>
    <div class="assets-c">
      <div class="step-w">
        <div class="step">
          <div class="circle finish-circle"></div>
          <span class="text finish-text">{{$t('shareDesc.text16')}}</span>
        </div>
        <div class="line finish-line"></div>
        <div class="step">
          <div class="circle" :class="{'finish-circle': step >= 2}"></div>
          <span class="text" :class="{'finish-text': step >= 2}">{{$t('shareDesc.text17')}}</span>
        </div>
        <div class="line" :class="{'finish-line': step >= 2}"></div>
        <div class="step">
          <div class="circle" :class="{'finish-circle': step === 3}"></div>
          <span class="text" :class="{'finish-text': step === 3}">{{$t('shareDesc.text18')}}</span>
        </div>
      </div>
      <div class="step-container">
        <!--  填写资料  -->
        <transition name="slide">
          <div class="step-wrap step1" v-if="step === 1">
            <div class="form-item">
              <div class="form-label">{{$t('shareDesc.text32')}}</div>
              <div class="input-box">
                <input type="text" v-model="name" :placeholder="$t('shareDesc.text33')" class="input">
              </div>
              <p class="error-msg"></p>
            </div>
            <div class="form-item">
              <div class="form-label">{{$t('shareDesc.text34')}}</div>
              <div class="input-box">
                <input type="text" v-model="address" :placeholder="$t('shareDesc.text35')" class="input">
              </div>
              <p class="error-msg"></p>
            </div>
            <div class="form-item">
              <div class="form-label">{{$t('shareDesc.text19')}}</div>
              <div class="input-box">
                <el-select v-model="code">
                  <el-option
                    v-for="(item, index) in codeArr"
                    :key="index"
                    :value="'+'+item.code">
                  </el-option>
                </el-select>
              </div>
              <p class="error-msg"></p>
            </div>
            <div class="form-item">
              <div class="form-label">{{$t('shareDesc.text20')}}</div>
              <div class="input-box">
                <input type="text" v-model="mobile" :placeholder="$t('shareDesc.text21')" class="input">
              </div>
              <p class="error-msg"></p>
            </div>
            <div class="form-item">
              <div class="form-label">{{$t('shareDesc.text22')}}</div>
              <div class="input-box">
                <input type="text" v-model="bossName" :placeholder="$t('shareDesc.text23')" class="input">
              </div>
              <p class="error-msg"></p>
            </div>
            <div class="form-item">
              <div class="form-label">{{$t('shareDesc.text24')}}</div>
              <div class="input-box">
                <input type="text" :value="`${applyInfo.depositRate * 100}%`" class="input" disabled>
              </div>
              <p class="error-msg"></p>
            </div>
            <div class="form-item">
              <div class="form-label">{{$t('shareDesc.text25')}}</div>
              <div class="input-box">
                <input type="text" :value="`${applyInfo.drawRate * 100}%`" class="input" disabled>
              </div>
              <p class="error-msg"></p>
            </div>
            <div class="form-item">
              <div class="form-label">{{$t('shareDesc.text26')}}</div>
              <div class="flex-form">
                <div class="select-box area-code">
                  <el-select v-model="contactSelected">
                    <el-option
                      v-for="(item, index) in contactArr"
                      :key="index"
                      :value="item">
                    </el-option>
                  </el-select>
                </div>
                <div class="input-box">
                  <input type="text" v-model="contactText" :placeholder="$t('shareDesc.text27')" class="input">
                </div>
              </div>
              <p class="error-msg"></p>
            </div>
            <button :loading="loading" class="btn" @click="submit">{{$t('shareDesc.text28')}}</button>
          </div>
        </transition>
        <!--  支付保证金  -->
        <transition name="slide">
          <div class="step-wrap step2" v-if="step === 2">
            <div class="text">{{$t('shareDesc.text17')}}： {{applyInfo.bailAmount}}{{applyInfo.bailCurrency}}</div>
            <div :loading="loading" class="btn mt60" @click="pay">{{$t('shareDesc.text29')}}</div>
          </div>
        </transition>
        <!--  申请结果  -->
        <transition name="slide">
          <div class="step-wrap step2" v-if="step === 3">
            <div class="text"><i class="el-icon-success"></i>{{$t('shareDesc.text30')}}</div>
            <router-link class="btn mt60" to="/account/sharerSettings" replace>{{$t('shareDesc.text31')}}</router-link>
          </div>
        </transition>
      </div>
    </div>
    <payDialog @paySuccess="paySuccess" :params="payParams" ref="payDialog"/>
  </div>
</template>

<script type="text/ecmascript-6">
import payDialog from '@/components/payDialog'
export default {
  data () {
    return {
      name: '',
      address: '',
      mobile: '',
      bossName: '',
      codeArr: [],
      code: '+86',
      contactArr: this.$t('shareSetting.contactType'),
      contactSelected: this.$t('shareSetting.contactType')[0],
      contactText: '',
      applyInfo: {},
      step: 1,
      loading: false,
      payParams: {}
    }
  },
  components: {
    payDialog
  },
  methods: {
    getAreaCode () {
      this.$http.get('../../static/city/local_cn.json').then((res) => {
        this.codeArr = res.data // 手机区号
      })
    },
    getApplyInfo () {
      this.$fetch.post('/boss/getBossApplyBailAndCurrency').then(res => {
        this.applyInfo = res.data.data
      })
    },
    submit () {
      if (!this.name) {
        this.$dialog({
          msg: this.$t('shareDesc.text33')
        })
      } else if (!this.address) {
        this.$dialog({
          msg: this.$t('shareDesc.text35')
        })
      } else if (!/^1\d{10}$/.test(this.mobile)) {
        this.$dialog({
          msg: this.$t('shareDesc.text36')
        })
      } else if (!this.bossName) {
        this.$dialog({
          msg: this.$t('shareDesc.text23')
        })
      } else if (!this.contactText) {
        this.$dialog({
          msg: this.$t('shareDesc.text37')
        })
      } else {
        this.loading = true
        this.$fetch.post('/boss/checkSponsor', {
          sponsorName: this.bossName
        }).then(res => {
          this.loading = false
          if (res.data.success) {
            this.step = 2
          } else {
            this.$dialog({
              msg: res.data.msg
            })
          }
        })
      }
    },
    pay () {
      this.payParams = {
        url: '/boss/applyBoss',
        realName: this.name,
        location: this.address,
        phoneCode: this.code,
        phone: this.mobile,
        sponsorName: this.bossName,
        contactWay: `{"${this.contactSelected}": "${this.contactText}"}`
      }
      this.$refs.payDialog.show = true
    },
    paySuccess () {
      this.step = 3
    }
  },
  mounted () {
    this.getAreaCode()
    this.getApplyInfo()
  }
}
</script>

<style lang="less">
  .area-code {
    .el-input__suffix{
      background: none;
    }
    .el-input__suffix{
      width: 50px;
    }
    .el-input--suffix .el-input__inner{
      padding-left: 0;
      padding-right: 10px;
      text-align: center;
    }
    .el-select .el-input .el-select__caret,.el-input__inner{
      color: #e7ac50 !important;
    }
    .el-icon-arrow-up:before{
      content: '\E605'
    }
  }
</style>

<style lang="less" rel="stylesheet/less" scoped>
  @import (reference) '~@/assets/css/mixin';
  @eb1c4c: #eb1c4c;
  @7693fc: #7693fc;
  .input-box /deep/ .el-input__inner{
    color: #e7ac50;
  }
  img{
    width: 100%;
    height: 100%;
    display: block;
  }
  .share-info-w{
    padding-bottom: 50px;
    .form-item{
      margin-bottom: 30px;
      .flex-form{
        display: flex;
        align-items: center;
        position: relative;
        .select-box{
          width: 120px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #e7ac50;
          font-size: 16px;
          border: 1px solid #3b3131;
          margin-right: 20px;
          cursor: pointer;
          .icon-select{
            margin-left: 8px;
            width: 15px;
            height: 8px;
          }
        }
        .input-box{
          flex: 1;
        }
        .select-uls{
          position: absolute;
          left: 0;
          top: 100%;
          width: 120px;
          max-height: 0;
          border-radius: 0 0 4px 4px;
          transition: all 0.3s linear;
          overflow: hidden;
          background-color: #131733;
          z-index: 100;
          &.selectMenuActive {
            max-height: 1000px;
          }
          .select-list{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 49px;
            color: #425599;
            cursor: pointer;
            font-size: 16px;
            &:hover{
              background-color: #161b3b;
              color: #7693fc;
            }
          }
        }
      }
      .select-wrap{
        width: 100%;
        border-radius: 4px 0 0 4px;
        border: 1px solid #3b3131;
        box-sizing: border-box;
        color: #7693fc;
        display: inline-block;
        font-size: inherit;
        height: 48px;
        line-height: 48px;
        outline: 0;
        padding: 0 15px;
        @media screen and (max-width: 1200px) {
          border: none;
          background: url("../../../../assets/images/money/box.png") no-repeat;
          background-size: 100% 100%;
          background-position: center;
        }
      }
      .error-msg{
        margin: 10px 0 0 20px;
        font-size: 16px;
        color: @eb1c4c;
      }
      .form-label{
        font-size: 16px;
        color: @7693fc;
        margin-bottom: 20px;
      }
      input:disabled{
        color: #aaa !important;
        cursor: not-allowed;
      }
    }
    .input-box .input{
      @media @mob{
        font-size: 14px !important;
      }
      @media @smallMob{
        font-size: 13px !important;
      }
    }
  }
  .step-container{
    position: relative;
    overflow: hidden;
  }
  .step2{
    text-align: center;
    color: #e7ac50;
    .text{
      font-size: 20px;
      font-weight: bold;
    }
    .btn{
      width: 46%;
      margin-left: auto;
      margin-right: auto;
      @media @mob{
        width: 98%;
      }
    }
  }
  .el-icon-success{
    font-size: 30px;
    margin-right: 20px;
    vertical-align: middle;
    color: @blue;
    margin-top: -3px;
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: .3s;
  }
  .slide-leave-active {
    position: absolute;
    top: 0;
    transform: translateX(-100%);
  }
  .slide-enter {
    transform: translateX(100%);
  }
  .assets-wrapper .btn{
    display: block !important;
  }
</style>
