const html = require('choo/html')
const configPlayer = require('../components/config-player')

const mainView = (state, prev, send) => {
  return html`
    <div class="container" onload=${(e) => send('player:getRemoteTopFive')}>
      <h1>Tic tac toe powered by choo</h1>
      <hr>
      <div class="wrapper center">
        ${configPlayer(state, send)}
      </div>
      <div class="rank-board">
        ${state.player.users.map(user => {
          return html`
          <div class="user">
            <p>${user.name}   | ${user.best} </p>
            <br>
          </div>
          `
        })}
      </div>
    </div>
  `
}

module.exports = mainView
