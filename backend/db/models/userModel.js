const mongoose = require('mongoose');
mongoose.models = {};
mongoose.modelSchemas = {};

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  arb_percent: {
    type: Number,
    default: 5
  },
  admin: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date, 
    default: Date.now()
  }
});

module.exports = mongoose.model('User', UserSchema);