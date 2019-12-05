<template>
  <div class="sms-container" :style="styles">
    <input
      type="text"
      class="sms-input"
      :style="{borderColor: borderColor, borderRadius: borderRadius}"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @focus="$emit('focus', $event.target.value)"
      @blur="$emit('blur', $event.target.value)"
      :placeholder="placeholder" />
    <button
      :disabled="disabled || loading"
      class="sms-btn"
      :style="btnStyles"
      @click="send">
      <i v-if="loading" class="el-icon-loading"></i>
      <span v-else>{{countText}}</span>
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      styles: { // 文本框样式
        width: this.width,
        height: this.height,
        borderRadius: this.borderRadius
      },
      btnStyles: { // 按钮样式
        color: this.btnTextColor,
        background: this.btnBgColor,
        width: this.btnWidth
      },
      initText: this.btnText, // 初始文字
      countText: this.btnText, // 倒计时文字
      countTime: this.time, // 倒计时
      timer: null,
      disabled: false,
      loading: false
    }
  },
  props: {
    value: '',
    time: {
      type: Number,
      default: 60
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '48px'
    },
    borderColor: {
      type: String,
      default: '#c8c8cc'
    },
    borderRadius: {
      type: String,
      default: '4px'
    },
    btnTextColor: {
      type: String,
      default: '#ffffff'
    },
    btnWidth: {
      type: String,
      default: '100px'
    },
    btnBgColor: {
      type: String,
      default: '#095ad4'
    },
    btnText: {
      type: String,
      default: () => {
        return localStorage.getItem('lang') === 'CN' ? '发送' : 'Send'
      }
    },
    placeholder: {
      type: String,
      default: () => {
        return localStorage.getItem('lang') === 'CN' ? '请输入验证码' : 'Enter verification code'
      }
    }
  },
  methods: {
    start () {
      this.disabled = true
      if (this.countTime === 0) {
        this.countText = this.initText
        this.countTime = this.time
        this.disabled = false
      } else {
        this.countTime--
        this.countText = this.countTime
        this.timer = setTimeout(() => this.start(), 1000)
      }
    },
    send () {
      this.$emit('click')
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="less">
  .sms-container{
    height: 48px;
    position: relative;
    overflow: hidden;
    .sms-input{
      width: 100%;
      padding: 0 115px 0 15px;
      height: 100%;
      border: 1px solid #c8c8cc;
      font-size: 16px;
      color: #000;
    }
    .sms-btn{
      position: absolute;
      height: 100%;
      right: 0;
      top: 0;
      text-align: center;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      line-height: 1;
      &:hover{
        opacity: .9;
      }
      &:disabled{
        background: #aaa !important;
        opacity: 1;
        cursor: default;
      }
    }
  }
</style>
