<template>
  <div id="app" :class="lang === 'CN' ? 'cn' : 'en'">
    <input type="text" name="username" style="display:none;">
    <input type="checkbox" style="display:none;">
    <input type="password" name="password" style="display:none;">
    <v-header></v-header>
    <router-view class="main-container"/>
    <v-footer class="footer"></v-footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lang: window.localStorage.getItem('lang')
    }
  },
  components: {
    vHeader: resolve => require(['./components/header.vue'], resolve),
    vFooter: resolve => require(['./components/footer.vue'], resolve)
  }
}
</script>

<style lang="less">
@import "assets/css/reset.css";
@import "assets/css/common";
@import "assets/css/color";
@import "assets/css/account";
@import "assets/css/mixin";
#app{
  // background: #101229;
  min-height: 100vh;
  height: auto;
  position: relative;
}
#nprogress .bar {
  background: #f9b72b !important; // 进度条颜色
  z-index: 999999 !important;
}
</style>
