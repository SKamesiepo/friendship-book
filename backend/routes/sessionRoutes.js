// /backend/routes/sessionRoutes.js
const express = require('express');
const Session = require('../models/Session');
const Drawing = require('../models/Drawing');

const router = express.Router();

// Route to start a new session
router.post('/start-session', async (req, res) => {
  const { user1, user2 } = req.body;
  try {
    const session = new Session({ user1, user2 });
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to submit a drawing
router.post('/submit-drawing', async (req, res) => {
  const { user, drawingData, sessionId } = req.body;
  try {
    const drawing = new Drawing({ user, drawingData, sessionId });
    await drawing.save();
    res.status(201).json(drawing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
