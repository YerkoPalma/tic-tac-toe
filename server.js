var fastify = require('fastify')({
  logger: true
})

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

fastify.put('/users/:user', (req, reply) => {
  var { level } = fastify
  var user = req.params.user
  var value = req.body
  level.put(user, value, function (err) {
    if (err) reply.send(err)
    else reply.send({ status: 'ok' })
  })
})

fastify.post('/users', (req, reply) => {
  const { level } = fastify
  level.get(req.body.name, function (err, value) {
    if (err) {
      if (err.notFound) {
        level.put(req.body.name, {
          wins: 0,
          loses: 0,
          score: 0,
          last: new Date()
        }, err => {
          reply.send(err || {
            name: req.body.name,
            wins: 0,
            loses: 0,
            score: 0,
            last: new Date()
          })
        })
      } else {
        if (err) reply.send(err)
      }
    }
    reply.send(Object.assign({ name: req.body.name }, value))
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
