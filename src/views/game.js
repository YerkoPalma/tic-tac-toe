const html = require('choo/html')
const finishedGame = require('../components/finished-game')

const createBoard = (state, send) => {
  return html`
    <tbody>
      ${state.board.grid.map((row, x) => {
        return html `
          <tr>
            ${row.map((column, y) => {
              const isSelected = () => column !== '' ? 'selected' : ''
              const isMarked = () => {
                let markedClass = ''
                if (state.board.winnerLine &&
                    state.board.winnerLine.length > 1) {
                  state.board.winnerLine.forEach(pos => {
                    markedClass += (pos[0] === x && pos[1] === y)
                                   ? 'marked'
                                   : ''
                  })
                }
                return markedClass
              }
              return html`
                <td class="${isSelected()} ${isMarked()}">
                  <span onclick=${onClick}>
                    ${column !== '' ? column : state.player.figure}
                  </span>
                </td>`
              function onClick (e) {
                send(
                  'player:makeMove',
                  { x, y, availaible: state.board.availaiblePositions, grid: state.board.grid }
                )
              }
            })}
          </tr>`
      })}
    </tbody>`
}

const gameView = (state, prev, send) => {
  return html`
    <div class="container">
      <h1>Hello ${state.player.name}!</h1>
      <div class="profile">
        <p>Wins: ${state.player.wins}</p>
        <p>Loses: ${state.player.loses}</p>
      </div>
      <div class="board">
        <table class="${state.board.winnerLine.length > 0 || state.board.availaiblePositions.length === 0
                        ? 'finished' : ''}">
          ${finishedGame(state, send)}
          ${createBoard(state, send)}
        </table>
      </div>
    </div>
  `
}

module.exports = gameView
