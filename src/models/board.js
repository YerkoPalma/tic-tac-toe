module.exports = {
  namespace: 'board',
  state: {
    grid: [['', '', ''],
           ['', '', ''],
           ['', '', '']],
    availaiblePositions: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    winnerLine: [],
    winner: ''
  },
  reducers: {
    /**
     * updates the board, should be triggered after every move
     */
    update: (data, state) => {
      const grid = state.grid
      grid[data.x][data.y] = data.figure
      const tr = document.querySelectorAll('.board tr')[data.x]
      const td = tr.querySelectorAll('td')[data.y]
      td.classList.add('selected')
      return {
        grid,
        availaiblePositions: data.availaible
      }
    },
    /**
     * finish the game, must set a winner and a loser
     */
    finish: (data, state) => {
      return {
        winnerLine: data.winnerLine,
        winner: data.winner
      }
    },
    /**
     * reset the board for a new game
     */
    replay: (data, state) => {
      return {
        grid: [['', '', ''],
               ['', '', ''],
               ['', '', '']],
        availaiblePositions: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        winnerLine: [],
        winner: ''
      }
    }
  },
  effects: {
    /**
     * fully restart the game
     */
    restart: (data, state, send, done) => {
      send('player:reset', done)
      send('board:replay', done)
      send('location:setLocation', { location: '/' }, done)
      window.history.pushState({}, null, '/')
    }
  }
}
