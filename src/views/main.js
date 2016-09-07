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
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
          ${state.player.users.map((user, i) => {
            return html`
              <tr>
                <td>${i + 1}</td>
                <td>${user.name}</td>
                <td>${user.score}</td>
              </tr>
            `
          })}
          </tbody>
        </table>
      </div>
    </div>
  `
}

module.exports = mainView
