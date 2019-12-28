const express = require('express')
const permission = require('../middleware/permission')
const asyncHandler = require('../util/asyncHandler')
const Category = require('../entity/po/category')
const Rsp = require('../common/Rsp')
const router = express.Router()
const Sequelize = require('sequelize')
const mysql = require('../plugins/mysql')
const sequelize = mysql.sequelize

router.post('/category/getList', permission, asyncHandler(async (req, res, nuxt) => {
  sequelize.query(
    'SELECT c.*, (SELECT COUNT(s.id) FROM t_section s WHERE s.category_id = c.id) as sectionCount ' +
    'FROM t_category c order by sort asc',
    {
    plain: false,
    raw: true,
    type: Sequelize.QueryTypes.SELECT
  }).then(list => {
    list.forEach(category => {
      category.showStatus = category.show_status
      delete category.show_status
    })
    res.json(Rsp.build(Rsp.SEARCH_SUCCESSFUL, list))
  })
}))

router.post('/category/create', permission, asyncHandler(async (req, res, nuxt) => {
  Category.create({
    name: req.body.name,
    sort: req.body.sort,
    showStatus: req.body.showStatus
  }).then(b => {
    res.json(Rsp.build(Rsp.SUCCEED))
  }).catch(() => {
    res.json(Rsp.build(Rsp.FAIL))
  })
}))

router.post('/category/update', permission, asyncHandler(async (req, res, nuxt) => {
  Category.update({
    name: req.body.name,
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

router.post('/category/delete', permission, asyncHandler(async (req, res, nuxt) => {
  Category.destroy({
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
