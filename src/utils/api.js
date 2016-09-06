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
function patchPlayer (id, data) {
  
}

module.exports.getPlayers = getPlayers
module.exports.getPlayer = getPlayer
module.exports.postPlayer = postPlayer
module.exports.patchPlayer = patchPlayer
