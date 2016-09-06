const axios = require('axios')
const url = 'https://tic-tac-toe-d4f97.firebaseio.com/users'

/**
 * Get remote players from firebase
 */
function getPlayers () {
  return axios.get(`${url}.json`)
}

/**
 * Get player by name
 */
function getPlayer (name) {
  return axios.get(`${url}/${name}.json`)
}

/**
 * Save player
 */
function postPlayer (player) {
  return axios.post(`${url}.json`, player)
}

/**
 * Updates a player
 */
function patchPlayer (player) {
  let fbPlayer = {}
  fbPlayer[player.fbKey] = {
    best: player.best,
    last: new Date(),
    current: player.current,
    wins: player.wins,
    loses: player.loses,
    name: player.name,
    score: player.score
  }
  return axios.patch(`${url}.json`, fbPlayer)
}

module.exports.getPlayers = getPlayers
module.exports.getPlayer = getPlayer
module.exports.postPlayer = postPlayer
module.exports.patchPlayer = patchPlayer
