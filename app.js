// ########################################
// ## Dependencies
// ########################################

var jade = require('jade')
var express = require('express')

// ########################################
// ## Internal dependencies
// ########################################

var config = require('./config/config')

// ########################################
// ## Routing
// ########################################

var app = express()

app.get('/*', function(req, res){
  var page = req.url
  if (page == "/")
    page = '/index'
  res.writeHead(200, {"Content-Type": "text/html"})
  jade.renderFile( config.paths.content + page + '.jade', function (err, data) {
    if (err)
      res.write('Something went wrong! Try again later.')
    else
      res.write(data)
  })
  res.end()
})

app.listen(process.env.PORT || 3000)
