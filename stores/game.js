module.exports = function (state, emitter) {
  emitter.on('player:join', function () {
    emitter.emit(state.events.PUSHSTATE, '/game')
  })
}
