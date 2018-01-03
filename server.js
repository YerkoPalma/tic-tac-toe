var bankai = require('bankai/http')
var http = require('http')
var path = require('path')

var compiler = bankai(path.join(__dirname, 'index.js'), {
  watch: process.env.NODE_ENV !== 'production',
  assert: process.env.NODE_ENV !== 'production',
  quiet: process.env.NODE_ENV === 'production' }
)

var server = http.createServer(function (req, res) {
  compiler(req, res, function () {
    res.statusCode = 404
    res.end('not found')
  })
})

server.listen(process.env.PORT || 8080, process.env.IP || 'localhost', function () {
  console.log('listening on port 8080')
})
