/* global fetch Headers */
module.exports = function (state, emitter) {
  var headers = new Headers()
  headers.append('Content-Type', 'application/json')
  emitter.on('player:join', function (name) {
    fetch('/users', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name
      })
    })
    .then(response => response.json())
    .then(() => {
      emitter.emit(state.events.PUSHSTATE, '/game')
    })
    .catch(err => {
      throw(err)
    })
  })
}
