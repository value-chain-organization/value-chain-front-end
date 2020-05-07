import moment from 'moment'

export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE () {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

export function generateLineChartData ({ xAxis, yAxis }) {
  const result = []
  let date = moment()
  for (let i = 0; i < xAxis.months; i++) {
    let year = date.year()
    if (date.month() > 0) {
      date = moment().year(year).month(date.month() - 1)
    } else {
      year = year - 1
      date = moment().year(year).month(11)
    }
    result.push({
      [xAxis.key]: date.format('YYYY-M'),
      [yAxis.key]: Math.round((Math.random() * (yAxis.maxVal - yAxis.minVal + 1) + yAxis.minVal) * 10) / 10
    })
  }

  return result.reverse()
}


/* ==================================================================== */

/**
 * 根据设计稿像素获取实际页面像素，主要用于iview组件在模板中配置尺寸的时候，使用
 * @param size，设计稿像素值
 * @returns {number}
 */
export const getFlexibleSize = (size) => {
  return size / window.lib.flexible.getCustomRate();
};