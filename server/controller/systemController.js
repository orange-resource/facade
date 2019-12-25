const express = require('express')
const permission = require('../middleware/permission')
const asyncHandler = require('../util/asyncHandler')
const SystemConfig = require('../entity/po/system')
const Rsp = require('../common/Rsp')
const AsyncLock = require('async-lock')

const lock = new AsyncLock()
const router = express.Router()

router.post('/system/config/getConfig', asyncHandler(async (req, res, nuxt) => {
  SystemConfig.findAll().then(configList => {
    let config = null
    if (configList.length > 0) {
      config = configList[0].dataValues
      delete config.id
    }
    res.json(Rsp.build(Rsp.SEARCH_SUCCESSFUL, config))
  })
}))

router.post('/system/config/get', permission, asyncHandler(async (req, res, nuxt) => {
  SystemConfig.findAll().then(configList => {
    res.json(Rsp.build(Rsp.SEARCH_SUCCESSFUL, configList.length > 0 ? configList[0] : null))
  })
}))

router.post('/system/config/save', permission, asyncHandler(async (req, res, nuxt) => {
  lock.acquire('SystemConfigSave', function(){
    // 查询是否存在
    SystemConfig.findAll().then(configList => {
      if (configList.length > 0) {
        SystemConfig.update({
          title: req.body.title,
          description: req.body.desc,
          footerInfo: req.body.footerInfo,
          pageMainTitle: req.body.pageMainTitle,
          pageMainDescription: req.body.pageMainDescription,
          logoUrl: req.body.logoUrl
        }, {
          where: { id: configList[0].id }
        }).then(() => {
          res.json(Rsp.build(Rsp.SUCCEED))
        })
      } else {
        SystemConfig.create({
          title: req.body.title,
          description: req.body.desc,
          footerInfo: req.body.footerInfo,
          pageMainTitle: req.body.pageMainTitle,
          pageMainDescription: req.body.pageMainDescription,
          logoUrl: req.body.logoUrl
        }).then(systemConfig => {
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
