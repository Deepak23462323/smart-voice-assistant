// backend/routes/chat.js
const express = require('express');
const router = express.Router();
const geminiController = require('../controllers/geminiController');

// POST /api/chat - handle chat requests
router.post('/', geminiController.handleChat);

module.exports = router;
