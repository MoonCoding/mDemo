import fetch from '@/utils/fetch'

/* 添加管理员 */
export function addAdmin(userId) {
  return fetch({
    url: 'room/setAdmin/'+userId,
    method: 'POST'
  })
}

/* 删除管理员 */
export function delAdmin(userId) {
  return fetch({
    url: 'room/removeAdmin/'+userId,
    method: 'POST'
  })
}

/* 获取管理员数据*/
export function getAdmin(params) {
  return fetch({
    url: 'room/getAdminPages',
    method: 'get',
    params
  })
}

/* 获取单个管理员信息*/
export function getSingle(id) {
  return fetch({
    url: 'room/getUserName/'+id,
    method: 'get',
  })
}
