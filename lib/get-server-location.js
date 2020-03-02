const getServerLocation = function (host) {
  return host && host.split && host.split('-jwiegm-')[1]
    ? host.split('-jwiegm-')[1].split('.azurewebsites.net')[0]
    : 'UNKNOWN'
}

module.exports = getServerLocation
