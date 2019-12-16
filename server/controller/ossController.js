const express = require('express')
const permission = require('../middleware/permission')
const asyncHandler = require('../util/asyncHandler')
const Oss = require('../entity/po/oss')
const Rsp = require('../common/Rsp')
const AsyncLock = require('async-lock')

const lock = new AsyncLock()
const router = express.Router()

router.post('/oss/get', asyncHandler(async (req, res, nuxt) => {
  Oss.findAll().then(configList => {
    res.json(Rsp.build(Rsp.SEARCH_SUCCESSFUL, configList.length > 0 ? configList[0] : null))
  })
}))

router.post('/oss/save', permission, asyncHandler(async (req, res, nuxt) => {
  lock.acquire('OssConfigSave', function(){
    // 查询是否存在
    Oss.findAll().then(configList => {
      if (configList.length > 0) {
        Oss.update({
          domainName: req.body.domainName,
          endpoint: req.body.endpoint,
          keyId: req.body.keyId,
          keySecret: req.body.keySecret,
          bucketName: req.body.bucketName,
          catalogue: req.body.catalogue,
          region: req.body.region
        }, {
          where: { id: configList[0].id }
        }).then(() => {
          res.json(Rsp.build(Rsp.SUCCEED))
        })
      } else {
        Oss.create({
          domainName: req.body.domainName,
          endpoint: req.body.endpoint,
          keyId: req.body.keyId,
          keySecret: req.body.keySecret,
          bucketName: req.body.bucketName,
          catalogue: req.body.catalogue,
          region: req.body.region
        }).then(oss => {
          res.json(Rsp.build(Rsp.SUCCEED))
        })
      }
    }).catch(() => {
      throw new Error()
    })
  }).catch(function(err) {
    nuxt(500)
  })
}))

module.exports = router
