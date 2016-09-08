const html = require('choo/html')
const localforage = require('localforage')
const configPlayer = require('../components/config-player')

const mainView = (state, prev, send) => {
  return html`
    <div onload=${firstLoad(state, send)}>
      <header class="tc pv3 pv4-ns cf">
        <h1 class="f2 f2-ns fw6 mid-gray">Tic tac toe powered by choo</h1>
      </header>
      <div class="wrapper center">
        ${configPlayer(state, send)}
      </div>
      <div class="w-100">
        <table class="collapse ba b--black-10 pv2 center w-80 w-25-l w-33-ns w-50-m">
          <thead>
            <tr>
              <th class="pv2 ph3 tl f6 fw6 ttu">#</th>
              <th class="pv2 ph3 tl f6 fw6 ttu">Username</th>
              <th class="pv2 ph3 tl f6 fw6 ttu">Score</th>
            </tr>
          </thead>
          <tbody>
          ${state.player.users.map((user, i) => {
            return html`
              <tr class="striped--near-white">
                <td class="pv2 ph3">${i + 1}</td>
                <td class="pv2 ph3">${user.name}</td>
                <td class="pv2 ph3">${user.score}</td>
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
