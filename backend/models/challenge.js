const mongoose = require('mongoose');

const challengeSchema = mongoose.Schema({
  challengeId: { type: String, required: true },
  challengerId: { type: String, required: true },
  sport: { type: String, required: true },
  message: { type: String, required: true },
  time: { type: String, required: true },
  date: { type: String, required: true }
});

module.exports = mongoose.model('Challenge', challengeSchema);
