const test = require('tape')
const getServerLocation = require('../lib/get-server-location')

test('The getServerLocation function', t => {
  t.equal(
    getServerLocation(),
    'UNKNOWN',
    'returns "UNKNOWN" if no request is sent.'
  )

  t.equal(
    getServerLocation('whatever'),
    'UNKNOWN',
    'should be "UNKNOWN" if a host is not recognized.'
  )

  t.equal(
    getServerLocation('invincible-app-jwiegm-eastus.azurewebsites.net'),
    'eastus',
    'returns "eastus" when the host is "invincible-app-jwiegm-eastus.azurewebsites.net".'
  )

  t.equal(
    getServerLocation('invincible-app-jwiegm-uk.azurewebsites.net'),
    'uk',
    'returns "uk" when the host is "invincible-app-jwiegm-uk.azurewebsites.net".'
  )

  t.end()
})
