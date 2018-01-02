var fastify = require('fastify')({
  logger: true
})

fastify.register(require('fastify-bankai'), {
  entry: './index.js'
})

fastify.listen(process.env.PORT || 8080, process.env.IP || 'localhost', err => {
  if (err) throw err
  var { port, address } = fastify.server.address()
  console.log(`Server listenting on ${address}:${port}`)
})
