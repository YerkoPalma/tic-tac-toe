const checkWinner = require('../utils/check')
const { getPlayers, postPlayer } = require('../utils/api')

module.exports = {
  namespace: 'player',
  state: {
    name: '',
    id: '',
    figure: 'X',
    points: 0,
    topFive: []
  },
  reducers: {
    /**
     * set initial data
     */
    init: (data, state) => {
      return {
        name: data.player,
        id: '1'
      }
    },
    /**
     * reset player
     */
    reset: (data, state) => {
      return {
        name: '',
        id: '',
        figure: 'X',
        points: 0,
        multiplayer: false
      }
    },
    setTopFive: (data, state) => {
      return {
        topFive: data.users
      }
    }
  },
  effects: {
    /**
     * player move
     */
    makeMove: (data, state, send, done) => {
      const x = data.x
      const y = data.y
      // position in the board to be removed
      const pos = (3 * x) + y
      // position reference
      const availaiblePositions = data.availaible
      const index = availaiblePositions.indexOf(pos)

      availaiblePositions.splice(index, 1)
      send('board:update', { x, y, figure: state.figure, availaible: availaiblePositions }, done)
      // TODO: before making an oponent move, should evaluate if the payer has won
      const check = checkWinner(data.grid, {x, y}, state.figure)
      if (check.winner && check.winner !== '') {
        console.log(`The winner is ${check.winner}`)
        send('board:finish', { winnerLine: check.line, winner: check.winner }, done)
      }
      if (!state.multiplayer && availaiblePositions.length > 0) {
        // get random number to retrieve the availaible positions
        const randomPos = Math.floor(Math.random() * availaiblePositions.length)
        const pos = availaiblePositions[randomPos]
        const autoX = Math.floor(pos / 3)
        const autoY = pos % 3
        setTimeout(
          send('player:autoMove', { autoX, autoY, availaible: availaiblePositions, grid: data.grid }, done),
          2000
        )
      }
    },
    /**
     * opponent move
     */
    autoMove: (data, state, send, done) => {
      const x = data.autoX
      const y = data.autoY
      // position in the board to be removed
      const pos = (3 * x) + y
      // position reference
      const availaiblePositions = data.availaible

      const index = availaiblePositions.indexOf(pos)
      availaiblePositions.splice(index, 1)
      const figure = state.figure === 'X' ? 'O' : 'X'
      send('board:update', { x, y, figure, availaible: availaiblePositions }, done)
      const check = checkWinner(data.grid, {x, y}, figure)
      if (check.winner && check.winner !== '') {
        console.log(`The winner is ${check.winner}`)
        send('board:finish', { winnerLine: check.line, winner: check.winner }, done)
      }
    },
    join: (data, state, send, done) => {
      send('player:init',
        { player: document.getElementById('player').value },
        done)
      // TODO
      // also save a new user, or update a new connection from user
      // is a http request not a reducer call
      let user = {}
      postPlayer(user).then(response => {
        send('location:setLocation', { location: '/game' }, done)
        window.history.pushState({}, null, '/game')
      }).catch(err => {
        console.log(err)
      })
    },
    setLocalTopFive: (data, state, send, done) => {
      // set users from data.users
      send('player:setTopFive', { users: data.users })
    },
    getRemoteTopFive: (data, state, send, done) => {
      // set users from firebase
      // make an http request for that
      getPlayers().then(response => {
        const jsonData = JSON.parse(response.body)
        const responseKeys = Object.keys(jsonData)
        const realResponse = responseKeys.map(function (key) {
          let returned = jsonData[key]
          returned._id = key
          return returned
        })
        send('player:setTopFive', { users: realResponse })
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
