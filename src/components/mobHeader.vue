<template>
  <div class="mob-header">
    <div class="return" :class="{hide: hideReturn}" @click="goBack"></div>
    <div class="title">
      <slot></slot>
    </div>
    <div class="menu"></div>
  </div>
</template>

<script>
export default {
  props: {
    to: String,
    hideReturn: false
  },
  methods: {
    goBack () {
      if (this.to) {
        this.$router.replace(this.to)
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .mob-header{
    position: fixed;
    left: 5px;
    right: 55px;
    top: 0;
    z-index: 99999;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title{
      color: #fff;
      font-family: titleChi;
      font-size: 20px;
      max-width: 85%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
      padding-top: 2px;
    }
    .return{
      background: url('~@img/common/mob_return.png') no-repeat center;
      background-size: 20px;
      width: 37px;
      height: 31px;
      &.hide{
        visibility: hidden;
      }
    }
  }
</style>
