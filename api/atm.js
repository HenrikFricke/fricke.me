// ########################################
// ## ATM
// ########################################

var express = require('express')
var pg = require('pg')
var route = express.Router()

route.get('/', function(req, res, next) {
  var client = new pg.Client(process.env.HEROKU_POSTGRESQL_COBALT_URL)
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }

    client.query('SELECT * FROM atm;', function(err, result) {
      if(err) {
        return console.error('error running query', err)
      }
      res.send(result.rows)
      client.end()
    })
  })
})

module.exports = route
