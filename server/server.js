var http = require('http')
var fs = require("fs")
http.createServer(function(request, response) {
  console.log(request.url)
  if (request.url === '/index') {
    fs.readFile('../src/public/index.html', function (err, html) {
      if (err) {
        throw err 
      }       
      response.writeHeader(200, {"Content-Type": "text/html"})
      response.write(html)
      response.end()
    })
  } else if (request.url === '/static/client') {
    fs.readFile('./clients.json', function (err, data) {
      if (err) {
        throw err 
      }       
      response.writeHeader(200, {"Content-Type": "application/json"})  
      response.write(data)  
      response.end()  
    })
  }
}).listen(8080)
console.log('Server running at http://127.0.0.1:8080/')