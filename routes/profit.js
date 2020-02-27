const express = require('express');
const router = express.Router();

let orderId = 0;
let totalProfit = 0;

router.get('/', function(req, res, next) {
  const previous = totalProfit;

  orderId += 1;

  const orderProfit = Math.floor(Math.random() * 100);

  totalProfit += orderProfit;

  const { DB_CONN, DB_LOCATION, SERVER_LOCATION } = process.env

  res.render('profit', {
    title: 'Profits',
    DB_CONN,
    DB_LOCATION,
    SERVER_LOCATION,
    orderId,
    orderProfit,
    previous,
    totalProfit,
  });
});

module.exports = router;
