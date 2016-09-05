const axios = require('axios')
const url = 'https://tic-tac-toe.firebaseio.com/users.json'

/**
 * Get remote players from firebase
 */
function getPlayers (n) {
  return axios.get(`${url}?orderBy="score"&limitToLast=${n || 5}`)
}

/**
 * Save player
 */
function postPlayer (player) {
  return axios.post(url, player)
}

/**
 * Updates a player
 */
function patchPlayer (id, data) {
  
}

module.exports.getPlayers = getPlayers
module.exports.postPlayer = postPlayer
module.exports.patchPlayer = patchPlayer
