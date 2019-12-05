<template>
  <div class="footer" v-show="hiddenFooter">
    <div class="info-box">
      <div class="nav">
        <div class="nav-li">
          <router-link tag="div" to="/game" class="li">{{$t('header.text4')}}</router-link>
          <router-link tag="div" to="/recreation" class="li">{{$t('header.text5')}}</router-link>
          <router-link tag="div" to="/artificial" class="li">{{$t('header.text6')}}</router-link>
          <router-link tag="div" to="/about" class="li">{{$t('header.text7')}}</router-link>
        </div>
      </div>
      <div class="copyright">Copyright © 2018 READY PLAYER ONE All Rights Reserved</div>
      <div class="ready">READY PLAYER ONE</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      hiddenFooter: true
    }
  },
  mounted () {
    this.getpathFooter()
    window.onresize = () => {
      this.getpathFooter()
    }
  },
  methods: {
    getpathFooter () {
      if (this.$route.path.indexOf('account') !== 0 && window.innerWidth < 1200) {
        this.hiddenFooter = false
      } else if (this.$route.path.indexOf('exchange') !== 0 && window.innerWidth < 1200) {
        this.hiddenFooter = false
      } else {
        this.hiddenFooter = true
      }
    }
  },
  watch: {
    '$route': 'getpathFooter'
  }
}
</script>
<style lang="less" rel="stylesheet/stylus" scoped>
  .footer{
    width: 100%;
    background-color: #0a0a0c;
    padding-bottom: 50px;
    @media screen and (max-width: 1024px) {
      display: none;
    }
    .info-box{
      .nav{
        width: auto;
        line-height: 12px;
        margin: auto;
        color: #937341;
        padding: 60px 0 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        .nav-li{
          width: 310px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .li{
            font-size: 12px;
            line-height: 12px;
            color: #937341;
            border-left: 1px solid #937341;
            padding-left: 10px;
            cursor: pointer;
            @media screen and (max-width: 1200px) {
              padding: 0 15px 0 8px;
            }
          }
        }
      }
      .copyright{
        text-align: center;
        color: #937341;
        font-size: 14px;
      }
      .ready{
        text-align: center;
        color: #937341;
        font-size: 18px;
        padding: 28px 0 38px;
        line-height: 18px;
        padding-bottom: 5px;
        font-weight: bold;
        letter-spacing: 2px;
      }
    }
  }
</style>
