const express = require('express')
const permission = require('../middleware/permission')
const asyncHandler = require('../util/asyncHandler')
const Oss = require('../entity/po/oss')
const Rsp = require('../common/Rsp')
const AsyncLock = require('async-lock')
const multer = require('multer')
const uuidv4 = require('uuid/v4')
const OssUtil = require('../util/oss')

const lock = new AsyncLock()
const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, './upload')
  },
  filename: function(req, file, cb) {
    cb(null, uuidv4() + file.originalname)
  }
})
const upload = multer({
  storage: storage,
  // limits: { fileSize: 1024 * 512 },
  // fileFilter: function(req, file, cb) {
  //   console.log(file)
  //   cb(null, true)
  // }
})

router.post('/oss/upload', permission, asyncHandler(async (req, res, nuxt) => {

  lock.acquire('OssUpload', function() {

    Oss.findAll().then(configList => {
      if (configList.length > 0) {

        const uploadSingle = upload.single('file')

        uploadSingle(req, res, (err) => {
          if(err instanceof multer.MulterError) {
            res.json(Rsp.build(Rsp.FAIL))
          } else if(err) {
            res.json(Rsp.build(Rsp.FAIL))
          } else {
            const ossConfig = configList[0].dataValues
            ossConfig.catalogue = ossConfig.catalogue + '/' + req.file.filename
            ossConfig.filePath = req.file.path
            OssUtil.upload(ossConfig).then((result) => {
              if (result) {
                res.json(Rsp.build(
                  Rsp.SUCCEED,
                  ossConfig.domainName + '/' + ossConfig.catalogue
                ))
              } else {
                res.json(Rsp.build(Rsp.FAIL))
              }
            })
          }
        })

      } else {
        res.json(Rsp.build(Rsp.OSS_NULL))
      }
    }).catch(() => {
      throw new Error()
    })

  }).catch(function(err) {
    nuxt(500)
  })

}))

router.post('/oss/get', permission, asyncHandler(async (req, res, nuxt) => {
  Oss.findAll().then(configList => {
    res.json(Rsp.build(Rsp.SEARCH_SUCCESSFUL, configList.length > 0 ? configList[0] : null))
  })
}))

router.post('/oss/save', permission, asyncHandler(async (req, res, nuxt) => {
  lock.acquire('OssConfigSave', function() {
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
