/* global navigator */
const choo = require('choo')
const sf = require('sheetify')
const localforage = require('localforage')
const mainView = require('./views/main')
const gameView = require('./views/game')

sf('normalize.css')
sf('./style.css', { global: true })

const app = choo()
if (process.env.NODE_ENV !== 'production') {
  const log = require('choo-log')
  app.use(log())
}

app.use(offline())

app.model(require('./models/board'))
app.model(require('./models/player'))

app.router(route => [
  route('/', mainView),
  route('/game', gameView)
])

const tree = app.start({ hash: true })
document.body.appendChild(tree)

function offline () {
  const onStateChange = (data, state, prev, createSend) => {
    localforage.setItem('app', state).then(value => {
      // Do other things once the value has been saved.
      console.log(value)
    }).catch(err => {
      // This code runs if there were any errors
      console.log(err)
    })
  }
  return {
    onStateChange
  }
}

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  navigator.serviceWorker.register('service-worker.js').then(function (reg) {
    reg.onupdatefound = function () {
      var installingWorker = reg.installing

      installingWorker.onstatechange = function () {
        switch (installingWorker.state) {
          case 'installed':
            if (navigator.serviceWorker.controller) {
              console.log('New or updated content is available.')
            } else {
              console.log('Content is now available offline!')
            }
            break

          case 'redundant':
            console.error('The installing service worker became redundant.')
            break
        }
      }
    }
  }).catch(function (e) {
    console.error('Error during service worker registration:', e)
  })
}
