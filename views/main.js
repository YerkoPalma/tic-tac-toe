var html = require('choo/html')

var mainView = (state, emit) => {
  return html`
    <body>
      <header class="helvetica tc pv3 pv4-ns cf">
        <h1 class="f2 f2-ns fw6 mid-gray">Tic tac toe powered by choo</h1>
      </header>
      <div class="helvetica wrapper center">
        <div class="flex center pv3 w-80 w-40-l w-50-ns w-80-m">
          <input id="player" type="text" class="outline-0 outline-transparent input-reset pa3 br4 br--left input-reset b--gray ba w-60 w-75-l w-75-m w-75-ns pa3 br4 br--left">
          <button onclick=${e => emit('player:join')} class="br4 pointer outline-0 W-40 w-25-l w-25-m w-25-ns bl-0 br--right pa3 dim b--gray ba bg-washed-yellow hover-bg-yellow fw7 dark-gray tracked-mega">Play</button>
        </div>
      </div>
      <div class="helvetica w-100">
        <table class="collapse ba b--black-10 pv2 center w-80 w-25-l w-33-ns w-50-m">
          <thead>
            <tr>
              <th class="pv2 ph3 tl f6 fw6 ttu">#</th>
              <th class="pv2 ph3 tl f6 fw6 ttu">Username</th>
              <th class="pv2 ph3 tl f6 fw6 ttu">Score</th>
            </tr>
          </thead>
          <tbody>
          ${state.player ? state.player.users.map((user, i) => {
            return html`
              <tr class="striped--near-white">
                <td class="pv2 ph3">${i + 1}</td>
                <td class="pv2 ph3">${user.name}</td>
                <td class="pv2 ph3">${user.score}</td>
              </tr>
            `
          }) :
            html`<tr class="striped--near-white">
              <td colspan="3" class="pv2 ph3">
                No results to display
              </td>
            </tr>`
          }
          </tbody>
        </table>
      </div>
    </body>
  `
}

module.exports = mainView
