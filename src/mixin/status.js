let status2Text = {
  methods: {
    status2Text (obj, isRecharge, isBoss) {
      let status = obj.status // 订单状态
      let payStatus = obj.payStatus // 支付状态
      let problemStatus = obj.problemStatus // 申诉状态 0为待处理 1处理中，2为已解决
      let boss = isBoss // 是否为共享者
      let recharge = isRecharge // 是否为充值订单
      let text = ''
      if (problemStatus === 0) {
        let key = boss ? 'bossAddress' : 'userAddress'
        if (obj[key] === (obj.problemUseraddress || obj.problem.userAddress)) { // 用户自己发起的
          text = this.$t('orderStatus.text1') // 申诉中
        } else {
          text = this.$t('orderStatus.text2') // 等待你提交资料
        }
      } else if (problemStatus === 1) {
        text = this.$t('orderStatus.text3') // 等待裁决
      } else if (problemStatus === 2) {
        text = this.$t('orderStatus.text4') // 订单完成
      } else {
        if (recharge) { // 充值订单状态
          if (status === 0 && payStatus === 11) {
            text = this.$t('orderStatus.text5') // 待接单
          } else if (status === 1) {
            text = this.$t('orderStatus.text6') // 订单已完成
          } else if (status === 11) {
            text = this.$t('orderStatus.text7') // 订单已拒绝
          } else if (status === 13) {
            text = this.$t('orderStatus.text8') // 订单已取消
          } else if (payStatus === 12) {
            if (boss) {
              text = this.$t('orderStatus.text9') // 等待对方向您转账
            } else {
              text = this.$t('orderStatus.text10') // 等待您向共享者转账
            }
          } else if (payStatus === 13) {
            if (boss) {
              text = this.$t('orderStatus.text11') // 等待您确认收款
            } else {
              text = this.$t('orderStatus.text12') // 等待对方确认收款
            }
          } else if (status === 0 && payStatus === 0) {
            if (boss) {
              text = ''
            } else {
              text = this.$t('orderStatus.text18') // 等待您选择共享者
            }
          }
        } else { // 提现订单状态
          if (status === 0 && payStatus === 0) {
            if (boss) {
              text = this.$t('orderStatus.text13') // 待用户支付保证金
            } else {
              text = this.$t('orderStatus.text14') // 等待您支付保证金
            }
          } else if (status === 5) {
            text = this.$t('orderStatus.text6') // 订单已完成
          } else if (status === 8) {
            text = this.$t('orderStatus.text5') // 待接单
          } else if (status === 9) {
            text = this.$t('orderStatus.text7') // 订单已拒绝
          } else if (status === 13 || status === 17) {
            text = this.$t('orderStatus.text8') // 订单已取消
          } else if (payStatus === 14 && status === 10) {
            if (boss) {
              text = this.$t('orderStatus.text17') // 审核中
            } else {
              text = this.$t('orderStatus.text5') // 待接单
            }
          } else if (payStatus === 14 && status === 11) {
            if (boss) {
              text = this.$t('orderStatus.text15') // 待您向对方转账
            } else {
              text = this.$t('orderStatus.text16') // 待对方转账
            }
          } else if (payStatus === 14 && status === 12) {
            if (boss) {
              text = this.$t('orderStatus.text19') // 审核失败
            } else {
              text = this.$t('orderStatus.text8') // 订单已取消
            }
          } else if (status === 7 && payStatus === 12) {
            if (boss) {
              text = ''
            } else {
              text = this.$t('orderStatus.text18') // 等待您选择共享者
            }
          } else if (payStatus === 15) {
            if (boss) {
              text = this.$t('orderStatus.text12') // 等待对方确认收款
            } else {
              text = this.$t('orderStatus.text11') // 等待您确认收款
            }
          }
        }
      }
      return text
    }
  }
}

export default status2Text
