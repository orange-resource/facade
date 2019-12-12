const express = require('express')
const router = express.Router()

router.post('/login', function (req, res) {
  res.send('hello ....')
})

module.exports = router
