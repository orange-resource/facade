const express = require('express')
const jwt = require('../util/jwtUtil')
const router = express.Router()

// eslint-disable-next-line require-await
router.post('/login', async (req, res) => {
  res.send(jwt.build({ name: '222' }))
})

module.exports = router
