import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [inputMessage, setInputMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  // Simulated chatbot AI reply function
  const getChatbotReply = async (message) => {
    // Here, you would typically send the message to a backend/API to get a reply from the chatbot AI.
    // For this example, let's simulate a reply after a short delay.
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ sender: 'ChatBot', message: `You said: "${message}"` });
      }, 1000);
    });
  };

  // Function to handle sending messages
  const sendMessage = async () => {
    if (inputMessage.trim() !== '') {
      const userMessage = { sender: 'You', message: inputMessage };
      setChatHistory([...chatHistory, userMessage]);
      const botReply = await getChatbotReply(inputMessage);
      setChatHistory([...chatHistory, botReply]);
      setInputMessage('');
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat history when it updates
    const chatHistoryElement = document.getElementById('chat-history');
    if (chatHistoryElement) {
      chatHistoryElement.scrollTop = chatHistoryElement.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Discord Direct Messages</h1>
      </header>
      <div className="chat-container">
        <div id="chat-history" className="chat-history">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`message ${chat.sender === 'You' ? 'user' : 'bot'}`}>
              <span className="sender">{chat.sender}:</span> {chat.message}
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
