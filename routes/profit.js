const MongoClient = require("mongodb").MongoClient;
const { DateTime } = require("luxon");
const express = require('express');
const router = express.Router();

const { DB_CONN, DB_LOCATION, SERVER_LOCATION } = process.env

let insertDocument = async function(db, lastOrder) {
  let currentDateTime = DateTime.local().setZone("America/New_York");
  return await db.collection("orders").insertOne({
    orderid: parseInt(currentDateTime.toFormat("yyyyMMddHHmmss")),
    profit: (lastOrder && lastOrder.profit ? lastOrder.profit : 0) + 10,
    createdOn: currentDateTime.toISO()
  });
};

let findLastOrder = async function(db) {
  let lastOrder = await db
    .collection("orders")
    .find({})
    .limit(1)
    .project({ orderid: 1, profit: 1, createdOn: 1, _id: 0 })
    .sort({ orderid: -1 })
    .toArray();
  return lastOrder[0];
};

let findOrders = async function(db, callback) {
  return await db
    .collection("orders")
    .find({})
    .project({ orderid: 1, profit: 1, createdOn: 1, _id: 0 })
    .sort({ orderid: -1 })
    .toArray();
};

let updateOrders = function(db, callback) {
  db.collection("orders").update(
    { orderid: "20200227-0001" },
    {
      $set: {
        profit: 20.0
      },
      $currentDate: { lastModified: true }
    },
    { upsert: true },
    function(err, results) {
      console.log(results);
      callback();
    }
  );
};

let removeOrders = function(db, callback) {
  db.collection("orders").deleteMany({ orderid: "20200227-0001" }, function(err, results) {
    console.log(results);
    callback();
  });
};

async function getMeEverything() {
  let returnObject = {};
  let client = await MongoClient.connect(DB_CONN, { useUnifiedTopology: true });
  let db = client.db("invincible-db");
  let lastOrder = await findLastOrder(db);
  let createOrderOutput = await insertDocument(db, lastOrder);
  console.log(`Order Created: ${JSON.stringify(createOrderOutput.ops)}`);
  let orders = await findOrders(db);
  returnObject.orders = orders;
  returnObject.profit = orders[0].profit;
  returnObject.previousProfit = orders[1] ? orders[1].profit : 0;
  await client.close();
  return returnObject;
}

router.get('/', async function(req, res, next) {
  const everything = await getMeEverything();
  // Orders is an array of all orders
  // profit is the total profit
  const {
    orders,
    profit,
    previousProfit,
  } = everything;

  res.render('profit', {
    title: 'Profits',
    DB_LOCATION,
    SERVER_LOCATION,
    orders,
    profit,
    previousProfit,
  });
});

module.exports = router;
