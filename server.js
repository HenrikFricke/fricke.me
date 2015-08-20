var http = require("http");
var fs = require("fs");
var jade = require('jade')
var analyzepath = require("./analyzepath-jade")

var serverInit = function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"})
  analyzepath(request.url, function(err, page) {
    if (err)
      response.write('Something went wrong! Try again later.')
    else
      var html = jade.renderFile(page)
      response.write(html)
    response.end()
  })
}

var server = http.createServer(serverInit)
server.listen(8080)
