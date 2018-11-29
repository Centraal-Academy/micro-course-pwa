const webpush = require('web-push')

module.exports = (keys) => {
  webpush.setVapidDetails(
    'mailto:joel@centraal.com',
    keys.public,
    keys.private
  )
  return webpush
}
