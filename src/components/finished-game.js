const html = require('choo/html')

const finishedGame = (state, send) => {
  if (state.board.winnerLine.length > 0 || state.board.availaiblePositions.length === 0) {
    const winneMessage = state.board.winner === state.player.figure
                          ? 'You win!'
                          : 'You lose'
    const drawMessage = 'It\'s a draw!'
    const message = state.board.winnerLine.length === 0
                    ? drawMessage
                    : winneMessage
    return html`
    <div class="finish-panel">
      <h3>${message}</h3>
      <div class="absolute justify-around flex w-100 mv5 mv6-l mv6-m mv6-ns flex-column flex-row-ns flex-row-m flex-row-l">
        <button class="pa2 w4-l w4-m w4-ns w5 mv3 br3 ba b--black-50 self-center pointer" onclick=${e => send('board:restart')}>Restart</button>
        <button class="pa2 w4-l w4-m w4-ns w5 mv3 br3 ba b--black-50 self-center fr pointer" onclick=${e => send('board:replay')}>Replay</button>
      </div>
    </div>
    `
  }
}

module.exports = finishedGame
