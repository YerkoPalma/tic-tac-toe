/**
 * Filter an object based on an array of keys
 */
function filter (obj, keys) {
  let filteredObj = {}
  keys.forEach(key => {
    if (key in obj) {
      filteredObj[key] = obj[key]
    }
  })
  return filteredObj
}
module.exports = filter
