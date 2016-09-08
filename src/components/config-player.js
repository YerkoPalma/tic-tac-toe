const html = require('choo/html')

const configPlayer = (state, send) => {
  return html`
  <div class="flex center pv3 w-80 w-40-l w-50-ns w-80-m">
    <input id="player" type="text" class="outline-0 outline-transparent input-reset pa3 br4 br--left input-reset b--gray ba w-60 w-75-l w-75-m w-75-ns pa3 br4 br--left">
    <button onclick=${e => send('player:join')} class="br4 pointer outline-0 W-40 w-25-l w-25-m w-25-ns bl-0 br--right pa3 dim b--gray ba bg-washed-yellow hover-bg-yellow fw7 dark-gray tracked-mega">Play</button>
  </div>
  `
}

module.exports = configPlayer
