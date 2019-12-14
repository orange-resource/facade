const express = require('express')
const permission = require('../middleware/permission')
const asyncHandler = require('../util/asyncHandler')
const router = express.Router()

router.post('/system/config/save', permission, asyncHandler(async (req, res, nuxt) => {

}))

module.exports = router
