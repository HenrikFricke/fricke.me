// ########################################
// ## API
// ########################################

var express = require('express')
var route_atm = require('./atm.js')

var route = express.Router()

// all routes for api
route.use('/atm', route_atm)

module.exports = route
