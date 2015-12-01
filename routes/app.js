// ########################################
// ## App
// ########################################

var express = require('express')
var jade = require('jade')
var config = require('../config/config')

var route = express.Router()

route.get('/*', function(req, res) {
  var page = req.url
  if (page == "/")
    page = '/index'
  if (page.charAt(page.length - 1) == "/")
    page = page.substring(0, page.length - 1)
  res.writeHead(200, {"Content-Type": "text/html"})
  jade.renderFile( config.paths.content + page + '.jade', function (err, data) {
    if (err)
      res.write('Something went wrong! Try again later.')
    else
      res.write(data)
  })
  res.end()
})

module.exports = route
