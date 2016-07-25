const choo = require('choo')
const sf = require('sheetify')
const mainView = require('./views/main')
const gameView = require('./views/game')
const chooLog = require('choo-log')

sf('normalize.css')
sf('./style.css', { global: true })

const logger = chooLog()
const app = choo({
  onAction: logger.onAction,
  onError: logger.onError,
  onStateChange: logger.onStateChange
})

app.model(require('./models/board'))
app.model(require('./models/player'))

app.router(route => [
  route('/', mainView),
  route('/game', gameView)
])

const tree = app.start()
document.body.appendChild(tree)
