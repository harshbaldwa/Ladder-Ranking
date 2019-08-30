const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
  p1_id: {
    type: String,
    required: true
  },
  p1_name: {
    type: String,
    required: true
  },
  p2_id: {
    type: String,
    required: true
  },
  p2_name: {
    type: String,
    required: true
  },
  sport: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  set_score: {
    type: String
  },
  match_score: {
    type: String
  },
  winner_1: {
    type: Boolean,
    required: true,
    default: false
  },
  winner_2: {
    type: Boolean,
    required: true,
    default: false
  },
  confirm_1: {
    type: Boolean,
    required: true,
    default: false
  },
  confirm_2: {
    type: Boolean,
    required: true,
    default: false
  },
  report_secy: {
    type: Boolean,
    required: true,
    default: false
  },
  rejected: {
    type: Boolean,
    required: true,
    default: false
  },
  accepted: {
    type: Boolean,
    required: true,
    default: false
  },
  ok: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = mongoose.model('Match', matchSchema);
