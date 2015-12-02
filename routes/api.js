// ########################################
// ## API
// ########################################

var express = require('express')
var pg = require('pg')
var route = express.Router()

route.get('/', function(req, res, next) {
  res.send('API')
})

route.get('/kfz', function(req, res, next) {
  var client = new pg.Client(process.env.DATABASE_URL)
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    res.send('KFZ')
    client.end()
  })
})

module.exports = route
