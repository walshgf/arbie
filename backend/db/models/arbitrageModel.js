const mongoose = require('mongoose'); 
mongoose.models = {};
mongoose.modelSchemas = {};

const ArbitrageSchema = new mongoose.Schema({
  buy_exchange: {
    type: String,
    required: true
  },
  sell_exchange: {
    type: String,
    required: true
  },
  currency_type: {
    type: String,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  buy_price: {
    type: Number,
    reguire: true
  },
  sell_price: {
    type: Number,
    reguire: true
  },
  //Timestamp at creation
  recieved: {
    type: Date,
    default: Date.now()
  },
  found_by: {
    type: String,
    default: "APP"
  }
});

module.exports = mongoose.model("Arbitrage", ArbitrageSchema);
