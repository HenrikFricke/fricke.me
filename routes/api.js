// ########################################
// ## API
// ########################################

var express = require('express')
var route = express.Router()

route.get('/', function(req, res, next) {
  res.send('API')
})

route.get('/kfz', function(req, res, next) {
  res.send('kfz')
})

module.exports = route
