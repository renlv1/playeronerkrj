//   公共请求数据
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
const api = process.env.BASE_PATH
Vue.use(Vuex)

const balance = {
  state: {
    userInfo: [],
    RadarUserAll: [],
    RadarUserMsg: [],
    userData: '',
    proBalance: '',
    userAccount: '', // 用户币种信息
    currencyRate: '', // 汇率
    loginFlag: false // 判断是否登陆
  },
  getters: {
    proBalance: state => state.proBalance,
    userInfo: state => state.userInfo, // 用户信息balanceData.user
    loginFlag: state => state.loginFlag,
    userData: state => state.userData,
    userAccount: state => state.userAccount,
    currencyRate: state => state.currencyRate // 汇率
  },
  actions: {
    // 雷达账户信息
    getRadarUserBalance ({commit}) {
      let hash = window.location.hash
      let token = hash.substring((hash.indexOf('=') + 1), hash.length)
      if (hash.indexOf('=') > -1) {
        axios.post(`${api}/user/radarSsoLogin?loginToken=${token}`).then((res) => {
          if (res.data.success) {
            commit('RadarUserInfo', res.data)
            commit('GET_LOGIN_FLAG', res.data)
          }
        })
      }
    },
    // 获取用户信息
    getUserBalance ({commit}) {
      let url = `${api}/user/balance`
      axios.post(url).then((res) => {
        commit('GET_USER_INFO', res.data)
        commit('GET_LOGIN_FLAG', res.data)
      }).catch(() => {
      })
    },
    // 退出登录
    logoutAction ({state}) {
      // console.log(this.userInfo, this.loginFlag)
      axios.get(`${api}/user/logout?deviceId=0`).then((res) => {
        if (res.data.success) {
          state.userInfo = [] // 清空header用户信息
          state.loginFlag = false // 登陆状态为false
          router.push('/login')
        } else if (res.data.resultCode === 'NOT_LOGGEDIN') {
          router.push('/login')
          state.loginFlag = false
        }
      })
    }
  },
  mutations: {
    // 雷达用户信息
    RadarUserInfo (state, data) {
      if (data.success === true) {
        state.userData = data.data.user
      }
    },
    // 大乐透用户信息
    GET_USER_INFO (state, data) {
      if (data.success === true) {
        state.userInfo = data
        state.userData = data.data.user
        state.userAccount = data.data.userAccount
        state.currencyRate = data.data.currencyRate
        state.proBalance = data.data.userAccount.RPO.balance
      } else {
        if (window.location.hash.indexOf('account') > -1) {
          router.push('/login')
        }
      }
    },
    GET_LOGIN_FLAG (state, data) {
      if (data.resultCode === 'NOT_LOGGEDIN') {
        state.loginFlag = false
      }
      if (data.success) {
        state.user = data
        state.loginFlag = true
      }
    },
    // 清空用户信息
    CLEAR_USER (state) {
      state.userInfo = []
      state.loginFlag = false
    }
  }
}
export default new Vuex.Store({
  modules: {
    balance,
    userData: ''
  }
})
