const choo = require('choo')
const sf = require('sheetify')
const mainView = require('./views/main')
const gameView = require('./views/game')

sf('normalize.css')
sf('./style.css', { global: true })

const app = choo()
if (process.env.NODE_ENV !== 'production') {
  const log = require('choo-log')
  app.use(log())
}

app.model(require('./models/board'))
app.model(require('./models/player'))

app.router(route => [
  route('/', mainView),
  route('/game', gameView)
])

const tree = app.start({ hash: true })
document.body.appendChild(tree)
