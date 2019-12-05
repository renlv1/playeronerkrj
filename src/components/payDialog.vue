<template>
  <transition name="dialog">
    <div class="pay-popup" v-if="show">
      <div class="pay-popup-wrap border-bg">
        <i class="el-icon-close close" @click="cancel"></i>
        <div class="pay-popup-tit">{{$t('common.payDialog.text1')}}</div>
        <div class="form">
          <div class="input-wrap">
            <input class="input" type="password" v-model="payPassword" :placeholder="$t('common.payDialog.text2')">
          </div>
          <div class="input-wrap">
            <input class="input" type="text" v-model="payCode" :placeholder="$t('common.payDialog.text3')">
          </div>
        </div>
        <button @click="submit" :loading="loading" :disabled="!payPassword || !payCode || loading" class="btn">{{$t('common.payDialog.text4')}}</button>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    params: Object
  },
  data () {
    return {
      show: false,
      payPassword: '',
      payCode: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'userData'
    ])
  },
  methods: {
    submit () {
      let url = '' // 请求地址
      let password = {
        code: this.payCode,
        verifyCode: this.payCode,
        tradePwd: this.payPassword
      }
      let requestParams = Object.assign({}, this.params, password) // 请求参数

      if (requestParams.url) {
        url = requestParams.url
      } else {
        // 根据单号转账
        if (this.params.id) {
          url = '/transaction/paymentById'
        } else if (this.params.type) {
          // 共享者充值提现
          url = '/transaction/paymentByAllOrderId'
        } else {
          // 根据地址转账
          url = '/transaction/payment'
        }
      }

      this.loading = true
      this.$fetch.post(url, requestParams).then(res => {
        this.loading = false
        if (res.data.success) {
          this.show = false
          this.$emit('paySuccess', res.data.data.id)
          this.$store.dispatch('getUserBalance') // 更新用户信息
        } else {
          this.$dialog({
            msg: res.data.msg
          })
          this.$emit('payFail')
        }
      })
    },
    cancel () {
      this.show = false
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="less">
  @import '~@/assets/css/mixin';
  .pay-popup{
    position: fixed;
    z-index: 10000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.6);
    .pay-popup-wrap{
      position: absolute;
      width: 600px !important;
      min-height: auto;
      left: 50%;
      top:50%;
      border-radius: 6px;
      transform: translate(-50%,-50%);
      padding: 40px 60px;
      background: #101229;
      @media @mob{
        width: 90% !important;
        padding: 40px 30px;
      }
    }
    &-tit{
      font-size: 20px;
      padding-bottom: 40px;
      text-align: center;
      @media @mob{
        padding-bottom: 20px;
      }
    }
    .btn-wrap{
      .justify;
      .btn{
        width: 48%;
      }
      .cancel{
        background: none;
        color: #333;
        border: 1px solid #aaa;
      }
    }
    .input-wrap{
      margin-bottom: 30px;
      @media @smallMob{
        .input{
          padding: 0 10px;
          font-size: 13px;
        }
      }
    }
    .close{
      position: absolute;
      right: 24px;
      top: 24px;
      font-size: 26px;
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
  .dialog-enter,.dialog-leave-to{
    opacity: 0;
    .pay-popup-wrap{
      transform: translate(-50%, -55%)
    }
  }
  .dialog-enter-active{
    transition: .3s;
    .pay-popup-wrap{
      transition: .3s
    }
  }
  .dialog-leave-active{
    transition: .1s;
    .pay-popup-wrap{
      transition: .1s
    }
  }

</style>
