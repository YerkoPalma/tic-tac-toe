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
      <div class="clearfix">
        <button onclick=${e => send('board:restart')}>Restart</button>
        <button onclick=${e => send('board:replay')}>Replay</button>
      </div>
    </div>
    `
  }
}

module.exports = finishedGame
