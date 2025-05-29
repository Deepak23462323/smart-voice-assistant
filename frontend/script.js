// frontend/script.js

document.getElementById('chat-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  if (!message) return;

  appendMessage('You', message);
  input.value = '';

  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    appendMessage('Gemini', data.reply);
  } catch (error) {
    appendMessage('Error', 'Failed to get response from server.');
    console.error('Error:', error);
  }
});

function appendMessage(sender, message) {
  const chatBox = document.getElementById('chat-box');
  const messageElem = document.createElement('div');
  messageElem.classList.add('message');
  messageElem.classList.add(sender.toLowerCase());
  messageElem.textContent = `${sender}: ${message}`;
  chatBox.appendChild(messageElem);
  chatBox.scrollTop = chatBox.scrollHeight;
}
