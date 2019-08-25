const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  roll: {
    type: String,
    required: true
  },
  hostel: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  preferred: {
    type: String,
    required: true
  },
  contact: {
    type: Number,
    required: true
  },
  squash_score: {
    type: Number,
    required: true,
    default: 0
  },
  tennis_score: {
    type: Number,
    required: true,
    default: 0
  },
  baddy_score: {
    type: Number,
    required: true,
    default: 0
  },
  tt_score: {
    type: Number,
    required: true,
    default: 0
  },
  match_played_squash: {
    type: Number,
    required: true,
    default: 0
  },
  match_won_squash: {
    type: String,
    required: true,
    default: 0
  },
  match_played_baddy: {
    type: Number,
    required: true,
    default: 0
  },
  match_won_baddy: {
    type: String,
    required: true,
    default: 0
  },
  match_played_tennis: {
    type: Number,
    required: true,
    default: 0
  },
  match_won_tennis: {
    type: String,
    required: true,
    default: 0
  },
  match_played_tt: {
    type: Number,
    required: true,
    default: 0
  },
  match_won_tt: {
    type: String,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model('Player', playerSchema);
