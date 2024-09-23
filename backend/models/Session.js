// /backend/models/Session.js
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  user1: { type: String, required: true },
  user2: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  drawings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Drawing' }],
});

module.exports = mongoose.model('Session', sessionSchema);
