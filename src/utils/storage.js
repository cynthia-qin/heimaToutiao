const CHANNELS = 'CHANNELS'
/**
 * 从本地存储中获取数据
 */
export const getItem = () => {
  // 先取值
  const res = window.localStorage.getItem(CHANNELS)
  try {
    // 转为正常数据
    return JSON.parse(res)
  } catch (err) {
    // 如果转换报错 就是直接输出数据
    return res
  }
}

/**
 * 存储数据
 */
export const setItem = (value) => {
  if (typeof value === 'object') {
    // 表示value是复杂数据类型
    window.localStorage.setItem(CHANNELS, JSON.stringify(value))
  } else {
    // 表示value是普通数据类型
    window.localStorage.setItem(CHANNELS, value)
  }
}

/**
 * 删除本地存储中某一个
 */
export const removeItem = () => {
  window.localStorage.removeItem(CHANNELS)
}

/**
 * 清空本地存储内的所有数据
 */
export const clearItem = () => {
  window.localStorage.clearItem()
}
