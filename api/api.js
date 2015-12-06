// ########################################
// ## API
// ########################################

var express = require('express')
var ressource_atms = require('./atm.js')
var ressource_banks = require('./banks.js')

var route = express.Router()

// all routes for api
route.use('/atms', ressource_atms)
route.use('/banks', ressource_banks)

module.exports = route
