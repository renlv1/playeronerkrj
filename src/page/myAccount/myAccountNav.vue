<template>
  <div class="account">
    <div class="left-nav">
      <p class="title" to="/account" @click="tabAccountFan(0)">{{$t('navigation.text6')}}</p>
      <el-collapse-transition>
        <section v-show="defaultIndex === 0">
          <router-link tag="div" excat class="con" to="/account/myAccount">{{$t('navigation.text1')}}</router-link>
          <router-link tag="div" excat class="con" to="/account/accountInformation">{{$t('navigation.text7')}}</router-link>
          <router-link tag="div" excat class="con" to="/account/transactionAccount">{{$t('navigation.text8')}}</router-link>
          <router-link tag="div" excat class="con" to="/account/recommend">{{$t('navigation.text9')}}</router-link>
        </section>
      </el-collapse-transition>
      <p class="title" @click="tabAccountFan(1)">{{$t('navigation.text10')}}</p>
      <el-collapse-transition>
        <section v-show="defaultIndex === 1">
          <router-link tag="div" excat class="con" to="/account/recharge">{{$t('navigation.text2')}}</router-link>
          <router-link tag="div" excat class="con" to="/account/withdraw">{{$t('navigation.text3')}}</router-link>
          <router-link tag="div" excat class="con" to="/account/fbRecharge">{{$t('navigation.text22')}}</router-link>
          <router-link tag="div" excat class="con" to="/account/fbWithdraw">{{$t('navigation.text23')}}</router-link>
          <router-link tag="div" excat class="con" to="/account/transferAccounts">{{$t('navigation.text11')}}</router-link>
        </section>
      </el-collapse-transition>
      <p class="title" @click="tabAccountFan(2)">{{$t('navigation.text12')}}</p>
      <el-collapse-transition>
        <section v-show="defaultIndex === 2">
          <router-link tag="div" excat class="con" to="/account/joinLottery">{{$t('navigation.text13')}}</router-link>
          <router-link tag="div" excat class="con" to="/account/reward">{{$t('navigation.text14')}}</router-link>
          <router-link tag="div" excat class="con" to="/account/achievement">{{$t('navigation.text21')}}</router-link>
        </section>
      </el-collapse-transition>
      <p class="title" @click="tabAccountFan(3)">{{$t('navigation.text15')}}</p>
      <el-collapse-transition>
        <section v-show="defaultIndex === 3">
          <router-link tag="div" excat class="con" to="/account/order">{{$t('navigation.text16')}}</router-link>
          <router-link tag="div" excat class="con" to="/account/rechargeOrder">{{$t('navigation.text17')}}</router-link>
          <router-link tag="div" excat class="con" to="/account/withdrawOrder">{{$t('navigation.text18')}}</router-link>
        </section>
      </el-collapse-transition>
      <template v-if="$store.getters.userData.isboss === 2">
        <p class="title" @click="tabAccountFan(4)">{{$t('navigation.text24')}}</p>
        <el-collapse-transition>
          <section v-show="defaultIndex === 4">
            <router-link tag="div" excat class="con" to="/account/sharerRechargeOrder">{{$t('navigation.text17')}}</router-link>
            <router-link tag="div" excat class="con" to="/account/sharerWithdrawOrder">{{$t('navigation.text18')}}</router-link>
            <router-link tag="div" excat class="con" to="/account/sharerSettings">{{$t('shareSetting.text2')}}</router-link>
          </section>
        </el-collapse-transition>
      </template>
    </div>
    <div class="right-content">
      <router-view></router-view>
    </div>
    <info-one ref="infoOne"></info-one>
  </div>
</template>

<script>
import infoOne from '@/page/noInfomation/infoOne'
export default {
  data () {
    return {
      defaultIndex: parseInt(window.sessionStorage.getItem('accountMenuIndex')) || 0
    }
  },
  components: {
    infoOne
  },
  methods: {
    tabAccountFan (index) {
      if (this.defaultIndex === index) {
        this.defaultIndex = -1
      } else {
        this.defaultIndex = index
      }
      window.sessionStorage.setItem('accountMenuIndex', this.defaultIndex)
      if (index === 0) {
        this.$router.push('/account/myAccount')
      } else if (index === 1) {
        this.$router.push('/account/recharge')
      } else if (index === 2) {
        this.$router.push('/account/joinLottery')
      } else if (index === 3) {
        this.$router.push('/account/order')
      } else if (index === 4) {
        this.$router.push('/account/sharerRechargeOrder')
      }
    }
  },
  mounted () {
    this.$fetch.post('/user/balance').then(res => {
      if (res.data.success) {
        if (!res.data.data.user.email) {
          this.$refs.infoOne.show()
        }
      }
    })
  },
  beforeDestroy () {
    window.sessionStorage.removeItem('accountMenuIndex')
  }
}
</script>

<style lang="less" scoped>
  .account{
    display: flex;
    width: 100%;
    min-height: calc(100vh - 225px);
    padding-top: 120px;
    @media screen and (max-width: 1200px) {
      padding-top: 70px;
    }
    .left-nav{
      width: 400px;
      margin-right: 60px;
      background-color: #171d3d;
      @media screen and (min-width: 1200px) {
        display: block;
      }
      @media screen and (max-width: 1600px) {
        width: 240px;
        min-width: 240px;
      }
      @media screen and (max-width: 1200px) {
        display: none;
      }
      .title{
        font-size: 18px;
        color: #e7ac50;
        font-weight: bold;
        &.is-active{
          background-color: #273269;
        }
      }
      div,p{
        padding-left: 100px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
        @media screen and (max-width: 1600px) {
          padding-left: 50px;
        }
      }
      .con{
        font-size: 16px;
        color: #7693fc;
        &.is-active{
          background-color: #273269;
        }
      }
    }
    .right-content{
      flex: 1;
      padding-right: 10%;
      @media screen and (max-width: 1450px) {
        padding-right: 10px;
      }
      @media screen and (max-width: 1200px) {
        padding-right: 0;
        width: 100%;
      }
    }
    .pc-account{
      width: 100%;
      display: flex;
    }
  }
</style>
