const { getMeEverything } = require('avneet-anf-hackathon')
const express = require('express')
const router = express.Router()
const getServerLocation = require('../lib/get-server-location')

router.get('/', async function (req, res, next) {
  const everything = await getMeEverything()
  const {
    orders,
    profit,
    previousProfit
  } = everything

  const SERVER_LOCATION = getServerLocation(req.headers.host)
  const PAGE_HEADING = 'Profit'

  res.render('profit', {
    title: 'Profits',
    SERVER_LOCATION,
    orders,
    profit,
    previousProfit,
    req,
    PAGE_HEADING,
  })
})

module.exports = router
