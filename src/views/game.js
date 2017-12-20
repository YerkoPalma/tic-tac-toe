const html = require('choo/html')
const finishedGame = require('../components/finished-game')

const createBoard = (state, send) => {
  return html`
    <tbody>
      ${state.board.grid.map((row, x) => {
        return html`
          <tr class="h4">
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
                <td class="w-33 bg-washed-yellow ${isSelected()} ${isMarked()}">
                  <span class="w-100 ph5-l ph5-m ph5 f-subheadline" onclick=${onClick}>
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
    <div class="flex flex-wrap">
      <h1 class="w-100 tc">Hello ${state.player.name}!</h1>
      <div class="w-100">
        <p class="tc">
          <span>Wins: <b>${state.player.wins}</b></span>
          <span>Loses: <b>${state.player.loses}</b></span>
        </p>
      </div>
      <div class="board overflow-hidden w-100 pv5 pf4">
        <table class="relative w-100 w-80-m w-40-l center ${state.board.winnerLine.length > 0 || state.board.availaiblePositions.length === 0
                        ? 'finished' : ''}">
          ${finishedGame(state, send)}
          ${createBoard(state, send)}
        </table>
      </div>
    </div>
  `
}

module.exports = gameView
