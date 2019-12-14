import Cookie from 'js-cookie'

const util = {
  getTokenInServer (req) {
    const serviceCookie = {}
    req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
      const parts = val.split('=')
      serviceCookie[parts[0].trim()] = (parts[1] || '').trim()
    })
    return serviceCookie.token || null
  },
  getTokenInClient () {
    const token = Cookie.get('token')
    return token || null
  }
}

export default function ({ route, req, res, redirect }) {
  const isClient = process.client
  const isServer = process.server
  const redirectURL = '/admin/login'
  let token
  // 在服务端
  if (isServer) {
    token = util.getTokenInServer(req)
  }
  // 在客户端判读是否需要登陆
  if (isClient) {
    token = util.getTokenInClient()
  }
  // 需要进行权限判断的页面开头
  if (token === null) {
    redirect(redirectURL)
  }
}
