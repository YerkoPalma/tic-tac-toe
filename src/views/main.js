const html = require('choo/html')
const configPlayer = require('../components/config-player')
const url = 'https://tic-tac-toe.firebaseio.com/users.json'

const mainView = (state, prev, send) => {
  return html`
    <div class="container" onload=${getTopPlayers(url, send)}>
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
  send('player:getRemoteTopFive')
}
