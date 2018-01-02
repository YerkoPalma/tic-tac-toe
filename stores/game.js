/* global fetch Headers */
const url = 'https://tic-tac-toe-d4f97.firebaseio.com/users.json'
const userUrl = userKey => `https://tic-tac-toe-d4f97.firebaseio.com/users/${userKey}.json`

module.exports = function (state, emitter) {
  emitter.on('DOMContentLoaded', function () {
    fetch(url)
    .then(response => response.json())
    .then(users => {
      state.players = []
      for (var key in users) {
        if (users[key].name)
        state.players.push(Object.assign(users[key], { key }))
      }
      state.players.sort((a, b) => b.score - a.score)
      emitter.emit('render')
    })
  })

  emitter.on('player:join', function (name) {
    const foundUser = state.players.find(user => {
      return user.name === name
    })
    if (foundUser) {
      state.player = foundUser
      emitter.emit(state.events.PUSHSTATE, '/game')
    } else {
      var headers = new Headers()
      headers.append('Content-Type', 'application/json')
      var player = {
          name,
          score: 0,
          wins: 0,
          loses: 0,
          last: new Date(),
          best: 0,
          current: 0
        }
      fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(player)
      })
      .then(response => response.json())
      .then(user => {
        state.player = player
        player.key = user.name
        state.players.push(player)
        emitter.emit(state.events.PUSHSTATE, '/game')
      })
      .catch(err => {
        throw err
      })
    }
  })
  emitter.on('player:update', function (player) {
    var headers = new Headers()
    headers.append('Content-Type', 'application/json')
    var _url = userUrl(player.key)
    var key = player.key
    delete player.key
    fetch(_url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(player)
    })
    .then(response => {
      if (response.ok) {
        state.player = player
        var index
        for(var p of state.players) {
          if (p.key === key) index = state.players.indexOf(p)
        }
        state.players[index] = player
      }
    })
  })
}
