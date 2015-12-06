// ########################################
// ## ATM
// ########################################

var express = require('express')
var database = require('../services/database.js')
var route = express.Router()

route.get('/', function(req, res, next) {
  database.get('SELECT * FROM atm;', res)
})

route.get('/:atm_id', function(req, res, next) {
  database.get('SELECT * FROM atm WHERE id = '+req.params.atm_id+';', res)
})

module.exports = route
