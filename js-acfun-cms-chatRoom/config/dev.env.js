var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/59af9c16e0dc6633419ec82b/user-manage"',
//  BASE_API: '"http://webapi.aixifan.com/chatroom/cms/notice"',
})
