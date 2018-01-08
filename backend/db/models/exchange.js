const mongoose = required('mongoose'); 
mongoose.models = {};
mongoose.modelSchemas = {};

const ExchangeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  currencies: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Currency"
  }]
});

module.exports = mongoose.model("Exchange", ExchangeSchema);
