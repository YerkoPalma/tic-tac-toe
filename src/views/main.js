const html = require('choo/html')
const http = require('choo/http')
const Dexie = require('dexie')
const configPlayer = require('./config-player')

const mainView = (state, prev, send) => {
  return html`
    <div class="container" onload=${getTopPlayers('https://tic-tac-toe.firebaseio.com/users.json')}>
      <h1>Tic tac toe powered by choo</h1>
      <hr>
      <div class="wrapper center">
        ${configPlayer(state, send)}
      </div>
    </div>
  `
}

module.exports = mainView

/**
 * Get the top 5 players from local and remote db and then dispatch an update event to the model
 * to show them in the score panel component
 */
function getTopPlayers (playersUrl, send) {
  // first update from firebase, because the indexedDB data is already loaded
  let db = new Dexie('tic-tac-toe')
  db.open()
    .then(() => {
      db.users
        .orderBy('rank')
        .limit(5)
        .toArray()
        .then(users => {
          // should update the view here
        })
    })
    .catch(err => {
      console.log(err)
    })
}
