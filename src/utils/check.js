module.exports = checkWinner
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