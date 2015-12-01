// ########################################
// ## Dependencies
// ########################################

var express = require('express')

// ########################################
// ## Config
// ########################################

var config = require('./config/config')

var routes_app = require('./routes/app')
var routes_api = require('./routes/api')

// ########################################
// ## App
// ########################################

var app = express()

app.get('/', function(req, res) {
  res.redirect('/app');
})
app.use('/app', routes_app)
app.use('/api', routes_api)

app.listen(process.env.PORT || 3000)
