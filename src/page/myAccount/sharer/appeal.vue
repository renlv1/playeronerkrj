<template>
  <div class="page">
    <div class="order-detail">
      <div class="account-tit">
        <a href="javascript:;" @click="$router.go(-1)">
          <span v-if="type === 1">{{$t('navigation.text17')}}</span>
          <span v-else>{{$t('navigation.text18')}}</span>
        </a>
        <span class="el-icon-arrow-right"></span>
        <span>{{$t('common.appeal')}}</span>
      </div>
      <mob-header>{{$t('withdrawOrder.text1')}}</mob-header>
      <div v-if="load" class="g-loading-wrap">
        <div class="global-loading"></div>
      </div>
      <div v-else class="order-detail-list">
        <div class="order-detail-item">
          <div v-if="type === 1">
            <div class="yellow-color">{{detail.depositAmount | f4}}{{detail.systemCurrency}}</div>
            <div>
              <span v-if="isBoss">{{$t('fbRechargeOrder.text43')}}</span>
              <span v-else>{{$t('fbRechargeOrder.text33')}}</span>
              ：{{detail.receiveAmount | f4}}{{detail.depositCurrency}}</div>
          </div>
          <div v-else>
            <div class="yellow-color">{{detail.drawAmount | f4}}{{detail.systemCurrency}}</div>
            <div>
              <span v-if="isBoss">{{$t('fbWithdrawOrder.text43')}}</span>
              <span v-else>{{$t('fbWithdrawOrder.text33')}}</span>
              ：{{detail.receiveAmount | f4}}{{detail.drawCurrency}}</div>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('fbWithdrawOrder.text20')}}</span>
            <span>{{detail.id}}</span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('fbWithdrawOrder.text21')}}</span>
            <span>{{$changeDate(detail.createAt)}}</span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex" v-if="type === 1">
            <span>{{$t('fbRechargeOrder.text22')}}：{{detail.systemCurrency}}/{{detail.depositCurrency}}</span>
            <span>1:{{detail.depositrate}}</span>
          </div>
          <div class="flex" v-else>
            <span>{{$t('fbWithdrawOrder.text22')}}：{{detail.systemCurrency}}/{{detail.drawCurrency}}</span>
            <span>1:{{detail.drawrate}}</span>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="flex">
            <span>{{$t('fbWithdrawOrder.text23')}}</span>
            <span v-if="isBoss">
              <span v-if="type === 1">{{status2Text(detail, true, true)}}</span>
              <span v-else>{{status2Text(detail, false, true)}}</span>
            </span>
            <span v-else>
              <span v-if="type === 1">{{status2Text(detail, true)}}</span>
              <span v-else>{{status2Text(detail)}}</span>
            </span>
          </div>
        </div>

        <div v-if="userProblem">
          <!--   申诉者提供的内容   -->
          <div class="order-detail-item">
            <h4>{{$t('appeal.text8')}}</h4>
            <div class="appeal-radio">
              <i class="el-icon-success"></i>
              <i class="radio-text" v-if="userProblem.contentType === 1">{{$t('appeal.text10')}}</i>
              <i class="radio-text" v-if="userProblem.contentType === 2">{{$t('appeal.text11')}}</i>
              <i class="radio-text" v-if="userProblem.contentType === 3">{{$t('appeal.text12')}}</i>
            </div>
          </div>
          <div class="order-detail-item">
            <h4>{{$t('appeal.text13')}}</h4>
            <div class="text-box">
              <textarea class="textarea tradingCenter-input" :value="userProblem.content" disabled></textarea>
            </div>
            <div class="img-list">
              <ul>
                <li @click="showImg(item.imageUrl)" v-for="(item,index) in userProblem.images" :key="index"><img :src="item.imageUrl" alt=""></li>
              </ul>
            </div>
            <p class="view-big" v-if="userProblem.images.length">{{$t('appeal.text42')}}</p>
          </div>
          <!--   被申诉者提供的内容   -->
          <div v-if="managerReply.length">
            <div class="order-detail-item">
              <h4>{{$t('appeal.text16')}}</h4>
              <div v-for="item in managerReply" :key="item.id">
                <div class="text-box">
                  <textarea class="textarea tradingCenter-input" :value="item.content" disabled></textarea>
                </div>
                <div class="img-list">
                  <ul>
                    <li @click="showImg(imgItem.imageUrl)" v-for="(imgItem,index) in item.images" :key="index"><img :src="imgItem.imageUrl" alt=""></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!--   被申诉者提交内容区域   -->
          <div v-else>
            <div class="order-detail-item" v-if="showSecondEdit">
              <h4>{{$t('appeal.text16')}}</h4>
              <div class="text-box">
                <textarea class="textarea tradingCenter-input" :placeholder="$t('appeal.text14')" v-model="problemContent" @input="textareaVal"></textarea>
                <div class="warm-num"><span class="text-count">{{descNum}}</span>/<i>500</i></div>
              </div>
              <div class="upload">
                <el-upload
                  :action="`${$api}/uploadfile/uploadimg`"
                  list-type="picture-card"
                  name="myfile"
                  :limit="4"
                  :on-success="getFileList"
                  :on-remove="removeFileList"
                  :on-preview="showImg"
                  with-credentials>
                  <i class="el-icon-plus"></i>
                </el-upload>
              </div>
              <button class="btn mt60" @click="showConfirm">{{$t('appeal.text15')}}</button>
            </div>
          </div>
        </div>

        <!--   申诉者提交内容区域   -->
        <div v-else>
          <div class="order-detail-item">
            <h4>{{$t('appeal.text8')}}</h4>
            <div class="appeal-radio">
              <el-radio v-model="reason" label="1">{{$t('appeal.text10')}}</el-radio>
              <el-radio v-model="reason" label="2">{{$t('appeal.text11')}}</el-radio>
              <el-radio v-model="reason" label="3">{{$t('appeal.text12')}}</el-radio>
            </div>
          </div>
          <div class="order-detail-item">
            <h4>{{$t('appeal.text13')}}</h4>
            <div class="text-box">
              <textarea class="textarea tradingCenter-input" :placeholder="$t('appeal.text14')" v-model="problemContent" @input="textareaVal"></textarea>
              <div class="warm-num"><span class="text-count">{{descNum}}</span>/<i>500</i></div>
            </div>
            <div class="upload">
              <el-upload
                :action="`${$api}/uploadfile/uploadimg`"
                list-type="picture-card"
                name="myfile"
                :limit="4"
                :on-success="getFileList"
                :on-remove="removeFileList"
                :on-preview="showImg"
                with-credentials>
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
            <button class="btn mt60" @click="showConfirm">{{$t('appeal.text15')}}</button>
          </div>
        </div>

        <!--   判决结果   -->
        <div class="order-detail-item" v-if="userProblem.problemStatus === 2" style="padding-bottom:80px">
          <h4>{{$t('appeal.text17')}}</h4>
          <p v-if="detail.userAddress === userProblem.backup2" style="padding-top:15px">{{$t('appeal.text18')}}{{$t('appeal.text20')}}</p>
          <p v-else style="padding-top:15px">{{$t('appeal.text18')}}{{$t('appeal.text21')}}</p>
        </div>

        <!--  大图展示   -->
        <transition name="el-fade-in">
          <div class="big-mask" v-show="showBigImg">
            <div class="big-wrap">
              <div class="border-bg">
                <i class="el-icon-close close" @click="showBigImg = !showBigImg"></i>
                <img :src="bigImgSrc" alt="">
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import status2Text from '@/mixin/status'
export default {
  data () {
    return {
      detail: {},
      id: this.$route.query.id,
      type: parseInt(this.$route.query.type) || 1,
      isBoss: this.$route.query.isBoss,
      load: true,
      reason: '', // 申诉原因
      descNum: 0,
      problemContent: '',
      imagesArr: [],
      userProblem: '',
      managerReply: [],
      bigImgSrc: '',
      showBigImg: false
    }
  },
  mixins: [status2Text],
  computed: {
    showSecondEdit: function () {
      let key = this.isBoss ? 'bossAddress' : 'userAddress'
      return this.detail[key] !== (this.detail.problemUseraddress || this.detail.problem.userAddress)
    }
  },
  methods: {
    getData () {
      let url = this.type === 1 ? `/bossDeposit/handDepositDetail?depositId=${this.id}` : `/bossDraw/queryMyOrderDetail?id=${this.id}` // 1充值，2提现
      this.$fetch.post(url).then(res => {
        this.detail = res.data.data
        if (this.detail.problemId) {
          this.getProblem(this.detail.problemId)
        } else {
          this.load = false
        }
      })
    },
    getProblem (id) {
      this.$fetch.post(`/problem/get?problemId=${id}`).then(res => {
        this.load = false
        this.userProblem = res.data.data.userProblem
        this.managerReply = res.data.data.managerReply
      })
    },
    showConfirm () {
      if (!this.userProblem && !this.reason) {
        this.$dialog({
          msg: this.$t('appeal.text24')
        })
      } else if (!this.problemContent) {
        this.$dialog({
          msg: this.$t('appeal.text25')
        })
      } else {
        this.$dialog({
          type: 'confirm',
          msg: this.$t('appeal.text22'),
          okFn: () => {
            let params = {
              orderId: this.id, // 订单ID
              resourceId: this.type, // 申诉来源，1.充值，2:提现
              contentType: this.userProblem ? this.userProblem.contentType : this.reason, // 申诉类型，1.充值不到账 2.订单出错 3.接单后不确认收款
              content: this.problemContent, // 申诉内容
              images: JSON.stringify(this.imagesArr) // 图片
            }
            // 如果是被申诉人还要传问题id
            if (this.detail.problemId) {
              params.problemId = this.detail.problemId // 问题ID
            }
            this.$fetch.post('/problem/createProblem', params).then(res => {
              if (res.data.success) {
                this.$dialog({
                  msg: this.$t('appeal.text23'),
                  okFn: () => {
                    this.$router.go(-1)
                  }
                })
              } else {
                this.$dialog({
                  msg: res.data.msg
                })
              }
            })
          }
        })
      }
    },
    // 输入文字控制
    textareaVal () {
      this.descNum = this.problemContent.length
      this.noneContent = ''
      if (this.problemContent.length > 500) {
        this.descNum = 500
        this.problemContent = this.problemContent.substring(0, 500)
      }
    },
    getFileList (res, file, fileList) {
      this.transfterData(fileList)
    },
    removeFileList (file, fileList) {
      this.transfterData(fileList)
    },
    transfterData (fileList) {
      this.imagesArr = []
      fileList.forEach(item => {
        this.imagesArr.push({
          imageKey: item.name,
          imageUrl: item.response.data.fileName
        })
      })
    },
    showImg (src) {
      this.bigImgSrc = ''
      if (typeof src === 'string') {
        this.bigImgSrc = src
      } else {
        this.bigImgSrc = src.url
      }
      this.showBigImg = true
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
  @import (reference) '~@/assets/css/mixin';
  .page{
    .btn-wrap{
      padding-top: 60px;
      text-align: center;
      padding-bottom: 40px;
    }
    .btn-wrap{
      .btn{
        width: 44%;
        margin: 0 1.5%;
      }
    }
    .big-mask{
      .full;
      text-align: center;
      z-index: 9999;
      background: rgba(0,0,0,.6);
      .big-wrap{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        img{
          min-width: 400px;
          max-width: 800px;
          max-height: 80vh;
          @media @mob{
            min-width: auto;
            max-width: auto;
            width: 60vw;
          }
        }

      }
      .border-bg{
        padding: 50px 40px;
      }
      .close{
        position: absolute;
        right: 16px;
        top: 16px;
        font-size: 26px;
        z-index: 33;
        cursor: pointer;
        &:hover{
          color: red;
        }
        @media @mob{
          right: 16px;
          top: 16px;
          font-size: 20px;
        }
      }

    }
    .copy{
      .btn{
        line-height: 32px;
        height: 32px;
        width: auto;
        padding: 0 16px;
        background: #555eb7;
        font-size: 16px;
      }
    }
    .yellow-color{
      padding-bottom: 15px;
      font-weight: bold;
      font-size: 20px;
    }
    .text-box{
      position: relative;
      padding-top: 20px;
      .textarea{
        width: 100%;
        line-height: 1.3;
        height: 150px;
        border-radius: 4px;
        font-size: 16px;
        color: @blue;
        padding: 10px 20px;
        font-family: 'Microsoft yahei';
        box-sizing: border-box;
        background-color: #141630;
        border: 1px solid #2f3869;
        @media screen and (max-width: 1200px){
          height: 140px;
        }
      }
      .warm-num{
        font-size: 16px;
        color: @blue;
        position: absolute;
        z-index: 30;
        right: 20px;
        bottom: 19px;
      }
    }
    .radio-text{
      font-size: 16px;
      margin-left: 10px;
    }
    .order-detail-item:last-child{
      border-bottom: none;
    }
    .img-list{
      padding: 20px 0;
      ul{
        display: flex;
      }
      li{
        border: 1px solid #384d9a;
        border-radius: 4px;
        overflow: hidden;
      }
      li + li{
        margin-left: 20px;
      }
      img{
        width: 98px;
        height: 98px;
      }
      @media @mob{
        img{
          width: 55px;
          height: 55px;
        }
      }
    }
    .view-big{
      font-size: 14px;
      opacity: .8;
    }
  }
</style>
<style lang="less">
  .appeal-radio{
    font-size: 18px;
    padding-top: 26px;
    line-height: 24px;
    .el-radio{
      margin-right: 20px;
    }
    .el-radio__inner{
      width: 18px;
      height: 18px;
      border-color: #6780dd;
      background: none;
    }
    .el-radio__label{
      font-size: 16px;
      color: #6780dd !important;
    }
  }
  .upload{
    padding-top: 20px;
    .el-upload--picture-card{
      width: 100px;
      height: 100px;
      line-height: 96px;
      background: none;
      border: 1px dotted #666ec9;
      .el-icon-plus{
        font-size: 40px;
        color: #666ec9;
        vertical-align: middle;
      }
    }
    .el-upload-list--picture-card{
      .el-upload-list__item{
        width: 100px;
        height: 100px;
        margin-right: 20px;
      }
    }
  }
  @media screen and (max-width: 1200px) {
    .appeal-radio{
      .el-radio{
        display: block;
        margin: 0 0 10px 10px !important;
      }
    }
    .upload{
      .el-upload--picture-card{
        width: 55px;
        height: 55px;
        line-height: 50px;
      }
      .el-upload-list--picture-card{
        .el-upload-list__item{
          width: 55px;
          height: 55px;
        }
      }
    }
  }
</style>
