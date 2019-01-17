const Keygrip = require('keygrip')

const session = 'eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNWMzNDlhM2VhNThlNzAyOGMzNzYzNjQ5In19'
const keygrip = new Keygrip(['123123123'])
const hash = keygrip.sign('session=' + session)

console.log(hash)