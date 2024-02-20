import React, { useState, useEffect } from 'react';
import './App.css';
// Import OpenAI module
import openai from 'openai';
import Sidebar from './components/Sidebar';

function App() {
  // State hooks to manage input message and chat history
  const [inputMessage, setInputMessage] = useState(''); // State for input message
  const [chatHistory, setChatHistory] = useState([]); // State for chat history
  const [openaiInstance, setOpenaiInstance] = useState(null); // State for OpenAI instance

  useEffect(() => { // Effect hook to initialize OpenAI instance
    const initializeOpenAI = async () => { // Function to initialize OpenAI instance
      try {
        // Create OpenAI instance with provided API key
        const instance = new openai.OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true });
        console.log('OpenAI instance:', instance.chat.completions); // Log instance object to visualize what we need to access later
        setOpenaiInstance(instance); // Set OpenAI instance in state
      } catch (error) {
        console.error('Error initializing OpenAI:', error); // Log error if initialization fails
      }
    };

    initializeOpenAI(); // Call function to initialize OpenAI instance
  }, []); // Empty dependency array to run effect only once after initial render

  // Function to send message to OpenAI chatbot
  const sendMessage = async (message) => {
    if (openaiInstance && message.trim() !== '') { // Check if OpenAI instance is initialized and message is not empty
      try {
        // Send message to OpenAI chatbot and await response
        const response = await openaiInstance.chat.completions.create({
          model: "gpt-3.5-turbo", // Choose the model
          messages: [{ role: 'user', content: message }], // Define user message
        });
        console.log('Response:', response); // Log the entire response object to understand what OpenAi gives back
        console.log('Response data:', response.choices); // Log the data object which contains message
        const choices = response.choices; // Extract choices from response
        if (choices && choices.length > 0) { // Check if choices array is not empty
          const botReply = choices[0].message.content.trim(); // Extract bot's reply from choices
          setChatHistory(prevHistory => [...prevHistory, { sender: 'ChatBot', message: botReply }]); // Update chat history with bot's reply
        } else {
          console.error('Error: Choices array is empty or undefined'); // Log error if choices array is empty
        }
      } catch (error) {
        console.error('Error generating bot reply:', error); // Log error if generating bot reply fails
      }
    }
  };

  // Simulated chatbot AI reply function for static version
  const getChatbotReply = async (message) => {
    // Simulate delay and return a static response
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ sender: 'ChatBot', message: `You said: "${message}"` });
      }, 1000);
    });
  };

  // Function to handle static version
  const staticSendMessage = async () => { // Function to send message in static version
    if (inputMessage.trim() !== '') { // Check if input message is not empty
      const botReply = await getChatbotReply(inputMessage); // Get bot's reply
      setChatHistory(prevHistory => [...prevHistory, botReply]); // Update chat history with bot's reply
      setInputMessage(''); // Clear input message
    }
  };
  // Function to handle sending message whether its static or utlizing the API
  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') { // Check if input message is not empty
      const userMessage = { sender: 'You', message: inputMessage }; // Define user message object
      setChatHistory(prevHistory => [...prevHistory, userMessage]); // Update chat history with user's message
      // Call function to send message with STATIC response
      staticSendMessage(inputMessage);
      //Call function to send message with chatGPT API
      // sendMessage(inputMessage)
      setInputMessage(''); // Clear input message when done
    }
  };

  useEffect(() => { // Effect hook to scroll chat history to bottom
    const chatHistoryElement = document.getElementById('chat-history'); // Get chat history element
    if (chatHistoryElement) { // Check if chat history element exists
      chatHistoryElement.scrollTop = chatHistoryElement.scrollHeight; // Scroll chat history to bottom
    }
  }, [chatHistory]); // Dependency array to run effect when chat history changes

  return (
    <div className="App">
      <header className="App-header">
        <h1>Discord Direct Messages</h1>
      </header>
      <div className='main-container'>
        < Sidebar />
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
    </div>
  );
}

export default App;