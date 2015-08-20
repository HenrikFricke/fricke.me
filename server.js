var http = require("http");
var fs = require("fs");
var analyzepath = require("./analyzepath")

var serverInit = function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"})
  analyzepath(request.url, function(err, page) {
    fs.readFile(page, function(err2, data) {
      if (err || err2)
        response.write('Something went wrong! Try again later.')
      else
        response.write(data)
      response.end()
    })
  })
}

var server = http.createServer(serverInit)
server.listen(8080)
