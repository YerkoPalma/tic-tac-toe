const html = require('choo/html')
const configPlayer = require('./config-player')

const mainView = (state, prev, send) => {
  return html`
    <div class="container">
      <h1>Tic tac toe powered by choo</h1>
      <hr>
      <div class="wrapper center">
        ${configPlayer(state, send)}
      </div>
    </div>
  `
}

module.exports = mainView
