const express = require('express')
const permission = require('../middleware/permission')
const jwt = require('../util/jwtUtil')
const router = express.Router()

router.post('/test', permission, function (req, res) {
  res.send(jwt.decode(req.headers.authorization))
})

module.exports = router
