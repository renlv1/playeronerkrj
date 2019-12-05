<template>
  <div>
    <div class="home-wrap">
      <div class="banner">
        <div class="title">
          <div class="tit-bf">
            <img :src="titleImges" alt="">
          </div>
        </div>
        <div class="word">
          <img :src="Reversaloftheworld" alt="">
        </div>
        <!--当前活动未开始0,活动正常开始1可以进详情,活动结束进不了-->
        <div class="view-details" @mouseover="tabChange()" @mouseout="tabChangeOut" v-if="roundState === 0 || roundState === 1" @click="theCurrentActivity()">
          <div class="con">
            <img :src="changtabkeImg" alt="">
            <!--{{$t('accountBank.text59')}}-->
          </div>
        </div>
        <!--活动就结束2,不进详情显示没有活动提示-->
        <div class="view-details" @mouseover="tabChange()" @mouseout="tabChangeOut" v-if="roundState === 2" @click="noActivity()">
          <div class="con">
            <img :src="changtabkeImg" alt="">
            <!--{{$t('accountBank.text59')}}-->
          </div>
          <div class="no-hd" :class="{noactive: noactiveSHow}">
            <div class="con-hd">{{$t('home.text23')}}</div>
          </div>
        </div>
        <div class="please-log-in">
          <div>{{$t('home.text2')}},<span v-if="loginFlag === false">{{$t('home.text3')}}</span></div>
          <div class="goto-btn">
            <router-link v-if="loginFlag === false" to="/login" tag="div" class="login">{{$t('home.text4')}}</router-link>
            <router-link v-if="loginFlag === false" to="/register" tag="div" class="signin">{{$t('home.text5')}}</router-link>
            <router-link to="/account" class="userName" v-show="loginFlag === true">{{userData.userName}}</router-link>
          </div>
        </div>
        <div class="recreation">
          <div class="l-img"></div>
          <div class="con">{{$t('home.text10')}}</div>
          <div class="r-img"></div>
        </div>
        <div class="rule">
          <div class="hr"></div>
          <div class="square">
            <div class="fk">
              <div class="con"></div>
            </div>
            <span class="text">{{$t('home.text6')}}</span>
            <div class="bottom-num"><span>{{minJoinAmount | f4}}RPO</span></div>
          </div>
          <div class="square">
            <div class="fk">
              <div class="con"></div>
            </div>
            <span class="text">{{$t('home.text7')}}</span>
            <div class="bottom-num">{{earningsRatio * 100}}% / {{$t('home.text9')}}</div>
          </div>
          <div class="square">
            <div class="fk">
              <div class="con"></div>
            </div>
            <span class="text">{{$t('home.text8')}}</span>
            <div class="bottom-num"><span>{{bonusReturnRatio * 100}}%</span></div>
          </div>
        </div>
        <div class="bonus-tab">
          <!--Tab-->
          <div class="Table-fhBtn" @click="tabUsingBonuses(index)" v-for="(item,index) in usingBonusesTabDatas" :key="index">
            <div class="btn-inbox">
              <div class="info">
                <div class="l-img">
                  <div class="bg" v-if="defaultIndex === index"><img :src="item.activeLeftBgImg" alt=""></div>
                  <div class="bg" v-else><img :src="item.leftBgImg" alt=""></div>
                </div>
                <div class="con">
                  <img v-if="defaultIndex === index" :src="item.activeTitleImg" alt="">
                  <img v-else :src="item.titleImg" alt="">
                </div>
                <div class="r-img">
                  <div class="bg" v-if="defaultIndex === index"><img :src="item.activeRightBgImg" alt=""></div>
                  <div class="bg" v-else><img :src="item.rightBgImg" alt=""></div>
                </div>
              </div>
              <div class="num" :class="{activenum: defaultIndex === index}">{{item.dividePool | f4}} RPO</div>
            </div>
          </div>
        </div>
        <div class="app-bounus-tab">
          <div class="Table-fhBtn">
            <div class="btn-inbox">
              <div class="info">
                <div class="l-img">
                  <div class="bg"><img src="../../assets/images/home/new-home/left.png" alt=""></div>
                </div>
                <div class="con">
                  <img :src="$t('home.jjTabImg')" alt="">
                </div>
                <div class="r-img">
                  <div class="bg"><img src="../../assets/images/home/new-home/right.png" alt=""></div>
                </div>
              </div>
              <div class="num">{{appDividePool | f4}} RPO</div>
            </div>
          </div>
        </div>
        <div class="bonus-border">
          <div class="l-top"></div>
          <div class="l-bot"></div>
          <div class="r-top"></div>
          <div class="r-bot"></div>
        </div>
        <div class="hr"></div>
        <div class="bot-bor"></div>
        <div class="bot-center-bor"></div>
        <div class="top-center"></div>
        <div class="bot-center"></div>
      </div>
      <div class="detail-main">
        <div class="start-time">
          <span class="end-time" v-if="this.hour && this.min && this.sce && roundState === 1">{{$t('home.text11')}} : {{dayDur}}{{$t('home.text9')}} {{hourDur}}{{$t('home.text12')}} : {{minDur}}{{$t('home.text13')}} : {{secDur}}{{$t('home.text14')}}</span>
          <span class="end-time" v-if="this.hour && this.min && this.sce && roundState === 0">{{$t('home.text24')}} {{day}}{{$t('home.text9')}} {{hour}}{{$t('home.text12')}} : {{min}}{{$t('home.text13')}} : {{sce}}{{$t('home.text14')}}</span>
          <!--<span class="end-time" v-else-if="this.hour === '00' && this.min === '00' && this.sce === '00'">00天00小时:00分:00秒</span>-->
          <span class="end-time" v-if="roundState === 2">00{{$t('home.text9')}} 00{{$t('home.text12')}} : 00{{$t('home.text13')}} : 00{{$t('home.text14')}}</span>
        </div>
        <div class="title">
          <div class="lf-img"></div>
          <div class="tit" v-show="defaultIndex === index" v-for="(item, index) in $t('home.titleDatas')" :key="index">
            <img :src="item.titsImg" alt="">
          </div>
          <div class="rh-img"></div>
        </div>
        <div class="list-box">
          <div class="list-title">
            <div class="tit">{{$t('home.text15')}}</div>
            <div class="tit">{{$t('home.text16')}}</div>
            <div class="tit">{{$t('home.text17')}}</div>
            <div class="tit">{{$t('home.text18')}}</div>
          </div>
          <!--// 暫無數據-->
          <div v-show="defaultIndex === 0 && recreationDatas.length === 0">
            <div class="global-empty">{{$t('common.emptyData')}}</div>
          </div>
          <div v-show="defaultIndex === 1 && bonusPoolsDatas.length === 0">
            <div class="global-empty">{{$t('common.emptyData')}}</div>
          </div>
          <!--活動未开始0,正常1,結束2都显示顯示-->
          <!--PC分红池-->
          <div class="list" v-if="defaultIndex === 0 && (roundState === 0 || roundState === 1 || roundState === 2)" v-for="(item, index) in recreationDatas" :key="index">
            <div class="con num">{{item.id}}</div>
            <div class="con expenditure" :class="{homered: item.changeType === 2 || item.changeType === 4 , homegreen: item.changeType === 1 || item.changeType === 3}">{{numToTransText(item.changeType, 1)}}</div>
            <div class="con sum">{{item.changeAmount | f4}}<span>RPO</span></div>
            <div class="con time">{{$changeDate(item.createAt, '/')}}</div>
            <!--<div class="con particulars">詳情</div>-->
            <div v-if="load" class="global-loading"></div>
            <!-- <div v-else>
              <div v-if="!recreationDatas.length">
                <div class="global-empty">{{$t('common.emptyData')}}</div>
              </div>
            </div> -->
            <div v-if="recreationDatas.length" class="paging-bg el-pagination-wrap">
              <el-pagination
                layout="prev, pager, next"
                @current-change="getBonus"
                :current-page.sync="currentPage1"
                :page-size="pageSize"
                :total="total">
              </el-pagination>
            </div>
          </div>
          <!--PC奖金池-->
          <div class="list" v-if="defaultIndex === 1 && (roundState === 0 || roundState === 1 || roundState === 2)" v-for="(item,index) in bonusPoolsDatas" :key="index">
            <div class="con num">{{item.id}}</div>
            <div class="con expenditure" :class="{homered: item.changeType === 2 || item.changeType === 4 , homegreen: item.changeType === 1 || item.changeType === 3}">{{numToTransText(item.changeType, 2)}}</div>
            <div class="con sum">{{item.changeAmount | f4}}<span>RPO</span></div>
            <div class="con time">{{changeTime(item.createAt)}}</div>
            <div v-if="bonusPoolsDatas.length" class="paging-bg el-pagination-wrap">
              <el-pagination
                layout="prev, pager, next"
                @current-change="getPools"
                :current-page.sync="currentPage2"
                :page-size="pageSize"
                :total="total2">
              </el-pagination>
            </div>
          </div>

        </div>
      </div>
      <div class="app-detail-main fenHong">
        <div class="start-time">
          <span class="end-time" v-if="this.hour && this.min && this.sce && roundState === 1">{{$t('home.text11')}} : {{dayDur}}{{$t('home.text9')}} {{hourDur}}{{$t('home.text12')}} :{{minDur}}{{$t('home.text13')}} :{{secDur}}{{$t('home.text14')}}</span>
          <span class="end-time" v-if="this.hour && this.min && this.sce && roundState === 0">{{$t('home.text24')}} {{day}}{{$t('home.text9')}} {{hour}}{{$t('home.text12')}} : {{min}}{{$t('home.text13')}} : {{sce}}{{$t('home.text14')}}</span>
          <!--<span class="end-time" v-else-if="this.hour === '00' && this.min === '00' && this.sce === '00'">00天00小时:00分:00秒</span>-->
          <span class="end-time" v-if="roundState === 2">00{{$t('home.text9')}} 00{{$t('home.text12')}} :00{{$t('home.text13')}} :00{{$t('home.text14')}}</span>
        </div>
        <div class="title">
          <div class="lf-img"></div>
          <div class="tit">
            <img :src="$t('home.fhImg')" alt="">
          </div>
          <div class="rh-img"></div>
        </div>
        <div class="list-box">
          <!--暫無數據-->
          <div class="global-box" v-if="recreationDatas.length === 0">
            <div class="global-empty"></div>
            <div>{{$t('common.emptyData')}}</div>
          </div>
          <!--App分红池-->
          <div class="list" v-if="roundState === 0 || roundState === 1 || roundState === 2" v-for="(item,index) in recreationDatas" :key="index">
            <div class="content-box">
              <div class="info-li">
                <div class="con num">{{item.changeAmount | f4}}<span> RPO</span></div>
                <div class="con num"><span class="bh">{{$t('home.text15')}}</span> : {{item.id}}</div>
              </div>
              <div class="info-li">
                <div class="con expenditure" :class="{homered: item.changeType === 2 || item.changeType === 4 , homegreen: item.changeType === 1 || item.changeType === 3}">{{numToTransText(item.changeType, 1)}}</div>
                <div class="con time">{{$changeDate(item.createAt, '/')}}</div>
              </div>
            </div>
            <div v-if="recreationDatas.length" class="paging-bg el-pagination-wrap">
              <el-pagination
                layout="prev, pager, next"
                @current-change="getBonus"
                :current-page.sync="currentPage1"
                :page-size="pageSize"
                :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
      <div class="app-bounus-two">
        <div class="bou-box">
          <div class="Table-fhBtn">
            <div class="btn-inbox">
              <div class="info">
                <div class="l-img">
                  <div class="bg"><img src="../../assets/images/home/new-home/left.png" alt=""></div>
                </div>
                <div class="con">
                  <img :src="$t('home.fhTabImg')" alt="">
                </div>
                <div class="r-img">
                  <div class="bg"><img src="../../assets/images/home/new-home/right.png" alt=""></div>
                </div>
              </div>
              <div class="num">{{appRewardPool | f4}} RPO</div>
            </div>
          </div>
        </div>
        <div class="bor-top"></div>
        <div class="bor-bot"></div>
      </div>
      <div class="app-detail-main jianJin">
        <div class="start-time">
          <span class="end-time" v-if="this.hour && this.min && this.sce && roundState === 1">{{$t('home.text11')}} : {{dayDur}}{{$t('home.text9')}} {{hourDur}}{{$t('home.text12')}} : {{minDur}}{{$t('home.text13')}} : {{secDur}}{{$t('home.text14')}}</span>
          <span class="end-time" v-if="this.hour && this.min && this.sce && roundState === 0">{{$t('home.text24')}} {{day}}{{$t('home.text9')}} {{hour}}{{$t('home.text12')}} : {{min}}{{$t('home.text13')}} : {{sce}}{{$t('home.text14')}}</span>
          <!--<span class="end-time" v-else-if="this.hour === '00' && this.min === '00' && this.sce === '00'">00天00小时:00分:00秒</span>-->
          <span class="end-time" v-if="roundState === 2">00{{$t('home.text9')}} 00{{$t('home.text12')}} : 00{{$t('home.text13')}} : 00{{$t('home.text14')}}</span>
        </div>
        <div class="title">
          <div class="lf-img"></div>
          <div class="tit">
            <img :src="$t('home.jjImg')" alt="">
          </div>
          <div class="rh-img"></div>
        </div>
        <div class="list-box">
          <!--活動未開始，暫無數據-->
          <div class="global-box" v-if="bonusPoolsDatas.length === 0">
            <div class="global-empty"></div>
            <div>{{$t('common.emptyData')}}</div>
          </div>
          <!-- app奖金池-->
          <div class="list" v-if="roundState === 0 || roundState === 1 || roundState === 2" v-for="(item,index) in bonusPoolsDatas" :key="index">
            <div class="content-box">
              <div class="info-li">
                <div class="con num">{{item.changeAmount | f4}}<span>RPO</span></div>
                <div class="con num"><span class="bh">{{$t('home.text15')}}</span> : {{item.id}}</div>
              </div>
              <div class="info-li">
                <div class="con expenditure" :class="{homered: item.changeType === 2 || item.changeType === 4 , homegreen: item.changeType === 1 || item.changeType === 3}">{{numToTransText(item.changeType, 2)}}</div>
                <div class="con time">{{changeTime(item.createAt)}}</div>
              </div>
            </div>
            <!-- 分页-->
            <div v-if="bonusPoolsDatas.length" class="paging-bg el-pagination-wrap">
              <el-pagination
                layout="prev, pager, next"
                @current-change="getPools"
                :current-page.sync="currentPage2"
                :page-size="pageSize"
                :total="total2">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <info-one ref="infoOne"></info-one>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      nohdHInt: false,
      noactiveSHow: false,
      noRoundListNull: [],
      Reversaloftheworld: '',
      ckxqImage: '',
      titleImges: '',
      currentPage1: 1,
      currentPage2: 1,
      defaultIndex: 0,
      roundState: 0,
      activeClass: false,
      usingBonusesTabDatas: this.$t('home.usingBonusesTabDatas'),
      changtabkeImg: this.$t('home.tabkeBtnCn'),
      titleDatas: [
        {
          titText: '分红池收支明细'
        },
        {
          titText: '奖金池收支明细'
        }
      ],
      noDataShow: false,
      recreationDatas: [], // 分红池总金额
      bonusPoolsDatas: [], // 奖金池总金额
      LoginFlag: false, // 用户是否登录
      timeArr: [], // 倒計時數組
      endAt: '', // 活動結束時間
      startAt: '', // 活动开始时间
      timer: '',
      time1: '',
      timer2: '',
      day: '',
      hour: '',
      min: '',
      sce: '',
      dayDur: '', // 已经开始的天数
      hourDur: '', // 已经开始的小时
      minDur: '', // 已经开始的分钟
      secDur: '', // 已经开始的秒数
      isRed: false,
      pageSize: 8,
      total: 1,
      total2: 1,
      load: true,
      activityId: 0,
      bonusReturnRatio: '',
      earningsRatio: '',
      minJoinAmount: '',
      id: '',
      appDividePool: '',
      appRewardPool: ''
    }
  },
  components: {
    infoOne: resolve => require(['../noInfomation/infoOne'], resolve)
  },
  computed: {
    ...mapGetters([
      'loginFlag',
      'userData'
    ])
  },
  created () {
    if (window.localStorage.getItem('lang') === 'EN') {
      this.Reversaloftheworld = require('../../assets/images/home/new-home/en/Turnovertheworld.png')
      this.ckxqImage = require('../../assets/images/home/new-home/en/Viewdetails.png')
      this.titleImges = require('../../assets/images/home/new-home/en/-ReadyPlayerOne-.png')
    } else {
      this.Reversaloftheworld = require('../../assets/images/home/new-home/Reversaloftheworld.png')
      this.ckxqImage = require('../../assets/images/home/new-home/vd-con.png')
      this.titleImges = require('../../assets/images/home/new-home/title.png')
    }
    this.getRoundId()
    this.time1 = setInterval(() => {
      this.getRoundId()
    }, 15000)
    if (this.$route.query.token) {
      this.$store.dispatch('getRadarUserBalance')
      setTimeout(() => {
        if (this.userData.openTradePassword !== 2) {
          this.$refs.infoOne.show()
        }
      }, 1000)
      // 第三方登录,获取token,拿到用户信息
      // this.$http.post(`${this.$api}/user/radarSsoLogin?loginToken=${this.$route.query.token}`).then((res) => {
      // console.log(res.data.data.user)
      // })
    }
  },
  mounted () {
    this.getRoundId()
    this.$nextTick(() => {
      if (window.history && window.history.pushState) {
        history.pushState(null, null, document.URL)
        window.addEventListener('popstate', this.goBack, false)
      }
    })
  },
  beforeDestroy () {
    clearTimeout(this.timer)
    clearInterval(this.time1)
  },
  destroyed () {
    window.removeEventListener('popstate', this.goBack, false)
  },
  methods: {
    goBack () {
      if (window.history.length > 1) {
        this.$router.go(1)
      }
    },
    tabChange () {
      if (window.localStorage.getItem('lang') === 'EN') {
        this.changtabkeImg = require('../../assets/images/home/take-btnb-en.png')
      } else {
        this.changtabkeImg = require('../../assets/images/home/take-btnb-cn.png')
      }
    },
    tabChangeOut () {
      if (window.localStorage.getItem('lang') === 'EN') {
        this.changtabkeImg = require('../../assets/images/home/take-btna-en.png')
      } else {
        this.changtabkeImg = require('../../assets/images/home/take-btna-cn.png')
      }
    },
    tabUsingBonuses (index) {
      this.defaultIndex = index
    },
    // 活动开始倒计时
    countDowns () {
      let leftTime = (this.startAt - Date.parse(new Date()))
      if (Number(leftTime) <= 0) {
        this.day = '00'
        this.hour = '00'
        this.min = '00'
        this.sce = '00'
        clearTimeout(this.timer2)
      }
      if (this.startAt > Date.parse(new Date())) {
        let days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10) // 计算剩余的天数
        let hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10) // 计算剩余的小时
        let minutes = parseInt(leftTime / 1000 / 60 % 60, 10) // 计算剩余的分钟
        let seconds = parseInt(leftTime / 1000 % 60, 10) // 计算剩余的秒数
        let newTimeArr = []
        newTimeArr.push(days, hours, minutes, seconds)
        this.timer2 = setTimeout(() => this.countDowns(), 1000)
        this.timeArr = newTimeArr
        this.day = newTimeArr[0]
        if (Number(this.day) === 0) {
          this.day = '00'
        }
        this.hour = newTimeArr[1]
        if (Number(this.hour) === 0) {
          this.hour = '00'
        } else if (Number(this.hour) < 10) {
          this.hour = '0' + this.hour
        } else {
          this.hour = this.hour
        }
        this.min = newTimeArr[2]
        if (Number(this.min) === 0) {
          this.min = '00'
        } else if (Number(this.min) < 10) {
          this.min = '0' + this.min
        } else {
          this.min = this.min
        }
        this.sce = newTimeArr[3]
        if (Number(this.sce) === 0) {
          this.sce = '00'
        } else if (Number(this.sce) < 10) {
          this.sce = '0' + this.sce
        } else {
          this.sce = this.sce
        }
      }
    },
    checkTime (i) {
      if (i < 10) {
        i = '0' + i
      }
      return i
    },
    // 游戏已经开始的天数,计时器
    durations () {
      let leftTime = (Date.parse(new Date()) - this.startAt) // 计算已经开始的毫秒数
      if (Date.parse(new Date()) === this.endAt) {
        this.dayDur = parseInt(this.endAt / 1000 / 60 / 60 / 24, 10) // 结束的天数
        this.hourDur = parseInt(this.endAt / 1000 / 60 / 60 % 24, 10) // 结束的小时
        this.minDur = parseInt(this.endAt / 1000 / 60 % 60, 10) // 结束的小时
        this.secDur = parseInt(this.endAt / 1000 % 60, 10) // 结束的秒数
        setTimeout(this.timer)
      } else {
        leftTime++
        let days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10) // 计算已经开始的天数
        let hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10) // 计算已经开始的小时
        let minutes = parseInt(leftTime / 1000 / 60 % 60, 10) // 计算已经开始的分钟
        let seconds = parseInt(leftTime / 1000 % 60, 10) // 计算已经开始的秒数
        days = this.checkTime(days)
        hours = this.checkTime(hours)
        minutes = this.checkTime(minutes)
        seconds = this.checkTime(seconds)
        let addTimeArr = []
        addTimeArr.push(days, hours, minutes, seconds)
        this.timer = setTimeout(() => this.durations(), 1000)
        this.addArr = addTimeArr
        this.dayDur = this.addArr[0] // 已经开始的天数
        this.hourDur = this.addArr[1] // 已经开始的小时
        this.minDur = this.addArr[2] // 已经开始的分钟
        this.secDur = this.addArr[3] // 已经开始的秒数
      }
    },
    changeTime (time) { // 转换时间的格式
      return this.$changeDate(time, '/', 1)
    },
    // 没有活动
    noActivity () {
      this.noactiveSHow = true
      setTimeout(() => {
        this.noactiveSHow = false
      }, 2000)
    },
    getRoundId () { // 根据活动列表的第一条id,再请求分红池与奖金池明细
      this.$fetch.post('/lotto/lottoRewardRoundList', {
        pageSize: 1,
        pageIndex: 1
      }).then(res => {
        this.noRoundListNull = res.data.data.roundList
        this.total = res.data.data.totalPage
        if (this.noRoundListNull.length !== 0) {
          this.usingBonusesTabDatas[0].dividePool = res.data.data.roundList[0].dividePool
          this.usingBonusesTabDatas[1].dividePool = res.data.data.roundList[0].rewardPool
          this.appDividePool = res.data.data.roundList[0].dividePool
          this.appRewardPool = res.data.data.roundList[0].rewardPool
          this.usingBonusesTabDatas[0].currency = res.data.data.roundList[0].rewardCurrency
          this.usingBonusesTabDatas[1].currency = res.data.data.roundList[0].rewardCurrency
          this.id = res.data.data.roundList[0].id
          this.roundState = res.data.data.roundList[0].roundState // 活动状态 1 活动中 2 已结束// 活动状态 1 活动中 2 已结束
          this.endAt = res.data.data.roundList[0].endAt
          this.startAt = res.data.data.roundList[0].startAt
          this.activityId = res.data.data.roundList[0].id
          this.bonusReturnRatio = res.data.data.roundList[0].bonusReturnRatio // 奖金池奖励比例 单笔投注金额×500%
          this.earningsRatio = res.data.data.roundList[0].earningsRatio // 每天发放投注金额  单笔投注金额×2%
          this.minJoinAmount = res.data.data.roundList[0].minJoinAmount // 单笔最低投注金额
          this.rewardCurrency = res.data.data.roundList[0].rewardCurrency // 币种
          this.countDowns()
          this.durations()
          this.getBonus()
          this.getPools()
        }
      })
    },
    // 分紅池列表
    getBonus (pageIndex = 1) {
      this.$fetch.post('/lotto/getBonusLogList', {
        roundId: this.id,
        type: 1,
        pageSize: this.pageSize,
        pageIndex
      }).then((res) => {
        this.load = false
        if (res.data.success) {
          if (res.data.data.bonusLogList.length !== 0) {
            this.recreationDatas = res.data.data.bonusLogList
          }
          this.total = res.data.data.totalRecord
        } else {
          this.noDataShow = true
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    // 獎金池列表
    getPools (pageIndex = 1) {
      this.$fetch.post('/lotto/getBonusLogList', {
        roundId: this.id,
        type: 2,
        pageSize: this.pageSize,
        pageIndex
      }).then((res) => {
        if (res.data.success) {
          if (res.data.data.bonusLogList.length !== 0) {
            this.bonusPoolsDatas = res.data.data.bonusLogList
          }
          this.total2 = res.data.data.totalRecord
        } else {
          this.noDataShow = true
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    getBonusPools (page = 1) {
      this.$http.post(`${this.$api}/lotto/lottoRewardRoundList?pageIndex=${page}&pageSize=${this.pageSize}&roundState=1&joinState=1`).then((res) => {
        // console.log(res)
        if (res.data.success) {
          // this.alreadyTime = Date.parse(new Date()) - (res.data.data.roundList[0].startAt) // 获得已经开始时间
          if (res.data.data.roundList[0].id) {
            // 奖金池列表
            this.$http.post(`${this.$api}/lotto/getBonusLogList?pageIndex=${page}&pageSize=${this.pageSize}&type=2&roundId=${res.data.data.roundList[0].id}`).then((res) => {
              // console.log('獎金池' + res)
              this.load = false
              if (res.data.success) {
                this.bonusPoolsDatas = res.data.data.bonusLogList
                this.total = res.data.data.totalRecord
              } else {
                this.noDataShow = true
              }
            }).catch((error) => {
              console.log(error)
            })
            // 分紅池列表
            this.$http.post(`${this.$api}/lotto/getBonusLogList?pageIndex=${page}&pageSize=${this.pageSize}&type=1&roundId=${res.data.data.roundList[0].id}`).then((res) => {
              this.load = false
              // console.log('分紅池' + res)
              if (res.data.success === true) {
                this.recreationDatas = res.data.data.bonusLogList
                this.total = res.data.data.totalRecord
              } else {
                this.noDataShow = true
              }
            }).catch((error) => {
              console.log(error)
            })
          }
        }
      })
    },
    numToTransText (num, index) { // 后端返回的数字转换为对应的文字
      if (index === 1) { //  1 奖金池投注收入 2 分红支出  3 奖金池投注收入  4 奖金池奖励支出
        if (num === 1 || num === 3) {
          // return '投注收入'
          return this.$t('home.text20')
        } else if (num === 2) {
          this.isRed = true
          return this.$t('home.text21')
        } else if (num === 4) {
          this.isRed = true
          // return '奖励支出'
          return this.$t('home.text22')
        }
      } else {
        if (num === 1 || num === 3) {
          return this.$t('home.text20')
        } else if (num === 2) {
          this.isRed = true
          // return this.$t('serialEat.text27')
          return this.$t('home.text21')
        } else if (num === 4) {
          this.isRed = true
          // return '奖励支出'
          return this.$t('home.text22')
        }
      }
    },
    // 立即参与,查看活動詳情
    theCurrentActivity () {
      this.$router.push({path: '/lotteryDetail', query: {id: this.activityId}})
    }
  }
}
</script>

<style lang="less" scoped>
.home-wrap{
  width: 100%;
  height: 100%;
  .banner{
    width: 100%;
    height: 952px;
    background: url("../../assets/images/home/new-home/banner.png") no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
    @media screen and (max-width: 768px){
      border-bottom: 1px solid #1f2684;
    }
    @media screen and (max-width: 750px){
      height: 830px;
      background: url("../../assets/images/home/new-home/app-banner.png") no-repeat center;
      background-size: 100% 100%;
    }
    .title{
      width: auto;
      background-size: 100%;
      background-position: center;
      margin: auto;
      padding-top: 244px;
      @media screen and (max-width: 750px){
        padding-top: 170px;
      }
      .tit-bf{
        height: 54px;
        text-align: center;
        @media screen and (max-width: 750px){
          width: 235px;
          margin: 0 auto;
          img{
            width: 100%;
          }
        }
      }
    }
    .word{
      text-align: center;
      margin: 15px auto 60px;
      @media screen and (max-width: 768px){
        width: 80%;
        margin: 0 auto;
        img{
          width: 100%;
        }
      }
      @media screen and (max-width: 750px){
        width: 235px;
        margin: 0 auto;
        img{
          width: 100%;
        }
      }
    }
    .view-details{
      width: 599px;
      height: 78px;
      display: flex;
      align-items: center;
      background: url("../../assets/images/home/new-home/vd-bg.png") no-repeat;
      background-size: 100% 100%;
      background-position: center;
      margin: auto;
      cursor: pointer;
      position: relative;
      @media screen and (max-width: 768px){
        width: 100%;
        margin-top: 50px;
        background: none;
      }
      &:hover{
        .con{
          color: #f9b72b;
        }
      }
      .con{
        margin: auto;
        text-align: center;
        transition: all .6s;
        width: 277px;
        height: 78px;
        line-height: 78px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-shadow: 0 2px 2px rgba(0,0,0, 1);
        @media screen and (max-width: 750px){
          width: 220px;
          background-size: 100% 100%;
          height: 70px;
          line-height: 70px;
          font-size: 24px;
          img{
            width: 100%;
          }
        }
      }
    }
    .please-log-in{
      width: auto;
      height: 18px;
      line-height: 18px;
      margin: 64px auto 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 18px;
      @media screen and (max-width: 750px){
        display: block;
        height: auto;
        margin: 48px auto 30px;
        div{
          text-align: center;
        }
      }
      div{
        text-shadow: 0 1px 1px rgba(0,0,0, 1);
        span{
          padding-left: 15px;
        }
      }
      .goto-btn{
        width: 152px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        margin-left: 20px;
        text-shadow: 0 2px 2px rgba(0,0,0, 1);
        &:hover{
          .userName{
            color: #fff;
          }
        }
        @media screen and (max-width: 750px){
          width: 150px;
          margin: 0 auto;
          margin-top: 20px;
        }
        &:after{
          content: '';
          display: inline-block;
          position: absolute;
          width: 8px;
          height: 16px;
          background: url("../../assets/images/home/new-home/01.png") no-repeat;
          top: 50%;
          left: 0;
          transform: translateY(-50%)
        }
        &:before{
          content: '';
          display: inline-block;
          position: absolute;
          width: 8px;
          height: 16px;
          background: url("../../assets/images/home/new-home/02.png") no-repeat;
          top: 50%;
          right: 0;
          transform: translateY(-50%)
        }
        div{
          flex: 1;
          text-align: center;
          color: #f9b72b;
          font-size: 16px;
          cursor: pointer;
        }
        .login{
          padding-left: 10px;
          text-shadow: 0 2px 2px rgba(0,0,0, 1);
          @media screen and (max-width: 750px){
            padding: 0;
            text-align: center;
          }
          &:hover{
            color: #fff;
          }
        }
        .signin{
          padding-right: 16px;
          text-shadow: 0 2px 2px rgba(0,0,0, 1);
          @media screen and (max-width: 750px){
            padding-right: 8px;
            text-align: center;
          }
          &:hover{
            color: #fff;
          }
        }
        .userName{
          flex: 1;
          text-align: center;
          color: #f9b72b;
          font-size: 16px;
          padding: 0 16px;
        }
      }
    }
    .recreation{
      width: 320px;
      height: 21px;
      line-height: 21px;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      @media screen and (max-width: 750px){
        width: 100%;
        height: 36px;
      }
      .l-img{
        width: 41px;
        height: 21px;
        background: url("../../assets/images/home/new-home/left_02.png") no-repeat;
        @media screen and (max-width: 750px){
          width: 30px;
          background-size: 100% 100%;
        }
      }
      .r-img{
        width: 41px;
        height: 21px;
        background: url("../../assets/images/home/new-home/right_02.png") no-repeat;
        @media screen and (max-width: 750px){
          width: 30px;
          background-size: 100% 100%;
        }
      }
      .con{
        flex: 1;
        text-align: center;
        font-size: 14px;
        line-height: 18px;
        color: rgba(255,255,255, .9);
        text-shadow: 0 1px 1px rgba(0,0,0, 1);
        @media screen and (max-width: 750px){
          flex: none;
          width: 240px;
          margin: 0 auto;
        }
      }
    }
    .bonus{
      width: 922px;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #ccdfff;
      padding-top: 64px;
      padding-bottom: 10px;
      .l-bon{
        span{
        }
      }
      .c-bon{
        width: auto;
        margin: 0 160px;
      }
      .r-bon{
        span{
        }
      }
    }
    .rule{
      width: 922px;
      height: 22px;
      margin: auto;
      margin-top: 80px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      @media screen and (max-width: 768px){
        width: 100%;
      }
      &:after{
        content: '';
        width: 10px;
        height: 10px;
        display: block;
        background-color: #2B3E6E;
        border: 1px solid #7593FB;
        position: absolute;
        box-shadow: 0 0 1px 1px rgba(117, 146, 250, 0.4);
        z-index: 10;
        left: 0;
        top: 50%;
        margin-top: -6px;
        transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        @media screen and (max-width: 768px){
          width: 6px;
          height: 6px;
          margin-top: -4px;
          display: none;
        }
      }
      &:before{
        content: '';
        width: 10px;
        height: 10px;
        display: block;
        background-color: #2B3E6E;
        border: 1px solid #7593FB;
        box-shadow: 0 0 1px 1px rgba(117, 146, 250, 0.4);
        position: absolute;
        z-index: 11;
        right: 0;
        top: 50%;
        margin-top: -6px;
        transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        @media screen and (max-width: 768px){
          width: 6px;
          height: 6px;
          margin-top: -4px;
          display: none;
        }
      }
      .hr{
        width: 100%;
        height: 1px;
        position: absolute;
        top: 50%;
        left: 50%;
        background-color: #7593FB;
        transform: translate(-50%, -50%);
      }
      .square{
        position: relative;
        .fk{
          position: absolute;
          width: 20px;
          height: 20px;
          top: 50%;
          left: 50%;
          z-index: 10;
          margin-top: -11px;
          margin-left: -11px;
          background-color: #2B3E6E;
          border: 1px solid #7593FB;
          box-shadow: 0 0 1px 1px rgba(117, 146, 250, .5);
          transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          -webkit-transform: rotate(45deg);
          -o-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          @media screen and (max-width: 750px){
            width: 14px;
            height: 14px;
            margin-top: -7px;
            margin-left: -7px;
          }
          .con{
            width: 100%;
            height: 100%;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            &:after{
              width: 18px;
              height: 18px;
              background-color: #7593FB;
              background: url("../../assets/images/home/pic-1.png") no-repeat;
              background-size: 100% 100%;
              content: '';
              display: block;
              z-index: 10;
              -webkit-transition-property: -webkit-transform;
              -webkit-transition-duration: 1s;
              -moz-transition-property: -moz-transform;
              -moz-transition-duration: 1s;
              -webkit-animation: rotate 2s linear infinite;
              -moz-animation: rotate 2s linear infinite;
              -o-animation: rotate 2s linear infinite;
              animation: rotate 2s linear infinite;
              @-webkit-keyframes rotate{from{-webkit-transform: rotate(0deg)} to{-webkit-transform: rotateY(180deg)}}
              @-moz-keyframes rotate{from{-moz-transform: rotate(0deg)} to{-moz-transform: rotateY(180deg)}}
              @-o-keyframes rotate{from{-o-transform: rotate(0deg)} to{-o-transform: rotateY(180deg)}}
              @keyframes rotate{from{transform: rotate(0deg)} to{transform: rotateY(180deg)}}
              @media screen and (max-width: 750px){
                width: 14px;
                height: 14px;
              }
            }
          }
        }
        &:nth-child(3){
          margin: 0 160px;
          @media screen and (max-width: 750px){
            margin: 0 94px;
          }
        }
        .text{
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
          word-break:keep-all;
          white-space:nowrap;
          color: #fff;
          text-shadow: 0 1px 1px rgba(0,0,0, 1);
          @media screen and (max-width: 750px){
            font-size: 14px;
            width: 94px;
            text-align: center;
            word-break:keep-all;
            white-space: inherit;
          }
        }
        .bottom-num{
          position: absolute;
          bottom: -50px;
          left: 50%;
          transform: translateX(-50%);
          word-break:keep-all;
          white-space:nowrap;
          color: #f9b72b;
          text-shadow: 0 2px 2px rgba(0,0,0, 1);
          @media screen and (max-width: 750px){
            font-size: 14px;
            width: 94px;
            text-align: center;
            bottom: -34px;
          }
        }
      }
    }
    .bonus-num{
      width: 922px;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      color: #ccdfff;
      padding-top: 10px;
      .l-bon{
        flex: 1;
        span{
          padding-left: 252px;
        }
      }
      .c-bon{
        width: auto;
      }
      .r-bon{
        flex: 1;
        span{
          padding-left: 150px;
        }
      }
    }
    .bonus-tab{
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -2px;
      width: 770px;
      margin: 74px auto 0;
      height: 85px;
      display: flex;
      align-items: center;
      z-index: 11;
      justify-content: space-between;
      @media screen and (max-width: 768px){
        display: none;
      }
      .Table-fhBtn{
        width: 350px;
        height: 100%;
        background: url("../../assets/images/home/new-home/btn-bg.png");
        display: flex;
        align-items: center;
        cursor: pointer;
        .btn-inbox{
          width: 100%;
          .info{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 0;
            .l-img{
              flex: 1;
              .bg{
                margin: auto;
                width: 65px;
                height: 20px;
              }
            }
            .con{
              width: auto;
              height: 21px;
            }
            .r-img{
              flex: 1;
              .bg{
                margin: auto;
                width: 65px;
                height: 20px;
              }
            }
          }
          .num{
            text-align: center;
            font-size: 16px;
            color: #7693fc;
            text-shadow: 0 2px 2px rgba(0,0,0, 1);
            &.activenum{
              color: #cd9131;
            }
          }
        }
      }
    }
    .app-bounus-tab{
      position: absolute;
      left: 50%;
      bottom: -1px;
      z-index: 10;
      transform: translateX(-50%);
      width: 280px;
      height: 74px;
      background: url("../../assets/images/home/new-home/app-tab.png") no-repeat;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      @media screen and (min-width: 769px){
        display: none;
      }
      .Table-fhBtn{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        .btn-inbox{
          width: 100%;
          .info{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 0;
            .l-img{
              flex: 1;
              .bg{
                margin: auto;
                width: 65px;
                height: 20px;
                // background: url("../../assets/images/home/new-home/left_01.png") no-repeat;
                @media screen and (max-width: 768px){
                  width: 50px;
                }
                img{
                  width: 100%;
                }
              }
            }
            .con{
              width: auto;
              height: 21px;
            }
            .r-img{
              flex: 1;
              .bg{
                margin: auto;
                width: 65px;
                height: 20px;
                // background: url("../../assets/images/home/new-home/right_01.png") no-repeat;
                @media screen and (max-width: 768px){
                  width: 50px;
                }
                img{
                  width: 100%;
                }
              }
            }
          }
          .num{
            text-align: center;
            font-size: 16px;
            color: #cd9131;
            &.activenum{
              color: #cd9131;
            }
          }
        }
      }
    }
    .bonus-border{
      width: 100%;
      height: 2px;
      background-color: #cb9131;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 1px;
      .l-top{
        width: 100%;
        height: 1px;
        bottom: 0;
        left: 0;
        position: absolute;
        background-color: #cd9131;
      }
    }
    .hr{
      width: 768px;
      height: 2px;
      background-color: #101229;
      position: absolute;
      left: 50%;
      bottom: 0;
      z-index: 10;
      transform: translateX(-50%);
      @media screen and (max-width: 768px){
        width: 100%;
      }
    }
    .bot-bor{
      width: 100%;
      height: 1px;
      background-color: #1f2684;
      position: absolute;
      left: 0;
      right: 0;
      bottom: -2px;
    }
    .bot-center-bor{
      width: 760px;
      height: 1px;
      background-color: #1f2684;
      position: absolute;
      left: 50%;
      bottom: -2px;
      transform: translateX(-50%);
      z-index: 10;
      @media screen and (max-width: 768px){
        width: 100%;
      }
    }
    .top-center{
      width: 70px;
      height: 1px;
      background-color: #cd9131;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 2px;
    }
    .bot-center{
      width: 82px;
      height: 1px;
      background-color: #1f2684;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -2px;
      z-index: 11;
    }
  }
  .detail-main{
    width: 100%;
    height: 1050px;
    background-color: #101229;
    @media screen and (max-width: 1024px){
      padding: 0 20px;
    }
    @media screen and (max-width: 768px){
      display: none;
    }
    .start-time{
      width: 320px;
      text-align: center;
      margin: 60px auto 36px;
      font-size: 16px;
      color: #fe9500;
      @media screen and (max-width: 768px){
        font-size: 14px;
      }
      span{
        padding-left: 10px;
        @media screen and (max-width: 768px){
          font-size: 0;
        }
      }
    }
    .title{
      width: auto;
      height: 54px;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      .lf-img{
        width: 250px;
        height: 16px;
        background: url("../../assets/images/home/new-home/left_03.png") no-repeat;
      }
      .tit{
        width: auto;
        height: 54px;
        font-size: 48px;
        text-align: center;
        font-family: titleChi;
        background: -webkit-linear-gradient(top, #f0b149, #af8975);
        -webkit-background-clip: text; /*必需加前缀 -webkit- 才支持这个text值 */
        -webkit-text-fill-color: transparent; /*text-fill-color会覆盖color所定义的字体颜色： */
        text-transform: uppercase;
        text-shadow: 0 0 10px rgba(250, 181, 42, .2);
        margin: 0 40px;
      }
      .rh-img{
        width: 250px;
        height: 16px;
        background: url("../../assets/images/home/new-home/right_03.png") no-repeat;
      }
    }
    .list-box{
      width: 1320px;
      height: 748px;
      background: url("../../assets/images/home/new-home/list-bg.png") no-repeat;
      background-size: 100% 100%;
      background-position: center;
      margin: 52px auto 70px;
      position: relative;
      @media screen and (max-width: 1340px){
        width: 100%;
        padding: 0 20px;
      }
      .global-empty{
        margin-top: 220px;
      }
      .list-title,.list{
        width: 100%;
        height: 110px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .tit{
          flex: 1;
          text-align: center;
          font-size: 16px;
          color: #5667d4;
        }
      }
      .list{
        height: 68px;
        transition: all 1s;
        font-size: 16px;
        color: #5667d4;
        &:nth-child(even){
          background-color: rgba(250, 181, 42, .1);
          color: #e7ac50;
        }
        &:nth-child(odd){
          background-color: rgba(87, 106, 212, .1);
          color: #7693fc;
        }
        &:hover{
          box-shadow:  0 0 4px 4px rgba(255,255,255, .1);
        }
        .con{
          flex: 1;
          height: 100%;
          line-height: 68px;
          text-align: center;
        }
        .particulars{
          cursor: pointer;
        }
      }
      .noData{
        font-size: 14px;
        span{
          margin: auto;
          color: #F75050;
        }
      }
      .paging-bg{
        width: 505px;
        height: 52px;
        background: url("../../assets/images/home/new-home/paging.png") no-repeat;
        background-size: 100% 100%;
        background-position: center;
        position: absolute;
        bottom: -18px;
        z-index: 10;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .list{
      height: 68px;
      transition: all 1s;
      font-size: 16px;
      color: #5667d4;
      &:nth-child(even){
        background-color: rgba(250, 181, 42, .1);
        color: #e7ac50;
      }
      &:nth-child(odd){
        background-color: rgba(87, 106, 212, .1);
        color: #7693fc;
      }
      &:hover{
        box-shadow:  0 0 4px 4px rgba(255,255,255, .1);
      }
      .con{
        flex: 1;
        height: 100%;
        line-height: 68px;
        text-align: center;
      }
      .particulars{
        cursor: pointer;
      }
    }
    .noData{
      font-size: 14px;
      span{
        margin: auto;
        color: #F75050;
      }
    }
    .paging-bg{
      width: 505px;
      height: 52px;
      background: url("../../assets/images/home/new-home/paging.png") no-repeat;
      background-size: 100% 100%;
      background-position: center;
      position: absolute;
      bottom: -18px;
      z-index: 10;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .app-detail-main{
    width: 100%;
    height: 1050px;
    background-color: #101229;
    @media screen and (max-width: 768px){
      padding: 0 20px;
      height: auto;
    }
    @media screen and (min-width: 769px){
      display: none;
    }
    .start-time{
      width: auto;
      text-align: center;
      padding: 60px 0 36px;
      font-size: 16px;
      /*background: -webkit-linear-gradient(top, #fe9500, #e2271a);
      background: -moz-linear-gradient(top, #fe9500, #e2271a);
      background: -ms-linear-gradient(top, #fe9500, #e2271a);
      background: linear-gradient(top, #fe9500, #fe9500 50%, #e2271a 70%, #e2271a);
      -webkit-background-clip: text; !*必需加前缀 -webkit- 才支持这个text值 *!
      -webkit-text-fill-color: transparent; !*text-fill-color会覆盖color所定义的字体颜色： *!
      text-transform: uppercase;*/
      color: #fe9500;
      @media screen and (max-width: 768px){
        font-size: 14px;
      }
      span{
        padding-left: 10px;
        @media screen and (max-width: 768px){
          padding-left: 0;
        }
      }
    }
    .title{
      width: auto;
      height: 54px;
      margin: auto;
      .lf-img{
        width: 100%;
        height: 16px;
        background: url("../../assets/images/home/new-home/left_03.png") no-repeat;
        background-position: center;
        margin: 0 auto;
      }
      .tit{
        width: 280px;
        margin: 0 auto;
        height: auto;
        font-size: 16px;
        text-align: center;
        padding: 12px 0;
        font-family: titleChi;
        background: -webkit-linear-gradient(top, #f0b149, #af8975);
        -webkit-background-clip: text; /*必需加前缀 -webkit- 才支持这个text值 */
        -webkit-text-fill-color: transparent; /*text-fill-color会覆盖color所定义的字体颜色： */
        text-transform: uppercase;
        text-shadow: 0 0 10px rgba(250, 181, 42, .2);
        img{
          width: 100%;
        }
      }
      .rh-img{
        width: 120px;
        height: 16px;
        background: url("../../assets/images/home/new-home/right_03.png") no-repeat;
        background-position: center;
        margin: 0 auto;
      }
    }
    .list-box{
      width: 688px;
      height: 840px;
      background: url("../../assets/images/home/new-home/app-tab-bg.png") no-repeat;
      background-size: 100% 100%;
      background-position: center;
      padding-bottom: 82px;
      margin: 52px auto 70px;
      position: relative;
      @media screen and (max-width: 768px){
        width: 100%;
        height: auto;
      }
      .global-box{
        width: 100%;
        height: 100%;
        text-align: center;
        color: #5D618C;
        .global-empty{
          width: 100px;
          height: 100px;
          margin: 60px auto 0;
          padding: 0;
        }
      }
      .list-title,.list{
        width: 100%;
        padding: 0 10px;
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .tit{
          flex: 1;
          text-align: center;
          font-size: 16px;
          color: #5667d4;
        }
      }
      .list{
        width: 100%;
        height: auto;
        transition: all 1s;
        font-size: 14px;
        display: flex;
        align-items: center;
        color: #e7ac50;
        &:nth-child(even){
          background-color: rgba(250, 181, 42, .1);
        }
        &:nth-child(odd){
          background-color: rgba(87, 106, 212, .1);
        }
        .content-box{
          width: 100%;
          padding: 20px 0 10px 0;
          .info-li{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 0 8px 0;
            .con{
              width: auto;
              height: auto;
              text-align: center;
              .bh{
                color: #7693fc;
              }
            }
          }
          .con1{
            width: 100%;
            height: auto;
            text-align: left;
            padding-bottom: 30px;
            .je{
              color: #7693fc;
            }
          }
        }
        &:hover{
          box-shadow:  0 0 4px 4px rgba(255,255,255, .1);
        }
        .particulars{
          cursor: pointer;
        }
      }
      .noData{
        font-size: 14px;
        span{
          margin: auto;
          color: #F75050;
        }
      }
      .paging-bg{
        width: 80%;
        height: 52px;
        background: url("../../assets/images/home/new-home/paging.png") no-repeat;
        background-size: 100% 100%;
        background-position: center;
        position: absolute;
        bottom: -18px;
        z-index: 10;
        left: 50%;
        transform: translateX(-50%);
        @media screen and (max-width: 768px){
          height: 40px;
        }
      }
    }
  }
  .app-bounus-two{
    width: 100%;
    height: 74px;
    margin-top: 134px;
    position: relative;
    .bou-box{
      width: 280px;
      height: 85px;
      background: url("../../assets/images/home/new-home/app-tab.png") no-repeat;
      display: flex;
      align-items: center;
      margin: 0 auto;
      position: relative;
      background-size: 100% 100%;
      @media screen and (min-width: 769px){
        display: none;
      }
      .Table-fhBtn{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        .btn-inbox{
          width: 100%;
          .info{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 0;
            .l-img{
              flex: 1;
              .bg{
                margin: auto;
                width: 65px;
                height: 20px;
                // background: url("../../assets/images/home/new-home/left_01.png") no-repeat;
                @media screen and (max-width: 768px){
                  width: 50px;
                }
                img{
                  width: 100%;
                }
              }
            }
            .con{
              width: auto;
              height: 21px;
            }
            .r-img{
              flex: 1;
              .bg{
                margin: auto;
                width: 65px;
                height: 20px;
                // background: url("../../assets/images/home/new-home/right_01.png") no-repeat;
                @media screen and (max-width: 768px){
                  width: 50px;
                }
                img{
                  width: 100%;
                }
              }
            }
          }
          .num{
            text-align: center;
            font-size: 16px;
            color: #cd9131;
            &.activenum{
              color: #cd9131;
            }
          }
        }
      }
    }
    .bor-top{
      width: 100%;
      height: 1px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: -8px;
      background-color: #cd9131;
    }
    .bor-bot{
      width: 100%;
      height: 1px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: -11px;
      background-color: #1f2684;
    }
  }
}
</style>
