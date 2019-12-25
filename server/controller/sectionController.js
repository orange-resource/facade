const express = require('express')
const permission = require('../middleware/permission')
const asyncHandler = require('../util/asyncHandler')
const Section = require('../entity/po/section')
const Rsp = require('../common/Rsp')
const router = express.Router()

router.post('/section/getSectionList', asyncHandler(async (req, res, nuxt) => {
  Section.findAll({
    where: {
      showStatus: 1
    },
    order: [
      ['sort', 'ASC']
    ]
  }).then(list => {
    list.forEach(section => {
      delete section.dataValues.id
    })
    res.json(Rsp.build(Rsp.SEARCH_SUCCESSFUL, list))
  })
}))

router.post('/section/getList', permission, asyncHandler(async (req, res, nuxt) => {
  Section.findAll({
    order: [
      ['sort', 'ASC']
    ]
  }).then(list => {
    res.json(Rsp.build(Rsp.SEARCH_SUCCESSFUL, list))
  })
}))

router.post('/section/create', permission, asyncHandler(async (req, res, nuxt) => {
  Section.create({
    name: req.body.name,
    description: req.body.description,
    showStatus: req.body.showStatus,
    openUrl: req.body.openUrl,
    sort: req.body.sort,
    onStatus: req.body.onStatus,
    offText: req.body.offText,
    mainPicture: req.body.mainPicture
  }).then(s => {
    res.json(Rsp.build(Rsp.SUCCEED))
  }).catch(() => {
    res.json(Rsp.build(Rsp.FAIL))
  })
}))

router.post('/section/update', permission, asyncHandler(async (req, res, nuxt) => {
  Section.update({
    name: req.body.name,
    description: req.body.description,
    showStatus: req.body.showStatus,
    openUrl: req.body.openUrl,
    sort: req.body.sort,
    onStatus: req.body.onStatus,
    offText: req.body.offText,
    mainPicture: req.body.mainPicture
  }, {
    where: {
      id: req.body.id
    }
  }).then(b => {
    res.json(Rsp.build(Rsp.SUCCEED))
  }).catch(() => {
    res.json(Rsp.build(Rsp.FAIL))
  })
}))

router.post('/section/delete', permission, asyncHandler(async (req, res, nuxt) => {
  Section.destroy({
    where: {
      id: req.body.id
    }
  }).then(b => {
    res.json(Rsp.build(Rsp.SUCCEED))
  }).catch(() => {
    res.json(Rsp.build(Rsp.FAIL))
  })
}))

module.exports = router
