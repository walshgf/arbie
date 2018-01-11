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
    required: true
  },
  sell_price: {
    type: Number,
    required: true
  },
  profit: {
    type: Number,
    required: true
  },
  //Timestamp at creation
  recieved: {
    type: Date,
    default: Date.now()
  },
  timestamp:{
    type: Date,
    required: true
  },
  found_by: {
    type: String,
    default: "APP"
  }
});

module.exports = mongoose.model("Arbitrage", ArbitrageSchema);
