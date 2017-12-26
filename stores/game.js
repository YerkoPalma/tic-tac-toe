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
}
