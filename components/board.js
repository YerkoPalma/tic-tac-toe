var Nanocomponent = require('nanocomponent')
var html = require('bel')

function Board () {
  if (!(this instanceof Board)) return new Board()
  
  this.winner = null
  this.cells = Array(9).fill(null)
  this._ctx = {}
  this._state = null
  this._emit = null

  Nanocomponent.call(this)
}
Board.prototype = Object.create(Nanocomponent.prototype)

Board.prototype.createElement = function (state, emit) {
  return html`
  <tbody>
    <tr class="h4">
      <td class="w-33 bg-washed-yellow">
        <span class="w-100 ph5-l ph5-m ph5 f-subheadline">
        </span>
      </td>
    </tr>
  </tbody>`
}

Board.prototype.update = function (state, emit) {
  return true
}

module.exports = Board
