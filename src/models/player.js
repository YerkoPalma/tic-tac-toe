const checkWinner = require('../utils/check')
const firebaseUtils = require('../utils/firebase')
const { getPlayers, postPlayer, patchPlayer } = require('../utils/api')

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
    fbKey: '',
    current: 0,
    users: []
  },
  reducers: {
    /**
     * set initial data
     */
    init: (data, state) => {
      let users = state.users
      data.user.fbKey = data.fbKey
      if (!state.users[data.fbKey]) users.push(data.user)
      return Object.assign(state, data.user, { fbKey: data.fbKey }, { users })
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
    },
    update: (data, state) => {
      return Object.assign(state, data.user)
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
        const foundUser = state.users.find(user => {
          return user.name === state.name
        })
        // victory
        if (check.winner === state.figure) {
          foundUser.wins++
          foundUser.score++
        // defeat
        } else if (check.line.length > 0) {
          foundUser.loses++
          foundUser.score--
        }
        patchPlayer(foundUser).then(response => {
          send('player:update', { user: foundUser }, done)
          send('board:finish', { winnerLine: check.line, winner: check.winner }, done)
        }).catch(err => {
          console.log(err)
          send('board:finish', { winnerLine: check.line, winner: check.winner }, done)
        })
      } else if (availaiblePositions.length > 0) {
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
        const foundUser = state.users.find(user => {
          return user.name === state.name
        })
        // victory
        if (check.winner === state.figure) {
          foundUser.wins++
          foundUser.score++
        // defeat
        } else if (check.line.length > 0) {
          foundUser.loses++
          foundUser.score--
        // draw
        }
        patchPlayer(foundUser).then(response => {
          send('player:update', { user: foundUser }, done)
          send('board:finish', { winnerLine: check.line, winner: check.winner }, done)
        }).catch(err => {
          console.log(err)
          send('board:finish', { winnerLine: check.line, winner: check.winner }, done)
        })
      }
    },
    join: (data, state, send, done) => {
      // check if player already exists
      const name = document.getElementById('player').value
      const foundUser = state.users.find(user => {
        return user.name === name
      })
      // if already exists, just updates the info
      if (foundUser) {
        patchPlayer(foundUser).then(response => {
          send('player:init',
          { user: response.data[foundUser.fbKey] },
          done)
          send('location:setLocation', { location: '/game' }, done)
          window.history.pushState({}, null, '/game')
        }).catch(err => {
          console.log(err)
        })
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
          { user, fbKey: response.data.name },
          done)
          send('location:setLocation', { location: '/game' }, done)
          window.history.pushState({}, null, '/game')
        }).catch(err => {
          console.log(err)
        })
      }
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
