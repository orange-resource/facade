/**
 * 通用返回
 * 基础通用操作码 1 - 600
 * 成功 1000 - 1500
 * 失败 2000 - 2500
 */
const Rsp = {
  SUCCEED: {
    code: 200,
    message: '操作成功'
  },
  FAIL: {
    code: 202,
    message: '操作失败'
  },
  SEARCH_SUCCESSFUL: {
    code: 200,
    message: '查询成功'
  },
  PARAMETER_ERROR: {
    code: 400,
    message: '参数错误'
  },
  CANNOT_FIND: {
    code: 404,
    message: '寻找不到相关的资源'
  },
  SERIOUS_ERROR: {
    code: 500,
    message: '发生了未知错误'
  },
  ACCESS_TIMEOUT: {
    code: 503,
    message: '服务器超时'
  },
  LOGIN_SUCCEED: {
    code: 1000,
    message: '登录成功'
  },
  UPLOAD_SUCCEED: {
    code: 1001,
    message: '上传成功'
  },
  TOKEN_NULL: {
    code: 2000,
    message: '请登录系统'
  },
  LOGIN_ERROR: {
    code: 2001,
    message: '登录失败, 账号错误或者密码错误'
  },
  OSS_NULL: {
    code: 2002,
    message: '请先配置阿里云OSS'
  },
  UPLOAD_FAIL: {
    code: 2003,
    message: '上传失败'
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
