// ########################################
// ## API
// ########################################

var express = require('express')
var resource_atms = require('./atm.js')
var resource_banks = require('./banks.js')

var route = express.Router()

// all routes for api
route.use('/atms', resource_atms)
route.use('/banks', resource_banks)

module.exports = route
