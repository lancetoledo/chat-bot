import React, { useState, useEffect } from 'react';
import './App.css';
import OpenAI from 'openai'


function App() {
  const temp = "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"
  const [inputMessage, setInputMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const openai = new OpenAI({ apiKey: temp, dangerouslyAllowBrowser: true })
  async function main() {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);
  }

  // main();

  useEffect(() => {
    main()
  }, [])

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
      setChatHistory(prevHistory => [...prevHistory, userMessage]); // Update user's message first
      const botReply = await getChatbotReply(inputMessage); // Get bot's reply
      setChatHistory(prevHistory => [...prevHistory, botReply]); // Update chat history with bot's reply
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
