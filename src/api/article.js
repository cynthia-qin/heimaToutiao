/* eslint-disable camelcase */
import request from '@/utils/request'
// 获取文章详情
export const getArticle = (article_id) => {
  return request({
    url: `articles/${article_id}`
  })
}

// 关注用户
export const addFollowUser = (target) =>
  request({
    url: 'user/followings',
    method: 'POST',
    data: {
      target
    }
  })

// 取消关注用户
export const deleteFollowUser = (target) =>
  request({
    url: `user/followings/${target}`,
    method: 'DELETE'
  })

/**
 *收藏文章
 * @param {文章ID} target
 * @returns
 */
export const addCollect = (target) =>
  request({
    url: 'article/collections',
    method: 'POST',
    data: {
      target
    }
  })

/**
 *取消收藏文章
 * @param {文章ID} target
 * @returns
 */
export const delCollect = (target) =>
  request({
    url: `article/collections/${target}`,
    method: 'DELETE'
  })

/**
*点赞文章
* @param {文章ID} target
* @returns
*/
export const addLike = (target) =>
  request({
    url: 'article/likings',
    method: 'POST',
    data: {
      target
    }
  })

/**
*取消点赞文章
* @param {文章ID} target
* @returns
*/
export const delLike = (target) =>
  request({
    url: `article/likings/${target}`,
    method: 'DELETE'
  })
