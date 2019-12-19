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
  let token
  if (isServer) {
    token = util.getTokenInServer(req)
  }
  if (isClient) {
    token = util.getTokenInClient()
  }
  if (token === null) {
    redirect('/admin/login')
  }
}
