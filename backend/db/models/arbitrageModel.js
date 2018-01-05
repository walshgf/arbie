const mongoose = require('../../node_modules/mongoose'); // ('mongoose') version doesn't see node_modules on my machine 
mongoose.models = {};
mongoose.modelSchemas = {};

const ArbitrageSchema = mongoose.Schema({
  exchange: {
    type: String,
    require: true
  },
  state: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  percentage: {
    type: Number,
    require: true
  },
  price: {
    type: Number,
    reguire: true
  },
  //Timestamp at creation
  recieved: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Arbitrage", ArbitrageSchema);
