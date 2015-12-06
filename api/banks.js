// ########################################
// ## ATM Provider
// ########################################

var express = require('express')
var database = require('./services/database.js')
var route = express.Router()

route.get('/', function(req, res, next) {
  database.get('SELECT * FROM atm_provider;', res)
})

route.get('/:bank_id', function(req, res, next) {
  database.get('SELECT * FROM atm_provider WHERE id = '+req.params.bank_id+';', res)
})


module.exports = route
