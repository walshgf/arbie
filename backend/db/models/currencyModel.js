const mongoose = require('mongoose'); 
mongoose.models = {};
mongoose.modelSchemas = {};

const CurrencySchema = mongoose.Schema({
  name:{
    type: String,
    require: true
  },
  bid: {
    type: Number,
    require: true
  },
  ask: {
    type: Number,
    require: true
  },
  //API Timestamp
  timestamp: {
    type: String,
    require: true
  },
  //Timestamp at creation
  recieved: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Currency", CurrencySchema);
