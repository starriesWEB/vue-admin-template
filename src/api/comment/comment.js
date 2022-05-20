import request from '@/utils/request'

export function getCommentApi(params) {
  return request({
    url: '/comment',
    method: 'post',
    data: params
  })
}

export function getArticleApi(params) {
  return request({
    url: '/article',
    method: 'post',
    data: params
  })
}
