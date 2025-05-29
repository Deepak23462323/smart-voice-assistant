// backend/controllers/geminiController.js
const axios = require('axios');

const API_KEY = process.env.API_KEY; // Use API key from .env

async function handleChat(req, res) {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Call Gemini API with user message and API key
    const response = await axios.post('https://api.gemini.com/v1/chat', {
      message: userMessage
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const geminiReply = response.data.reply;

    res.json({ reply: geminiReply });
  } catch (error) {
    console.error('Error in Gemini API call:', error.message);
    res.status(500).json({ error: 'Failed to get response from Gemini API' });
  }
}

module.exports = {
  handleChat
};
