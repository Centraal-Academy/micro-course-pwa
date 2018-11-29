const webpush = require('web-push')
const fs = require('fs')

const vapidKeys = webpush.generateVAPIDKeys()

const content = `module.exports = {
  public: '${vapidKeys.publicKey}',
  private: '${vapidKeys.privateKey}'
}
`

const callback = err => {
  if (err) {
    console.error('Oh no', err)
    return
  }
  console.log('Writed file with keys')
}

fs.writeFile('keys.js', content, 'utf8', callback)
