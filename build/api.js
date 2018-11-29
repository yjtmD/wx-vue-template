var express = require('express')

var getUser = require('../api/getUser')
var getDeviceTree = require('../api/getDeviceTree')

var router = express.Router()

// axios请求模拟数据
router.get('/getUser', function (req, res) {
  res.json(getUser)
})
router.get('/getDeviceTree', function (req, res) {
  res.json(getDeviceTree)
})

module.exports = router
