import React, { useState, useEffect } from 'react';
import './App.css';
import openai from 'openai';

function App() {
  const [inputMessage, setInputMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [openaiInstance, setOpenaiInstance] = useState(null);

  useEffect(() => {
    // Initialize the OpenAI instance with your API key
    const initializeOpenAI = async () => {
      try {
        const instance = new openai.OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true }); // Replace with your actual OpenAI API key
        console.log('OpenAI instance:', instance.chat.completions); // Check the instance object
        setOpenaiInstance(instance);
      } catch (error) {
        console.error('Error initializing OpenAI:', error);
      }
    };

    initializeOpenAI();
  }, []);

  const sendMessage = async (message) => {
    if (openaiInstance && message.trim() !== '') {
      try {
        const response = await openaiInstance.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: 'user', content: message }],
        });
        console.log('Response:', response); // Log the entire response object
        console.log('Response data:', response.choices); // Log the data object
        const choices = response.choices;
        if (choices && choices.length > 0) {
          const botReply = choices[0].message.content.trim();
          setChatHistory(prevHistory => [...prevHistory, { sender: 'ChatBot', message: botReply }]);
        } else {
          console.error('Error: Choices array is empty or undefined');
        }
      } catch (error) {
        console.error('Error generating bot reply:', error);
      }
    }
  };




  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      const userMessage = { sender: 'You', message: inputMessage };
      setChatHistory(prevHistory => [...prevHistory, userMessage]);
      sendMessage(inputMessage);
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
                handleSendMessage();
              }
            }}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;