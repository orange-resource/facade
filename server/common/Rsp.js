/**
 * 通用返回
 * 基础通用操作码 1 - 500
 * 成功 1000 - 1500
 * 失败 2000 - 2500
 * @author orange <1067357662@qq.com>
 */
const Rsp = {
  SUCCEED: {
    code: 1,
    message: '操作成功'
  },
  FAIL: {
    code: 2,
    message: '操作失败'
  },
  SEARCH_SUCCESSFUL: {
    code: 3,
    message: '查询成功'
  },
  CANNOT_FIND: {
    code: 404,
    message: '寻找不到相关的资源'
  },
  SERIOUS_ERROR: {
    code: 500,
    message: '发生了未知错误'
  },
  TOKEN_NULL: {
    code: 2000,
    message: '认证失败'
  },
  build (code, data) {
    if (undefined === data) {
      code.data = null
    } else {
      code.data = data
    }
    return code
  }
}

module.exports = Rsp
