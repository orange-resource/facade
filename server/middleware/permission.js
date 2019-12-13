const Rsp = require('../common/Rsp')
const jwt = require('../util/jwtUtil')

// eslint-disable-next-line require-await
const permission = async (req, res, next) => {
  const token = req.headers.authorization
  if (token) {
    const decode = jwt.decode(token)
    if (decode === null) {
      res.json(Rsp.build(Rsp.TOKEN_NULL))
    }
    next()
  }
  res.json(Rsp.build(Rsp.TOKEN_NULL))
}

module.exports = permission
