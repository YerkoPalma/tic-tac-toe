/* global fetch Headers */
module.exports = function (state, emitter) {
  emitter.on('DOMContentLoaded', function () {
    fetch('/users')
    .then(response => response.json())
    .then(users => {
      state.players = users
      emitter.emit('render')
    })
  })

  emitter.on('player:join', function (name) {
    var headers = new Headers()
    headers.append('Content-Type', 'application/json')
    fetch('/users', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name
      })
    })
    .then(response => response.json())
    .then(user => {
      state.player = user
      emitter.emit(state.events.PUSHSTATE, '/game')
    })
    .catch(err => {
      throw err
    })
  })
  emitter.on('player:update', function ({ name, player }) {
    var headers = new Headers()
    headers.append('Content-Type', 'application/json')
    fetch('/users/' + name, {
      method: 'PUT',
      headers,
      body: JSON.stringify(player)
    })
    .then(response => {
      if (response.ok) {
        player.name = name
        state.player = player
        var index
        state.players.filter((p, i) => {
          index = i
          return player.name === p.name
        })
        state.players[index] = player
      }
    })
  })
}
