const express = require('express')
const permission = require('../middleware/permission')
const asyncHandler = require('../util/asyncHandler')
const ButtonGroup = require('../entity/po/buttonGroup')
const Rsp = require('../common/Rsp')
const router = express.Router()

router.post('/buttonGroup/getButtonList', asyncHandler(async (req, res, nuxt) => {
  ButtonGroup.findAll({
    where: {
      showStatus: 1
    },
    order: [
      ['sort', 'ASC']
    ]
  }).then(list => {
    list.forEach(button => {
      delete button.dataValues.id
    })
    res.json(Rsp.build(Rsp.SEARCH_SUCCESSFUL, list))
  })
}))

router.post('/buttonGroup/getList', permission, asyncHandler(async (req, res, nuxt) => {
  ButtonGroup.findAll({
    order: [
      ['sort', 'ASC']
    ]
  }).then(list => {
    res.json(Rsp.build(Rsp.SEARCH_SUCCESSFUL, list))
  })
}))

router.post('/buttonGroup/create', permission, asyncHandler(async (req, res, nuxt) => {
  ButtonGroup.create({
    text: req.body.text,
    icon: req.body.icon,
    openUrl: req.body.openUrl,
    sort: req.body.sort,
    showStatus: req.body.showStatus
  }).then(b => {
    res.json(Rsp.build(Rsp.SUCCEED))
  }).catch(() => {
    res.json(Rsp.build(Rsp.FAIL))
  })
}))

router.post('/buttonGroup/update', permission, asyncHandler(async (req, res, nuxt) => {
  ButtonGroup.update({
    text: req.body.text,
    icon: req.body.icon,
    openUrl: req.body.openUrl,
    sort: req.body.sort,
    showStatus: req.body.showStatus
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

router.post('/buttonGroup/delete', permission, asyncHandler(async (req, res, nuxt) => {
  ButtonGroup.destroy({
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
