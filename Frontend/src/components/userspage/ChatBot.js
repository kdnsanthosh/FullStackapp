// ChatBot.js
import React, { useState } from 'react';
import './ChatBot.css';
import { ChatBotService } from '../service/ChatBotService';


function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, user: true }];
      setMessages(newMessages);
      setInput('');

      const botResponse = await ChatBotService(input);
      setMessages([...newMessages, { text: botResponse, user: false }]);
    }
  };

  return (
    <div className="chatbot-container">
      <h1 className="chatbot-header">AI ChatBot</h1>
      <div className="chatbot-messages-container">
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chatbot-message ${msg.user ? 'chatbot-user-message' : 'chatbot-bot-message'}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chatbot-input-container">
          <input
            type="text"
            className="chatbot-input"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            // onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            className="chatbot-send-button"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
