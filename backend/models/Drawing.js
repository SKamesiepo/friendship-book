// /backend/models/Drawing.js
const mongoose = require('mongoose');

const drawingSchema = new mongoose.Schema({
  user: { type: String, required: true },
  drawingData: { type: String, required: true }, // Drawing data as a base64 string
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
});

module.exports = mongoose.model('Drawing', drawingSchema);
