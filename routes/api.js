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
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err)
    }
    // client.query('SELECT $1::int AS number', ['1'], function(err, result) {
    //   //call `done()` to release the client back to the pool
    //   done();
    //
    //   if(err) {
    //     return console.error('error running query', err);
    //   }
    //   console.log(result.rows[0].number);
    //   //output: 1
    // });
  })
})

module.exports = route
