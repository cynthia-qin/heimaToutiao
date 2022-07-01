import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')// 把显示语言配置成中文
dayjs.extend(relativeTime)

/**
 *将传入的时间处理成相对时间 相对现在是多久之前的
 * @param {需要处理的时间} time
 * @returns
 */
export const dateFormat = (time) => {
  return dayjs(time).fromNow()
}
