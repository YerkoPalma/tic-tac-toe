var html = require('choo/html')
var Board = require('../components/board')

var board = Board()

var mainView = (state, emit) => {
  state.player = {}
  state.cells = state.cells || Array(9).fill(null)
  return html`
  <body>
    <div class="flex flex-wrap">
      <h1 class="w-100 tc">Hello ${state.player.name}!</h1>
      <div class="w-100">
        <p class="tc">
          <span>Wins: <b>${state.player.wins}</b></span>
          <span>Loses: <b>${state.player.loses}</b></span>
        </p>
      </div>
      <div class="board overflow-hidden w-100 pv5 pf4">
        <table class="relative w-100 w-80-m w-40-l center ">
          ${board.render(state, emit)}
        </table>
      </div>
    </div>
  </body>
  `
}

module.exports = mainView
