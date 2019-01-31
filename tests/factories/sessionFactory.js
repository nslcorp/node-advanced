const Buffer = require('safe-buffer').Buffer
const Keygrip = require('keygrip')
const {cookieKey} = require('../../config/keys')

const keygrip = new Keygrip([cookieKey])


module.exports = (user) => {
  const sessionObj = {
    passport: {user: user._id.toString()}
  }

  const session = Buffer.from(JSON.stringify(sessionObj)).toString('base64')

  return {
    session,
    sig: keygrip.sign('session=' + session)
  }
}