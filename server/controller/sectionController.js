const express = require('express')
const permission = require('../middleware/permission')
const asyncHandler = require('../util/asyncHandler')
const Section = require('../entity/po/section')
const Rsp = require('../common/Rsp')
const router = express.Router()
const Sequelize = require('sequelize')
const mysql = require('../plugins/mysql')
const sequelize = mysql.sequelize

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

router.post('/section/getListByPage', permission, asyncHandler(async (req, res, nuxt) => {

  const p1 = new Promise((resolve, reject) => {
    let sql = `select s.*,
(select name from t_category where id = s.category_id) as categoryName
from t_section s `;

    if (req.body.categoryId !== '') {
      sql += `where category_id = $categoryId `
    }
    sql += `order by create_at desc `
    sql += `limit $offset,$limit`

    sequelize.query(sql, {
      plain: false,
      raw: true,
      type: Sequelize.QueryTypes.SELECT,
      bind: {
        limit: req.body.limit,
        offset: (req.body.offset - 1) * req.body.limit,
        categoryId: req.body.categoryId
      }
    }).then(list => {
      list.forEach(section => {
        section.categoryId = section.category_id
        section.mainPicture = section.main_picture
        section.offText = section.off_text
        section.onStatus = section.on_status
        section.openUrl = section.open_url
        delete section.category_id
        delete section.main_picture
        delete section.off_text
        delete section.on_status
        delete section.open_url
      })
      resolve(list)
    })
  })

  const p2 = new Promise(((resolve, reject) => {
    let sql = `select count(*) as count from t_section `;

    if (req.body.categoryId !== '') {
      sql += `where category_id = $categoryId `
    }

    sequelize.query(sql, {
      plain: true,
      raw: true,
      type: Sequelize.QueryTypes.SELECT,
      bind: {
        categoryId: req.body.categoryId
      }
    }).then(count => {
      resolve(count)
    })
  }))

  Promise.all([p1, p2]).then((result) => {
    const table = {
      list: result[0],
      count: result[1].count
    }
    res.json(Rsp.build(Rsp.SEARCH_SUCCESSFUL, table))
  })
}))

router.post('/section/create', permission, asyncHandler(async (req, res, nuxt) => {
  Section.create({
    createAt: new Date(),
    name: req.body.name,
    description: req.body.description,
    showStatus: req.body.showStatus,
    openUrl: req.body.openUrl,
    sort: req.body.sort,
    onStatus: req.body.onStatus,
    offText: req.body.offText,
    mainPicture: req.body.mainPicture,
    categoryId: req.body.categoryId
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
    mainPicture: req.body.mainPicture,
    categoryId: req.body.categoryId
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
