<template>
  <div>
    <div class="header-wrap">
      <div class="header" :class="{'my-headerbg': myheaderBg}">
        <router-link tag="div" class="logo-box" to="/home">
          <div class="flex-item">
            <div class="img"></div>
            <div class="hr"></div>
            <div class="con">
              <div class="tit">READY</div>
              <div class="tit">PLAYER ONE</div>
            </div>
          </div>
        </router-link>
        <div class="head-nav">
          <li v-for="(item,index) in $t('header.headNavDatas')" :key="index">
            <i class="noIShow" :class="{'botBorderActive': defaultIndex === index}"></i>
            <router-link excat :to="item.path" tag="div" class="text">{{item.name}}</router-link>
          </li>
          <li class="login-signin" v-show="userInfo.length === 0">
            <router-link tag="div" excat class="login" @click.native="activeUser()" to="/login">{{$t('emailAicon.text7')}}</router-link>
            <router-link tag="div" excat class="register" @click.native="activeUser()" to="/register">{{$t('emailAicon.text8')}}</router-link>
          </li>
          <div class="login-signin user-center" @click="userNavChang()" v-show="userInfo.length !== 0">
            <!--<router-link tag="div" class="user-center" to="/account"></router-link>-->
            <img src="~@img/my/avatar.png" alt="">
            <span>{{userData.userName}}</span>
            <div class="select-UserCenter" :class="{selectUserCenter: selectUserCenterShow}">
              <router-link tag="div" to="/account" class="userNav">{{$t('header.text1')}}</router-link>
              <router-link tag="div" to="/account/joinLottery" class="userNav">{{$t('header.text2')}}</router-link>
              <div class="userNav logout" @click="logout()">{{$t('header.text3')}}</div>
            </div>
          </div>
          <div class="language">
            <div class="text">{{langValue}}</div>
            <div class="img"></div>
            <div class="lang-select">
              <div class="lang" @click="langchange(item)" v-for="(item,index) in languageData" :key="index">{{item.lang}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 移动端-->
      <div>
        <!-- header-->
        <div class="mobile-header" :class="{'header-bg': myheaderBg}">
          <router-link tag="div" class="logo-box" to="/home" v-show="isHomeShow">
            <div class="img"></div>
            <div class="hr"></div>
            <div class="con">
              <div class="tit">READY</div>
              <div class="tit">PLAYER ONE</div>
            </div>
          </router-link>
          <div class="right" @click="isShowMenu = !isShowMenu">
            <div class="right-menu" :class="{'close-menu': isShowMenu}"></div>
          </div>
        </div>
        <!-- 菜单-->
        <div class="show-menu" :class="{'menu-active': isShowMenu}">
        <ul class="uls">
          <li class="list-link" @click="gotoPath(9)">{{$t('header.headNavDatas[0].name')}}</li>
          <li class="list-link" @click="gotoPath(1)">{{$t('header.text4')}}</li>
          <li class="list-link" @click="gotoPath(2)">{{$t('header.text5')}}</li>
          <li class="list-link" @click="gotoPath(3)">{{$t('header.text6')}}</li>
          <li class="list-link" @click="gotoPath(4)">{{$t('header.text7')}}</li>
          <div v-if="userData.userName">
            <li class="list-link" @click="gotoPath(5)">{{$t('header.text1')}}</li>
            <!-- <li class="list-link" @click="gotoPath(6)">{{$t('header.text2')}}</li> -->
            <li class="list-link" @click="logout()">{{$t('header.text3')}}</li>
          </div>
          <div v-else>
            <li class="list-link" @click="gotoPath(7)">{{$t('emailAicon.text7')}}</li>
            <li class="list-link" @click="gotoPath(8)">{{$t('emailAicon.text8')}}</li>
          </div>
          <li class="active-language" @click="showSelect = !showSelect">
            <div class="img-box">
              <img :src="activeLang" alt="">
            </div>
            <span class="lang">{{langText}}</span>
            <div class="icon" :class="{'rotate-icon': showSelect}"></div>
          </li>
          <ul class="select-us" :class="{'show-select': showSelect}">
            <li class="item-list" @click="switchOne(0)">
              <div class="img-box">
                <img src="../assets/images/language/cn.png" alt="">
              </div>
              <span>CN</span>
            </li>
            <li class="item-list" @click="switchOne(1)">
              <div class="img-box">
                <img src="../assets/images/language/en.png" alt="">
              </div>
              <span>EN</span>
            </li>
          </ul>
        </ul>
      </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {i18n} from '../i18n/config'
import {mapGetters, mapActions} from 'vuex'
export default {
  data () {
    return {
      userAvatar: '',
      isAccount: false,
      isHomeShow: true,
      myheaderBg: false,
      isShowMenu: false,
      showSelect: false,
      activeLang: '',
      langArrImg: [
        require('../assets/images/language/cn.png'), require('../assets/images/language/en.png')
      ],
      userMenuShow: false,
      langMenuShow: false,
      langText: 'CN',
      langActive: 0,
      defaultIndex: 0,
      avatar: `${this.$api}` + `file/img?type=user&size=2&id=`, // 头像地址前缀
      highlight: false,
      navActiveFlag: false,
      languageShow: false,
      langValue: '',
      selectUserCenterShow: false,
      defaultLangIndex: 0,
      isActive: 1,
      languageData: [
        {
          lang: 'CN'
        },
        {
          lang: 'EN'
        }
      ]
    }
  },
  created () {
    if (localStorage.getItem('lang') === 'EN') {
      this.langText = 'EN'
      this.langValue = 'EN'
      this.activeLang = require('../assets/images/language/en.png')
    } else {
      this.langValue = 'CN'
      this.langText = 'CN'
      this.activeLang = require('../assets/images/language/cn.png')
    }
    setTimeout(() => {
      this.userAvatar = this.userData.imgUrl
    }, 1000)
  },
  computed: {
    ...mapGetters([
      'userInfo', // 用户信息
      'loginFlag',
      'userData'
    ]),
    routerPath () {
      return this.$route.path
    }
  },
  watch: {
    routerPath: function () {
      this.activeNav()
    }
  },
  mounted () {
    this.getUserBalance()
    this.$nextTick(() => {
      this.activeNav()
    })
  },
  methods: {
    errImg () {
      this.userAvatar = require('../assets/images/my/avatar.png')
    },
    ...mapActions([
      'getUserBalance',
      'logoutAction'
    ]),
    gotoPath (index) {
      this.isShowMenu = false
      if (index === 1) {
        this.$router.push('/game')
      } else if (index === 2) {
        this.$router.push('/recreation')
      } else if (index === 3) {
        this.$router.push('/artificial')
      } else if (index === 4) {
        this.$router.push('/about')
      } else if (index === 5) {
        this.$router.push('/account/accountMobile')
      } else if (index === 6) {
        this.$router.push('/account/joinLottery')
      } else if (index === 7) {
        this.$router.push('/login')
      } else if (index === 8) {
        this.$router.push('/register')
      } else if (index === 9) {
        this.$router.push('/')
      }
    },
    switchOne (index) {
      this.showSelect = false
      // this.$router.go(0)
      window.location.reload()
      if (index === 0) {
        this.langText = 'CN'
        this.activeLang = require('../assets/images/language/cn.png')
        localStorage.setItem('lang', 'CN')
      } else {
        localStorage.setItem('lang', 'EN')
        this.langText = 'EN'
        this.activeLang = require('../assets/images/language/en.png')
      }
    },
    logout () { // 退出登录
      this.$store.dispatch('logoutAction')
      this.isShowMenu = false
    },
    // 我的账户
    userNavChang (val) {
      this.selectUserCenterShow = !this.selectUserCenterShow
    },
    showMenu (num) {
      if (num === 1) {
        this.userMenuShow = true
      } else if (num === 2) {
        this.langMenuShow = true
      }
    },
    closeShowMenu (num) {
      if (num === 1) {
        this.userMenuShow = false
      } else if (num === 2) {
        this.langMenuShow = false
      }
    },
    chooseLang (val) { // 选择语言
      this.langActive = val
      if (val === 0) {
        localStorage.setItem('lang', 'CN')
        i18n.locale = 'CN'
        return (this.langText = 'CN')
      } else if (val === 1) {
        this.langText = 'English'
        localStorage.setItem('lang', 'EN')
        i18n.locale = 'EN'
        return (this.langText = 'English')
      } else if (val === 2) {
        localStorage.setItem('lang', 'JN')
        i18n.locale = 'JN'
      } else if (val === 3) {
        localStorage.setItem('lang', 'KN')
        i18n.locale = 'KN'
      }
      window.location.reload()
    },
    activeNav () {
      if (this.$route.path === '/home') {
        this.defaultIndex = 0
      } else if (this.$route.path === '/game') {
        this.defaultIndex = 1
      } else if (this.$route.path === '/recreation') {
        this.defaultIndex = 2
      } else if (this.$route.path === '/artificial') {
        this.defaultIndex = 3
      } else if (this.$route.path === '/about') {
        this.defaultIndex = 4
      } else {
        this.defaultIndex = -1
      }
      if (this.$route.path.indexOf('account') > -1 || this.$route.path.indexOf('lottery') > -1) {
        this.myheaderBg = true
        this.isHomeShow = false
      } else {
        this.isHomeShow = true
        this.myheaderBg = false
      }
    },
    activeUser () {
      this.defaultIndex = -1
    },
    langchange (item) {
      if (item.lang === 'CN') {
        localStorage.setItem('lang', 'CN')
      } else {
        localStorage.setItem('lang', 'EN')
      }
      this.langValue = item.lang
      this.isActive = 1
      this.$router.go(0)
    }
  }
}
</script>

<style lang="less" scoped>
img{
  width: 100%;
  height: 100%;
  display: block;
}
.header-wrap{
  width: 100%;
  height: 120px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  @media screen and (max-width: 1200px) {
    position: fixed;
    height: 70px;
  }
  .header{
    width: auto;
    height: 100%;
    line-height: 120px;
    background: url("../assets/images/home/new-home/head-nav.png") no-repeat;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 5px rgba(0,0,0,.2);
    &.my-headerbg{
      background: url("../assets/images/common/header-banner.png") no-repeat center / cover;
      justify-content: flex-start;
      padding: 0;
      .logo-box{
        width: 400px;
        justify-content: center;
        margin: 0;
        @media screen and (max-width: 1450px) {
          width: 240px;
        }
      }
    }
    @media screen and (max-width: 1920px) {
      width: 100%;
      margin: auto;
      padding: 0 20px;
    }
    @media screen and (max-width: 1200px) {
      display: none;
    }
    .logo-box{
      width: 232px;
      height: 46px;
      margin-left: 300px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .flex-item{
        display: flex;
        align-items: center;
      }
      @media screen and (max-width: 1920px) {
        margin-left: 0;
      }
      .img{
        width: 40px;
        height: 46px;
        background: url("../assets/images/home/new-home/logo.svg") no-repeat;
        background-size: 100% 100%;
        background-position: center;
      }
      .hr{
        width: 1px;
        height: 35px;
        margin: 0 20px;
        background: url("../assets/images/home/new-home/nav.png") no-repeat;
        @media screen and (max-width: 1450px) {
          margin: 0 10px;
        }
      }
      .con{
        width: 150px;
        height: 40px;
        line-height: 40px;
        .tit{
          line-height: 18px;
          padding-bottom: 5px;
          color: #fff;
          font-weight: bold;
          font-size: 18px;
          letter-spacing: 3px;
        }
      }
    }
    .head-nav{
      height: 100%;
      line-height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 90px;
      @media screen and (max-width: 1920px) {
        margin-left: 50px;
      }
      li{
        height: 100%;
        line-height: 120px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: color .4s ease-in-out;
        &:after{
          content: '';
          display: block;
          position: absolute;
          width: 0;
          height: 2px;
          background-color: #f9b72b;
          bottom: 0;
          left: 0;
          transition: width .4s ease-in-out;
        }
        &:hover{
          color: #f9b72b;
          &:after{
            width: 100%;
          }
        }
        i{
          &:after{
            content: '';
            display: block;
            position: absolute;
            width: 0;
            height: 2px;
            background-color: #f9b72b;
            bottom: 0;
            left: 0;
            transition: width .4s ease-in-out;
          }
          &.botBorderActive{
            &:after{
              width: 100%;
            }
          }
        }
        div{
          height: 100%;
          text-shadow: 0 1px 1px rgba(0,0,0, 1);
          &.is-active{
            height: 100%;
            color: #f9b72b;
            text-shadow: 0 2px 2px rgba(0,0,0, 1);
          }
        }
        .text{
          height: 100%;
          line-height: 120px;
          padding: 0 60px;
          text-align: center;
          color: #fff;
          position: relative;
          @media screen and (max-width: 1920px) {
            padding: 0 38px;
          }
          @media screen and (max-width: 1450px) {
            padding: 0 32px;
          }
          &:after{
            content: '';
            display: inline-block;
            width: 1px;
            height: 24px;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            border-right: 1px solid rgba(255,255,255, .2);
          }
        }
      }
      .login-signin{
        display: flex;
        align-items: center;
        margin: 0 26px 0 46px;
        &:after{
          display: none;
        }
        div{
          font-size: 16px;
          color: #fff;
          &:hover{
            color: #f9b72b;
          }
          &.is-active{
            color: #f9b72b;
          }
        }
        .userNav{
          line-height: 60px;
        }
        .logout{
          background-color: rgba(3,13,26,.8);
        }
        .login{
          padding-right: 20px;
        }
      }
      .user-center{
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;
        user-select: none;
        &:hover{
          /*.select-UserCenter{
            display: block;
          }*/
          img{
            box-shadow: 0 0 10px rgba(255,255,255,1);
          }
        }
        img{
          display: inline-block;
          width: 36px;
          height: 36px;
          border-radius: 100%;
          margin-right: 20px;
          box-shadow: 0 0 6px rgba(255,255,255,0.8);
          transition: all .6s;
        }
        span{
          font-size: 14px;
          color: #f9b72b;;
          text-shadow: 0 2px 2px rgba(0,0,0, 1);
        }
       /* .select-UserCenter{
          position: absolute;
          left: 0;
          top: 58px;
          z-index: 99;
          display: none;
          width: 100%;
          max-height: 200px;
          .userNav{
            line-height: 40px;
            text-align: center;
            user-select: none;
            &:hover{
              background-color: rgba(0,0,0, .1);
            }
          }
        }*/
      }
    }
    .language{
      display: flex;
      align-items: center;
      line-height: 120px;
      justify-content: space-between;
      cursor: pointer;
      padding-left: 20px;
      position: relative;
      &:hover{
        .lang-select{
          height: 80px;
        }
      }
      .text{
        font-size: 16px;
        color: #fff;
        padding-right: 20px;
        text-shadow: 0 1px 1px rgba(0,0,0, 1);
      }
      .img{
        width: 15px;
        height: 8px;
        background: url("../assets/images/home/new-home/the-arrow.png") no-repeat;
        background-position: center;
        background-size: cover;
      }
      .lang-select{
        .lang{
          line-height: 40px;
          color: #fff;
          &:hover{
            background-color: rgba(0,0,0,.1);
            color: #f9b72b;
          }
        }
      }
    }
  }
  .mobile-header{
    height: 70px;
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(0,0,0,.3);
    &.header-bg{
      background: url("../assets/images/common/mobile-banner.png") no-repeat center / cover;
    }
    @media screen and (max-width: 1200px) {
      display: block;
    }
    @media screen and (min-width: 1200px) {
      display: none;
    }
    .logo-box{
      height: 46px;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding-left: 20px;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      .img{
        width: 30px;
        height: 33px;
        background: url("../assets/images/home/new-home/logo.svg") no-repeat;
        background-size: 100% 100%;
        background-position: center;
      }
      .hr{
        width: 1px;
        height: 35px;
        margin: 0 10px;
        background: url("../assets/images/home/new-home/nav.png") no-repeat;
      }
      .con{
        .tit{
          line-height: 18px;
          padding-bottom: 5px;
          color: #fff;
          font-weight: bold;
          font-size: 16px;
          letter-spacing: 2px;
          &:nth-child(2){
            padding-bottom: 0;
          }
        }
      }
    }
    .right{
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 100002;
      padding: 10px 20px 10px 10px;
      cursor: pointer;
      .right-menu{
        width: 30px;
        height: 25px;
        background: url("../assets/images/common/menu.png") no-repeat center / cover;
        &.close-menu{
          background: url("../assets/images/common/close.png") no-repeat center / cover;
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  .show-menu{
    background-color: #030d1a;
    overflow: hidden;
    max-height: 0;
    transition: max-height .3s linear;
    display: none;
    position: fixed;
    top: 70px;
    width: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    @media screen and (max-width: 1200px) {
      display: block;
    }
    &.menu-active{
      max-height: 100%;
    }
    .uls{
      border-top: 1px solid #fff;
      .list-link{
        cursor: pointer;
        height: 50px;
        line-height: 50px;
        padding-left: 20px;
        color: #fff;
        font-size: 14px;
      }
      .active-language{
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #fff;
        padding-left: 20px;
        height: 50px;
        background-color: #0c141f;
        cursor: pointer;
        .lang{
          margin: 0 10px;
        }
        .img-box{
          width: 20px;
          height: 15px;
        }
        .icon{
          width: 15px;
          height: 8px;
          background: url("../assets/images/common/language-select.png") no-repeat center / cover;
          transform: rotate(0deg);
          transition: all .3s linear;
          &.rotate-icon{
            transform: rotate(180deg);
          }
        }
      }
      .select-us{
        max-height: 0;
        overflow: hidden;
        transition: max-height .3s linear;
        &.show-select{
          max-height: 100px;
        }
        .item-list{
          height: 50px;
          color: #fff;
          padding-left: 20px;
          display: flex;
          align-items: center;
          cursor: pointer;
          background-color: #131733;
          &:hover{
            background-color: #161b3b;
          }
          .img-box{
            width: 20px;
            height: 15px;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
