<template>
  <div class="tab-container">
    <div class="tab-hd">
      <div class="tab-hd-item"
        v-for="(item, index) in tabMenu"
        :key="item"
        @click="changeTab(index)"
        :class="{active: initIndex === index}"
      >
        {{item}}
      </div>
    </div>
    <div class="tab-bd">
      <div
        v-for="(item, index) in tabMenu"
        v-show="index === initIndex"
        :key="index"
      >
        <slot :name="`slot${index + 1}`"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      initIndex: this.tabIndex
    }
  },
  props: {
    tabMenu: {
      type: Array
    },
    tabIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    changeTab (index) {
      this.initIndex = index
      this.$emit('click', index)
    }
  }
}
</script>

<style lang="less">
  @tabColor: #7693fc;
  .tab-hd{
    display: flex;
    margin-bottom: 10px;
    border: 1px solid @tabColor;
    border-radius:4px;
    &-item{
      flex: 1;
      color: @tabColor;
      line-height: 46px;
      text-align: center;
      font-size: 16px;
      cursor: default;
      &.active{
        color: #ffffff;
        background: @tabColor;
      }
    }
  }
</style>
