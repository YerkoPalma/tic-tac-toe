const checkWinner = require('../utils/check')
const firebaseUtils = require('../utils/firebase')
const { getPlayers, getPlayer, postPlayer, patchPlayer } = require('../utils/api')

module.exports = {
  namespace: 'player',
  state: {
    name: '',
    id: '',
    figure: 'X',
    score: 0,
    wins: 0,
    loses: 0,
    last: new Date(),
    best: 0,
    current: 0,
    users: []
  },
  reducers: {
    /**
     * set initial data
     */
    init: (data, state) => {
      return Object.assign(state, data.user)
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
        users: data.users
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
      // check if player already exists
      const name = document.getElementById('player').value
      getPlayer(name).then(response => {
        console.log(response)
        // if already exists, just updates the info
        if (response.status === 200 && response.data !== null) {
          patchPlayer()
        } else {
          let user = {
            name,
            score: 0,
            wins: 0,
            loses: 0,
            last: new Date(),
            best: 0,
            current: 0
          }
          postPlayer(user).then(response => {
            send('player:init',
            { user },
            done)
            send('location:setLocation', { location: '/game' }, done)
            window.history.pushState({}, null, '/game')
          }).catch(err => {
            console.log(err)
          })
        }
      }).catch(err => {
        // if it doesn't exists, save it
        if (err.response && err.response.data === null) {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          let user = {
            name,
            score: 0,
            wins: 0,
            loses: 0,
            last: new Date(),
            best: 0,
            current: 0
          }
          postPlayer(user).then(response => {
            send('player:init',
            { user },
            done)
            send('location:setLocation', { location: '/game' }, done)
            window.history.pushState({}, null, '/game')
          }).catch(err => {
            console.log(err)
          })
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', err.message)
        }
      })
    },
    getRemoteTopFive: (data, state, send, done) => {
      // set users from firebase
      // make an http request for that
      getPlayers().then(response => {
        const jsonData = firebaseUtils.toArray(response.data)
        send('player:setTopFive', { users: jsonData }, done)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
