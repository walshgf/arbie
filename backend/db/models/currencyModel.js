const mongoose = required('mongoose'); 
mongoose.models = {};
mongoose.modelSchemas = {};

const CurrencySchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  bid: {
    type: Number,
    required: true
  },
  ask: {
    type: Number,
    required: true
  },
  //API Timestamp
  timestamp: {
    type: String,
    required: true
  },
  //Timestamp at creation
  recieved: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Currency", CurrencySchema);
