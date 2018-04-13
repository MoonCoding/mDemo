import fetch from '@/utils/fetch'

/* 聊天室列表 */
export function getChatList(params) {
  return fetch({
    url: 'room/list',
    method: 'get',
    params
  })
}

/* 查询单个聊天室 */
export function getChatDetail(params) {
  return fetch({
    url: 'room/' + params,
    method: 'get'
  })
}

/* 新建聊天室 */
export function addChat(params) {
  return fetch({
    url: 'room/create',
    method: 'post',
    data: params
  })
}

/* 修改聊天室 */
export function updateChat(params) {
  return fetch({
    url: 'room/update',
    method: 'post',
    data: params
  })
}

/* 关闭聊天室 */
export function deleteChat(params) {
  return fetch({
    url: 'room/openOrClose',
    method: 'post',
    data: params
  })
}

/* 查询聊天室等级 */
export function getLevel() {
  return fetch({
    url: 'room/getNeedGrade',
    method: 'get'
  })
}

/* 聊天室等级设置 */
export function chatLevel(params) {
  return fetch({
    url: 'room/setNeedGrade/' + params,
    method: 'post'
  })
}
/* 查询开启和已发布的聊天室 */
export function selectListChat(params) {
  return fetch({
    url: 'room/selectList',
    method: 'get',
    params
  })
}

/* 大厅设置 */
export function publishHall(params) {
  return fetch({
    url: 'room/publishHall',
    method: 'post',
    data: params
  })
}

/* 聊天室发布设置 */
export function publishChat(params) {
  return fetch({
    url: 'room/publish',
    method: 'post',
    data: {
      params: params,
      headersMethod: 'json'
    }
  })
}

/* 取消聊天室发布设置 */
export function cancelpublish(params) {
  return fetch({
    url: 'room/dePublish/' + params,
    method: 'post'
  })
}

/* 热门聊天室查询 */
export function getHotChatList(params) {
  return fetch({
    url: 'room/getHotPages',
    method: 'get',
    params
  })
}

/* 设置热门聊天室 */
export function publishHot(params) {
  return fetch({
    url: 'room/publishHot',
    method: 'post',
    data: {
      params: params,
      headersMethod: 'json'
    }
  })
}

/* 移除热门聊天室 */
export function cancelHotChat(params) {
  return fetch({
    url: 'room/dePublishHot/' + params,
    method: 'post'
  })
}

/* 举报列表 */
export function getWarnList(params) {
  return fetch({
    url: 'accuse/page',
    method: 'get',
    params
  })
}

/* 更新举报 */
export function updateWarn(id,params) {
  return fetch({
    url: 'accuse/update/'+id,
    method: 'post',
    params
  })
}

/* 禁言禁用列表 */
export function getNoList(params) {
  return fetch({
    url: 'punish/page',
    method: 'get',
    params
  })
}

/* 取消禁言禁用 */
export function cancleNo(params) {
  return fetch({
    url: 'punish/delete/' + params,
    method: 'post'
  })
}

/* 公告列表 */
export function getNoticeList(params) {
  return fetch({
    url: 'notice/list',
    method: 'get',
    params
  })
}

/* 新建公告 */
export function addNotice(params) {
  return fetch({
    url: 'notice/create',
    method: 'post',
    data: params
  })
}

/* 修改公告 */
export function updateNotice(params) {
  return fetch({
    url: 'notice/update',
    method: 'post',
    data: params
  })
}

/* 查询单条公告 */
export function getNoticeDetail(params) {
  return fetch({
    url: 'notice/' + params,
    method: 'get'
  })
}

/* 删除公告 */
export function deleteNotice(params) {
  return fetch({
    url: 'notice/delete/' + params,
    method: 'post'
  })
}
