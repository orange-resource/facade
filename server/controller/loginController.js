const express = require('express')
// eslint-disable-next-line no-unused-vars
const jwt = require('../util/jwtUtil')
const User = require('../entity/po/user')
const asyncHandler = require('../util/asyncHandler')
const Rsp = require('../common/Rsp')
const router = express.Router()

// eslint-disable-next-line require-await
router.post('/login', asyncHandler(async (req, res, next) => {
  if (req.body.username !== undefined && req.body.password !== undefined) {
    User.findAll().then((users) => {
      users.forEach((user) => {
        if (req.body.username === user.username && req.body.password === user.password) {
          const token = jwt.build(user)
          res.json(Rsp.build(Rsp.LOGIN_SUCCEED, {
            token
          }))
        } else {
          res.json(Rsp.build(Rsp.LOGIN_ERROR))
        }
      })
    }).catch(() => {
      next(500)
    })
  } else {
    res.json(Rsp.build(Rsp.PARAMETER_ERROR))
  }
}))

module.exports = router
