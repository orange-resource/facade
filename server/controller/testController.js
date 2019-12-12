const express = require('express')
const router = express.Router()

router.post('/test', function (req, res) {
  res.send('hello ..222..')
})

module.exports = router
