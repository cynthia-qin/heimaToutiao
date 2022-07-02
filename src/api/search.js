/* eslint-disable camelcase */
import request from '@/utils/request'

// 获取搜索关键词的联想词
export const getSuggestion = (q) => {
  return request({
    url: 'suggestion',
    params: {
      q
    }
  })
}

/**
 *获取搜索结果列表
 * @param page 表示第几页，默认第一页
 * @returns
 */
export const getSearchResult = ({ page = 1, per_page, q }) => {
  return request({
    url: 'search',
    params: {
      page,
      per_page,
      q
    }
  })
}
