module.exports = {
  namespace: 'player',
  state: {
    name: '',
    id: '',
    figure: 'X',
    points: 0,
    multiplayer: false
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
      // TODO: should select the figure of the oponent
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
      send('location:setLocation', { location: '/game' }, done)
      window.history.pushState({}, null, '/game')
    }
  }
}

/*
 * get the winner of the game and the winner line, or null if no onw has win
 */
function checkWinner (grid, lastMove, lastPlayer) {
  let winner
  let line
  grid[lastMove.x][lastMove.y] = lastPlayer
  // row 0
  if ((grid[0][0] && grid[0][0] !== '') && (grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2])) {
    winner = grid[0][0]
    line = [[0, 0], [0, 1], [0, 2]]
  }
  // row 1
  if ((grid[1][0] && grid[1][0] !== '') && (grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2])) {
    winner = grid[1][0]
    line = [[1, 0], [1, 1], [1, 2]]
  }
  // row 2
  if ((grid[2][0] && grid[2][0] !== '') && (grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2])) {
    winner = grid[2][0]
    line = [[2, 0], [2, 1], [2, 2]]
  }
  // column 0
  if ((grid[0][0] && grid[0][0] !== '') && (grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0])) {
    winner = grid[0][0]
    line = [[0, 0], [1, 0], [2, 0]]
  }
  // column 1
  if ((grid[0][1] && grid[0][1] !== '') && (grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1])) {
    winner = grid[0][1]
    line = [[0, 1], [1, 1], [2, 1]]
  }
  // column 2
  if ((grid[0][2] && grid[0][2] !== '') && (grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2])) {
    winner = grid[0][2]
    line = [[0, 2], [1, 2], [2, 2]]
  }
  // diagonal \
  if ((grid[0][0] && grid[0][0] !== '') && (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2])) {
    winner = grid[0][0]
    line = [[0, 0], [1, 1], [2, 2]]
  }
  // diagonal /
  if ((grid[0][2] && grid[0][2] !== '') && (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0])) {
    winner = grid[0][2]
    line = [[0, 2], [1, 1], [2, 0]]
  }
  return { winner, line }
}
