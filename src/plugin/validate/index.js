import validate from './validate'

function validateEntry ({el, rule, field, emptyTips, tips, vm}, type) {
  let tipsText = ''
  if (!el.value) { // 未填提示
    if (type !== 'blur') {
      tipsText = emptyTips
    }
  } else {
    if (!validate(rule, el.value, vm)) { // 验证错误提示
      tipsText = tips
    }
  }
  if (tipsText !== '') {
    if (vm.errors) {
      vm.$set(vm.errors, field, tipsText) // 对象后面添加的属性不会更新视图，要调用$set方法
    } else {
      if (type !== 'blur') {
        vm.$dialog({
          msg: tipsText
        })
      }
    }
    return false
  } else {
    return true
  }
}

let nodeList = []
let Validate = {}

// 插件必须有install方法
Validate.install = function (Vue, options) {
  // 添加全局方法-验证当前所有input
  Vue.prototype.$checkAll = function () {
    // 返回Promise对象
    return new Promise(resolve => {
      let result = nodeList.every(item => {
        return validateEntry(item)
      })
      // 如果result为true说明所有的input都已通过验证
      if (result) {
        // 将Promise状态变为成功
        resolve()
      }
    })
  }

  Vue.directive('va', {
    bind: function (el, binding, vnode) {
      let vm = vnode.context // 实例
      let field = binding.arg // 字段
      let rule = binding.value // 验证规则
      let mod = binding.modifiers // 修饰符
      let tips = el.getAttribute('tips') // 验证错误提示
      let emptyTips = el.getAttribute('emptyTips') || el.getAttribute('placeholder') || '请填写' // 未填提示
      let params = {el, rule, field, tips, emptyTips, mod, vm}
      if (mod.noCheck) return // 如果禁止验证，直接返回

      // 将要检测的元素存入数组
      nodeList.push(params)

      // 验证
      let validateHandle = () => {
        validateEntry(params, 'blur')
      }
      // 聚焦时清除提示
      let clear = () => {
        if (vm.errors) {
          vm.$delete(vm.errors, field)
        }
      }

      if (!mod.noBlur) { // 如果没有设置noBlur，失焦后开始验证
        el.addEventListener('blur', validateHandle)
      }
      el.addEventListener('focus', clear)
    }
  })
}

export default Validate

/**
  使用说明：

  *****************
  1、在input元素上面绑定指令 v-va
  *****************
  <input v-model="field" v-va="['confirm:123456']" tips="密码不一致" placeholder="请输入密码"/>

  *****************
  2、内置规则
  *****************
  email                 // 邮箱
  phone                 // 手机号
  idCard                // 身份证
  bankCard              // 银行卡
  password              // 密码（长度为8到26位,字母和数字组成必须包含大写小写）
  safePassword          // 安全密码（长度为6到26位,字母和数字组成必须包含大写小写）
  userName              // 用户名（只能输入数字和字母,长度为4-12位）
  nickName              // 用户昵称（只能输入数字、字母和汉字,长度为4-12位）
  number                // 正整数
  number_1_9            // 非零开头的正整数
  number_float          // 正数，包括小数
  number_f2             // 正数，最多两位小数点
  number_f4             // 正数，最多四位小数点
  date                  // 日期

  ---------------------------------
  以下规则需要是key:value格式 比如说 gt:10

  gt                    // 大于
  lt                    // 小于
  confirm               // 确认密码
  max                   // 最大长度
  min                   // 最小长度
  length                // 等于长度

  内置规则需要以数组的形式传入指令里面,可以传入多个内置规则
  示例
  v-va="['number', 'number_f2']"

  如果以上规则无法满足要求，可以自己填入正则，或者传递验证函数
  v-va="正则表达式"
  <input v-va:field="/^\d/$" tips="密码不一致" placeholder="请输入密码"/> // 传递自定义正则
        or
  v-va="自定义函数"
  <input v-va:field="confirm" tips="密码不一致" placeholder="请输入密码"/> // 传递验证函数
  methods: {
    confirm (val) {
      return val === xx
    }
  }

  *****************
  3、 提交时验证
  *****************
  在input失焦时会触发单个验证，但点击提交按钮时要验证全部input

  调用实例方法 this.$checkAll
  用于点击提交按钮时验证所有的input，如果都通过验证会resolve，直接在then里做接下来的操作
  示例：
  methods: {
    submit () {
      this.$checkAll().then(() => {
        // next
      })
    }
  }
 */
