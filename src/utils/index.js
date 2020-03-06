/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @method parseTime                      时间戳转时间格式
 * @param {(Object|string|number)} time   时间戳
 * @param {string} cFormat                需要转换的时间格式
 * @returns {string | null}               返回转换之后的时间字符串
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

// 调用实例
/*
parseTime(1572451199000, '{h}:{i}');// 只显示时分,转换后格式为23:59
parseTime(1572451199000);// 默认转化为 2019-10-30 23:59:59
*/

/**
 * @method formatTime                      时间戳转时间格式(自定义版,可实现自定义显示相近时间)
 * @param {number} time                    时间戳
 * @param {string} option                  需要转换的时间格式
 * @returns {string}                       返回转换之后的时间字符串
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @method  getQueryObject                获取地址栏参数
 * @param {string} url                    含有参数的url
 * @returns {Object}                      返回包含参数的对象
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

// 调用实例
// getQueryObject('http://www.baidu.com?a=1&b=2');// {a: "1", b: "2"}

/**
 * @method         GetDateStr  获取n天后的日期(月/日)
 * @param {Number} AddDayCount n天后
 * @return {String} 返回n天后的时间
 */
export function GetDateStr(AddDayCount) {
  let nowDate = new Date();
  nowDate.setDate(nowDate.getDate() + AddDayCount);//获取AddDayCount天后的日期
  let month = (nowDate.getMonth() + 1) < 10 ? "0" + (nowDate.getMonth() + 1) : (nowDate.getMonth() + 1);//获取当前月份的日期，不足10补0
  let day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();//获取当前几号，不足10补0
  return month + "/" + day;
}

/**
 * @method   getWeek   获取某一天是周几
 * @param {Number} y 年
 * @param {Number} m 月
 * @param {Number} d 日
 * @return {String} 返回星期几
 */
export function getWeek(y, m, d) {// 年,月,日
  let jsDate = new Date();
  jsDate.setFullYear(y, m - 1, d);
  let idx = jsDate.getDay();
  let weeksArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return weeksArr[idx];
}

/**
 * @method byteLength   计算字符串长度（可包含汉字或特殊字符 -- 常用于input长度校验）
 * @param {string} input value
 * @returns {number} output value 富士达
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * @method cleanArray  数组浅拷贝
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  // decodeURIComponent() 函数可对 encodeURIComponent() 函数编码的 URI 进行解码
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

/**
 * @method html2Text  新建div其内容为val
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence -- 合并两个对象
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * 切换class类名--可用于主题切换
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/* */
/**
 * @method departTimeArr    数据按月分组
 * @param {Array} arr       包含时间戳的一组数据list
 * @param {String} timeKey  时间戳对应的key值
 * @param {String} joinStr  日期拼接字符串
 * @return {Object} obj     返回以时间日期分组后的对象
 */
export function departTimeArr(arr, timeKey, joinStr) {
  let obj = {};
  arr.forEach((item, index) => {
    let year = new Date(item[timeKey]).getFullYear();
    let month = new Date(item[timeKey]).getMonth() + 1;
    month = month < 10 ? ('0' + month) : month;
    let key = year + joinStr + month;
    if (typeof obj[key] != "undefined") {
      obj[key].push(item);
    } else {
      obj[key] = [];
      obj[key].push(item);
    }
  });
  return obj;
}

/* 对象转拼接串的方法*/
export function pars(param, key, encode) {
  if (param == null) return '';
  var arr = [];
  var t = typeof (param);
  if (t == 'string' || t == 'number' || t == 'boolean') {
    arr.push(key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param));
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
      arr.push(pars(param[i], k, encode));
    }
  }
  return arr.join("&");
};

// 对象通过Key排序的函数
export function objKeySort(arys) {
  //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  let newkey = Object.keys(arys).sort();
  let newObj = {}; //创建一个新的对象，用于存放排好序的键值对
  for (let i = 0; i < newkey.length; i++) {
    //遍历newkey数组
    newObj[newkey[i]] = arys[newkey[i]];
    //向新创建的对象中按照排好的顺序依次增加键值对
  }
  return newObj; //返回排好序的新对象
}
