const html = require('choo/html')

const configPlayer = (state, send) => {
  return html`
  <div class="config-panel">
    <input id="player" type="text">
    <button onclick=${e => send('player:join')}>Play</button>
  </div>
  `
}

module.exports = configPlayer
