// ########################################
// ## API
// ########################################

var express = require('express')
var route_atm = require('./atm.js')
var route_provider = require('./provider.js')

var route = express.Router()

// all routes for api
route.use('/atm', route_atm)
route.use('/provider', route_provider)

module.exports = route
