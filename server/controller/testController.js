const express = require('express')
const permission = require('../middleware/permission')
const jwt = require('../util/jwtUtil')
const router = express.Router()

router.post('/test', permission, function (req, res) {
  res.json(jwt.decode(req.headers))
})

module.exports = router
