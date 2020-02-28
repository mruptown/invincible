const test = require('tape')
const getServerLocation = require('../lib/get-server-location')

test('The getServerLocation function', t => {
  t.equal(
    getServerLocation(),
    'UNKNOWN',
    'returns "UNKNOWN" if no request is sent.'
  )

  t.equal(
    getServerLocation({ io: 'x' }),
    'UNKNOWN',
    'returns "UNKNOWN" if the cookies do not contain an invincible-app key.'
  )

  t.equal(
    getServerLocation({
      io: 'x',
      'invincible-app-jwiegm-eastus.azurewebsites.net': 'y'
    }),
    'eastus',
    'returns "eastus" when a cookie is set on the invincible-app-jwiegm-eastus.azurewebsites.net domain.'
  )

  t.equal(
    getServerLocation({
      io: 'x',
      'invincible-app-jwiegm-uk.azurewebsites.net': 'y'
    }),
    'uk',
    'returns "uk" when a cookie is set on the invincible-app-jwiegm-uk.azurewebsites.net domain.'
  )

  t.end()
})
