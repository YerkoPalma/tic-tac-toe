const html = require('choo/html')
const localforage = require('localforage')
const configPlayer = require('../components/config-player')

const mainView = (state, prev, send) => {
  return html`
    <div class="container" onload=${firstLoad(state, send)}>
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

function firstLoad (state, send) {
  return function () {
    send('player:getRemoteTopFive')
    if (state.board.initial) {
      localforage.getItem('app').then(localState => {
        if (localState) {
          send('player:firstLoad', { localState })
          send('board:firstLoad', { localState })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}

module.exports = mainView
