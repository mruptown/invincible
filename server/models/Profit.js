const mongoose = require('mongoose');

const ProfitSchema = mongoose.Schema({
    amount: Number,
});

const Profit = mongoose.model('Profit', ProfitSchema);

var initialProfit = new Profit({ amount: 0});
initialProfit.save(function (err) {
    if (err) console.log (err);
});

module.exports = Profit;