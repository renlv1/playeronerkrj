import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home/home'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'is-active', /* 设置router-link 激活样式方法1 */
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    // 首页
    {
      path: '/home',
      name: 'home',
      component: home
    },
    // 游戏
    {
      path: '/game',
      name: 'game',
      component: resolve => require(['@/page/game/game'], resolve)
    },
    // 游戏详情
    {
      path: '/gameDetail',
      name: 'gameDetail',
      component: resolve => require(['@/page/game/gameDetail'], resolve)
    },
    { // 娱乐
      path: '/recreation',
      name: 'recreation',
      component: resolve => require(['@/page/recreation/recreation'], resolve)
    },
    { // 完善信息第一步
      path: '/infoMation',
      name: 'infoMation',
      component: resolve => require(['@/page/noInfomation/infoTwo'], resolve)
    },
    { // 完善信息第二步
      path: '/infoMationThree',
      name: 'infoMationThree',
      component: resolve => require(['@/page/noInfomation/infoThree'], resolve)
    },
    // 大乐透
    {
      path: '/lottery',
      name: 'lottery',
      component: resolve => require(['@/page/lottery/lotteryList'], resolve)
    },
    // 大乐透详情
    {
      path: '/lotteryDetail',
      name: 'lotteryDetail',
      component: resolve => require(['@/page/lottery/lotteryDetail'], resolve)
    },
    // 大乐透-投注
    {
      path: '/lotteryDetail/betting',
      name: 'betting',
      component: resolve => require(['@/page/lottery/betting'], resolve)
    },
    // 大乐透详情-分红及排位明细
    {
      path: '/lotteryDetail/bounsDetail',
      name: 'bounsDetail',
      component: resolve => require(['@/page/lottery/bounsDetail'], resolve)
    },
    // 大乐透详情-分红及排位明细更多
    {
      path: '/lotteryDetail/bounsDetailMore',
      name: 'bounsDetailMore',
      component: resolve => require(['@/page/lottery/bounsDetailMore'], resolve)
    },
    // 大乐透详情-奖金池预计收益
    {
      path: '/lotteryDetail/endReward',
      name: 'endReward',
      component: resolve => require(['@/page/lottery/endReward'], resolve)
    },
    // 大乐透详情-查看规则
    {
      path: '/lotteryDetail/rule',
      name: 'lotteryDetailRule',
      component: resolve => require(['@/page/lottery/rule'], resolve)
    },
    // 发起大乐透-是否确认发起
    {
      path: '/createAsk',
      name: 'createAsk',
      component: resolve => require(['@/page/lottery/createAsk'], resolve)
    },
    // 发起大乐透
    {
      path: '/createLottery',
      name: 'createLottery',
      component: resolve => require(['@/page/lottery/createLottery'], resolve)
    },
    // 人工智能
    {
      path: '/artificial',
      name: 'artificial',
      component: resolve => require(['@/page/artificial/artificial'], resolve)
    },
    // 关于我们
    {
      path: '/about',
      name: 'about',
      component: resolve => require(['@/page/about/about'], resolve)
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/page/common/login'], resolve)
    },
    {
      path: '/register', // 注册
      name: 'register',
      component: resolve => require(['@/page/common/register'], resolve)
    },
    {
      path: '/forgetPassword', // 忘记密码
      name: 'forgetPassword',
      component: resolve => require(['@/page/common/forgetPassword'], resolve)
    },
    {
      path: '/emailActivation', // 邮箱激活
      name: 'emailActivation',
      component: resolve => require(['@/page/common/emailActivation'], resolve)
    },
    // 我的账户
    {
      path: '/account', // 我的账户
      name: 'account',
      redirect: {name: 'myAccount'},
      component: resolve => require(['@/page/myAccount/myAccountNav'], resolve),
      children: [
        {
          path: 'myAccount', // 用户概览--> 资产概览
          name: 'myAccount',
          component: resolve => require(['@/page/myAccount/accountManage/myAccount'], resolve)
        },
        {
          path: 'accountMobile', // 移动端
          name: 'accountMobile',
          component: resolve => require(['@/page/myAccount/accountMobile'], resolve)
        },
        {
          path: 'accountInformation', // 账号信息管理
          name: 'accountInformation',
          component: resolve => require(['@/page/myAccount/accountManage/accountInformation'], resolve)
        },
        {
          path: 'accountInformation/safePassword', // 安全密码设置
          name: 'safePassword',
          component: resolve => require(['@/page/myAccount/accountCenter/accountCenter/safePassword'], resolve)
        },
        {
          path: 'accountInformation/becomeShare', // 成为共享者1
          name: 'becomeShare',
          component: resolve => require(['@/page/myAccount/accountCenter/share/becomeShare'], resolve)
        },
        {
          path: 'accountInformation/shareForm', // 成为共享者2
          name: 'shareForm',
          component: resolve => require(['@/page/myAccount/accountCenter/share/shareForm'], resolve)
        },
        {
          path: 'accountInformation/shareInfo', // 共享者资料
          name: 'shareInfo',
          component: resolve => require(['@/page/myAccount/accountCenter/share/shareInfo'], resolve)
        },
        {
          path: 'recommend', // 安全密码设置
          name: 'recommend',
          component: resolve => require(['@/page/myAccount/accountCenter/accountCenter/recommend'], resolve)
        },
        {
          path: 'accountInformation/openGogle', // 开通谷歌
          name: 'gogleProblem',
          component: resolve => require(['@/page/myAccount/accountCenter/accountCenter/openGogle'], resolve)
        },
        {
          path: 'accountInformation/notBindGogle', // 解绑谷歌
          name: 'notBindGogle',
          component: resolve => require(['@/page/myAccount/accountCenter/accountCenter/notBindGogle'], resolve)
        },
        {
          path: 'transactionAccount', // 交易账户管理
          name: 'transactionAccount',
          component: resolve => require(['@/page/myAccount/accountManage/transactionAccount'], resolve)
        },
        {
          path: 'transactionAccount/transactionAccountInfo', // 交易账户管理--账户信息
          name: 'transactionAccountInfo',
          component: resolve => require(['@/page/myAccount/accountCenter/accountCenter/transactionAccountInfo'], resolve)
        },
        {
          path: 'transactionAccount/accountList', // 交易账户管理--账户信息
          name: 'accountList',
          component: resolve => require(['@/page/myAccount/accountCenter/accountCenter/accountList'], resolve)
        },
        {
          path: 'recharge', // 资产交易--> 充值
          name: 'recharge',
          component: resolve => require(['@/page/myAccount/assetsTrade/recharge'], resolve)
        },
        {
          path: 'withdraw', // 提现
          name: 'withdraw',
          component: resolve => require(['@/page/myAccount/assetsTrade/withdraw'], resolve)
        },
        {
          path: 'fbRecharge', // 法币充值
          name: 'fbRecharge',
          component: resolve => require(['@/page/myAccount/assetsTrade/fbRecharge'], resolve)
        },
        {
          path: 'fbWithdraw', // 法币提现
          name: 'fbWithdraw',
          component: resolve => require(['@/page/myAccount/assetsTrade/fbWithdraw'], resolve)
        },
        {
          path: 'transferAccounts', // 转账
          name: 'transferAccounts',
          component: resolve => require(['@/page/myAccount/assetsTrade/transferAccounts'], resolve)
        },
        // {
        //   path: 'iStarted', // 我的大乐透-->我发起的
        //   name: 'iStarted',
        //   component: resolve => require(['@/page/myAccount/accountManage/iStarted'], resolve)
        // },
        {
          path: 'joinLottery', // 我参与的
          name: 'joinLottery',
          component: resolve => require(['@/page/myAccount/myLottery/joinLottery'], resolve)
        },
        {
          path: 'joinLottery/joinLotteryDetail', // 我参与的
          name: 'joinLotteryDetail',
          component: resolve => require(['@/page/myAccount/myLottery/joinLotteryDetail'], resolve)
        },
        {
          path: 'reward', // 奖励记录
          name: 'reward',
          component: resolve => require(['@/page/myAccount/myLottery/reward'], resolve)
        },
        {
          path: 'reward/rewardDetail', // 奖励记录详情
          name: 'rewardDetail',
          component: resolve => require(['@/page/myAccount/myLottery/rewardDetail'], resolve)
        },
        {
          path: 'rewardMore', // 奖励记录详情-更多
          name: 'rewardMore',
          component: resolve => require(['@/page/myAccount/myLottery/rewardMore'], resolve)
        },
        {
          path: 'achievement', // 业绩统计
          name: 'achievement',
          component: resolve => require(['@/page/myAccount/myLottery/achievement'], resolve)
        },
        {
          path: 'achievement/achievementDetail', // 业绩统计详情
          name: 'achievementDetail',
          component: resolve => require(['@/page/myAccount/myLottery/achievementDetail'], resolve)
        },
        {
          path: 'order', // 交易订单记录--> 我的账单
          name: 'order',
          component: resolve => require(['@/page/myAccount/order/myOrder'], resolve)
        },
        {
          path: 'order/orderDetail', // 账单详情
          name: 'orderDetail',
          component: resolve => require(['@/page/myAccount/order/orderDetail'], resolve)
        },
        {
          path: 'rechargeOrder', // 充值订单
          name: 'rechargeOrder',
          component: resolve => require(['@/page/myAccount/order/rechargeOrder'], resolve)
        },
        {
          path: 'rechargeOrder/rechargeOrderDetail', // 充值订单详情
          name: 'rechargeOrderDetail',
          component: resolve => require(['@/page/myAccount/order/rechargeOrderDetail'], resolve)
        },
        {
          path: 'rechargeOrder/fbRechargeOrderDetail', // 法币充值订单详情
          name: 'fbRechargeOrderDetail',
          component: resolve => require(['@/page/myAccount/order/fbRechargeOrderDetail'], resolve)
        },
        {
          path: 'rechargeOrder/fbRechargeOrderSelectBoss', // 法币充值订单选择共享者
          name: 'fbRechargeOrderSelectBoss',
          component: resolve => require(['@/page/myAccount/order/fbRechargeOrderSelectBoss'], resolve)
        },
        {
          path: 'withdrawOrder', // 提现订单
          name: 'withdrawOrder',
          component: resolve => require(['@/page/myAccount/order/withdrawOrder'], resolve)
        },
        {
          path: 'withdrawOrder/withdrawOrderDetail', // 提现订单详情
          name: 'withdrawOrderDetail',
          component: resolve => require(['@/page/myAccount/order/withdrawOrderDetail'], resolve)
        },
        {
          path: 'withdrawOrder/fbWithdrawOrderDetail', // 法币提现订单详情
          name: 'fbWithdrawOrderDetail',
          component: resolve => require(['@/page/myAccount/order/fbWithdrawOrderDetail'], resolve)
        },
        {
          path: 'withdrawOrder/fbWithdrawOrderSelectBoss', // 法币提现订单选择共享者
          name: 'fbWithdrawOrderSelectBoss',
          component: resolve => require(['@/page/myAccount/order/fbWithdrawOrderSelectBoss'], resolve)
        },
        {
          path: 'sharerSettings', // 共享者---共享者設置
          name: 'sharerSettings',
          component: resolve => require(['@/page/myAccount/sharer/sharerSettings'], resolve)
        },
        {
          path: 'sharerSettings/sharerEdit', // 共享者---共享者编辑
          name: 'sharerEdit',
          component: resolve => require(['@/page/myAccount/sharer/sharerEdit'], resolve)
        },
        {
          path: 'sharerRechargeOrder', // 共享者---充值订单
          name: 'sharerRechargeOrder',
          component: resolve => require(['@/page/myAccount/sharer/sharerRechargeOrder'], resolve)
        },
        {
          path: 'sharerRechargeOrder/sharerRechargeOrderDetail', // 共享者---充值订单详情
          name: 'sharerRechargeOrderDetail',
          component: resolve => require(['@/page/myAccount/sharer/sharerRechargeOrderDetail'], resolve)
        },
        {
          path: 'sharerWithdrawOrder', // 共享者--提现订单
          name: 'sharerWithdrawOrder',
          component: resolve => require(['@/page/myAccount/sharer/sharerWithdrawOrder'], resolve)
        },
        {
          path: 'sharerWithdrawOrder/sharerWithdrawOrderDetail', // 共享者--提现订单详情
          name: 'sharerWithdrawOrderDetail',
          component: resolve => require(['@/page/myAccount/sharer/sharerWithdrawOrderDetail'], resolve)
        },
        {
          path: 'appeal', // 申述
          name: 'appeal',
          component: resolve => require(['@/page/myAccount/sharer/appeal'], resolve)
        }
      ]
    }
  ]
})
