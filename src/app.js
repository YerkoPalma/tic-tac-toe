const choo = require('choo')
const Dexie = require('dexie')
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

const tree = app.start()
document.body.appendChild(tree)

document.addEventListener('DOMContentLoaded', e => {
  // As soon as the content is ready, open the local db and add whatever is in the firebase db
  Dexie.getDatabaseNames(dbName => {
    let db = new Dexie('tic-tac-toe')
    db.version(1).stores({
      todos: '++id,name,last-game,wins,loses,rank'
    })
  })
})
