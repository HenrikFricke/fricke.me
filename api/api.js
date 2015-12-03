// ########################################
// ## API
// ########################################

var express = require('express')
var route_atms = require('./atm.js')
var route_providers = require('./provider.js')

var route = express.Router()

// all routes for api
route.use('/atms', route_atms)
route.use('/providers', route_providers)

module.exports = route
