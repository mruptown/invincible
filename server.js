require('dotenv').config();
require('./server/db-conn');
const express = require('express');
const bodyParser = require('body-parser');
const Profit = require('./server/models/Profit');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname });
});

app.get('/api/profit/add', (req, res) => {
    var incrementedValue = Math.floor((Math.random() * 5) + 1);
    console.log('Adding ' + incrementedValue + ' to profit!');

    //this needs to be async
    let profit = /* await */ Profit.findOneAndUpdate({}, {$inc: { 'amount' : incrementedValue }}, {
        new: true
    });
    res.send('Profit = ' + profit.amount);
});

const {PORT} = process.env;
app.listen(PORT, () => console.log(`Wizardry happening on port ${PORT}`))