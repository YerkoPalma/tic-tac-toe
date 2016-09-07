/**
 * Convert a firebase object to an array
 */
function toArray (obj) {
  let keys = Object.keys(obj)
  let arr = keys.map(key => {
    return Object.assign(obj[key], { fbKey: key })
  })
  // order by score
  return arr.sort((a, b) => {
    return b.score - a.score
  })
}
module.exports = {
  toArray
}
