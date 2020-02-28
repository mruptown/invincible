const getServerLocation = function (cookies) {
  return Object.keys({ ...cookies })
    .filter(x => x.includes('invincible-app-jwiegm'))
    .reduce((acc, cur) => {
      return cur.includes('invincible-app-jwiegm')
        ? cur.split('-jwiegm-')[1].split('.azurewebsites.net')[0]
        : cur
    }, 'UNKNOWN')
}

module.exports = getServerLocation
