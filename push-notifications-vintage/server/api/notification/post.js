const keys = require('../../../keys')
const webpush = require('../../modules/bootstrap-web-push')(keys)

const isValidSubscription = (subscription) => {
  return subscription && subscription.endpoint
}
module.exports = (req, res) => {
  const notification = {
    title: 'Bienvenido',
    body: 'Ahora podemos enviarte notificaciones'
  }

  const subscription = req.body

  if (!isValidSubscription(subscription)) {
    res.status(400).json({ error: 'no valid suscription' })
    return
  }

  webpush.sendNotification(subscription, JSON.stringify(notification))
    .then(() => {
      res.status(200).json({ success: true })
    })
    .catch(
      err => {
        console.error(err)
        res.status(400).json(err)
      }
    )
}
