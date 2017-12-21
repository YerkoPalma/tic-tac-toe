var Nanocomponent = require('nanocomponent')
var html = require('bel')

function Board () {
  if (!(this instanceof Board)) return new Board()

  this.winner = null
  this.winnerLine = []
  this.cells = Array(9).fill(null)
  this._ctx = {
    currentPlayer: 'X'
  }
  this._state = null
  this._emit = null

  Nanocomponent.call(this)
  this.clickCell = this.clickCell.bind(this)
}
Board.prototype = Object.create(Nanocomponent.prototype)

Board.prototype.createElement = function (state, emit) {
  return html`
  <table class="relative w-100 w-80-m w-40-l center ${this.winner ? 'finished' : ''}">
    ${this.winner
      ? html`<div class="finish-panel">
        <h3>Game over</h3>
        <div class="absolute justify-around flex w-100 mv5 mv6-l mv6-m mv6-ns flex-column flex-row-ns flex-row-m flex-row-l">
          <button class="pa2 w4-l w4-m w4-ns w5 mv3 br3 ba b--black-50 self-center pointer" onclick=${e => emit('board:restart')}>Restart</button>
          <button class="pa2 w4-l w4-m w4-ns w5 mv3 br3 ba b--black-50 self-center fr pointer" onclick=${e => emit('board:replay')}>Replay</button>
        </div>
      </div>`
      : ''
    }
    <tbody>
      ${[0, 1, 2].map(row => {
        return html`
          <tr class="h4">
            ${[0, 1, 2].map(column => {
              return html`<td class="w-33 bg-light-yellow ${this.cells[3 * row + column] ? 'selected' : ''} ${this.winnerLine.indexOf(3 * row + column) > -1 ? 'marked' : ''}">
                <span onclick=${this.clickCell} data-id=${3 * row + column} class="helvetica w-100 ph5-l ph5-m ph5 f-subheadline">
                  ${this.cells[3 * row + column] || this._ctx.currentPlayer}
                </span>
              </td>`
            })}
          </tr>`
      })}
    </tbody>
  </table>`
}

Board.prototype.clickCell = function (e) {
  e.preventDefault()
  if (this.winner) return
  var id = e.target.dataset.id
  if (this.cells[id]) return
  this.cells[id] = this._ctx.currentPlayer

  if (isVictory.call(this)) {
    this.winner = this._ctx.currentPlayer
  } else {
    // if there was no win, make auto move
    var availaible = []
    this.cells.forEach((cell, i) => {
      if (cell === null) availaible.push(i)
    })
    var randomId = getRandomId(availaible)
    this.cells[availaible[randomId]] = 'O'
    if (isVictory.call(this)) this.winner = 'O'
  }
  this.render()
}

Board.prototype.update = function (state, emit) {
  return true
}

module.exports = Board

function getRandomId (arr) {
  var max = arr.length - 1
  var min = 0
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function isVictory () {
  var positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (var pos of positions) {
    var symbol = this.cells[pos[0]]
    var winner = symbol
    for (var i of pos) {
      if (this.cells[i] !== symbol) {
        winner = null
        break
      }
    }
    if (winner !== null) {
      this.winnerLine = pos
      return true
    }
  }

  return false
}
