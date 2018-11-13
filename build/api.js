var express = require('express')

var getUser = require('../api/getUser')

var router = express.Router()

// axios请求模拟数据
router.get('/getUser', function (req, res) {
  res.json(getUser)
})

module.exports = router
