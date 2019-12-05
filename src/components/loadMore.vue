<template>
  <div class="scroll-wrap" ref="wrapper">
    <div v-show="initLoad">
      <div v-show="load" class="global-loading"></div>
      <div v-show="empty" class="global-empty">{{$t('common.emptyData')}}</div>
    </div>
    <slot></slot>
    <div class="loading-tips" v-show="!initLoad">
        <span v-show="!empty" class="loading">{{$t('common.loading')}}</span>
        <span v-show="empty" class="empty">{{$t('common.noMore')}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    distance: {
      type: Number,
      default: 100
    },
    empty: Boolean,
    load: Boolean
  },
  data () {
    return {
      initLoad: true,
      clientHeight: window.innerHeight // 窗口高度
    }
  },
  methods: {
    scroll () {
      let docHeight = document.documentElement.scrollHeight // 页面总高度
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 滚动条高度
      // let elementTop = this.$refs.wrapper.getBoundingClientRect().top + scrollTop // 元素位置
      let totalHeight = docHeight - this.distance // 减去阈值后的总高度
      let totalScroll = this.clientHeight + scrollTop // 窗口高度加上滚动条高度后的总距离
      let isLoad = this.load // 是否正在加载中

      if (totalScroll > totalHeight && !isLoad) {
        if (this.initLoad) {
          this.initLoad = false
        }
        this.$emit('bottom')
      }
    },
    bind () {
      if (window.innerWidth < 1200) {
        this.$emit('bottom') // 首次加载
        window.addEventListener('scroll', this.scroll)
      }
    },
    unBind () {
      window.removeEventListener('scroll', this.scroll)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.bind()
    })
  },
  beforeDestroy () {
    this.unBind()
  }
}
</script>

<style lang="less">
  .loading-tips{
    text-align: center;
    padding: 20px 0;
    font-size: 14px;
    color: #fff;
    line-height: 1.5;
    .loading{
      display: inline-block;
      background: url(~@img/common/loading_white.svg) no-repeat left center;
      background-size: 30px;
      padding-left: 30px;
    }
  }
</style>
