// 判断对象类型
function _typeof (obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

// 验证简单规则(纯正则)
function validateSimple (str, val) {
  let reg
  switch (str.trim()) {
    case 'email':
      reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      break
    case 'phone':
      reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      break
    case 'bankCard':
      reg = /^(\d{16}|\d{19})$/
      break
    case 'idCard':
      reg = /\d{15}(\d\d[0-9xX])?/
      break
    case 'password':
      reg = /^(?![0-9]+$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?![a-zA-Z]+$)[0-9A-Za-z]{8,26}$/
      break
    case 'safePassword':
      reg = /^(?![0-9]+$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?![a-zA-Z]+$)[0-9A-Za-z]{6,26}$/
      break
    case 'userName':
      reg = /^[a-zA-Z0-9]{4,12}$/
      break
    case 'nickName':
      reg = /^[\u4e00-\u9fa5_a-zA-Z0-9_]{4,12}$/
      break
    case 'number':
      reg = /^[0-9]\d*$/
      break
    case 'number_float':
      reg = /^\d+(\.\d{0,})?$/
      break
    case 'number_f2':
      reg = /^\d+(\.\d{0,2})?$/
      break
    case 'number_f4':
      reg = /^\d+(\.\d{0,4})?$/
      break
    case 'number_1_9':
      reg = /^([1-9][0-9]*)$/
      break
    case 'date':
      reg = /^\d{4}-\d{1,2}-\d{1,2}/
      break
  }
  return reg.test(val)
}

// 验证复杂负责(带条件)
function validateHard (str, val, vm) {
  let arr = str.split(':')
  let ruleKey = arr[0].trim()
  let ruleValue = arr[1].trim()
  if (ruleKey.includes('gt') || ruleKey.includes('lt') || ruleKey.includes('confirm')) {
    if (vm[ruleValue]) {
      ruleValue = vm[ruleValue]
    }
  }
  switch (ruleKey) {
    case 'gt':
      return parseFloat(val) < parseFloat(ruleValue)
    case 'lt':
      return parseFloat(val) > parseFloat(ruleValue)
    case 'confirm':
      return val === ruleValue
    case 'length':
      return val.length === ruleValue
    case 'max':
      return val.length <= ruleValue
    case 'min':
      return val.length >= ruleValue
    case 'between':
      return val.length <= ruleValue.split(',')[0] && val.length >= ruleValue.split(',')[1]
  }
}

// 验证
function validate (rule, val, vm) {
  let ruleType = _typeof(rule)
  if (ruleType === 'array') {
    let rusult = rule.every(ruleItem => {
      if (ruleItem.includes(':')) {
        return validateHard(ruleItem, val, vm)
      } else {
        return validateSimple(ruleItem, val)
      }
    })
    return rusult
  } else if (ruleType === 'regexp') {
    return rule.test(val)
  } else if (ruleType === 'function') {
    return rule(val)
  }
}

export default validate
