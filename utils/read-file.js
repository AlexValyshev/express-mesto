const fsPromises = require('fs').promises;

module.exports = (pathJson) => {
  return fsPromises.readFile(pathJson, { encoding: 'utf8' })
    .then(file => {
      return JSON.parse(file)
  })
}
