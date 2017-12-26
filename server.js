var fastify = require('fastify')()

fastify.register(require('fastify-bankai'), {
  entry: './index.js'
})

fastify.register(require('fastify-leveldb'), {
  name: 'db',
  options: {
    valueEncoding: 'json'
  }
}, err => {
  if (err) throw err
})

fastify.post('/users', (req, reply) => {
  const { level } = fastify
  level.put(req.body.name, {
    wins: 0,
    loses: 0,
    score: 0,
    last: new Date()
  }, (err) => {
    reply.send(err || { status: 'ok' })
  })
})

fastify.get('/users', (req, reply) => {
  var { level } = fastify
  var users = []
  level.createReadStream()
    .on('data', function (data) {
      var o = Object.assign({ name: data.key }, data.value)
      users.push(o)
    })
    .on('error', function (err) {
      reply.send(err)
    })
    .on('end', function () {
      reply.send(users)
    })
})

fastify.listen(process.env.PORT || 8080, process.env.IP || 'localhost', err => {
  if (err) throw err
  var { port, address } = fastify.server.address()
  console.log(`Server listenting on ${address}:${port}`)
})
