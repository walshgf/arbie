const mongoose = require('mongoose'); // ('mongoose') version doesn't see node_modules on my machine 
mongoose.models = {};
mongoose.modelSchemas = {};

const ExchangeSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  state: {
    type: String,
    require: true
  },
  currencies: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Currency"
  }]
});

module.exports = mongoose.model("Exchange", ExchangeSchema);