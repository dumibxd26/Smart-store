const mongoose = require('mongoose');

const activeSessionSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const activeSeesion = mongoose.model('activeSession', activeSessionSchema);

module.exports = activeSeesion;