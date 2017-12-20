var choo = require('choo')
var css = require('sheetify')

css('tachyons')
css('./style.css', { global: true })

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}

app.route('/', require('./views/main'))
// app.route('/game', require('./views/game'))
// app.route('/*', require('./views/notFound'))
app.mount('body')
